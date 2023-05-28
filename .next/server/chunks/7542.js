exports.id = 7542;
exports.ids = [7542];
exports.modules = {

/***/ 74308:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "C": () => (/* binding */ ToggleButton)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(56786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var iconoir_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(63608);
/* harmony import */ var iconoir_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(90580);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(18038);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(52790);




function ToggleButton({ selected =false , text , ...props }) {
    const id = (0,react__WEBPACK_IMPORTED_MODULE_1__.useId)();
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(___WEBPACK_IMPORTED_MODULE_2__/* .Button */ .zx, {
        kind: selected ? "primary" : "secondary",
        role: "checkbox",
        "aria-checked": selected,
        id: id,
        "aria-labelledby": id,
        ...props,
        children: [
            selected ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(iconoir_react__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z, {
                "aria-hidden": true
            }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(iconoir_react__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z, {
                "aria-hidden": true
            }),
            text
        ]
    });
}


/***/ }),

/***/ 52790:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "zx": () => (/* binding */ Button)
/* harmony export */ });
/* unused harmony export LinkButton */
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(56786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(71198);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(31621);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Button_module_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(45206);
/* harmony import */ var _Button_module_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_Button_module_css__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _ToggleButton__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(74308);





function Button({ children , className , kind ="primary" , type ="button" , ...props }) {
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
        type: type,
        className: classnames__WEBPACK_IMPORTED_MODULE_1___default()((_Button_module_css__WEBPACK_IMPORTED_MODULE_4___default().button), (_Button_module_css__WEBPACK_IMPORTED_MODULE_4___default())[kind], className),
        ...props,
        children: children
    });
}
function LinkButton({ children , kind ="primary" , ...props }) {
    return /*#__PURE__*/ _jsx(Link, {
        className: classNames(styles.button, styles[kind]),
        ...props,
        children: children
    });
}


/***/ }),

/***/ 45206:
/***/ ((module) => {

// Exports
module.exports = {
	"button": "Button_button__L2wUb",
	"primary": "Button_primary__wnomA",
	"secondary": "Button_secondary__HrEDu"
};


/***/ })

};
;