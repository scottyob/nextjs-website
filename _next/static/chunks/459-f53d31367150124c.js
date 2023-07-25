(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([[459],{

/***/ 6768:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const MANUFACTURERS = __webpack_require__(1031);

module.exports = function lookup(id) {
  let short = id.length === 1;

  id = id.toUpperCase();

  let manufacturers = MANUFACTURERS.filter(it => it[short ? 'short' : 'long'] === id);
  return manufacturers.length !== 0 ? manufacturers[0].name : id;
};


/***/ }),

/***/ 3697:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var lookupManufacturer = __webpack_require__(6768);
var ONE_HOUR = 60 * 60 * 1000;
var ONE_DAY = 24 * 60 * 60 * 1000;
/* tslint:disable:max-line-length */
var RE_A = /^A(\w{3})(\w{3,}?)(?:FLIGHT:(\d+)|\:(.+))?$/;
var RE_HFDTE = /^HFDTE(?:DATE:)?(\d{2})(\d{2})(\d{2})(?:,?(\d{2}))?/;
var RE_PLT_HEADER = /^H(\w)PLT(?:.{0,}?:(.*)|(.*))$/;
var RE_CM2_HEADER = /^H(\w)CM2(?:.{0,}?:(.*)|(.*))$/; // P is used by some broken Flarms
var RE_GTY_HEADER = /^H(\w)GTY(?:.{0,}?:(.*)|(.*))$/;
var RE_GID_HEADER = /^H(\w)GID(?:.{0,}?:(.*)|(.*))$/;
var RE_CID_HEADER = /^H(\w)CID(?:.{0,}?:(.*)|(.*))$/;
var RE_CCL_HEADER = /^H(\w)CCL(?:.{0,}?:(.*)|(.*))$/;
var RE_SIT_HEADER = /^H(\w)SIT(?:.{0,}?:(.*)|(.*))$/;
var RE_FTY_HEADER = /^H(\w)FTY(?:.{0,}?:(.*)|(.*))$/;
var RE_RFW_HEADER = /^H(\w)RFW(?:.{0,}?:(.*)|(.*))$/;
var RE_RHW_HEADER = /^H(\w)RHW(?:.{0,}?:(.*)|(.*))$/;
var RE_B = /^B(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})(\d{3})([NS])(\d{3})(\d{2})(\d{3})([EW])([AV])(-\d{4}|\d{5})(-\d{4}|\d{5})/;
var RE_K = /^K(\d{2})(\d{2})(\d{2})/;
var RE_IJ = /^[IJ](\d{2})(?:\d{2}\d{2}[A-Z]{3})+/;
var RE_TASK = /^C(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})(\d{4})([-\d]{2})(.*)/;
var RE_TASKPOINT = /^C(\d{2})(\d{2})(\d{3})([NS])(\d{3})(\d{2})(\d{3})([EW])(.*)/;
/* tslint:enable:max-line-length */
var VALID_DATA_SOURCES = ['F', 'O', 'P'];
var IGCParser = /** @class */ (function () {
    function IGCParser(options) {
        if (options === void 0) { options = {}; }
        this._result = {
            numFlight: null,
            pilot: null,
            copilot: null,
            gliderType: null,
            registration: null,
            callsign: null,
            competitionClass: null,
            loggerType: null,
            firmwareVersion: null,
            hardwareVersion: null,
            task: null,
            fixes: [],
            dataRecords: [],
            security: null,
            errors: [],
        };
        this.fixExtensions = [];
        this.dataExtensions = [];
        this.lineNumber = 0;
        this.prevTimestamp = null;
        this.options = options;
    }
    IGCParser.parse = function (str, options) {
        if (options === void 0) { options = {}; }
        var parser = new IGCParser(options);
        var errors = [];
        for (var _i = 0, _a = str.split('\n'); _i < _a.length; _i++) {
            var line = _a[_i];
            try {
                parser.processLine(line.trim());
            }
            catch (error) {
                if (options.lenient) {
                    errors.push(error);
                }
                else {
                    throw error;
                }
            }
        }
        var result = parser.result;
        result.errors = errors;
        return result;
    };
    Object.defineProperty(IGCParser.prototype, "result", {
        get: function () {
            if (!this._result.loggerManufacturer) {
                throw new Error("Missing A record");
            }
            if (!this._result.date) {
                throw new Error("Missing HFDTE record");
            }
            return this._result;
        },
        enumerable: false,
        configurable: true
    });
    IGCParser.prototype.processLine = function (line) {
        this.lineNumber += 1;
        var recordType = line[0];
        if (recordType === 'B') {
            var fix = this.parseBRecord(line);
            this.prevTimestamp = fix.timestamp;
            this._result.fixes.push(fix);
        }
        else if (recordType === 'K') {
            var data = this.parseKRecord(line);
            this.prevTimestamp = data.timestamp;
            this._result.dataRecords.push(data);
        }
        else if (recordType === 'H') {
            this.processHeader(line);
        }
        else if (recordType === 'C') {
            this.processTaskLine(line);
        }
        else if (recordType === 'A') {
            var record = this.parseARecord(line);
            this._result.loggerId = record.loggerId;
            this._result.loggerManufacturer = record.manufacturer;
            if (record.numFlight !== null) {
                this._result.numFlight = record.numFlight;
            }
        }
        else if (recordType === 'I') {
            this.fixExtensions = this.parseIJRecord(line);
        }
        else if (recordType === 'J') {
            this.dataExtensions = this.parseIJRecord(line);
        }
        else if (recordType === 'G') {
            this._result.security = (this._result.security || '') + line.slice(1);
        }
    };
    IGCParser.prototype.processHeader = function (line) {
        var headerType = line.slice(2, 5);
        if (headerType === 'DTE') {
            var record = this.parseDateHeader(line);
            this._result.date = record.date;
            if (record.numFlight !== null) {
                this._result.numFlight = record.numFlight;
            }
        }
        else if (headerType === 'PLT') {
            this._result.pilot = this.parsePilot(line);
        }
        else if (headerType === 'CM2') {
            this._result.copilot = this.parseCopilot(line);
        }
        else if (headerType === 'GTY') {
            this._result.gliderType = this.parseGliderType(line);
        }
        else if (headerType === 'GID') {
            this._result.registration = this.parseRegistration(line);
        }
        else if (headerType === 'CID') {
            this._result.callsign = this.parseCallsign(line);
        }
        else if (headerType === 'CCL') {
            this._result.competitionClass = this.parseCompetitionClass(line);
        }
        else if (headerType === 'SIT') {
            this._result.site = this.parseSite(line);
        }
        else if (headerType === 'FTY') {
            this._result.loggerType = this.parseLoggerType(line);
        }
        else if (headerType === 'RFW') {
            this._result.firmwareVersion = this.parseFirmwareVersion(line);
        }
        else if (headerType === 'RHW') {
            this._result.hardwareVersion = this.parseHardwareVersion(line);
        }
    };
    IGCParser.prototype.parseARecord = function (line) {
        var match = line.match(RE_A);
        if (match) {
            var manufacturer = lookupManufacturer(match[1]);
            var loggerId = match[2];
            var numFlight = match[3] ? parseInt(match[3], 10) : null;
            var additionalData = match[4] || null;
            return { manufacturer: manufacturer, loggerId: loggerId, numFlight: numFlight, additionalData: additionalData };
        }
        match = line.match(/^A(\w{3})(.+)?$/);
        if (match) {
            var manufacturer = lookupManufacturer(match[1]);
            var additionalData = match[2] ? match[2].trim() : null;
            return { manufacturer: manufacturer, loggerId: null, numFlight: null, additionalData: additionalData };
        }
        throw new Error("Invalid A record at line " + this.lineNumber + ": " + line);
    };
    IGCParser.prototype.parseDateHeader = function (line) {
        var match = line.match(RE_HFDTE);
        if (!match) {
            throw new Error("Invalid DTE header at line " + this.lineNumber + ": " + line);
        }
        var lastCentury = match[3][0] === '8' || match[3][0] === '9';
        var date = "" + (lastCentury ? '19' : '20') + match[3] + "-" + match[2] + "-" + match[1];
        var numFlight = match[4] ? parseInt(match[4], 10) : null;
        return { date: date, numFlight: numFlight };
    };
    IGCParser.prototype.parseTextHeader = function (headerType, regex, line, underscoreReplacement) {
        if (underscoreReplacement === void 0) { underscoreReplacement = ' '; }
        var match = line.match(regex);
        if (!match) {
            throw new Error("Invalid " + headerType + " header at line " + this.lineNumber + ": " + line);
        }
        var dataSource = match[1];
        if (VALID_DATA_SOURCES.indexOf(dataSource) === -1 && !this.options.lenient) {
            throw new Error("Invalid data source at line " + this.lineNumber + ": " + dataSource);
        }
        return (match[2] || match[3] || '').replace(/_/g, underscoreReplacement).trim();
    };
    IGCParser.prototype.parsePilot = function (line) {
        return this.parseTextHeader('PLT', RE_PLT_HEADER, line);
    };
    IGCParser.prototype.parseCopilot = function (line) {
        return this.parseTextHeader('CM2', RE_CM2_HEADER, line);
    };
    IGCParser.prototype.parseGliderType = function (line) {
        return this.parseTextHeader('GTY', RE_GTY_HEADER, line);
    };
    IGCParser.prototype.parseRegistration = function (line) {
        return this.parseTextHeader('GID', RE_GID_HEADER, line, '-');
    };
    IGCParser.prototype.parseCallsign = function (line) {
        return this.parseTextHeader('GTY', RE_CID_HEADER, line);
    };
    IGCParser.prototype.parseCompetitionClass = function (line) {
        return this.parseTextHeader('GID', RE_CCL_HEADER, line);
    };
    IGCParser.prototype.parseSite = function (line) {
        return this.parseTextHeader('SIT', RE_SIT_HEADER, line);
    };
    IGCParser.prototype.parseLoggerType = function (line) {
        return this.parseTextHeader('FTY', RE_FTY_HEADER, line);
    };
    IGCParser.prototype.parseFirmwareVersion = function (line) {
        return this.parseTextHeader('RFW', RE_RFW_HEADER, line);
    };
    IGCParser.prototype.parseHardwareVersion = function (line) {
        return this.parseTextHeader('RHW', RE_RHW_HEADER, line);
    };
    IGCParser.prototype.processTaskLine = function (line) {
        if (!this._result.task) {
            this._result.task = this.parseTask(line);
        }
        else {
            this._result.task.points.push(this.parseTaskPoint(line));
        }
    };
    IGCParser.prototype.parseTask = function (line) {
        var match = line.match(RE_TASK);
        if (!match) {
            throw new Error("Invalid task declaration at line " + this.lineNumber + ": " + line);
        }
        var lastCentury = match[3][0] === '8' || match[3][0] === '9';
        var declarationDate = "" + (lastCentury ? '19' : '20') + match[3] + "-" + match[2] + "-" + match[1];
        var declarationTime = match[4] + ":" + match[5] + ":" + match[6];
        var declarationTimestamp = Date.parse(declarationDate + "T" + declarationTime + "Z");
        var flightDate = null;
        if (match[7] !== '00' || match[8] !== '00' || match[9] !== '00') {
            lastCentury = match[9][0] === '8' || match[9][0] === '9';
            flightDate = "" + (lastCentury ? '19' : '20') + match[9] + "-" + match[8] + "-" + match[7];
        }
        var taskNumber = (match[10] !== '0000') ? parseInt(match[10], 10) : null;
        var numTurnpoints = parseInt(match[11], 10);
        var comment = match[12] || null;
        return {
            declarationDate: declarationDate,
            declarationTime: declarationTime,
            declarationTimestamp: declarationTimestamp,
            flightDate: flightDate,
            taskNumber: taskNumber,
            numTurnpoints: numTurnpoints,
            comment: comment,
            points: [],
        };
    };
    IGCParser.prototype.parseTaskPoint = function (line) {
        var match = line.match(RE_TASKPOINT);
        if (!match) {
            throw new Error("Invalid task point declaration at line " + this.lineNumber + ": " + line);
        }
        var latitude = IGCParser.parseLatitude(match[1], match[2], match[3], match[4]);
        var longitude = IGCParser.parseLongitude(match[5], match[6], match[7], match[8]);
        var name = match[9] || null;
        return { latitude: latitude, longitude: longitude, name: name };
    };
    IGCParser.prototype.parseBRecord = function (line) {
        if (!this._result.date) {
            throw new Error("Missing HFDTE record before first B record");
        }
        var match = line.match(RE_B);
        if (!match) {
            throw new Error("Invalid B record at line " + this.lineNumber + ": " + line);
        }
        var time = match[1] + ":" + match[2] + ":" + match[3];
        var timestamp = this.calcTimestamp(time);
        var latitude = IGCParser.parseLatitude(match[4], match[5], match[6], match[7]);
        var longitude = IGCParser.parseLongitude(match[8], match[9], match[10], match[11]);
        var valid = match[12] === 'A';
        var pressureAltitude = match[13] === '00000' ? null : parseInt(match[13], 10);
        var gpsAltitude = match[14] === '00000' ? null : parseInt(match[14], 10);
        var extensions = {};
        if (this.fixExtensions) {
            for (var _i = 0, _a = this.fixExtensions; _i < _a.length; _i++) {
                var _b = _a[_i], code = _b.code, start = _b.start, length = _b.length;
                extensions[code] = line.slice(start, start + length);
            }
        }
        var enl = null;
        if (extensions['ENL']) {
            var enlLength = this.fixExtensions.filter(function (it) { return it.code === 'ENL'; })[0].length;
            var enlMax = Math.pow(10, enlLength);
            enl = parseInt(extensions['ENL'], 10) / enlMax;
        }
        var fixAccuracy = extensions['FXA'] ? parseInt(extensions['FXA'], 10) : null;
        return {
            timestamp: timestamp,
            time: time,
            latitude: latitude,
            longitude: longitude,
            valid: valid,
            pressureAltitude: pressureAltitude,
            gpsAltitude: gpsAltitude,
            extensions: extensions,
            enl: enl,
            fixAccuracy: fixAccuracy,
        };
    };
    IGCParser.prototype.parseKRecord = function (line) {
        if (!this._result.date) {
            throw new Error("Missing HFDTE record before first K record");
        }
        if (!this.dataExtensions) {
            throw new Error("Missing J record before first K record");
        }
        var match = line.match(RE_K);
        if (!match) {
            throw new Error("Invalid K record at line " + this.lineNumber + ": " + line);
        }
        var time = match[1] + ":" + match[2] + ":" + match[3];
        var timestamp = this.calcTimestamp(time);
        var extensions = {};
        if (this.dataExtensions) {
            for (var _i = 0, _a = this.dataExtensions; _i < _a.length; _i++) {
                var _b = _a[_i], code = _b.code, start = _b.start, length = _b.length;
                extensions[code] = line.slice(start, start + length);
            }
        }
        return { timestamp: timestamp, time: time, extensions: extensions };
    };
    IGCParser.prototype.parseIJRecord = function (line) {
        var match = line.match(RE_IJ);
        if (!match) {
            throw new Error("Invalid " + line[0] + " record at line " + this.lineNumber + ": " + line);
        }
        var num = parseInt(match[1], 10);
        if (line.length < 3 + num * 7) {
            throw new Error("Invalid " + line[0] + " record at line " + this.lineNumber + ": " + line);
        }
        var extensions = new Array(num);
        for (var i = 0; i < num; i++) {
            var offset = 3 + i * 7;
            var start = parseInt(line.slice(offset, offset + 2), 10) - 1;
            var end = parseInt(line.slice(offset + 2, offset + 4), 10) - 1;
            var length = end - start + 1;
            var code = line.slice(offset + 4, offset + 7);
            extensions[i] = { start: start, length: length, code: code };
        }
        return extensions;
    };
    IGCParser.parseLatitude = function (dd, mm, mmm, ns) {
        var degrees = parseInt(dd, 10) + parseFloat(mm + "." + mmm) / 60;
        return (ns === 'S') ? -degrees : degrees;
    };
    IGCParser.parseLongitude = function (ddd, mm, mmm, ew) {
        var degrees = parseInt(ddd, 10) + parseFloat(mm + "." + mmm) / 60;
        return (ew === 'W') ? -degrees : degrees;
    };
    /**
     * Figures out a Unix timestamp in milliseconds based on the
     * date header value, the time field in the current record and
     * the previous timestamp.
     */
    IGCParser.prototype.calcTimestamp = function (time) {
        var timestamp = Date.parse(this._result.date + "T" + time + "Z");
        // allow timestamps one hour before the previous timestamp,
        // otherwise we assume the next day is meant
        while (this.prevTimestamp && timestamp < this.prevTimestamp - ONE_HOUR) {
            timestamp += ONE_DAY;
        }
        return timestamp;
    };
    return IGCParser;
}());
module.exports = IGCParser;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 2040:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var _global_process, _global_process1;
module.exports = ((_global_process = __webpack_require__.g.process) == null ? void 0 : _global_process.env) && typeof ((_global_process1 = __webpack_require__.g.process) == null ? void 0 : _global_process1.env) === "object" ? __webpack_require__.g.process : __webpack_require__(6003);

