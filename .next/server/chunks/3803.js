exports.id = 3803;
exports.ids = [3803];
exports.modules = {

/***/ 8891:
/***/ ((module) => {

// Exports
module.exports = {
	"pageSection": "PageSection_pageSection__zkKAe"
};


/***/ }),

/***/ 44151:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ PageSection)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(83146);
/* harmony import */ var _components_Box__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(72781);
/* harmony import */ var _components_Heading__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(83711);
/* harmony import */ var _PageSection_module_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8891);
/* harmony import */ var _PageSection_module_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_PageSection_module_css__WEBPACK_IMPORTED_MODULE_3__);




function PageSection({ heading , children  }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_Box__WEBPACK_IMPORTED_MODULE_1__/* .Box */ .x, {
        as: "section",
        direction: "column",
        gap: "1rem",
        className: (_PageSection_module_css__WEBPACK_IMPORTED_MODULE_3___default().pageSection),
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_Heading__WEBPACK_IMPORTED_MODULE_2__/* .Heading */ .X, {
                id: heading.toLowerCase(),
                level: 2,
                className: "anchorOffset",
                children: heading
            }),
            children
        ]
    });
}


/***/ }),

/***/ 39120:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "C": () => (/* binding */ queryDbForItems)
/* harmony export */ });
/* harmony import */ var _lib_db__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(58051);
/* harmony import */ var _lib_logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(21494);
/* harmony import */ var _lib_utils_server__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(44942);



async function queryDbForItems(collectionName, logMetadata, onReturn = (items)=>items) {
    try {
        const client = await _lib_db__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z;
        const items = await (0,_lib_utils_server__WEBPACK_IMPORTED_MODULE_2__/* .getAllDocuments */ .HR)(client, collectionName);
        return onReturn(items);
    } catch (e) {
        _lib_logger__WEBPACK_IMPORTED_MODULE_1__/* ["default"].error */ .Z.error(e, logMetadata);
        return undefined;
    }
}


/***/ })

};
;