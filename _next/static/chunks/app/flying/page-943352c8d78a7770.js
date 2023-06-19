(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([[638],{

/***/ 334:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 8920, 23));
Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 546))

/***/ }),

/***/ 546:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return /* binding */ FlightGraphs; }
});

// EXTERNAL MODULE: ./node_modules/@swc/helpers/esm/_tagged_template_literal.js
var _tagged_template_literal = __webpack_require__(2805);
// EXTERNAL MODULE: ./node_modules/next/dist/compiled/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(9268);
// EXTERNAL MODULE: ./node_modules/luxon/src/luxon.js + 23 modules
var luxon = __webpack_require__(4478);
// EXTERNAL MODULE: ./node_modules/next/dist/shared/lib/app-dynamic.js
var app_dynamic = __webpack_require__(1301);
var app_dynamic_default = /*#__PURE__*/__webpack_require__.n(app_dynamic);
;// CONCATENATED MODULE: ./app/flying/components/scatterPlot.react.tsx
/* __next_internal_client_entry_do_not_use__ default auto */ 


const Plot = app_dynamic_default()(()=>Promise.all(/* import() */[__webpack_require__.e(231), __webpack_require__.e(531)]).then(__webpack_require__.bind(__webpack_require__, 6403)), {
    loadableGenerated: {
        webpack: ()=>[
                /*require.resolve*/(6403)
            ]
    },
    ssr: false
});
function humanFlightTime(flight) {
    var _flight_durationSeconds;
    return luxon/* Duration */.nL.fromMillis(((_flight_durationSeconds = flight.durationSeconds) !== null && _flight_durationSeconds !== void 0 ? _flight_durationSeconds : 0) * 1000).rescale().set({
        seconds: 0
    }).rescale().toHuman();
}
function ScatterPlot(props) {
    const { flights  } = props;
    var _f_durationSeconds;
    const durations = flights.map((f)=>((_f_durationSeconds = f.durationSeconds) !== null && _f_durationSeconds !== void 0 ? _f_durationSeconds : 0) / 60);
    var _f_location;
    const data = {
        type: "scatter",
        mode: "markers",
        marker: {
            size: durations,
            sizemode: "area"
        },
        transforms: [
            {
                type: "groupby",
                groups: flights.map((f)=>(_f_location = f.location) !== null && _f_location !== void 0 ? _f_location : "Unknown")
            }
        ],
        title: {
            text: "Flight Duration (minutes)",
            position: "top center"
        },
        x: flights.map((f)=>f.date),
        y: durations,
        text: flights.map((f)=>{
            let hover = "\n          <b>".concat(humanFlightTime(f), "</b><br />\n          Flight: ").concat(f.number, "<br />\n          ").concat(f.location, "<br />\n          <i>").concat(f.launchName, "</i>\n          ");
            if (f.commentsTruncated) {
                hover += "\n            <br /><br />".concat(f.commentsTruncated, "\n          ");
            }
            return hover;
        }),
        hovertemplate: "%{text}"
    };
    return /*#__PURE__*/ (0,jsx_runtime.jsx)(Plot, {
        data: [
            data
        ],
        className: "w-full h-[600px]",
        useResizeHandler: true,
        style: {
            width: "100%"
        },
        layout: {
            legend: {
                orientation: "h"
            },
            margin: {
                r: 0,
                l: 30,
                t: 30,
                pad: 0
            }
        },
        config: {
            displayModeBar: false,
            displaylogo: false
        }
    });
}

;// CONCATENATED MODULE: ./app/flying/components/hoursByYear.react.tsx
/* __next_internal_client_entry_do_not_use__ HoursByYear auto */ 

