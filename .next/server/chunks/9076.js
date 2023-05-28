exports.id = 9076;
exports.ids = [9076];
exports.modules = {

/***/ 64483:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MarkDownRenderer": () => (/* binding */ MarkDownRenderer)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(56786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_remark__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(64132);
/* harmony import */ var rehype_raw__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(60913);
/* harmony import */ var rehype_raw__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(rehype_raw__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var rehype_sanitize__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(16356);
/* harmony import */ var rehype_sanitize__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(rehype_sanitize__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var remark_gfm__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(20778);
/* harmony import */ var remark_gfm__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(remark_gfm__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _MarkDownRenderer_module_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(39743);
/* harmony import */ var _MarkDownRenderer_module_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_MarkDownRenderer_module_css__WEBPACK_IMPORTED_MODULE_4__);






function MarkDownRenderer({ children  }) {
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        className: (_MarkDownRenderer_module_css__WEBPACK_IMPORTED_MODULE_4___default().renderer),
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_remark__WEBPACK_IMPORTED_MODULE_5__/* .Remark */ .MN, {
            remarkPlugins: [
                (remark_gfm__WEBPACK_IMPORTED_MODULE_3___default())
            ],
            remarkToRehypeOptions: {
                allowDangerousHtml: true
            },
            rehypePlugins: [
                (rehype_raw__WEBPACK_IMPORTED_MODULE_1___default()),
                (rehype_sanitize__WEBPACK_IMPORTED_MODULE_2___default())
            ],
            children: children
        })
    });
}


/***/ }),

/***/ 39743:
/***/ ((module) => {

// Exports
module.exports = {
	"renderer": "MarkDownRenderer_renderer__WITMu"
};


/***/ }),

/***/ 4475:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ PostRenderer)
});

// EXTERNAL MODULE: ./node_modules/next/dist/compiled/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(83146);
// EXTERNAL MODULE: ./node_modules/dot/index.js
var dot = __webpack_require__(23655);
var dot_default = /*#__PURE__*/__webpack_require__.n(dot);
// EXTERNAL MODULE: external "mongodb"
var external_mongodb_ = __webpack_require__(38013);
// EXTERNAL MODULE: ./node_modules/next/headers.js
var headers = __webpack_require__(68558);
// EXTERNAL MODULE: ./node_modules/next/dist/build/webpack/loaders/next-flight-loader/module-proxy.js
var module_proxy = __webpack_require__(35985);
;// CONCATENATED MODULE: ./src/app/(pages)/admin/post/MarkDownRenderer.tsx

const proxy = (0,module_proxy.createProxy)("/home/runner/work/hackuta2023-site/hackuta2023-site/src/app/(pages)/admin/post/MarkDownRenderer.tsx")

// Accessing the __esModule property and exporting $$typeof are required here.
// The __esModule getter forces the proxy target to create the default export
// and the $$typeof value is for rendering logic to determine if the module
// is a client boundary.
const { __esModule, $$typeof } = proxy;
/* harmony default export */ const MarkDownRenderer = (proxy.default);

const e0 = proxy["MarkDownRenderer"];

// EXTERNAL MODULE: ./src/lib/db/index.ts
var db = __webpack_require__(58051);
// EXTERNAL MODULE: ./src/lib/utils/server.ts
var server = __webpack_require__(44942);
;// CONCATENATED MODULE: ./src/app/(pages)/post/[slug]/constants.ts

const doTSettings = {
    ...(dot_default()).templateSettings,
    strip: false
};

;// CONCATENATED MODULE: ./src/app/(pages)/post/[slug]/PostRenderer.tsx








async function PostRenderer({ post , sourceType  }) {
    const template = post[sourceType] ?? "";
    const renderer = dot_default().template(template, doTSettings);
    const context = await createRenderContext();
    const markdown = renderer(context);
    return /*#__PURE__*/ jsx_runtime.jsx(e0, {
        children: markdown
    });
}
async function createRenderContext() {
    const { user  } = (0,server/* getEnhancedSession */.Kj)((0,headers.headers)());
    const client = await db/* default */.Z;
    const discordAccount = user ? await client.db().collection("accounts").findOne({
        provider: "discord",
        userId: new external_mongodb_.ObjectId(user._id)
    }) : null;
    return {
        user,
        linkedDiscordAccount: !!discordAccount
    };
}


/***/ })

};
;