//# sourceMappingURL=process.js.map

/***/ }),

/***/ 6003:
/***/ (function(module) {

var __dirname = "/";
(function(){var e={229:function(e){var t=e.exports={};var r;var n;function defaultSetTimout(){throw new Error("setTimeout has not been defined")}function defaultClearTimeout(){throw new Error("clearTimeout has not been defined")}(function(){try{if(typeof setTimeout==="function"){r=setTimeout}else{r=defaultSetTimout}}catch(e){r=defaultSetTimout}try{if(typeof clearTimeout==="function"){n=clearTimeout}else{n=defaultClearTimeout}}catch(e){n=defaultClearTimeout}})();function runTimeout(e){if(r===setTimeout){return setTimeout(e,0)}if((r===defaultSetTimout||!r)&&setTimeout){r=setTimeout;return setTimeout(e,0)}try{return r(e,0)}catch(t){try{return r.call(null,e,0)}catch(t){return r.call(this,e,0)}}}function runClearTimeout(e){if(n===clearTimeout){return clearTimeout(e)}if((n===defaultClearTimeout||!n)&&clearTimeout){n=clearTimeout;return clearTimeout(e)}try{return n(e)}catch(t){try{return n.call(null,e)}catch(t){return n.call(this,e)}}}var i=[];var o=false;var u;var a=-1;function cleanUpNextTick(){if(!o||!u){return}o=false;if(u.length){i=u.concat(i)}else{a=-1}if(i.length){drainQueue()}}function drainQueue(){if(o){return}var e=runTimeout(cleanUpNextTick);o=true;var t=i.length;while(t){u=i;i=[];while(++a<t){if(u){u[a].run()}}a=-1;t=i.length}u=null;o=false;runClearTimeout(e)}t.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1){for(var r=1;r<arguments.length;r++){t[r-1]=arguments[r]}}i.push(new Item(e,t));if(i.length===1&&!o){runTimeout(drainQueue)}};function Item(e,t){this.fun=e;this.array=t}Item.prototype.run=function(){this.fun.apply(null,this.array)};t.title="browser";t.browser=true;t.env={};t.argv=[];t.version="";t.versions={};function noop(){}t.on=noop;t.addListener=noop;t.once=noop;t.off=noop;t.removeListener=noop;t.removeAllListeners=noop;t.emit=noop;t.prependListener=noop;t.prependOnceListener=noop;t.listeners=function(e){return[]};t.binding=function(e){throw new Error("process.binding is not supported")};t.cwd=function(){return"/"};t.chdir=function(e){throw new Error("process.chdir is not supported")};t.umask=function(){return 0}}};var t={};function __nccwpck_require__(r){var n=t[r];if(n!==undefined){return n.exports}var i=t[r]={exports:{}};var o=true;try{e[r](i,i.exports,__nccwpck_require__);o=false}finally{if(o)delete t[r]}return i.exports}if(typeof __nccwpck_require__!=="undefined")__nccwpck_require__.ab=__dirname+"/";var r=__nccwpck_require__(229);module.exports=r})();

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