const hoursByYear_react_Plot = app_dynamic_default()(()=>Promise.all(/* import() */[__webpack_require__.e(231), __webpack_require__.e(531)]).then(__webpack_require__.bind(__webpack_require__, 6403)), {
    loadableGenerated: {
        webpack: ()=>[
                /*require.resolve*/(6403)
            ]
    },
    ssr: false
});
function HoursByYear(props) {
    const { flights  } = props;
    // Grouping data by year and location
    const groupedData = {};
    flights.forEach((f)=>{
        var _f_location;
        const location = (_f_location = f.location) !== null && _f_location !== void 0 ? _f_location : "Unknown";
        const year = new Date(f.date).getFullYear();
        if (!groupedData[year]) {
            groupedData[year] = {};
        }
        if (!groupedData[year][location]) {
            groupedData[year][location] = 0;
        }
        var _f_durationSeconds;
        // Seconds to hours
        groupedData[year][location] += ((_f_durationSeconds = f.durationSeconds) !== null && _f_durationSeconds !== void 0 ? _f_durationSeconds : 0) / 60 / 60;
    });
    // Extracting years and locations
    const years = Object.keys(groupedData).map((year)=>parseInt(year)).sort();
    var _entry_location;
    const locations = Array.from(new Set(flights.map((entry)=>(_entry_location = entry.location) !== null && _entry_location !== void 0 ? _entry_location : "Unknown")));
    // Creating data series
    const series = locations.map((location)=>({
            x: years,
            y: years.map((year)=>groupedData[year][location] || 0),
            type: "bar",
            name: location
        }));
    const layout = {
        barmode: "stack",
        yaxis: {
            title: "Duration (hrs)",
            tickformat: "d"
        },
        height: 400,
        legend: {
            orientation: "h",
            font: {
                size: 9
            }
        },
        margin: {
            r: 0,
            l: 40,
            t: 30,
            pad: 0
        }
    };
    const config = {
        displayModeBar: false,
        displaylogo: false
    };
    return /*#__PURE__*/ (0,jsx_runtime.jsx)(hoursByYear_react_Plot, {
        className: "w-full h-[400px]",
        data: series,
        layout: layout,
        config: config,
        useResizeHandler: true
    });
}

// EXTERNAL MODULE: ./node_modules/tailwind-styled-components/dist/tailwind-styled-components.esm.js + 11 modules
var tailwind_styled_components_esm = __webpack_require__(1847);
// EXTERNAL MODULE: ./node_modules/next/dist/compiled/react/index.js
var react = __webpack_require__(6006);
;// CONCATENATED MODULE: ./app/flying/components/hoursBySite.react.tsx
/* __next_internal_client_entry_do_not_use__ default auto */ 


const hoursBySite_react_Plot = app_dynamic_default()(()=>Promise.all(/* import() */[__webpack_require__.e(231), __webpack_require__.e(531)]).then(__webpack_require__.bind(__webpack_require__, 6403)), {
    loadableGenerated: {
        webpack: ()=>[
                /*require.resolve*/(6403)
            ]
    },
    ssr: false
});
function HoursBySite(props) {
    const { flights  } = props;
    // Grouping data by location and year
    const groupedData = {};
    const timeByLocation = {};
    flights.forEach((f)=>{
        var _f_location;
        const location = (_f_location = f.location) !== null && _f_location !== void 0 ? _f_location : "Unknown";
        const year = new Date(f.date).getFullYear();
        if (!groupedData[location]) {
            groupedData[location] = {};
            timeByLocation[location] = 0;
        }
        if (!groupedData[location][year]) {
            groupedData[location][year] = 0;
        }
        var _f_durationSeconds;
        // Seconds to hours
        const hrs = ((_f_durationSeconds = f.durationSeconds) !== null && _f_durationSeconds !== void 0 ? _f_durationSeconds : 0) / 60 / 60;
        groupedData[location][year] += hrs;
        timeByLocation[location] += hrs;
    });
    // Extracting locations and years
    const locations = Object.keys(groupedData);
    locations.sort((a, b)=>{
        return timeByLocation[b] - timeByLocation[a];
    });
    const years = Array.from(new Set(flights.map((entry)=>new Date(entry.date).getFullYear()))).sort();
    // Creating data series
    const series = years.map((year)=>({
            x: locations,
            y: locations.map((location)=>groupedData[location][year] || 0),
            type: "bar",
            name: year.toString()
        }));
    const layout = {
        barmode: "stack",
        yaxis: {
            title: "Duration (hrs)",
            tickformat: "d"
        },
        xaxis: {
            tickangle: -45
        },
        legend: {
            orientation: "h",
            font: {
                size: 9
            },
            yanchor: "bottom",
            y: 130,
            xanchor: "center"
        },
        margin: {
            r: 0,
            l: 40,
            t: 30,
            b: 100,
            pad: 0
        }
    };
    const config = {
        displayModeBar: false,
        displaylogo: false
    };
    return /*#__PURE__*/ (0,jsx_runtime.jsx)(hoursBySite_react_Plot, {
        className: "w-full h-[400px]",
        data: series,
        layout: layout,
        config: config,
        useResizeHandler: true
    });
}

