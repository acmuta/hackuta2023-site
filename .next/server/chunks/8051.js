"use strict";
exports.id = 8051;
exports.ids = [8051];
exports.modules = {

/***/ 58051:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(38013);
/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongodb__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lib_utils_server__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(44942);

// Adapted from https://github.com/vercel/next.js/blob/1a9b4b9a9b8391d4c57480aea4787e7d83e027b7/examples/with-mongodb/lib/mongodb.ts
// License: MIT (https://github.com/vercel/next.js/blob/b2e9431bb46563264d450b1707dc0d9cdaf70d26/license.md)


const { MONGODB_URI: uri  } = process.env;
if (!uri) {
    throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}
const options = {
    serverApi: mongodb__WEBPACK_IMPORTED_MODULE_0__.ServerApiVersion.v1
};
let client;
let clientPromise;
if ((0,_lib_utils_server__WEBPACK_IMPORTED_MODULE_1__/* .isDevelopment */ .yG)()) {
    // In development mode, use a global variable so that the value
    // is preserved across module reloads caused by HMR (Hot Module Replacement).
    if (!global._mongoClientPromise) {
        client = new mongodb__WEBPACK_IMPORTED_MODULE_0__.MongoClient(uri, options);
        global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
} else {
    // In production mode, it's best to not use a global variable.
    client = new mongodb__WEBPACK_IMPORTED_MODULE_0__.MongoClient(uri, options);
    clientPromise = client.connect();
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (clientPromise);


/***/ })

};
;