/***/ 1567:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  mh: function() { return /* reexport */ components_layer; },
  Hw: function() { return /* reexport */ source; },
  ZP: function() { return /* binding */ exports_maplibre; }
});

// UNUSED EXPORTS: AttributionControl, FullscreenControl, GeolocateControl, Map, MapProvider, Marker, NavigationControl, Popup, ScaleControl, useControl, useMap

// EXTERNAL MODULE: ./node_modules/next/dist/compiled/react/index.js
var react = __webpack_require__(6006);
;// CONCATENATED MODULE: ./node_modules/react-map-gl/dist/esm/components/use-map.js



const MountedMapsContext = react.createContext(null);
const MapProvider = props => {
    const [maps, setMaps] = useState({});
    const onMapMount = useCallback((map, id = 'default') => {
        setMaps(currMaps => {
            if (id === 'current') {
                throw new Error("'current' cannot be used as map id");
            }
            if (currMaps[id]) {
                throw new Error(`Multiple maps with the same id: ${id}`);
            }
            return { ...currMaps, [id]: map };
        });
    }, []);
    const onMapUnmount = useCallback((id = 'default') => {
        setMaps(currMaps => {
            if (currMaps[id]) {
                const nextMaps = { ...currMaps };
                delete nextMaps[id];
                return nextMaps;
            }
            return currMaps;
        });
    }, []);
    return (React.createElement(MountedMapsContext.Provider, { value: {
            maps,
            onMapMount,
            onMapUnmount
        } }, props.children));
};
function useMap() {
    var _a;
    const maps = (_a = useContext(MountedMapsContext)) === null || _a === void 0 ? void 0 : _a.maps;
    const currentMap = useContext(MapContext);
    const mapsWithCurrent = useMemo(() => {
        return { ...maps, current: currentMap === null || currentMap === void 0 ? void 0 : currentMap.map };
    }, [maps, currentMap]);
    return mapsWithCurrent;
}
//# sourceMappingURL=use-map.js.map
;// CONCATENATED MODULE: ./node_modules/react-map-gl/dist/esm/utils/deep-equal.js
/**
 * Compare two points
 * @param a
 * @param b
 * @returns true if the points are equal
 */
function arePointsEqual(a, b) {
    const ax = Array.isArray(a) ? a[0] : a ? a.x : 0;
    const ay = Array.isArray(a) ? a[1] : a ? a.y : 0;
    const bx = Array.isArray(b) ? b[0] : b ? b.x : 0;
    const by = Array.isArray(b) ? b[1] : b ? b.y : 0;
    return ax === bx && ay === by;
}
/* eslint-disable complexity */
/**
 * Compare any two objects
 * @param a
 * @param b
 * @returns true if the objects are deep equal
 */
function deepEqual(a, b) {
    if (a === b) {
        return true;
    }
    if (!a || !b) {
        return false;
    }
    if (Array.isArray(a)) {
        if (!Array.isArray(b) || a.length !== b.length) {
            return false;
        }
        for (let i = 0; i < a.length; i++) {
            if (!deepEqual(a[i], b[i])) {
                return false;
            }
        }
        return true;
    }
    else if (Array.isArray(b)) {
        return false;
    }
    if (typeof a === 'object' && typeof b === 'object') {
        const aKeys = Object.keys(a);
        const bKeys = Object.keys(b);
        if (aKeys.length !== bKeys.length) {
            return false;
        }
        for (const key of aKeys) {
            if (!b.hasOwnProperty(key)) {
                return false;
            }
            if (!deepEqual(a[key], b[key])) {
                return false;
            }
        }
        return true;
    }
    return false;
}
//# sourceMappingURL=deep-equal.js.map
;// CONCATENATED MODULE: ./node_modules/react-map-gl/dist/esm/utils/transform.js

/**
 * Make a copy of a transform
 * @param tr
 */
function cloneTransform(tr) {
    const newTransform = tr.clone();
    // Work around mapbox bug - this value is not assigned in clone(), only in resize()
    newTransform.pixelsToGLUnits = tr.pixelsToGLUnits;
    return newTransform;
}
/**
 * Copy projection from one transform to another. This only applies to mapbox-gl transforms
 * @param src the transform to copy projection settings from
 * @param dest to transform to copy projection settings to
 */
function syncProjection(src, dest) {
    if (!src.getProjection) {
        return;
    }
    const srcProjection = src.getProjection();
    const destProjection = dest.getProjection();
    if (!deepEqual(srcProjection, destProjection)) {
        dest.setProjection(srcProjection);
    }
}
/**
 * Capture a transform's current state
 * @param transform
 * @returns descriptor of the view state
 */
function transformToViewState(tr) {
    return {
        longitude: tr.center.lng,
        latitude: tr.center.lat,
        zoom: tr.zoom,
        pitch: tr.pitch,
        bearing: tr.bearing,
        padding: tr.padding
    };
}
/* eslint-disable complexity */
/**
 * Mutate a transform to match the given view state
 * @param transform
 * @param viewState
 * @returns true if the transform has changed
 */
function applyViewStateToTransform(tr, props) {
    const v = props.viewState || props;
    let changed = false;
    if ('longitude' in v && 'latitude' in v) {
        const center = tr.center;
        // @ts-ignore
        tr.center = new center.constructor(v.longitude, v.latitude);
        changed = changed || center !== tr.center;
    }
    if ('zoom' in v) {
        const zoom = tr.zoom;
        tr.zoom = v.zoom;
        changed = changed || zoom !== tr.zoom;
    }
    if ('bearing' in v) {
        const bearing = tr.bearing;
        tr.bearing = v.bearing;
        changed = changed || bearing !== tr.bearing;
    }
    if ('pitch' in v) {
        const pitch = tr.pitch;
        tr.pitch = v.pitch;
        changed = changed || pitch !== tr.pitch;
    }
    if (v.padding && !tr.isPaddingEqual(v.padding)) {
        changed = true;
        tr.padding = v.padding;
    }
    return changed;
}
//# sourceMappingURL=transform.js.map
;// CONCATENATED MODULE: ./node_modules/react-map-gl/dist/esm/utils/style-utils.js
const refProps = ['type', 'source', 'source-layer', 'minzoom', 'maxzoom', 'filter', 'layout'];
// Prepare a map style object for diffing
// If immutable - convert to plain object
// Work around some issues in older styles that would fail Mapbox's diffing
function normalizeStyle(style) {
    if (!style) {
        return null;
    }
    if (typeof style === 'string') {
        return style;
    }
    if ('toJS' in style) {
        style = style.toJS();
    }
    if (!style.layers) {
        return style;
    }
    const layerIndex = {};
    for (const layer of style.layers) {
        layerIndex[layer.id] = layer;
    }
    const layers = style.layers.map(layer => {
        let normalizedLayer = null;
        if ('interactive' in layer) {
            normalizedLayer = Object.assign({}, layer);
            // Breaks style diffing :(
            // @ts-ignore legacy field not typed
            delete normalizedLayer.interactive;
        }
        // Style diffing doesn't work with refs so expand them out manually before diffing.
        // @ts-ignore legacy field not typed
        const layerRef = layerIndex[layer.ref];
        if (layerRef) {
            normalizedLayer = normalizedLayer || Object.assign({}, layer);
            // @ts-ignore
            delete normalizedLayer.ref;
            // https://github.com/mapbox/mapbox-gl-js/blob/master/src/style-spec/deref.js
            for (const propName of refProps) {
                if (propName in layerRef) {
                    normalizedLayer[propName] = layerRef[propName];
                }
            }
        }
        return normalizedLayer || layer;
    });
    // Do not mutate the style object provided by the user
    return { ...style, layers };
}
//# sourceMappingURL=style-utils.js.map
;// CONCATENATED MODULE: ./node_modules/react-map-gl/dist/esm/mapbox/mapbox.js
/* provided dependency */ var process = __webpack_require__(2040);



