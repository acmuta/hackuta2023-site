"use strict";
(() => {
var exports = {};
exports.id = 90;
exports.ids = [90];
exports.modules = {

/***/ 60871:
/***/ ((module) => {

module.exports = require("buffer");

/***/ }),

/***/ 38013:
/***/ ((module) => {

module.exports = require("mongodb");

/***/ }),

/***/ 93596:
/***/ ((module) => {

module.exports = require("node-domexception");

/***/ }),

/***/ 58545:
/***/ ((module) => {

module.exports = require("pino");

/***/ }),

/***/ 60910:
/***/ ((module) => {

module.exports = require("web-streams-polyfill/dist/ponyfill.es2018.js");

/***/ }),

/***/ 72254:
/***/ ((module) => {

module.exports = require("node:buffer");

/***/ }),

/***/ 87561:
/***/ ((module) => {

module.exports = require("node:fs");

/***/ }),

/***/ 88849:
/***/ ((module) => {

module.exports = require("node:http");

/***/ }),

/***/ 22286:
/***/ ((module) => {

module.exports = require("node:https");

/***/ }),

/***/ 87503:
/***/ ((module) => {

module.exports = require("node:net");

/***/ }),

/***/ 49411:
/***/ ((module) => {

module.exports = require("node:path");

/***/ }),

/***/ 97742:
/***/ ((module) => {

module.exports = require("node:process");

/***/ }),

/***/ 84492:
/***/ ((module) => {

module.exports = require("node:stream");

/***/ }),

/***/ 72477:
/***/ ((module) => {

module.exports = require("node:stream/web");

/***/ }),

/***/ 41041:
/***/ ((module) => {

module.exports = require("node:url");

/***/ }),

/***/ 47261:
/***/ ((module) => {

module.exports = require("node:util");

/***/ }),

/***/ 65628:
/***/ ((module) => {

module.exports = require("node:zlib");

/***/ }),

/***/ 12781:
/***/ ((module) => {

module.exports = require("stream");

/***/ }),

/***/ 61016:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ handler)
/* harmony export */ });
/* harmony import */ var _lib_api_jsend__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(29153);
/* harmony import */ var _lib_db__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(55156);
/* harmony import */ var _lib_logger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(20384);



async function handler(req, res) {
    try {
        const client = await _lib_db__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z;
        if (req.method !== "POST") {
            throw new Error(`Unsupported ${req.method}`);
        }
        const { email , applicationStatus  } = req.body;
        await client.db().collection("users").updateOne({
            email
        }, {
            $set: {
                applicationStatus,
                applicationDecided: new Date()
            }
        });
        res.status(200).json(_lib_api_jsend__WEBPACK_IMPORTED_MODULE_0__/* ["default"].success */ .Z.success(req.body));
    } catch (e) {
        _lib_logger__WEBPACK_IMPORTED_MODULE_2__/* ["default"].error */ .Z.error(e, req.url);
        res.status(500).json(_lib_api_jsend__WEBPACK_IMPORTED_MODULE_0__/* ["default"].error */ .Z.error(e));
    }
}


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [2328,5156], () => (__webpack_exec__(61016)));
module.exports = __webpack_exports__;

})();