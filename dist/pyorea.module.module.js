!function(e){"function"==typeof define&&define.amd?define(e):e()}(function(){function e(){return e=Object.assign?Object.assign.bind():function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])}return e},e.apply(this,arguments)}function n(e,n){(null==n||n>e.length)&&(n=e.length);for(var t=0,r=new Array(n);t<n;t++)r[t]=e[t];return r}function t(e,t){var r="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(r)return(r=r.call(e)).next.bind(r);if(Array.isArray(e)||(r=function(e,t){if(e){if("string"==typeof e)return n(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?n(e,t):void 0}}(e))||t&&e&&"number"==typeof e.length){r&&(e=r);var o=0;return function(){return o>=e.length?{done:!0}:{done:!1,value:e[o++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var r={react:"18","react-dom":"18"};window.addEventListener("DOMContentLoaded",function(){(function(){try{return console.time("deps"),Promise.resolve(function(){try{var n=e({},r,window.npm_deps||{}),t=Promise.all(Object.keys(n).map(function(e){var t=n[e],r="",o=(null==t?void 0:t.name)||e.replace(/-/g,"_");if("string"==typeof t)r=n[e];else if(null!=t&&t.version){var i;r=null==(i=n[e])?void 0:i.version}return import("https://esm.sh/"+e+(r?"@"+r:"")).then(function(e){return{module:e,name:o}})}));return Promise.resolve(Promise.all([t,import("https://cdn.jsdelivr.net/pyodide/v0.21.3/full/pyodide.js")])).then(function(e){return e[0]})}catch(e){return Promise.reject(e)}}()).then(function(e){return console.timeEnd("deps"),console.time("loadPy"),Promise.resolve(loadPyodide({fullStdLib:!0})).then(function(n){console.timeEnd("loadPy"),console.time("register");for(var r,o=t(e);!(r=o()).done;){var i=r.value;n.registerJsModule(i.name,i.module)}console.timeEnd("register");var a=[];return console.time("script1"),document.querySelectorAll('script[type="text/python"]').forEach(function(e,n){a.push(e.src?fetch(e.src).then(function(e){return e.text()}).then(function(n){return{text:n,name:e.src}}):{text:e.textContent,name:"inline script #"+(n+1)})}),Promise.resolve(Promise.all(a)).then(function(e){return console.log("scriptContecxt",e),console.timeEnd("script1"),Promise.resolve(function(){try{var e=document.querySelector(".preloader"),n=function(){if(e)return e.style.transition="opacity 0.4s ease",e.style.opacity=1,e.style.opacity=0,Promise.resolve(new Promise(function(e){return setTimeout(e,410)})).then(function(){e.style.display="none"})}();return Promise.resolve(n&&n.then?n.then(function(){}):void 0)}catch(e){return Promise.reject(e)}}()).then(function(){console.time("script_ex"),n.runPython("\nimport inspect\nimport types\nimport sys\nfrom pyodide.ffi import create_proxy, to_js\nfrom js import window, document, Object\nimport react as React\nimport react_dom as ReactDOM\n\nflatten = lambda *n: (e for a in n\n                      for e in (flatten(*a) if isinstance(a, (tuple, list)) else (a,)))\n\n\n_h = React.createElement\n\n\ndef helper(type, *args):\n    props = None\n    children = []\n    if args and isinstance(args[0], dict):\n        props = to_js(args[0], dict_converter=Object.fromEntries)\n        if args[1:]:\n            children = flatten(args[1:])\n    elif args:\n        children = flatten(args)\n    return _h(type, props, *children)\n\n\nclass HyperScript(type):\n    def __getattribute__(self, __name):\n        def _helper(*args):\n            return helper(__name, *args)\n        return _helper\n\n    def __call__(self, type, *args):\n        return helper(type, *args)\n\n\nclass h(metaclass=HyperScript):\n    pass\n\n\ndef Component(component_fn):\n\n    def inner_fn(props, _opt):\n        func_params = (inspect.signature(component_fn).parameters)\n        return component_fn(props) if func_params else component_fn()\n\n    return create_proxy(inner_fn)\n\n\ndef render(app, selector):\n    root = ReactDOM.createRoot(document.querySelector(selector))\n    root.render(app)\n\n\n\npyorea = types.ModuleType('pyorea')\npyorea.h = h\npyorea.Component = Component\npyorea.render = render\npyorea.React = React\nsys.modules['pyorea'] = pyorea\n\n");for(var r,o=t(e);!(r=o()).done;){var i=r.value,a=i.text,s=i.name;try{n.runPython(a)}catch(e){console.error("Error in file "+s,e)}}console.timeEnd("script_ex")})})})})}catch(e){return Promise.reject(e)}})().catch(function(e){console.warn("load script error",e)})})});
//# sourceMappingURL=pyorea.module.module.js.map