const DEFAULT_STYLE = { version: 8, sources: {}, layers: [] };
const pointerEvents = {
    mousedown: 'onMouseDown',
    mouseup: 'onMouseUp',
    mouseover: 'onMouseOver',
    mousemove: 'onMouseMove',
    click: 'onClick',
    dblclick: 'onDblClick',
    mouseenter: 'onMouseEnter',
    mouseleave: 'onMouseLeave',
    mouseout: 'onMouseOut',
    contextmenu: 'onContextMenu',
    touchstart: 'onTouchStart',
    touchend: 'onTouchEnd',
    touchmove: 'onTouchMove',
    touchcancel: 'onTouchCancel'
};
const cameraEvents = {
    movestart: 'onMoveStart',
    move: 'onMove',
    moveend: 'onMoveEnd',
    dragstart: 'onDragStart',
    drag: 'onDrag',
    dragend: 'onDragEnd',
    zoomstart: 'onZoomStart',
    zoom: 'onZoom',
    zoomend: 'onZoomEnd',
    rotatestart: 'onRotateStart',
    rotate: 'onRotate',
    rotateend: 'onRotateEnd',
    pitchstart: 'onPitchStart',
    pitch: 'onPitch',
    pitchend: 'onPitchEnd'
};
const otherEvents = {
    wheel: 'onWheel',
    boxzoomstart: 'onBoxZoomStart',
    boxzoomend: 'onBoxZoomEnd',
    boxzoomcancel: 'onBoxZoomCancel',
    resize: 'onResize',
    load: 'onLoad',
    render: 'onRender',
    idle: 'onIdle',
    remove: 'onRemove',
    data: 'onData',
    styledata: 'onStyleData',
    sourcedata: 'onSourceData',
    error: 'onError'
};
const settingNames = [
    'minZoom',
    'maxZoom',
    'minPitch',
    'maxPitch',
    'maxBounds',
    'projection',
    'renderWorldCopies'
];
const handlerNames = [
    'scrollZoom',
    'boxZoom',
    'dragRotate',
    'dragPan',
    'keyboard',
    'doubleClickZoom',
    'touchZoomRotate',
    'touchPitch'
];
/**
 * A wrapper for mapbox-gl's Map class
 */
class Mapbox {
    constructor(MapClass, props, container) {
        // mapboxgl.Map instance
        this._map = null;
        // Internal states
        this._internalUpdate = false;
        this._inRender = false;
        this._hoveredFeatures = null;
        this._deferredEvents = {
            move: false,
            zoom: false,
            pitch: false,
            rotate: false
        };
        this._onEvent = (e) => {
            // @ts-ignore
            const cb = this.props[otherEvents[e.type]];
            if (cb) {
                cb(e);
            }
            else if (e.type === 'error') {
                console.error(e.error); // eslint-disable-line
            }
        };
        this._onPointerEvent = (e) => {
            if (e.type === 'mousemove' || e.type === 'mouseout') {
                this._updateHover(e);
            }
            // @ts-ignore
            const cb = this.props[pointerEvents[e.type]];
            if (cb) {
                if (this.props.interactiveLayerIds && e.type !== 'mouseover' && e.type !== 'mouseout') {
                    e.features = this._hoveredFeatures || this._queryRenderedFeatures(e.point);
                }
                cb(e);
                delete e.features;
            }
        };
        this._onCameraEvent = (e) => {
            if (!this._internalUpdate) {
                // @ts-ignore
                const cb = this.props[cameraEvents[e.type]];
                if (cb) {
                    cb(e);
                }
            }
            if (e.type in this._deferredEvents) {
                this._deferredEvents[e.type] = false;
            }
        };
        this._MapClass = MapClass;
        this.props = props;
        this._initialize(container);
    }
    get map() {
        return this._map;
    }
    get transform() {
        return this._renderTransform;
    }
    setProps(props) {
        const oldProps = this.props;
        this.props = props;
        const settingsChanged = this._updateSettings(props, oldProps);
        if (settingsChanged) {
            this._createShadowTransform(this._map);
        }
        const sizeChanged = this._updateSize(props);
        const viewStateChanged = this._updateViewState(props, true);
        this._updateStyle(props, oldProps);
        this._updateStyleComponents(props, oldProps);
        this._updateHandlers(props, oldProps);
        // If 1) view state has changed to match props and
        //    2) the props change is not triggered by map events,
        // it's driven by an external state change. Redraw immediately
        if (settingsChanged || sizeChanged || (viewStateChanged && !this._map.isMoving())) {
            this.redraw();
        }
    }
    static reuse(props, container) {
        const that = Mapbox.savedMaps.pop();
        if (!that) {
            return null;
        }
        const map = that.map;
        // When reusing the saved map, we need to reparent the map(canvas) and other child nodes
        // intoto the new container from the props.
        // Step 1: reparenting child nodes from old container to new container
        const oldContainer = map.getContainer();
        container.className = oldContainer.className;
        while (oldContainer.childNodes.length > 0) {
            container.appendChild(oldContainer.childNodes[0]);
        }
        // Step 2: replace the internal container with new container from the react component
        // @ts-ignore
        map._container = container;
        // With maplibre-gl as mapLib, map uses ResizeObserver to observe when its container resizes.
        // When reusing the saved map, we need to disconnect the observer and observe the new container.
        // Step 3: telling the ResizeObserver to disconnect and observe the new container
        // @ts-ignore
        const resizeObserver = map._resizeObserver;
        if (resizeObserver) {
            resizeObserver.disconnect();
            resizeObserver.observe(container);
        }
        // Step 4: apply new props
        that.setProps({ ...props, styleDiffing: false });
        map.resize();
        const { initialViewState } = props;
        if (initialViewState) {
            if (initialViewState.bounds) {
                map.fitBounds(initialViewState.bounds, { ...initialViewState.fitBoundsOptions, duration: 0 });
            }
            else {
                that._updateViewState(initialViewState, false);
            }
        }
        // Simulate load event
        if (map.isStyleLoaded()) {
            map.fire('load');
        }
        else {
            map.once('styledata', () => map.fire('load'));
        }
        // Force reload
        // @ts-ignore
        map._update();
        return that;
    }
    /* eslint-disable complexity,max-statements */
    _initialize(container) {
        const { props } = this;
        const { mapStyle = DEFAULT_STYLE } = props;
        const mapOptions = {
            ...props,
            ...props.initialViewState,
            accessToken: props.mapboxAccessToken || getAccessTokenFromEnv() || null,
            container,
            style: normalizeStyle(mapStyle)
        };
        const viewState = mapOptions.initialViewState || mapOptions.viewState || mapOptions;
        Object.assign(mapOptions, {
            center: [viewState.longitude || 0, viewState.latitude || 0],
            zoom: viewState.zoom || 0,
            pitch: viewState.pitch || 0,
            bearing: viewState.bearing || 0
        });
        if (props.gl) {
            // eslint-disable-next-line
            const getContext = HTMLCanvasElement.prototype.getContext;
            // Hijack canvas.getContext to return our own WebGLContext
            // This will be called inside the mapboxgl.Map constructor
            // @ts-expect-error
            HTMLCanvasElement.prototype.getContext = () => {
                // Unhijack immediately
                HTMLCanvasElement.prototype.getContext = getContext;
                return props.gl;
            };
        }
        const map = new this._MapClass(mapOptions);
        // Props that are not part of constructor options
        if (viewState.padding) {
            map.setPadding(viewState.padding);
        }
        if (props.cursor) {
            map.getCanvas().style.cursor = props.cursor;
        }
        this._createShadowTransform(map);
        // Hack
        // Insert code into map's render cycle
        const renderMap = map._render;
        map._render = (arg) => {
            this._inRender = true;
            renderMap.call(map, arg);
            this._inRender = false;
        };
        const runRenderTaskQueue = map._renderTaskQueue.run;
        map._renderTaskQueue.run = (arg) => {
            runRenderTaskQueue.call(map._renderTaskQueue, arg);
            this._onBeforeRepaint();
        };
        map.on('render', () => this._onAfterRepaint());
        // Insert code into map's event pipeline
        // eslint-disable-next-line @typescript-eslint/unbound-method
        const fireEvent = map.fire;
        map.fire = this._fireEvent.bind(this, fireEvent);
        // add listeners
        map.on('resize', () => {
            this._renderTransform.resize(map.transform.width, map.transform.height);
        });
        map.on('styledata', () => {
            this._updateStyleComponents(this.props, {});
            // Projection can be set in stylesheet
            syncProjection(map.transform, this._renderTransform);
        });
        map.on('sourcedata', () => this._updateStyleComponents(this.props, {}));
        for (const eventName in pointerEvents) {
            map.on(eventName, this._onPointerEvent);
        }
        for (const eventName in cameraEvents) {
            map.on(eventName, this._onCameraEvent);
        }
        for (const eventName in otherEvents) {
            map.on(eventName, this._onEvent);
        }
        this._map = map;
    }
    /* eslint-enable complexity,max-statements */
    recycle() {
        // Clean up unnecessary elements before storing for reuse.
        const container = this.map.getContainer();
        const children = container.querySelector('[mapboxgl-children]');
        children === null || children === void 0 ? void 0 : children.remove();
        Mapbox.savedMaps.push(this);
    }
    destroy() {
        this._map.remove();
    }
    // Force redraw the map now. Typically resize() and jumpTo() is reflected in the next
    // render cycle, which is managed by Mapbox's animation loop.
    // This removes the synchronization issue caused by requestAnimationFrame.
    redraw() {
        const map = this._map;
        // map._render will throw error if style does not exist
        // https://github.com/mapbox/mapbox-gl-js/blob/fb9fc316da14e99ff4368f3e4faa3888fb43c513
        //   /src/ui/map.js#L1834
        if (!this._inRender && map.style) {
            // cancel the scheduled update
            if (map._frame) {
                map._frame.cancel();
                map._frame = null;
            }
            // the order is important - render() may schedule another update
            map._render();
        }
    }
    _createShadowTransform(map) {
        const renderTransform = cloneTransform(map.transform);
        map.painter.transform = renderTransform;
        this._renderTransform = renderTransform;
    }
    /* Trigger map resize if size is controlled
       @param {object} nextProps
       @returns {bool} true if size has changed
     */
    _updateSize(nextProps) {
        // Check if size is controlled
        const { viewState } = nextProps;
        if (viewState) {
            const map = this._map;
            if (viewState.width !== map.transform.width || viewState.height !== map.transform.height) {
                map.resize();
                return true;
            }
        }
        return false;
    }
    // Adapted from map.jumpTo
    /* Update camera to match props
       @param {object} nextProps
       @param {bool} triggerEvents - should fire camera events
       @returns {bool} true if anything is changed
     */
    _updateViewState(nextProps, triggerEvents) {
        if (this._internalUpdate) {
            return false;
        }
        const map = this._map;
        const tr = this._renderTransform;
        // Take a snapshot of the transform before mutation
        const { zoom, pitch, bearing } = tr;
        const isMoving = map.isMoving();
        if (isMoving) {
            // All movement of the camera is done relative to the sea level
            tr.cameraElevationReference = 'sea';
        }
        const changed = applyViewStateToTransform(tr, {
            ...transformToViewState(map.transform),
            ...nextProps
        });
        if (isMoving) {
            // Reset camera reference
            tr.cameraElevationReference = 'ground';
        }
        if (changed && triggerEvents) {
            const deferredEvents = this._deferredEvents;
            // Delay DOM control updates to the next render cycle
            deferredEvents.move = true;
            deferredEvents.zoom || (deferredEvents.zoom = zoom !== tr.zoom);
            deferredEvents.rotate || (deferredEvents.rotate = bearing !== tr.bearing);
            deferredEvents.pitch || (deferredEvents.pitch = pitch !== tr.pitch);
        }
        // Avoid manipulating the real transform when interaction/animation is ongoing
        // as it would interfere with Mapbox's handlers
        if (!isMoving) {
            applyViewStateToTransform(map.transform, nextProps);
        }
        return changed;
    }
    /* Update camera constraints and projection settings to match props
       @param {object} nextProps
       @param {object} currProps
       @returns {bool} true if anything is changed
     */
    _updateSettings(nextProps, currProps) {
        const map = this._map;
        let changed = false;
        for (const propName of settingNames) {
            if (propName in nextProps && !deepEqual(nextProps[propName], currProps[propName])) {
                changed = true;
                const setter = map[`set${propName[0].toUpperCase()}${propName.slice(1)}`];
                setter === null || setter === void 0 ? void 0 : setter.call(map, nextProps[propName]);
            }
        }
        return changed;
    }
    /* Update map style to match props
       @param {object} nextProps
       @param {object} currProps
       @returns {bool} true if style is changed
     */
    _updateStyle(nextProps, currProps) {
        if (nextProps.cursor !== currProps.cursor) {
            this._map.getCanvas().style.cursor = nextProps.cursor;
        }
        if (nextProps.mapStyle !== currProps.mapStyle) {
            const { mapStyle = DEFAULT_STYLE, styleDiffing = true } = nextProps;
            const options = {
                diff: styleDiffing
            };
            if ('localIdeographFontFamily' in nextProps) {
                // @ts-ignore Mapbox specific prop
                options.localIdeographFontFamily = nextProps.localIdeographFontFamily;
            }
            this._map.setStyle(normalizeStyle(mapStyle), options);
            return true;
        }
        return false;
    }
    /* Update fog, light and terrain to match props
       @param {object} nextProps
       @param {object} currProps
       @returns {bool} true if anything is changed
     */
    _updateStyleComponents(nextProps, currProps) {
        const map = this._map;
        let changed = false;
        if (map.isStyleLoaded()) {
            if ('light' in nextProps && map.setLight && !deepEqual(nextProps.light, currProps.light)) {
                changed = true;
                map.setLight(nextProps.light);
            }
            if ('fog' in nextProps && map.setFog && !deepEqual(nextProps.fog, currProps.fog)) {
                changed = true;
                map.setFog(nextProps.fog);
            }
            if ('terrain' in nextProps &&
                map.setTerrain &&
                !deepEqual(nextProps.terrain, currProps.terrain)) {
                if (!nextProps.terrain || map.getSource(nextProps.terrain.source)) {
                    changed = true;
                    map.setTerrain(nextProps.terrain);
                }
            }
        }
        return changed;
    }
    /* Update interaction handlers to match props
       @param {object} nextProps
       @param {object} currProps
       @returns {bool} true if anything is changed
     */
    _updateHandlers(nextProps, currProps) {
        var _a, _b;
        const map = this._map;
        let changed = false;
        for (const propName of handlerNames) {
            const newValue = (_a = nextProps[propName]) !== null && _a !== void 0 ? _a : true;
            const oldValue = (_b = currProps[propName]) !== null && _b !== void 0 ? _b : true;
            if (!deepEqual(newValue, oldValue)) {
                changed = true;
                if (newValue) {
                    map[propName].enable(newValue);
                }
                else {
                    map[propName].disable();
                }
            }
        }
        return changed;
    }
    _queryRenderedFeatures(point) {
        const map = this._map;
        const { interactiveLayerIds = [] } = this.props;
        try {
            return map.queryRenderedFeatures(point, {
                layers: interactiveLayerIds.filter(map.getLayer.bind(map))
            });
        }
        catch (_a) {
            // May fail if style is not loaded
            return [];
        }
    }
    _updateHover(e) {
        var _a;
        const { props } = this;
        const shouldTrackHoveredFeatures = props.interactiveLayerIds && (props.onMouseMove || props.onMouseEnter || props.onMouseLeave);
        if (shouldTrackHoveredFeatures) {
            const eventType = e.type;
            const wasHovering = ((_a = this._hoveredFeatures) === null || _a === void 0 ? void 0 : _a.length) > 0;
            const features = this._queryRenderedFeatures(e.point);
            const isHovering = features.length > 0;
            if (!isHovering && wasHovering) {
                e.type = 'mouseleave';
                this._onPointerEvent(e);
            }
            this._hoveredFeatures = features;
            if (isHovering && !wasHovering) {
                e.type = 'mouseenter';
                this._onPointerEvent(e);
            }
            e.type = eventType;
        }
        else {
            this._hoveredFeatures = null;
        }
    }
    _fireEvent(baseFire, event, properties) {
        const map = this._map;
        const tr = map.transform;
        const eventType = typeof event === 'string' ? event : event.type;
        if (eventType === 'move') {
            this._updateViewState(this.props, false);
        }
        if (eventType in cameraEvents) {
            if (typeof event === 'object') {
                event.viewState = transformToViewState(tr);
            }
            if (this._map.isMoving()) {
                // Replace map.transform with ours during the callbacks
                map.transform = this._renderTransform;
                baseFire.call(map, event, properties);
                map.transform = tr;
                return map;
            }
        }
        baseFire.call(map, event, properties);
        return map;
    }
    // All camera manipulations are complete, ready to repaint
    _onBeforeRepaint() {
        const map = this._map;
        // If there are camera changes driven by props, invoke camera events so that DOM controls are synced
        this._internalUpdate = true;
        for (const eventType in this._deferredEvents) {
            if (this._deferredEvents[eventType]) {
                map.fire(eventType);
            }
        }
        this._internalUpdate = false;
        const tr = this._map.transform;
        // Make sure camera matches the current props
        map.transform = this._renderTransform;
        this._onAfterRepaint = () => {
            // Mapbox transitions between non-mercator projection and mercator during render time
            // Copy it back to the other
            syncProjection(this._renderTransform, tr);
            // Restores camera state before render/load events are fired
            map.transform = tr;
        };
    }
}
Mapbox.savedMaps = [];
/**
 * Access token can be provided via one of:
 *   mapboxAccessToken prop
 *   access_token query parameter
 *   MapboxAccessToken environment variable
 *   REACT_APP_MAPBOX_ACCESS_TOKEN environment variable
 * @returns access token
 */
