exports.id = 2084;
exports.ids = [2084];
exports.modules = {

/***/ 64818:
/***/ ((module) => {

// Exports
module.exports = {
	"accordion": "Accordion_accordion__SagxK",
	"child": "Accordion_child__Z5vxT"
};


/***/ }),

/***/ 72084:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "o": () => (/* binding */ FaqSection),
  "n": () => (/* binding */ getFaqs)
});

// EXTERNAL MODULE: ./node_modules/next/dist/compiled/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(83146);
// EXTERNAL MODULE: ./node_modules/classnames/index.js
var classnames = __webpack_require__(98791);
var classnames_default = /*#__PURE__*/__webpack_require__.n(classnames);
// EXTERNAL MODULE: ./node_modules/iconoir-react/dist/esm/server/ArrowRight.mjs
var ArrowRight = __webpack_require__(80102);
// EXTERNAL MODULE: ./src/components/Accordion/Accordion.module.css
var Accordion_module = __webpack_require__(64818);
var Accordion_module_default = /*#__PURE__*/__webpack_require__.n(Accordion_module);
;// CONCATENATED MODULE: ./src/components/Accordion/index.tsx




function Accordion({ children , dangerouslySetInnerHTMLOnChildren , summary , className , summaryClassName , summaryProps  }) {
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)("details", {
        className: classnames_default()((Accordion_module_default()).accordion, className),
        children: [
            /*#__PURE__*/ (0,jsx_runtime.jsxs)("summary", {
                className: summaryClassName,
                ...summaryProps,
                children: [
                    summary,
                    " ",
                    /*#__PURE__*/ jsx_runtime.jsx(ArrowRight/* default */.Z, {
                        "aria-hidden": true
                    })
                ]
            }),
            /*#__PURE__*/ jsx_runtime.jsx("div", {
                className: (Accordion_module_default()).child,
                dangerouslySetInnerHTML: dangerouslySetInnerHTMLOnChildren,
                children: children
            })
        ]
    });
}

// EXTERNAL MODULE: ./src/app/(pages)/PageSection.tsx
var PageSection = __webpack_require__(44151);
// EXTERNAL MODULE: ./src/app/(pages)/utils.tsx
var utils = __webpack_require__(39120);
;// CONCATENATED MODULE: ./src/app/(pages)/faq/utils.tsx




function FaqSection({ faqs  }) {
    const content = !faqs ? /*#__PURE__*/ jsx_runtime.jsx(jsx_runtime.Fragment, {
        children: "Failed loading FAQs. Please try again later."
    }) : /*#__PURE__*/ jsx_runtime.jsx(jsx_runtime.Fragment, {
        children: faqs.map(({ q , a  })=>/*#__PURE__*/ jsx_runtime.jsx(Accordion, {
                summary: q,
                // DANGER: Absolutely no unsanitized user input allowed!!! We deem admins trustworthy.
                dangerouslySetInnerHTMLOnChildren: {
                    __html: a
                }
            }, `${q}-${a}`))
    });
    return /*#__PURE__*/ jsx_runtime.jsx(PageSection/* default */.Z, {
        heading: "FAQ",
        children: content
    });
}
async function getFaqs() {
    return (0,utils/* queryDbForItems */.C)("faqs", "[@/app/faq/page.tsx#getFaqs]");
}


/***/ })

};
;