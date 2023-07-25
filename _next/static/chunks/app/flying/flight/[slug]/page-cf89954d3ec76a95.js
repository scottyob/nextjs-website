(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([[91],{

/***/ 4281:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 8521));
Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 5470))

/***/ }),

/***/ 8521:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Viewer2D; }
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9268);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6006);
/* harmony import */ var igc_parser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3697);
/* harmony import */ var igc_parser__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(igc_parser__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_map_gl_maplibre__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1567);
/* __next_internal_client_entry_do_not_use__ default auto */ 



function Viewer2D(props) {
    const igc = props.igc;
    const flight = igc_parser__WEBPACK_IMPORTED_MODULE_2___default().parse(igc);
    // const task = flight.task;
    const position = {
        lat: flight.fixes[0].latitude,
        lng: flight.fixes[0].longitude
    };
    const positions = flight.fixes.map((p)=>{
        return {
            lat: p.latitude,
            lng: p.longitude
        };
    });
    const data = {
        type: "Feature",
        geometry: {
            type: "LineString",
            coordinates: positions.map((p)=>[
                    p.lng,
                    p.lat
                ])
        }
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        className: "pb-4",
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_map_gl_maplibre__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .ZP, {
            initialViewState: {
                longitude: position.lng,
                latitude: position.lat,
                zoom: 12
            },
            style: {
                width: "100%",
                height: 400
            },
            mapStyle: "https://api.maptiler.com/maps/streets/style.json?key=KFYBsfFWC5kx8RrE5mb8",
            attributionControl: false,
            scrollZoom: false,
            touchZoomRotate: false,
            dragPan: false,
            doubleClickZoom: false,
            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_map_gl_maplibre__WEBPACK_IMPORTED_MODULE_3__/* .Source */ .Hw, {
                type: "geojson",
                data: data,
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_map_gl_maplibre__WEBPACK_IMPORTED_MODULE_3__/* .Layer */ .mh, {
                    type: "line",
                    paint: {
                        "line-width": 2,
                        "line-color": "green"
                    }
                })
            })
        })
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


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, [459,253,769,744], function() { return __webpack_exec__(4281); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ _N_E = __webpack_exports__;
/******/ }
]);