function getAccessTokenFromEnv() {
    let accessToken = null;
    /* global location, process */
    if (typeof location !== 'undefined') {
        const match = /access_token=([^&\/]*)/.exec(location.search);
        accessToken = match && match[1];
    }
    // Note: This depends on bundler plugins (e.g. webpack) importing environment correctly
    try {
        accessToken = accessToken || process.env.MapboxAccessToken;
    }
    catch (_a) {
        // ignore
    }
    try {
        accessToken = accessToken || process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
    }
    catch (_b) {
        // ignore
    }
    return accessToken;
}
//# sourceMappingURL=mapbox.js.map
;// CONCATENATED MODULE: ./node_modules/react-map-gl/dist/esm/mapbox/create-ref.js
/** These methods may break the react binding if called directly */
const skipMethods = [
    'setMaxBounds',
    'setMinZoom',
    'setMaxZoom',
    'setMinPitch',
    'setMaxPitch',
    'setRenderWorldCopies',
    'setProjection',
    'setStyle',
    'addSource',
    'removeSource',
    'addLayer',
    'removeLayer',
    'setLayerZoomRange',
    'setFilter',
    'setPaintProperty',
    'setLayoutProperty',
    'setLight',
    'setTerrain',
    'setFog',
    'remove'
];
function createRef(mapInstance) {
    if (!mapInstance) {
        return null;
    }
    const map = mapInstance.map;
    const result = {
        getMap: () => map,
        // Overwrite getters to use our shadow transform
        getCenter: () => mapInstance.transform.center,
        getZoom: () => mapInstance.transform.zoom,
        getBearing: () => mapInstance.transform.bearing,
        getPitch: () => mapInstance.transform.pitch,
        getPadding: () => mapInstance.transform.padding,
        getBounds: () => mapInstance.transform.getBounds(),
        project: (lnglat) => {
            const tr = map.transform;
            map.transform = mapInstance.transform;
            const result = map.project(lnglat);
            map.transform = tr;
            return result;
        },
        unproject: (point) => {
            const tr = map.transform;
            map.transform = mapInstance.transform;
            const result = map.unproject(point);
            map.transform = tr;
            return result;
        },
        // options diverge between mapbox and maplibre
        queryTerrainElevation: (lnglat, options) => {
            const tr = map.transform;
            map.transform = mapInstance.transform;
            const result = map.queryTerrainElevation(lnglat, options);
            map.transform = tr;
            return result;
        }
    };
    for (const key of getMethodNames(map)) {
        // @ts-expect-error
        if (!(key in result) && !skipMethods.includes(key)) {
            result[key] = map[key].bind(map);
        }
    }
    return result;
}
function getMethodNames(obj) {
    const result = new Set();
    let proto = obj;
    while (proto) {
        for (const key of Object.getOwnPropertyNames(proto)) {
            if (key[0] !== '_' &&
                typeof obj[key] === 'function' &&
                key !== 'fire' &&
                key !== 'setEventedParent') {
                result.add(key);
            }
        }
        proto = Object.getPrototypeOf(proto);
    }
    return Array.from(result);
}
//# sourceMappingURL=create-ref.js.map
;// CONCATENATED MODULE: ./node_modules/react-map-gl/dist/esm/utils/use-isomorphic-layout-effect.js
// From https://github.com/streamich/react-use/blob/master/src/useIsomorphicLayoutEffect.ts
// useLayoutEffect but does not trigger warning in server-side rendering

