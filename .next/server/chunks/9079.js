exports.id = 9079;
exports.ids = [9079];
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

/***/ 10339:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ PostEditor)
});

// EXTERNAL MODULE: external "next/dist/compiled/react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(56786);
// EXTERNAL MODULE: external "next/dist/compiled/react"
var react_ = __webpack_require__(18038);
// EXTERNAL MODULE: ./src/components/Box/index.ts + 1 modules
var Box = __webpack_require__(12169);
// EXTERNAL MODULE: ./src/components/Button/index.tsx
var Button = __webpack_require__(52790);
// EXTERNAL MODULE: ./src/components/Form/index.ts + 2 modules
var Form = __webpack_require__(20946);
// EXTERNAL MODULE: ./src/components/Form/Label.tsx
var Label = __webpack_require__(75747);
;// CONCATENATED MODULE: ./src/components/Form/Checkbox.tsx




const Checkbox = ({ text , description , id , name , ...props })=>{
    const [checked, setChecked] = (0,react_.useState)(props.defaultChecked ?? props.checked ?? false);
    const handleClick = ()=>setChecked(!checked);
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(Box/* Box */.x, {
        direction: "row",
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx("input", {
                type: "checkbox",
                id: id,
                name: name ?? id,
                "aria-labelledby": `${id}-title`,
                "aria-describedby": description && `${id}-description`,
                checked: checked,
                onChange: handleClick,
                ...props
            }),
            /*#__PURE__*/ jsx_runtime_.jsx(Label/* Label */._, {
                text: text,
                description: description,
                id: id
            })
        ]
    });
};

// EXTERNAL MODULE: ./node_modules/zod/lib/index.mjs
var lib = __webpack_require__(17123);
;// CONCATENATED MODULE: ./src/lib/db/models/Post.ts

const PostSlugPattern = /^[a-z0-9-]+$/;
const CardStyleSchema = lib/* default.enum */.ZP["enum"]([
    "blue",
    "green",
    "red",
    "yellow",
    "white"
]);
const PostSchema = lib/* default.object */.ZP.object({
    name: lib/* default.string */.ZP.string().nonempty(),
    slug: lib/* default.string */.ZP.string().regex(PostSlugPattern),
    priority: lib/* default.number */.ZP.number({
        description: "Lower number, higher priority."
    }),
    hidden: lib/* default.boolean */.ZP.boolean().optional(),
    cardStyle: CardStyleSchema.optional(),
    briefSource: lib/* default.string */.ZP.string({
        description: "A brief over the post in MarkDown using doT template"
    }).optional(),
    contentSource: lib/* default.string */.ZP.string({
        description: "The main content of the post in MarkDown using doT template"
    }).optional()
});

// EXTERNAL MODULE: ./src/lib/utils/shared.ts
var shared = __webpack_require__(93430);
// EXTERNAL MODULE: ./src/app/(pages)/admin/post/MarkDownEditor.module.css
var MarkDownEditor_module = __webpack_require__(15111);
var MarkDownEditor_module_default = /*#__PURE__*/__webpack_require__.n(MarkDownEditor_module);
// EXTERNAL MODULE: ./src/app/(pages)/admin/post/MarkDownRenderer.tsx
var MarkDownRenderer = __webpack_require__(64483);
;// CONCATENATED MODULE: ./src/app/(pages)/admin/post/MarkDownEditor.tsx





function MarkDownEditor({ description , formInputId , height , label , onSourceChange , source  }) {
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(Box/* Box */.x, {
        direction: "row",
        gap: "1rem",
        style: {
            height: height ?? "36rem",
            maxHeight: "100vh"
        },
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx(Form/* TextInput */.oi, {
                text: label,
                description: description,
                id: formInputId,
                isMultiline: true,
                value: source,
                onChange: (e)=>onSourceChange?.(e.target.value),
                spellCheck: false,
                style: {
                    flex: 1,
                    fontFamily: "monospace"
                },
                boxProps: {
                    style: {
                        flex: 1
                    }
                }
            }),
            /*#__PURE__*/ jsx_runtime_.jsx(Preview, {
                label: label,
                source: source
            })
        ]
    });
}
function Preview({ label , source  }) {
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(Box/* Box */.x, {
        direction: "column",
        className: (MarkDownEditor_module_default()).preview,
        children: [
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("span", {
                children: [
                    label,
                    " Preview"
                ]
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("article", {
                children: source ? /*#__PURE__*/ jsx_runtime_.jsx(MarkDownRenderer.MarkDownRenderer, {
                    children: source
                }) : undefined
            })
        ]
    });
}

;// CONCATENATED MODULE: ./src/app/(pages)/admin/post/NameSlugInput.tsx





function NameSlugInput({ name , readOnly , slug: initialSlug  }) {
    const [slug, setSlug] = (0,react_.useState)(initialSlug);
    const [isSlugManuallySet, setIsSlugManuallySet] = (0,react_.useState)(false);
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(Box/* Box */.x, {
        direction: "row",
        wrap: "wrap",
        gap: "1rem",
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx(Form/* TextInput */.oi, {
                id: "name",
                text: "Name",
                description: "A human-readable name",
                defaultValue: name,
                onChange: (e)=>{
                    if (isSlugManuallySet) {
                        return;
                    }
                    const newValue = e.target.value;
                    setSlug(newValue.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""));
                },
                readOnly: readOnly,
                required: true,
                minLength: 1
            }),
            /*#__PURE__*/ jsx_runtime_.jsx(Form/* TextInput */.oi, {
                id: "slug",
                text: "URL Slug",
                description: `Must match ${PostSlugPattern.toString()}.`,
                value: slug,
                onChange: (e)=>setSlug(e.target.value),
                onKeyDown: ()=>setIsSlugManuallySet(true),
                readOnly: readOnly,
                spellCheck: false,
                required: true,
                minLength: 1,
                pattern: PostSlugPattern.toString().slice(1, -1)
            })
        ]
    });
}

