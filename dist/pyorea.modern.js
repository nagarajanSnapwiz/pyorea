function e(){return e=Object.assign?Object.assign.bind():function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])}return e},e.apply(this,arguments)}const n={react:"18","react-dom":"18"};window.addEventListener("DOMContentLoaded",()=>{(async function(){const t=await async function(){const t=e({},n,window.npm_deps||{}),r=Promise.all(Object.keys(t).map(e=>{const n=t[e];let r="",o=(null==n?void 0:n.name)||e.replace(/-/g,"_");if("string"==typeof n)r=t[e];else if(null!=n&&n.version){var a;r=null==(a=t[e])?void 0:a.version}return import(`https://esm.sh/${e}${r?`@${r}`:""}`).then(e=>({module:e,name:o}))})),[o]=await Promise.all([r,import("https://cdn.jsdelivr.net/pyodide/v0.21.3/full/pyodide.js")]);return o}(),r=await loadPyodide({fullStdLib:!0});for(const{module:e,name:n}of t)r.registerJsModule(n,e);const o=[];document.querySelectorAll('script[type="text/python"]').forEach((e,n)=>{o.push(e.src?fetch(e.src).then(e=>e.text()).then(n=>({text:n,name:e.src})):{text:e.textContent,name:`inline script #${n+1}`})});const a=await Promise.all(o);await async function(){const e=document.querySelector(".preloader");e&&(e.style.transition="opacity 0.4s ease",e.style.opacity=1,e.style.opacity=0,await new Promise(e=>setTimeout(e,410)),e.style.display="none")}(),r.runPython("\nimport inspect\nimport types\nimport sys\nfrom pyodide.ffi import create_proxy, to_js\nfrom js import window, document, Object\nimport react as React\nimport react_dom as ReactDOM\n\nflatten = lambda *n: (e for a in n\n                      for e in (flatten(*a) if isinstance(a, (tuple, list)) else (a,)))\n\n\n_h = React.createElement\n\n\ndef helper(type, *args):\n    props = None\n    children = []\n    if args and isinstance(args[0], dict):\n        props = to_js(args[0], dict_converter=Object.fromEntries)\n        if args[1:]:\n            children = flatten(args[1:])\n    elif args:\n        children = flatten(args)\n    return _h(type, props, *children)\n\n\nclass HyperScript(type):\n    def __getattribute__(self, __name):\n        def _helper(*args):\n            return helper(__name, *args)\n        return _helper\n\n    def __call__(self, type, *args):\n        return helper(type, *args)\n\n\nclass h(metaclass=HyperScript):\n    pass\n\n\ndef Component(component_fn):\n\n    def inner_fn(props, _opt):\n        func_params = (inspect.signature(component_fn).parameters)\n        return component_fn(props) if func_params else component_fn()\n\n    return create_proxy(inner_fn)\n\n\ndef render(app, selector):\n    root = ReactDOM.createRoot(document.querySelector(selector))\n    root.render(app)\n\n\n\npyorea = types.ModuleType('pyorea')\npyorea.h = h\npyorea.Component = Component\npyorea.render = render\npyorea.React = React\nsys.modules['pyorea'] = pyorea\n\n");for(const{text:e,name:n}of a)try{r.runPython(e)}catch(e){console.error(`Error in file ${n}`,e)}})().catch(e=>{console.warn("load script error",e)})});
//# sourceMappingURL=pyorea.modern.js.map