const useIsomorphicLayoutEffect = typeof document !== 'undefined' ? react.useLayoutEffect : react.useEffect;
/* harmony default export */ var use_isomorphic_layout_effect = (useIsomorphicLayoutEffect);
//# sourceMappingURL=use-isomorphic-layout-effect.js.map
;// CONCATENATED MODULE: ./node_modules/react-map-gl/dist/esm/utils/set-globals.js
const globalSettings = [
    'baseApiUrl',
    'maxParallelImageRequests',
    'workerClass',
    'workerCount',
    'workerUrl'
];
function setGlobals(mapLib, props) {
    for (const key of globalSettings) {
        if (key in props) {
            mapLib[key] = props[key];
        }
    }
    const { RTLTextPlugin = 'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js' } = props;
    if (RTLTextPlugin &&
        mapLib.getRTLTextPluginStatus &&
        mapLib.getRTLTextPluginStatus() === 'unavailable') {
        mapLib.setRTLTextPlugin(RTLTextPlugin, (error) => {
            if (error) {
                // eslint-disable-next-line
                console.error(error);
            }
        }, false);
    }
}
//# sourceMappingURL=set-globals.js.map
;// CONCATENATED MODULE: ./node_modules/react-map-gl/dist/esm/components/map.js







const map_MapContext = react.createContext(null);
function map_Map(props, ref, defaultLib) {
    const mountedMapsContext = (0,react.useContext)(MountedMapsContext);
    const [mapInstance, setMapInstance] = (0,react.useState)(null);
    const containerRef = (0,react.useRef)();
    const { current: contextValue } = (0,react.useRef)({ mapLib: null, map: null });
    (0,react.useEffect)(() => {
        const mapLib = props.mapLib;
        let isMounted = true;
        let mapbox;
        Promise.resolve(mapLib || defaultLib)
            .then((module) => {
            if (!isMounted) {
                return;
            }
            if (!module) {
                throw new Error('Invalid mapLib');
            }
            const mapboxgl = 'Map' in module ? module : module.default;
            if (!mapboxgl.Map) {
                throw new Error('Invalid mapLib');
            }
            // workerUrl & workerClass may change the result of supported()
            // https://github.com/visgl/react-map-gl/discussions/2027
            setGlobals(mapboxgl, props);
            if (!mapboxgl.supported || mapboxgl.supported(props)) {
                if (props.reuseMaps) {
                    mapbox = Mapbox.reuse(props, containerRef.current);
                }
                if (!mapbox) {
                    mapbox = new Mapbox(mapboxgl.Map, props, containerRef.current);
                }
                contextValue.map = createRef(mapbox);
                contextValue.mapLib = mapboxgl;
                setMapInstance(mapbox);
                mountedMapsContext === null || mountedMapsContext === void 0 ? void 0 : mountedMapsContext.onMapMount(contextValue.map, props.id);
            }
            else {
                throw new Error('Map is not supported by this browser');
            }
        })
            .catch(error => {
            const { onError } = props;
            if (onError) {
                onError({
                    type: 'error',
                    target: null,
                    originalEvent: null,
                    error
                });
            }
            else {
                console.error(error); // eslint-disable-line
            }
        });
        return () => {
            isMounted = false;
            if (mapbox) {
                mountedMapsContext === null || mountedMapsContext === void 0 ? void 0 : mountedMapsContext.onMapUnmount(props.id);
                if (props.reuseMaps) {
                    mapbox.recycle();
                }
                else {
                    mapbox.destroy();
                }
            }
        };
    }, []);
    use_isomorphic_layout_effect(() => {
        if (mapInstance) {
            mapInstance.setProps(props);
        }
    });
    (0,react.useImperativeHandle)(ref, () => contextValue.map, [mapInstance]);
    const style = (0,react.useMemo)(() => ({
        position: 'relative',
        width: '100%',
        height: '100%',
        ...props.style
    }), [props.style]);
    const CHILD_CONTAINER_STYLE = {
        height: '100%'
    };
    return (react.createElement("div", { id: props.id, ref: containerRef, style: style }, mapInstance && (react.createElement(map_MapContext.Provider, { value: contextValue },
        react.createElement("div", { "mapboxgl-children": "", style: CHILD_CONTAINER_STYLE }, props.children)))));
}
//# sourceMappingURL=map.js.map
// EXTERNAL MODULE: ./node_modules/next/dist/compiled/react-dom/index.js
var react_dom = __webpack_require__(8431);
;// CONCATENATED MODULE: ./node_modules/react-map-gl/dist/esm/utils/apply-react-style.js
// This is a simplified version of
// https://github.com/facebook/react/blob/4131af3e4bf52f3a003537ec95a1655147c81270/src/renderers/dom/shared/CSSPropertyOperations.js#L62
const unitlessNumber = /box|flex|grid|column|lineHeight|fontWeight|opacity|order|tabSize|zIndex/;
function applyReactStyle(element, styles) {
    if (!element || !styles) {
        return;
    }
    const style = element.style;
    for (const key in styles) {
        const value = styles[key];
        if (Number.isFinite(value) && !unitlessNumber.test(key)) {
            style[key] = `${value}px`;
        }
        else {
            style[key] = value;
        }
    }
}
//# sourceMappingURL=apply-react-style.js.map
;// CONCATENATED MODULE: ./node_modules/react-map-gl/dist/esm/components/marker.js
/* global document */






/* eslint-disable complexity,max-statements */
function Marker(props, ref) {
    const { map, mapLib } = (0,react.useContext)(map_MapContext);
    const thisRef = (0,react.useRef)({ props });
    thisRef.current.props = props;
    const marker = (0,react.useMemo)(() => {
        let hasChildren = false;
        react.Children.forEach(props.children, el => {
            if (el) {
                hasChildren = true;
            }
        });
        const options = {
            ...props,
            element: hasChildren ? document.createElement('div') : null
        };
        const mk = new mapLib.Marker(options);
        mk.setLngLat([props.longitude, props.latitude]);
        mk.getElement().addEventListener('click', (e) => {
            var _a, _b;
            (_b = (_a = thisRef.current.props).onClick) === null || _b === void 0 ? void 0 : _b.call(_a, {
                type: 'click',
                target: mk,
                originalEvent: e
            });
        });
        mk.on('dragstart', e => {
            var _a, _b;
            const evt = e;
            evt.lngLat = marker.getLngLat();
            (_b = (_a = thisRef.current.props).onDragStart) === null || _b === void 0 ? void 0 : _b.call(_a, evt);
        });
        mk.on('drag', e => {
            var _a, _b;
            const evt = e;
            evt.lngLat = marker.getLngLat();
            (_b = (_a = thisRef.current.props).onDrag) === null || _b === void 0 ? void 0 : _b.call(_a, evt);
        });
        mk.on('dragend', e => {
            var _a, _b;
            const evt = e;
            evt.lngLat = marker.getLngLat();
            (_b = (_a = thisRef.current.props).onDragEnd) === null || _b === void 0 ? void 0 : _b.call(_a, evt);
        });
        return mk;
    }, []);
    (0,react.useEffect)(() => {
        marker.addTo(map.getMap());
        return () => {
            marker.remove();
        };
    }, []);
    const { longitude, latitude, offset, style, draggable = false, popup = null, rotation = 0, rotationAlignment = 'auto', pitchAlignment = 'auto' } = props;
    (0,react.useEffect)(() => {
        applyReactStyle(marker.getElement(), style);
    }, [style]);
    (0,react.useImperativeHandle)(ref, () => marker, []);
    if (marker.getLngLat().lng !== longitude || marker.getLngLat().lat !== latitude) {
        marker.setLngLat([longitude, latitude]);
    }
    if (offset && !arePointsEqual(marker.getOffset(), offset)) {
        marker.setOffset(offset);
    }
    if (marker.isDraggable() !== draggable) {
        marker.setDraggable(draggable);
    }
    if (marker.getRotation() !== rotation) {
        marker.setRotation(rotation);
    }
    if (marker.getRotationAlignment() !== rotationAlignment) {
        marker.setRotationAlignment(rotationAlignment);
    }
    if (marker.getPitchAlignment() !== pitchAlignment) {
        marker.setPitchAlignment(pitchAlignment);
    }
    if (marker.getPopup() !== popup) {
        marker.setPopup(popup);
    }
    return (0,react_dom.createPortal)(props.children, marker.getElement());
}
/* harmony default export */ var marker = ((0,react.memo)((0,react.forwardRef)(Marker)));
//# sourceMappingURL=marker.js.map
;// CONCATENATED MODULE: ./node_modules/react-map-gl/dist/esm/components/popup.js





