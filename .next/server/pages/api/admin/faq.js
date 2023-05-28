"use strict";
(() => {
var exports = {};
exports.id = 4756;
exports.ids = [4756];
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

/***/ 38316:
/***/ ((module) => {

module.exports = require("zod");

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

/***/ 28831:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ handler)
});

// EXTERNAL MODULE: ./src/lib/db/index.ts
var db = __webpack_require__(55156);
// EXTERNAL MODULE: external "zod"
var external_zod_ = __webpack_require__(38316);
var external_zod_default = /*#__PURE__*/__webpack_require__.n(external_zod_);
;// CONCATENATED MODULE: ./src/lib/db/models/Faq.ts

const FaqSchema = external_zod_default().object({
    q: external_zod_default().string().nonempty(),
    a: external_zod_default().string().nonempty()
});

// EXTERNAL MODULE: ./src/lib/utils/server.ts
var server = __webpack_require__(66028);
;// CONCATENATED MODULE: ./src/pages/api/admin/faq.ts



async function handler(req, res) {
    await (0,server/* makeApiPostHandler */.c8)(req, res, await db/* default */.Z, FaqSchema, "faqs");
}


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [2328,5156], () => (__webpack_exec__(28831)));
module.exports = __webpack_exports__;

})();