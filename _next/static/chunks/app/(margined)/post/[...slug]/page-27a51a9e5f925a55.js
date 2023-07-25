(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([[726],{

/***/ 5588:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 5962, 23));
Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 5470));
Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 9114));
Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 2665, 23));
Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 9328, 23))

/***/ }),

/***/ 9114:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ ViewDate; }
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9268);
/* __next_internal_client_entry_do_not_use__ default auto */ 
function ViewDate(props) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
        children: props.date.toLocaleString()
    });
}


/***/ }),

/***/ 5470:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ ClientMdxRenderer; }
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9268);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6006);
/* harmony import */ var mdx_bundler_client__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7386);
/* __next_internal_client_entry_do_not_use__ default auto */ 


/*
 * This is a Client react component responsible for rendering MDX content
*/ function ClientMdxRenderer(props) {
    const code = props.code;
    const Component = react__WEBPACK_IMPORTED_MODULE_1__.useMemo(()=>(0,mdx_bundler_client__WEBPACK_IMPORTED_MODULE_2__.getMDXComponent)(code), [
        code
    ]);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Component, {});
}


/***/ }),

/***/ 9328:
/***/ (function(module) {

// extracted by mini-css-extract-plugin
module.exports = {"style":{"fontFamily":"'__DM_Sans_f44734', '__DM_Sans_Fallback_f44734'","fontWeight":400,"fontStyle":"normal"},"className":"__className_f44734"};

/***/ }),

/***/ 2665:
/***/ (function(module) {

// extracted by mini-css-extract-plugin
module.exports = {"style":{"fontFamily":"'__DM_Serif_Display_59b087', '__DM_Serif_Display_Fallback_59b087'","fontWeight":400,"fontStyle":"normal"},"className":"__className_59b087"};

/***/ }),

/***/ 3177:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var f=__webpack_require__(6006),k=Symbol.for("react.element"),l=Symbol.for("react.fragment"),m=Object.prototype.hasOwnProperty,n=f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,p={key:!0,ref:!0,__self:!0,__source:!0};
function q(c,a,g){var b,d={},e=null,h=null;void 0!==g&&(e=""+g);void 0!==a.key&&(e=""+a.key);void 0!==a.ref&&(h=a.ref);for(b in a)m.call(a,b)&&!p.hasOwnProperty(b)&&(d[b]=a[b]);if(c&&c.defaultProps)for(b in a=c.defaultProps,a)void 0===d[b]&&(d[b]=a[b]);return{$$typeof:k,type:c,key:e,ref:h,props:d,_owner:n.current}}exports.Fragment=l;exports.jsx=q;exports.jsxs=q;


/***/ }),

/***/ 9268:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


if (true) {
  module.exports = __webpack_require__(3177);
} else {}


/***/ }),

/***/ 7386:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__(8541)


/***/ }),

/***/ 8541:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
var __webpack_unused_export__;


__webpack_unused_export__ = ({
  value: true
});
exports.getMDXComponent = getMDXComponent;
__webpack_unused_export__ = getMDXExport;
var React = _interopRequireWildcard(__webpack_require__(6006));
var _jsx_runtime = _interopRequireWildcard(__webpack_require__(9268));
var ReactDOM = _interopRequireWildcard(__webpack_require__(8431));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * @typedef {import('./types').MDXContentProps} MDXContentProps
 */

/**
 *
 * @param {string} code - The string of code you got from bundleMDX
 * @param {Record<string, unknown>} [globals] - Any variables your MDX needs to have accessible when it runs
 * @return {React.FunctionComponent<MDXContentProps>}
 */
function getMDXComponent(code, globals) {
  const mdxExport = getMDXExport(code, globals);
  return mdxExport.default;
}

/**
 * @template ExportedObject
 * @template Frontmatter
 * @type {import('./types').MDXExportFunction<ExportedObject, Frontmatter>}
 * @param {string} code - The string of code you got from bundleMDX
 * @param {Record<string, unknown>} [globals] - Any variables your MDX needs to have accessible when it runs
 *
 */
function getMDXExport(code, globals) {
  const scope = {
    React,
    ReactDOM,
    _jsx_runtime,
    ...globals
  };
  // eslint-disable-next-line
  const fn = new Function(...Object.keys(scope), code);
  return fn(...Object.values(scope));
}

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, [962,253,769,744], function() { return __webpack_exec__(5588); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ _N_E = __webpack_exports__;
/******/ }
]);