// Adapted from https://github.com/mapbox/mapbox-gl-js/blob/v1.13.0/src/ui/popup.js
function getClassList(className) {
    return new Set(className ? className.trim().split(/\s+/) : []);
}
/* eslint-disable complexity,max-statements */
function Popup(props, ref) {
    const { map, mapLib } = (0,react.useContext)(map_MapContext);
    const container = (0,react.useMemo)(() => {
        return document.createElement('div');
    }, []);
    const thisRef = (0,react.useRef)({ props });
    thisRef.current.props = props;
    const popup = (0,react.useMemo)(() => {
        const options = { ...props };
        const pp = new mapLib.Popup(options);
        pp.setLngLat([props.longitude, props.latitude]);
        pp.once('open', e => {
            var _a, _b;
            (_b = (_a = thisRef.current.props).onOpen) === null || _b === void 0 ? void 0 : _b.call(_a, e);
        });
        return pp;
    }, []);
    (0,react.useEffect)(() => {
        const onClose = e => {
            var _a, _b;
            (_b = (_a = thisRef.current.props).onClose) === null || _b === void 0 ? void 0 : _b.call(_a, e);
        };
        popup.on('close', onClose);
        popup.setDOMContent(container).addTo(map.getMap());
        return () => {
            // https://github.com/visgl/react-map-gl/issues/1825
            // onClose should not be fired if the popup is removed by unmounting
            // When using React strict mode, the component is mounted twice.
            // Firing the onClose callback here would be a false signal to remove the component.
            popup.off('close', onClose);
            if (popup.isOpen()) {
                popup.remove();
            }
        };
    }, []);
    (0,react.useEffect)(() => {
        applyReactStyle(popup.getElement(), props.style);
    }, [props.style]);
    (0,react.useImperativeHandle)(ref, () => popup, []);
    if (popup.isOpen()) {
        if (popup.getLngLat().lng !== props.longitude || popup.getLngLat().lat !== props.latitude) {
            popup.setLngLat([props.longitude, props.latitude]);
        }
        if (props.offset && !deepEqual(popup.options.offset, props.offset)) {
            popup.setOffset(props.offset);
        }
        if (popup.options.anchor !== props.anchor || popup.options.maxWidth !== props.maxWidth) {
            popup.options.anchor = props.anchor;
            popup.setMaxWidth(props.maxWidth);
        }
        if (popup.options.className !== props.className) {
            const prevClassList = getClassList(popup.options.className);
            const nextClassList = getClassList(props.className);
            for (const c of prevClassList) {
                if (!nextClassList.has(c)) {
                    popup.removeClassName(c);
                }
            }
            for (const c of nextClassList) {
                if (!prevClassList.has(c)) {
                    popup.addClassName(c);
                }
            }
            popup.options.className = props.className;
        }
    }
    return (0,react_dom.createPortal)(props.children, container);
}
/* harmony default export */ var popup = ((0,react.memo)((0,react.forwardRef)(Popup)));
//# sourceMappingURL=popup.js.map
;// CONCATENATED MODULE: ./node_modules/react-map-gl/dist/esm/components/use-control.js


function useControl(onCreate, arg1, arg2, arg3) {
    const context = (0,react.useContext)(map_MapContext);
    const ctrl = (0,react.useMemo)(() => onCreate(context), []);
    (0,react.useEffect)(() => {
        const opts = (arg3 || arg2 || arg1);
        const onAdd = typeof arg1 === 'function' && typeof arg2 === 'function' ? arg1 : null;
        const onRemove = typeof arg2 === 'function' ? arg2 : typeof arg1 === 'function' ? arg1 : null;
        const { map } = context;
        if (!map.hasControl(ctrl)) {
            map.addControl(ctrl, opts === null || opts === void 0 ? void 0 : opts.position);
            if (onAdd) {
                onAdd(context);
            }
        }
        return () => {
            if (onRemove) {
                onRemove(context);
            }
            // Map might have been removed (parent effects are destroyed before child ones)
            if (map.hasControl(ctrl)) {
                map.removeControl(ctrl);
            }
        };
    }, []);
    return ctrl;
}
/* harmony default export */ var use_control = (useControl);
//# sourceMappingURL=use-control.js.map
;// CONCATENATED MODULE: ./node_modules/react-map-gl/dist/esm/components/attribution-control.js



function AttributionControl(props) {
    const ctrl = use_control(({ mapLib }) => new mapLib.AttributionControl(props), {
        position: props.position
    });
    (0,react.useEffect)(() => {
        applyReactStyle(ctrl._container, props.style);
    }, [props.style]);
    return null;
}
/* harmony default export */ var attribution_control = ((0,react.memo)(AttributionControl));
//# sourceMappingURL=attribution-control.js.map
;// CONCATENATED MODULE: ./node_modules/react-map-gl/dist/esm/components/fullscreen-control.js



function FullscreenControl(props) {
    const ctrl = use_control(({ mapLib }) => new mapLib.FullscreenControl({
        container: props.containerId && document.getElementById(props.containerId)
    }), { position: props.position });
    (0,react.useEffect)(() => {
        applyReactStyle(ctrl._controlContainer, props.style);
    }, [props.style]);
    return null;
}
/* harmony default export */ var fullscreen_control = ((0,react.memo)(FullscreenControl));
//# sourceMappingURL=fullscreen-control.js.map
;// CONCATENATED MODULE: ./node_modules/react-map-gl/dist/esm/components/geolocate-control.js



function GeolocateControl(props, ref) {
    const thisRef = (0,react.useRef)({ props });
    const ctrl = use_control(({ mapLib }) => {
        const gc = new mapLib.GeolocateControl(props);
        // Hack: fix GeolocateControl reuse
        // When using React strict mode, the component is mounted twice.
        // GeolocateControl's UI creation is asynchronous. Removing and adding it back causes the UI to be initialized twice.
        // @ts-expect-error private method
        const setupUI = gc._setupUI;
        // @ts-expect-error private method
        gc._setupUI = args => {
            if (!gc._container.hasChildNodes()) {
                setupUI(args);
            }
        };
        gc.on('geolocate', e => {
            var _a, _b;
            (_b = (_a = thisRef.current.props).onGeolocate) === null || _b === void 0 ? void 0 : _b.call(_a, e);
        });
        gc.on('error', e => {
            var _a, _b;
            (_b = (_a = thisRef.current.props).onError) === null || _b === void 0 ? void 0 : _b.call(_a, e);
        });
        gc.on('outofmaxbounds', e => {
            var _a, _b;
            (_b = (_a = thisRef.current.props).onOutOfMaxBounds) === null || _b === void 0 ? void 0 : _b.call(_a, e);
        });
        gc.on('trackuserlocationstart', e => {
            var _a, _b;
            (_b = (_a = thisRef.current.props).onTrackUserLocationStart) === null || _b === void 0 ? void 0 : _b.call(_a, e);
        });
        gc.on('trackuserlocationend', e => {
            var _a, _b;
            (_b = (_a = thisRef.current.props).onTrackUserLocationEnd) === null || _b === void 0 ? void 0 : _b.call(_a, e);
        });
        return gc;
    }, { position: props.position });
    thisRef.current.props = props;
    (0,react.useImperativeHandle)(ref, () => ctrl, []);
    (0,react.useEffect)(() => {
        applyReactStyle(ctrl._container, props.style);
    }, [props.style]);
    return null;
}
/* harmony default export */ var geolocate_control = ((0,react.memo)((0,react.forwardRef)(GeolocateControl)));
//# sourceMappingURL=geolocate-control.js.map
;// CONCATENATED MODULE: ./node_modules/react-map-gl/dist/esm/components/navigation-control.js



function NavigationControl(props) {
    const ctrl = use_control(({ mapLib }) => new mapLib.NavigationControl(props), {
        position: props.position
    });
    (0,react.useEffect)(() => {
        applyReactStyle(ctrl._container, props.style);
    }, [props.style]);
    return null;
}
/* harmony default export */ var navigation_control = ((0,react.memo)(NavigationControl));
//# sourceMappingURL=navigation-control.js.map
;// CONCATENATED MODULE: ./node_modules/react-map-gl/dist/esm/components/scale-control.js



function ScaleControl(props) {
    const ctrl = use_control(({ mapLib }) => new mapLib.ScaleControl(props), {
        position: props.position
    });
    const propsRef = (0,react.useRef)(props);
    const prevProps = propsRef.current;
    propsRef.current = props;
    const { style } = props;
    if (props.maxWidth !== undefined && props.maxWidth !== prevProps.maxWidth) {
        ctrl.options.maxWidth = props.maxWidth;
    }
    if (props.unit !== undefined && props.unit !== prevProps.unit) {
        ctrl.setUnit(props.unit);
    }
    (0,react.useEffect)(() => {
        applyReactStyle(ctrl._container, style);
    }, [style]);
    return null;
}
/* harmony default export */ var scale_control = ((0,react.memo)(ScaleControl));
//# sourceMappingURL=scale-control.js.map
;// CONCATENATED MODULE: ./node_modules/react-map-gl/dist/esm/utils/assert.js
function assert(condition, message) {
    if (!condition) {
        throw new Error(message);
    }
}
//# sourceMappingURL=assert.js.map
;// CONCATENATED MODULE: ./node_modules/react-map-gl/dist/esm/components/source.js