;// CONCATENATED MODULE: ./app/flying/components/flightGraphs.react.tsx
/* __next_internal_client_entry_do_not_use__ default auto */ 
function _templateObject() {
    const data = (0,_tagged_template_literal._)([
        "\n  active\n  border-b-2\n  border-blue-600\n  dark:border-blue-500\n  dark:text-blue-500\n  inline-block\n  p-4\n  rounded-t-lg\n  text-blue-600 \n"
    ]);
    _templateObject = function() {
        return data;
    };
    return data;
}
function _templateObject1() {
    const data = (0,_tagged_template_literal._)([
        "\n  border-b-2\n  border-transparent\n  dark:hover:text-gray-300\n  hover:border-gray-300\n  hover:text-gray-600\n  inline-block\n  p-4\n  rounded-t-lg\n"
    ]);
    _templateObject1 = function() {
        return data;
    };
    return data;
}






const SelectedA = tailwind_styled_components_esm/* default */.Z.a(_templateObject());
const UnselectedA = tailwind_styled_components_esm/* default */.Z.a(_templateObject1());
function TabItem(props) {
    const { title  } = props;
    const selected = props.selected == props.title;
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)("li", {
        className: "mr-2",
        children: [
            selected && /*#__PURE__*/ (0,jsx_runtime.jsx)(SelectedA, {
                "aria-current": "page",
                children: title
            }),
            !selected && /*#__PURE__*/ (0,jsx_runtime.jsx)(UnselectedA, {
                onClick: ()=>props.setSelected(title),
                children: title
            })
        ]
    });
}
function FlightGraphs(props) {
    const { flights  } = props;
    const [selected, setSelected] = (0,react.useState)("Flights");
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
        className: "max-w-full text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700 mb-4",
        children: [
            /*#__PURE__*/ (0,jsx_runtime.jsxs)("ul", {
                className: "flex flex-wrap -mb-px",
                children: [
                    /*#__PURE__*/ (0,jsx_runtime.jsx)(TabItem, {
                        selected: selected,
                        setSelected: setSelected,
                        title: "Flights"
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsx)(TabItem, {
                        selected: selected,
                        setSelected: setSelected,
                        title: "By Year"
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsx)(TabItem, {
                        selected: selected,
                        setSelected: setSelected,
                        title: "By Location"
                    })
                ]
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                className: "min-h-[600px]",
                children: [
                    selected == "Flights" && /*#__PURE__*/ (0,jsx_runtime.jsx)(ScatterPlot, {
                        flights: flights
                    }),
                    selected == "By Year" && /*#__PURE__*/ (0,jsx_runtime.jsx)(HoursByYear, {
                        flights: flights
                    }),
                    selected == "By Location" && /*#__PURE__*/ (0,jsx_runtime.jsx)(HoursBySite, {
                        flights: flights
                    })
                ]
            })
        ]
    });
}


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, [920,550,253,488,744], function() { return __webpack_exec__(334); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ _N_E = __webpack_exports__;
/******/ }
]);