const defaultDeps = { react: "18", "react-dom": "18" };

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function hidePreloader() {
  const preloader = document.querySelector(".preloader");
  if (preloader) {
    preloader.style.transition = "opacity 0.4s ease";
    preloader.style.opacity = 1;
    preloader.style.opacity = 0;
    await delay(410);
    preloader.style.display = "none";
  }
}

async function loadDeps() {
  const allDeps = { ...defaultDeps, ...(window.npm_deps || {}) };
  const depsLoadPromises = Promise.all(
    Object.keys(allDeps).map((key) => {
      const item = allDeps[key];
      let version = "";
      let name = item?.name || key.replace(/-/g, "_");
      if (typeof item === "string") {
        version = allDeps[key];
      } else if (item?.version) {
        version = allDeps[key]?.version;
      }
      return import(
        `https://esm.sh/${key}${version ? `@${version}` : ""}`
      ).then((module) => ({ module, name }));
    })
  );
  const [moduleEntries] = await Promise.all([
    depsLoadPromises,
    import("https://cdn.jsdelivr.net/pyodide/v0.21.3/full/pyodide.js"),
  ]);

  return moduleEntries;
}

const libraryPythonCode = `
import inspect
import types
import sys
from pyodide.ffi import create_proxy, to_js
from js import window, document, Object
import react as React
import react_dom as ReactDOM

flatten = lambda *n: (e for a in n
                      for e in (flatten(*a) if isinstance(a, (tuple, list)) else (a,)))


_h = React.createElement


def helper(type, *args):
    props = None
    children = []
    if args and isinstance(args[0], dict):
        props = to_js(args[0], dict_converter=Object.fromEntries)
        if args[1:]:
            children = flatten(args[1:])
    elif args:
        children = flatten(args)
    return _h(type, props, *children)


class HyperScript(type):
    def __getattribute__(self, __name):
        def _helper(*args):
            return helper(__name, *args)
        return _helper

    def __call__(self, type, *args):
        return helper(type, *args)


class h(metaclass=HyperScript):
    pass


def Component(component_fn):

    def inner_fn(props, _opt):
        func_params = (inspect.signature(component_fn).parameters)
        return component_fn(props) if func_params else component_fn()

    return create_proxy(inner_fn)


def render(app, selector):
    root = ReactDOM.createRoot(document.querySelector(selector))
    root.render(app)



pyorea = types.ModuleType('pyorea')
pyorea.h = h
pyorea.Component = Component
pyorea.render = render
pyorea.React = React
sys.modules['pyorea'] = pyorea

`;

async function run() {
  const moduleEntries = await loadDeps();
  const pyodide = await loadPyodide({ fullStdLib: true });

  for (const { module, name } of moduleEntries) {
    pyodide.registerJsModule(name, module);
  }
  const scripts = [];
  document
    .querySelectorAll(`script[type="text/python"]`)
    .forEach((x, index) => {
      if (x.src) {
        scripts.push(
          fetch(x.src)
            .then((x) => x.text())
            .then((text) => ({ text, name: x.src }))
        );
      } else {
        scripts.push({
          text: x.textContent,
          name: `inline script #${index + 1}`,
        });
      }
    });
  const scriptContents = await Promise.all(scripts);
  await hidePreloader();
  pyodide.runPython(libraryPythonCode);
  for (const { text, name } of scriptContents) {
    try {
      pyodide.runPython(text);
    } catch (error) {
      console.error(`Error in file ${name}`, error);
    }
  }
}

function main() {
  window.addEventListener("DOMContentLoaded", () => {
    run().catch((e) => {
      console.warn("load script error", e);
    });
  });
}

main();
