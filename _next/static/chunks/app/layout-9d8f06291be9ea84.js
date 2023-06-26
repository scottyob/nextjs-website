(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([[185],{

/***/ 2604:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 7477, 23));
Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 5212));
Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 7402, 23));
Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 7977, 23));
Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 255, 23))

/***/ }),

/***/ 5212:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Navbar; }
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9268);
/* harmony import */ var next_font_google_target_css_path_components_Navbar_react_tsx_import_Exo_2_arguments_weight_500_subsets_latin_style_italic_variableName_exo_2___WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7637);
/* harmony import */ var next_font_google_target_css_path_components_Navbar_react_tsx_import_Exo_2_arguments_weight_500_subsets_latin_style_italic_variableName_exo_2___WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_font_google_target_css_path_components_Navbar_react_tsx_import_Exo_2_arguments_weight_500_subsets_latin_style_italic_variableName_exo_2___WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5846);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6008);
/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_navigation__WEBPACK_IMPORTED_MODULE_2__);
/* __next_internal_client_entry_do_not_use__ default auto */ 



function Navbar() {
    // Get the current page
    const pathname = (0,next_navigation__WEBPACK_IMPORTED_MODULE_2__.usePathname)();
    const liClass = "transition group duration-300 whitespace-nowrap";
    // Underline components
    const underlineClass = "block group-hover:max-w-[70%] ml-2 transition-all duration-500 h-0.5";
    const unselected = /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
        className: underlineClass + " max-w-0 bg-orange-50 group-hover:bg-orange-400"
    });
    const selected = /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
        className: underlineClass + " max-w-[70%] bg-orange-500"
    });
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("ul", {
        className: [
            "flex flex-wrap justify-center space-x-2 text-gray-400 italic pt-3 mb-8 max-w-2xl w-[80%] m-auto",
            (next_font_google_target_css_path_components_Navbar_react_tsx_import_Exo_2_arguments_weight_500_subsets_latin_style_italic_variableName_exo_2___WEBPACK_IMPORTED_MODULE_3___default().className)
        ].join(" "),
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("li", {
                className: liClass,
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {
                        href: "/",
                        children: "Writings/Projects"
                    }),
                    pathname === "/" || pathname.toLowerCase().startsWith("/post") ? selected : unselected
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("li", {
                className: liClass,
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {
                        href: "/about",
                        children: "About"
                    }),
                    pathname.startsWith("/about") ? selected : unselected
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("li", {
                className: liClass,
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {
                        href: "/bucketlist",
                        children: "Bucket List"
                    }),
                    pathname.startsWith("/bucketlist") ? selected : unselected
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("li", {
                className: liClass,
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {
                        href: "/recipes",
                        children: "Cooking"
                    }),
                    pathname.startsWith("/recipes") ? selected : unselected
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("li", {
                className: liClass,
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {
                        href: "/flying",
                        children: "Flying"
                    }),
                    pathname.startsWith("/flying") ? selected : unselected
                ]
            })
        ]
    });
}


/***/ }),

/***/ 7402:
/***/ (function() {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 255:
/***/ (function(module) {

// extracted by mini-css-extract-plugin
module.exports = {"style":{"fontFamily":"'__Capriola_baad2a', '__Capriola_Fallback_baad2a'","fontWeight":400,"fontStyle":"normal"},"className":"__className_baad2a"};

/***/ }),

/***/ 7977:
/***/ (function(module) {

// extracted by mini-css-extract-plugin
module.exports = {"style":{"fontFamily":"'__Inter_0ec1f4', '__Inter_Fallback_0ec1f4'","fontStyle":"normal"},"className":"__className_0ec1f4"};

/***/ }),

/***/ 7637:
/***/ (function(module) {

// extracted by mini-css-extract-plugin
module.exports = {"style":{"fontFamily":"'__Exo_2_6cf34a', '__Exo_2_Fallback_6cf34a'","fontWeight":500,"fontStyle":"italic"},"className":"__className_6cf34a"};

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

/***/ 5846:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__(7477)


/***/ }),

/***/ 6008:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__(794)


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, [477,253,769,744], function() { return __webpack_exec__(2604); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ _N_E = __webpack_exports__;
/******/ }
]);