let sourceCounter = 0;
function createSource(map, id, props) {
    // @ts-ignore
    if (map.style && map.style._loaded) {
        const options = { ...props };
        delete options.id;
        delete options.children;
        // @ts-ignore
        map.addSource(id, options);
        return map.getSource(id);
    }
    return null;
}
/* eslint-disable complexity */
function updateSource(source, props, prevProps) {
    assert(props.id === prevProps.id, 'source id changed');
    assert(props.type === prevProps.type, 'source type changed');
    let changedKey = '';
    let changedKeyCount = 0;
    for (const key in props) {
        if (key !== 'children' && key !== 'id' && !deepEqual(prevProps[key], props[key])) {
            changedKey = key;
            changedKeyCount++;
        }
    }
    if (!changedKeyCount) {
        return;
    }
    const type = props.type;
    if (type === 'geojson') {
        source.setData(props.data);
    }
    else if (type === 'image') {
        source.updateImage({
            url: props.url,
            coordinates: props.coordinates
        });
    }
    else if ('setCoordinates' in source && changedKeyCount === 1 && changedKey === 'coordinates') {
        source.setCoordinates(props.coordinates);
    }
    else if ('setUrl' in source) {
        // Added in 1.12.0:
        // vectorTileSource.setTiles
        // vectorTileSource.setUrl
        switch (changedKey) {
            case 'url':
                source.setUrl(props.url);
                break;
            case 'tiles':
                source.setTiles(props.tiles);
                break;
            default:
        }
    }
    else {
        // eslint-disable-next-line
        console.warn(`Unable to update <Source> prop: ${changedKey}`);
    }
}
/* eslint-enable complexity */
function Source(props) {
    const map = (0,react.useContext)(map_MapContext).map.getMap();
    const propsRef = (0,react.useRef)(props);
    const [, setStyleLoaded] = (0,react.useState)(0);
    const id = (0,react.useMemo)(() => props.id || `jsx-source-${sourceCounter++}`, []);
    (0,react.useEffect)(() => {
        if (map) {
            /* global setTimeout */
            const forceUpdate = () => setTimeout(() => setStyleLoaded(version => version + 1), 0);
            map.on('styledata', forceUpdate);
            forceUpdate();
            return () => {
                var _a;
                map.off('styledata', forceUpdate);
                // @ts-ignore
                if (map.style && map.style._loaded && map.getSource(id)) {
                    // Parent effects are destroyed before child ones, see
                    // https://github.com/facebook/react/issues/16728
                    // Source can only be removed after all child layers are removed
                    const allLayers = (_a = map.getStyle()) === null || _a === void 0 ? void 0 : _a.layers;
                    if (allLayers) {
                        for (const layer of allLayers) {
                            // @ts-ignore (2339) source does not exist on all layer types
                            if (layer.source === id) {
                                map.removeLayer(layer.id);
                            }
                        }
                    }
                    map.removeSource(id);
                }
            };
        }
        return undefined;
    }, [map]);
    // @ts-ignore
    let source = map && map.style && map.getSource(id);
    if (source) {
        updateSource(source, props, propsRef.current);
    }
    else {
        source = createSource(map, id, props);
    }
    propsRef.current = props;
    return ((source &&
        react.Children.map(props.children, child => child &&
            (0,react.cloneElement)(child, {
                source: id
            }))) ||
        null);
}
/* harmony default export */ var source = (Source);
//# sourceMappingURL=source.js.map
;// CONCATENATED MODULE: ./node_modules/react-map-gl/dist/esm/components/layer.js




/* eslint-disable complexity, max-statements */
function updateLayer(map, id, props, prevProps) {
    assert(props.id === prevProps.id, 'layer id changed');
    assert(props.type === prevProps.type, 'layer type changed');
    if (props.type === 'custom' || prevProps.type === 'custom') {
        return;
    }
    const { layout = {}, paint = {}, 
    // @ts-expect-error filter is not defined on some layer types
    filter, minzoom, maxzoom, beforeId } = props;
    if (beforeId !== prevProps.beforeId) {
        map.moveLayer(id, beforeId);
    }
    if (layout !== prevProps.layout) {
        const prevLayout = prevProps.layout || {};
        for (const key in layout) {
            if (!deepEqual(layout[key], prevLayout[key])) {
                map.setLayoutProperty(id, key, layout[key]);
            }
        }
        for (const key in prevLayout) {
            if (!layout.hasOwnProperty(key)) {
                map.setLayoutProperty(id, key, undefined);
            }
        }
    }
    if (paint !== prevProps.paint) {
        const prevPaint = prevProps.paint || {};
        for (const key in paint) {
            if (!deepEqual(paint[key], prevPaint[key])) {
                map.setPaintProperty(id, key, paint[key]);
            }
        }
        for (const key in prevPaint) {
            if (!paint.hasOwnProperty(key)) {
                map.setPaintProperty(id, key, undefined);
            }
        }
    }
    // @ts-expect-error filter is not defined on some layer types
    if (!deepEqual(filter, prevProps.filter)) {
        map.setFilter(id, filter);
    }
    if (minzoom !== prevProps.minzoom || maxzoom !== prevProps.maxzoom) {
        map.setLayerZoomRange(id, minzoom, maxzoom);
    }
}
function createLayer(map, id, props) {
    // @ts-ignore
    if (map.style && map.style._loaded && (!('source' in props) || map.getSource(props.source))) {
        const options = { ...props, id };
        delete options.beforeId;
        // @ts-ignore
        map.addLayer(options, props.beforeId);
    }
}
/* eslint-enable complexity, max-statements */
let layerCounter = 0;
function Layer(props) {
    const map = (0,react.useContext)(map_MapContext).map.getMap();
    const propsRef = (0,react.useRef)(props);
    const [, setStyleLoaded] = (0,react.useState)(0);
    const id = (0,react.useMemo)(() => props.id || `jsx-layer-${layerCounter++}`, []);
    (0,react.useEffect)(() => {
        if (map) {
            const forceUpdate = () => setStyleLoaded(version => version + 1);
            map.on('styledata', forceUpdate);
            forceUpdate();
            return () => {
                map.off('styledata', forceUpdate);
                // @ts-ignore
                if (map.style && map.style._loaded && map.getLayer(id)) {
                    map.removeLayer(id);
                }
            };
        }
        return undefined;
    }, [map]);
    // @ts-ignore
    const layer = map && map.style && map.getLayer(id);
    if (layer) {
        try {
            updateLayer(map, id, props, propsRef.current);
        }
        catch (error) {
            console.warn(error); // eslint-disable-line
        }
    }
    else {
        createLayer(map, id, props);
    }
    // Store last rendered props
    propsRef.current = props;
    return null;
}
/* harmony default export */ var components_layer = (Layer);
//# sourceMappingURL=layer.js.map
;// CONCATENATED MODULE: ./node_modules/react-map-gl/dist/esm/exports-maplibre.js










function exports_maplibre_useMap() {
    return _useMap();
}
const mapLib = __webpack_require__.e(/* import() */ 369).then(__webpack_require__.t.bind(__webpack_require__, 2975, 23));
const Map = (() => {
    return react.forwardRef(function Map(props, ref) {
        return map_Map(props, ref, mapLib);
    });
})();
const exports_maplibre_Marker = (/* unused pure expression or super */ null && (_Marker));
const exports_maplibre_Popup = (/* unused pure expression or super */ null && (_Popup));
const exports_maplibre_AttributionControl = (/* unused pure expression or super */ null && (_AttributionControl));
const exports_maplibre_FullscreenControl = (/* unused pure expression or super */ null && (_FullscreenControl));
const exports_maplibre_NavigationControl = (/* unused pure expression or super */ null && (_NavigationControl));
const exports_maplibre_GeolocateControl = (/* unused pure expression or super */ null && (_GeolocateControl));
const exports_maplibre_ScaleControl = (/* unused pure expression or super */ null && (_ScaleControl));




/* harmony default export */ var exports_maplibre = (Map);
// Types

//# sourceMappingURL=exports-maplibre.js.map

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

/***/ }),

/***/ 1031:
/***/ (function(module) {

"use strict";
module.exports = JSON.parse('[{"name":"Aircotec","long":"ACT","short":"I"},{"name":"Cambridge Aero Instruments","long":"CAM","short":"C"},{"name":"ClearNav Instruments","long":"CNI","short":null},{"name":"Data Swan/DSX","long":"DSX","short":"D"},{"name":"EW Avionics","long":"EWA","short":"E"},{"name":"Filser","long":"FIL","short":"F"},{"name":"Flarm","long":"FLA","short":"G"},{"name":"Flytech","long":"FLY","short":null},{"name":"Garrecht","long":"GCS","short":"A"},{"name":"IMI Gliding Equipment","long":"IMI","short":"M"},{"name":"Logstream","long":"LGS","short":null},{"name":"LX Navigation","long":"LXN","short":"L"},{"name":"LXNAV","long":"LXV","short":"V"},{"name":"Naviter","long":"NAV","short":null},{"name":"New Technologies","long":"NTE","short":"N"},{"name":"Nielsen Kellerman","long":"NKL","short":"K"},{"name":"Peschges","long":"PES","short":"P"},{"name":"PressFinish Electronics","long":"PFE","short":null},{"name":"Print Technik","long":"PRT","short":"R"},{"name":"Scheffel","long":"SCH","short":"H"},{"name":"Streamline Data Instruments","long":"SDI","short":"S"},{"name":"Triadis Engineering GmbH","long":"TRI","short":"T"},{"name":"Zander","long":"ZAN","short":"Z"},{"name":"XCSoar","long":"XCS","short":null},{"name":"LK8000","long":"XLK","short":null},{"name":"GpsDump","long":"XGD","short":null},{"name":"SeeYou Recorder","long":"XCM","short":null},{"name":"Flyskyhy","long":"XFH","short":null},{"name":"XCTrack","long":"XCT","short":null},{"name":"Flymaster Live","long":"XFM","short":null},{"name":"XCTracer","long":"XTR","short":null},{"name":"SkyBean","long":"XSB","short":null},{"name":"leGPSBip","long":"XSD","short":null},{"name":"Logfly","long":"XLF","short":null},{"name":"Loctome","long":"XLM","short":null}]');

/***/ })

}]);