;// CONCATENATED MODULE: ./src/app/(pages)/admin/post/PostEditor.tsx










function PostEditor({ briefSource: initialBriefSource , contentSource: initialContentSource , hidden , name , priority , slug , cardStyle  }) {
    const isEditing = !!slug;
    // The internal states are used on <TextInput>'s to make sure hydration works.
    // We will then synchronize the persisted states backed by the local storage on client side.
    const [briefSource, setBriefSource] = (0,react_.useState)(initialBriefSource);
    const [contentSource, setContentSource] = (0,react_.useState)(initialContentSource);
    const submit = ()=>{
        if (!isEditing) {
            setTimeout(()=>{
                // Clear local storage of the sources on submission.
                setBriefSource("");
                setContentSource("");
            }, 1);
        }
    };
    const cardStyleOptions = (0,shared/* zodEnumToOptions */.ho)(CardStyleSchema);
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(Box/* Box */.x, {
        as: "form",
        direction: "column",
        action: "/admin/post/submit",
        method: "POST",
        gap: "1.5rem",
        onSubmit: submit,
        children: [
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)(Box/* Box */.x, {
                direction: "row",
                alignItems: "start",
                wrap: "wrap",
                gap: "1rem",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx(NameSlugInput, {
                        name: name,
                        slug: slug,
                        readOnly: isEditing
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx(Form/* TextInput */.oi, {
                        id: "priority",
                        text: "Priority",
                        description: "Lower number, higher priority.",
                        defaultValue: priority ?? 10,
                        required: true,
                        pattern: "\\d+"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx(Checkbox, {
                        id: "hidden",
                        text: "Hide the Post",
                        defaultChecked: hidden
                    })
                ]
            }),
            /*#__PURE__*/ jsx_runtime_.jsx(Box/* Box */.x, {
                direction: "row",
                alignItems: "start",
                wrap: "wrap",
                gap: "1rem",
                children: /*#__PURE__*/ jsx_runtime_.jsx(Form/* Dropdown */.Lt, {
                    id: "cardStyle",
                    text: "Card Style",
                    description: "Change look of the Dashboard card",
                    options: cardStyleOptions,
                    selectProps: {
                        defaultValue: cardStyle ? cardStyleOptions.find((o)=>o.value === cardStyle) : undefined
                    },
                    isClearable: true
                })
            }),
            /*#__PURE__*/ jsx_runtime_.jsx(MarkDownEditor, {
                label: "Brief",
                formInputId: "brief",
                description: "(Optional) If provided, a card with the brief will be added to Dashboard. MarkDown with doT template is available.",
                source: briefSource,
                onSourceChange: (newValue)=>setBriefSource(newValue),
                height: "16rem"
            }),
            /*#__PURE__*/ jsx_runtime_.jsx(MarkDownEditor, {
                label: "Content",
                formInputId: "content",
                description: "(Optional) If provided, a subpage with the content will be created. MarkDown with doT template is available.",
                source: contentSource,
                onSourceChange: (newValue)=>setContentSource(newValue)
            }),
            /*#__PURE__*/ jsx_runtime_.jsx(Box/* Box */.x, {
                direction: "row",
                children: /*#__PURE__*/ jsx_runtime_.jsx(Button/* Button */.zx, {
                    type: "submit",
                    children: isEditing ? "Update" : "Post"
                })
            })
        ]
    });
}


/***/ }),

/***/ 34914:
/***/ (() => {



/***/ }),

/***/ 15111:
/***/ ((module) => {

// Exports
module.exports = {
	"preview": "MarkDownEditor_preview__EGGCR"
};


/***/ }),

/***/ 39743:
/***/ ((module) => {

// Exports
module.exports = {
	"renderer": "MarkDownRenderer_renderer__WITMu"
};


/***/ }),

/***/ 71370:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ZP": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* unused harmony exports __esModule, $$typeof */
/* harmony import */ var next_dist_build_webpack_loaders_next_flight_loader_module_proxy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(35985);

const proxy = (0,next_dist_build_webpack_loaders_next_flight_loader_module_proxy__WEBPACK_IMPORTED_MODULE_0__.createProxy)("/home/runner/work/hackuta2023-site/hackuta2023-site/src/app/(pages)/admin/post/PostEditor.tsx")

// Accessing the __esModule property and exporting $$typeof are required here.
// The __esModule getter forces the proxy target to create the default export
// and the $$typeof value is for rendering logic to determine if the module
// is a client boundary.
const { __esModule, $$typeof } = proxy;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (proxy.default);


/***/ }),

/***/ 58752:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PostLayout)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(83146);

async function PostLayout({ children  }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h1", {
                children: "Posts"
            }),
            children
        ]
    });
}


/***/ })

};
;