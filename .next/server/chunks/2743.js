"use strict";
exports.id = 2743;
exports.ids = [2743];
exports.modules = {

/***/ 54742:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ JsonEditor)
});

// EXTERNAL MODULE: external "next/dist/compiled/react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(56786);
// EXTERNAL MODULE: external "next/dist/compiled/react"
var react_ = __webpack_require__(18038);
// EXTERNAL MODULE: ./node_modules/zod-validation-error/dist/cjs/index.js
var cjs = __webpack_require__(80017);
// EXTERNAL MODULE: ./src/components/Box/index.ts + 1 modules
var Box = __webpack_require__(12169);
// EXTERNAL MODULE: ./src/components/Button/index.tsx
var Button = __webpack_require__(52790);
// EXTERNAL MODULE: ./node_modules/zod/lib/index.mjs
var lib = __webpack_require__(17123);
;// CONCATENATED MODULE: ./src/lib/db/models/Event.ts

const EventSchema = lib/* default.object */.ZP.object({
    startTime: lib/* default.string */.ZP.string().datetime(),
    durationMins: lib/* default.number */.ZP.number().positive().int(),
    title: lib/* default.string */.ZP.string(),
    shortDesc: lib/* default.string */.ZP.string(),
    longDesc: lib/* default.string */.ZP.string(),
    categories: lib/* default.string */.ZP.string().array()
});

;// CONCATENATED MODULE: ./src/lib/db/models/Faq.ts

const FaqSchema = lib/* default.object */.ZP.object({
    q: lib/* default.string */.ZP.string().nonempty(),
    a: lib/* default.string */.ZP.string().nonempty()
});

// EXTERNAL MODULE: ./src/lib/utils/client.ts
var client = __webpack_require__(20623);
;// CONCATENATED MODULE: ./src/app/(pages)/admin/JsonEditor.tsx








const SchemaMap = {
    event: EventSchema,
    faq: FaqSchema
};
function JsonEditor({ text , postUrl , schema  }) {
    const [textVal, setTextVal] = (0,react_.useState)(text);
    const [error, setError] = (0,react_.useState)();
    const save = async ()=>{
        try {
            const isValid = validate();
            if (isValid) {
                await (0,client/* fetchPost */.SD)(postUrl, textVal);
            }
        } catch (e) {
            setError((0,client/* stringifyError */.n)(e));
        }
    };
    const validate = ()=>{
        try {
            const obj = JSON.parse(textVal);
            setTextVal(JSON.stringify(obj, undefined, 4));
            const result = SchemaMap[schema].array().safeParse(obj);
            if (result.success) {
                setError(undefined);
                return true;
            } else {
                setError((0,cjs/* fromZodError */.CC)(result.error).message);
            }
        } catch (e) {
            setError((0,client/* stringifyError */.n)(e));
        }
        return false;
    };
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(Box/* Box */.x, {
        direction: "column",
        gap: "1rem",
        children: [
            error,
            /*#__PURE__*/ jsx_runtime_.jsx("textarea", {
                id: "json",
                rows: 16,
                cols: 80,
                value: textVal,
                onChange: (e)=>setTextVal(e.target.value)
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)(Box/* Box */.x, {
                direction: "row",
                gap: "1rem",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx(Button/* Button */.zx, {
                        onClick: save,
                        children: "Save"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx(Button/* Button */.zx, {
                        kind: "secondary",
                        onClick: validate,
                        children: "Validate"
                    })
                ]
            })
        ]
    });
}


/***/ }),

/***/ 47626:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ZP": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* unused harmony exports __esModule, $$typeof */
/* harmony import */ var next_dist_build_webpack_loaders_next_flight_loader_module_proxy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(35985);

const proxy = (0,next_dist_build_webpack_loaders_next_flight_loader_module_proxy__WEBPACK_IMPORTED_MODULE_0__.createProxy)("/home/runner/work/hackuta2023-site/hackuta2023-site/src/app/(pages)/admin/JsonEditor.tsx")

// Accessing the __esModule property and exporting $$typeof are required here.
// The __esModule getter forces the proxy target to create the default export
// and the $$typeof value is for rendering logic to determine if the module
// is a client boundary.
const { __esModule, $$typeof } = proxy;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (proxy.default);


/***/ })

};
;