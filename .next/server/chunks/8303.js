exports.id = 8303;
exports.ids = [8303];
exports.modules = {

/***/ 12169:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "x": () => (/* reexport */ Box)
});

// EXTERNAL MODULE: external "next/dist/compiled/react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(56786);
// EXTERNAL MODULE: ./node_modules/classnames/index.js
var classnames = __webpack_require__(71198);
var classnames_default = /*#__PURE__*/__webpack_require__.n(classnames);
// EXTERNAL MODULE: ./src/components/Box/Box.module.css
var Box_module = __webpack_require__(67168);
var Box_module_default = /*#__PURE__*/__webpack_require__.n(Box_module);
;// CONCATENATED MODULE: ./src/components/Box/Box.tsx



function Box({ as ="div" , display ="flex" , direction ="row" , justifyContent ="normal" , alignItems ="stretch" , wrap ="nowrap" , gap , className , style , children , ...props }) {
    const Component = as;
    const isFlex = display === "flex" || display === "inline-flex";
    return /*#__PURE__*/ jsx_runtime_.jsx(Component, {
        className: classnames_default()((Box_module_default())[display], {
            [(Box_module_default())[`flex-${direction}`]]: isFlex,
            [(Box_module_default())[`justify-${justifyContent}`]]: isFlex,
            [(Box_module_default())[`align-${alignItems}`]]: isFlex,
            [(Box_module_default())[`flex-wrap-${wrap}`]]: isFlex
        }, className),
        style: {
            ...style && style,
            ...gap && {
                gap: gap
            }
        },
        ...props,
        children: children
    });
}

;// CONCATENATED MODULE: ./src/components/Box/index.ts




/***/ }),

/***/ 43939:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Header": () => (/* binding */ Header)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(56786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(71198);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var iconoir_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(52769);
/* harmony import */ var iconoir_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(94623);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(31621);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(18038);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _components_Box__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(12169);
/* harmony import */ var _Header_module_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(80156);
/* harmony import */ var _Header_module_css__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_Header_module_css__WEBPACK_IMPORTED_MODULE_5__);







const Header = ({ items , endItems  })=>{
    const [menuOpen, setMenuOpen] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(false);
    const toggleMenu = ()=>{
        setMenuOpen(!menuOpen);
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("header", {
                className: (_Header_module_css__WEBPACK_IMPORTED_MODULE_5___default().header),
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("nav", {
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_Box__WEBPACK_IMPORTED_MODULE_4__/* .Box */ .x, {
                            as: "ul",
                            direction: "row",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "1.75rem",
                            className: (_Header_module_css__WEBPACK_IMPORTED_MODULE_5___default().horizontal),
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(iconoir_react__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z, {
                                    className: (_Header_module_css__WEBPACK_IMPORTED_MODULE_5___default().icon),
                                    onClick: toggleMenu
                                }),
                                ...items.map(({ link , name  })=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                                        children: link.startsWith("#") ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                            href: link,
                                            children: name
                                        }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_2___default()), {
                                            href: link,
                                            children: name
                                        })
                                    }, link)),
                                ...endItems ? endItems.map(({ link , name  }, i)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                                        className: classnames__WEBPACK_IMPORTED_MODULE_1___default()((_Header_module_css__WEBPACK_IMPORTED_MODULE_5___default().isRight), i === 0 ? (_Header_module_css__WEBPACK_IMPORTED_MODULE_5___default().shiftRight) : undefined),
                                        children: link.startsWith("#") ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                            href: link,
                                            children: name
                                        }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_2___default()), {
                                            href: link,
                                            children: name
                                        })
                                    }, link)) : []
                            ]
                        }),
                        menuOpen ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_Box__WEBPACK_IMPORTED_MODULE_4__/* .Box */ .x, {
                            as: "ul",
                            direction: "column",
                            alignItems: "baseline",
                            justifyContent: "center",
                            gap: "1.75rem",
                            className: (_Header_module_css__WEBPACK_IMPORTED_MODULE_5___default().vertical),
                            children: [
                                ...items.map(({ link , name  })=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("li", {
                                        children: [
                                            link.startsWith("#") ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                                href: link,
                                                onClick: toggleMenu,
                                                children: name
                                            }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_2___default()), {
                                                href: link,
                                                onClick: toggleMenu,
                                                children: name
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(iconoir_react__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z, {
                                                className: (_Header_module_css__WEBPACK_IMPORTED_MODULE_5___default().arrow)
                                            })
                                        ]
                                    }, link))
                            ]
                        }) : undefined
                    ]
                })
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: (_Header_module_css__WEBPACK_IMPORTED_MODULE_5___default().headerOffset)
            })
        ]
    });
};


/***/ }),

/***/ 20623:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "D8": () => (/* reexport safe */ _shared__WEBPACK_IMPORTED_MODULE_1__.D8),
/* harmony export */   "SD": () => (/* reexport safe */ _shared__WEBPACK_IMPORTED_MODULE_1__.SD),
/* harmony export */   "SG": () => (/* binding */ jsonFetcher),
/* harmony export */   "hT": () => (/* binding */ useEnhancedSession),
/* harmony export */   "n": () => (/* reexport safe */ _shared__WEBPACK_IMPORTED_MODULE_1__.n),
/* harmony export */   "w6": () => (/* reexport safe */ _shared__WEBPACK_IMPORTED_MODULE_1__.w6)
/* harmony export */ });
/* harmony import */ var swr__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(68149);
/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(93430);



const jsonFetcher = (...args)=>fetch(...args).then((res)=>res.json());
function useEnhancedSession() {
    const { data , error , isLoading  } = (0,swr__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .ZP)("/api/auth/enhanced-session", jsonFetcher);
    return {
        user: data?.user,
        perms: data?.perms,
        isError: !!error,
        isLoading
    };
}


/***/ }),

/***/ 93430:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "D8": () => (/* binding */ dedupe),
/* harmony export */   "Er": () => (/* binding */ toOption),
/* harmony export */   "SD": () => (/* binding */ fetchPost),
/* harmony export */   "ho": () => (/* binding */ zodEnumToOptions),
/* harmony export */   "n": () => (/* binding */ stringifyError),
/* harmony export */   "w6": () => (/* binding */ range)
/* harmony export */ });
/* unused harmony exports intersection, delay */
function range(start, end) {
    return new Array(end - start).fill(undefined).map((_, i)=>i + start);
}
function stringifyError(e) {
    return e instanceof Error ? e.message : JSON.stringify(e);
}
function dedupe(arr) {
    return [
        ...new Set(arr)
    ];
}
function intersection(a, b) {
    return [
        ...new Set(a.filter((x)=>b.includes(x)))
    ];
}
const toOption = (v)=>({
        label: v.toString(),
        value: v.toString()
    });
const zodEnumToOptions = (zodEnum)=>Object.values(zodEnum.Values).map(toOption);
async function fetchPost(postUrl, body) {
    const response = await (await fetch(postUrl, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: body
    })).json();
    if (response.status === "success") {
        window.location.reload();
    } else {
        throw new Error(stringifyError(response));
    }
}
function delay(ms) {
    return new Promise((resolve)=>setTimeout(resolve, ms));
}


/***/ }),

/***/ 53205:
/***/ ((module) => {

// Exports
module.exports = {
	"socials": "SiteFooter_socials__3mTiU"
};


/***/ }),

/***/ 67168:
/***/ ((module) => {

// Exports
module.exports = {
	"block": "Box_block__da5fs",
	"inline": "Box_inline__wCYvk",
	"inline-block": "Box_inline-block__Yrkhv",
	"flex": "Box_flex__JhI0U",
	"inline-flex": "Box_inline-flex__dtW6n",
	"flex-row": "Box_flex-row__fG85B",
	"flex-column": "Box_flex-column__jT9Rc",
	"flex-row-reverse": "Box_flex-row-reverse__6S__G",
	"flex-column-reverse": "Box_flex-column-reverse__hgrzb",
	"justify-start": "Box_justify-start__cdy3Q",
	"justify-end": "Box_justify-end__4fCiM",
	"justify-center": "Box_justify-center__1AObA",
	"justify-normal": "Box_justify-normal__WebY6",
	"justify-space-between": "Box_justify-space-between__iDICW",
	"justify-space-around": "Box_justify-space-around__a5Tn7",
	"justify-space-evenly": "Box_justify-space-evenly__rQV3Z",
	"align-start": "Box_align-start__QPKwC",
	"align-end": "Box_align-end__mb1LD",
	"align-center": "Box_align-center__NeAro",
	"align-baseline": "Box_align-baseline__xTt1B",
	"align-stretch": "Box_align-stretch__WOwGu",
	"flex-wrap-nowrap": "Box_flex-wrap-nowrap__4azi5",
	"flex-wrap-wrap": "Box_flex-wrap-wrap__i6jz5",
	"flex-wrap-wrap-reverse": "Box_flex-wrap-wrap-reverse__BysSU"
};


/***/ }),

/***/ 64893:
/***/ ((module) => {

// Exports
module.exports = {
	"block": "Box_block__da5fs",
	"inline": "Box_inline__wCYvk",
	"inline-block": "Box_inline-block__Yrkhv",
	"flex": "Box_flex__JhI0U",
	"inline-flex": "Box_inline-flex__dtW6n",
	"flex-row": "Box_flex-row__fG85B",
	"flex-column": "Box_flex-column__jT9Rc",
	"flex-row-reverse": "Box_flex-row-reverse__6S__G",
	"flex-column-reverse": "Box_flex-column-reverse__hgrzb",
	"justify-start": "Box_justify-start__cdy3Q",
	"justify-end": "Box_justify-end__4fCiM",
	"justify-center": "Box_justify-center__1AObA",
	"justify-normal": "Box_justify-normal__WebY6",
	"justify-space-between": "Box_justify-space-between__iDICW",
	"justify-space-around": "Box_justify-space-around__a5Tn7",
	"justify-space-evenly": "Box_justify-space-evenly__rQV3Z",
	"align-start": "Box_align-start__QPKwC",
	"align-end": "Box_align-end__mb1LD",
	"align-center": "Box_align-center__NeAro",
	"align-baseline": "Box_align-baseline__xTt1B",
	"align-stretch": "Box_align-stretch__WOwGu",
	"flex-wrap-nowrap": "Box_flex-wrap-nowrap__4azi5",
	"flex-wrap-wrap": "Box_flex-wrap-wrap__i6jz5",
	"flex-wrap-wrap-reverse": "Box_flex-wrap-wrap-reverse__BysSU"
};


/***/ }),

/***/ 58827:
/***/ ((module) => {

// Exports
module.exports = {
	"footer": "Footer_footer__nKPS_",
	"footerNav": "Footer_footerNav__rdHId",
	"footerNavHeading": "Footer_footerNavHeading__GEAP3"
};


/***/ }),

/***/ 80156:
/***/ ((module) => {

// Exports
module.exports = {
	"header": "Header_header__D4RXM",
	"icon": "Header_icon__YqhMj",
	"horizontal": "Header_horizontal__bJaRO",
	"shiftRight": "Header_shiftRight__fVeU5",
	"vertical": "Header_vertical__2EgiW",
	"arrow": "Header_arrow__Ut6ub",
	"headerOffset": "Header_headerOffset__csfVi",
	"isRight": "Header_isRight__Ob06h"
};


/***/ }),

/***/ 40312:
/***/ ((module) => {

// Exports
module.exports = {
	"heading": "Heading_heading__209rB"
};


/***/ }),

/***/ 53302:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ SiteFooter)
});

// EXTERNAL MODULE: ./node_modules/next/dist/compiled/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(83146);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(42585);
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);
// EXTERNAL MODULE: ./node_modules/classnames/index.js
var classnames = __webpack_require__(98791);
var classnames_default = /*#__PURE__*/__webpack_require__.n(classnames);
// EXTERNAL MODULE: ./src/components/Box/index.ts + 1 modules
var Box = __webpack_require__(72781);
// EXTERNAL MODULE: ./src/components/Heading/index.tsx
var Heading = __webpack_require__(83711);
// EXTERNAL MODULE: ./src/components/Footer/Footer.module.css
var Footer_module = __webpack_require__(58827);
var Footer_module_default = /*#__PURE__*/__webpack_require__.n(Footer_module);
;// CONCATENATED MODULE: ./src/components/Footer/index.tsx





const Footer = ({ children , className , ...props })=>{
    return /*#__PURE__*/ jsx_runtime.jsx(Box/* Box */.x, {
        as: "footer",
        direction: "row",
        className: classnames_default()((Footer_module_default()).footer, className),
        wrap: "wrap",
        ...props,
        children: children
    });
};
const FooterNav = ({ title , links , linkClassName , ...props })=>{
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)(Box/* Box */.x, {
        direction: "column",
        className: (Footer_module_default()).footerNav,
        ...props,
        children: [
            /*#__PURE__*/ jsx_runtime.jsx(Heading/* Heading */.X, {
                level: 2,
                className: (Footer_module_default()).footerNavHeading,
                children: title
            }),
            /*#__PURE__*/ jsx_runtime.jsx("ul", {
                className: linkClassName,
                children: links.map((link, index)=>/*#__PURE__*/ jsx_runtime.jsx("li", {
                        children: link
                    }, index))
            })
        ]
    });
};
const ACMLogo = ()=>{
    return /*#__PURE__*/ _jsxs("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 164.23 47.94",
        fill: "var(--color-white)",
        children: [
            /*#__PURE__*/ _jsx("path", {
                d: "m61.03,17.38l-14.65-14.65c-1.76-1.76-4.1-2.73-6.59-2.73s-4.83.97-6.6,2.73l-1.32,1.32-1.32-1.32c-1.76-1.76-4.1-2.73-6.6-2.73s-4.83.97-6.59,2.73L2.73,17.38c-3.64,3.64-3.64,9.55,0,13.19l14.65,14.65c1.82,1.82,4.21,2.73,6.59,2.73s4.78-.91,6.6-2.73l1.32-1.32,1.32,1.32c1.82,1.82,4.21,2.73,6.6,2.73s4.78-.91,6.59-2.73l14.65-14.65c3.64-3.64,3.64-9.55,0-13.19Zm-34.07,24.24c-1.65,1.65-4.34,1.65-5.99,0l-14.65-14.65c-1.65-1.65-1.65-4.34,0-5.99l14.65-14.65c.8-.8,1.86-1.24,3-1.24s2.2.44,3,1.24l1.32,1.32-9.73,9.73c-3.64,3.64-3.64,9.55,0,13.19l9.73,9.73-1.32,1.32Zm4.91-4.91l-9.73-9.73c-1.65-1.65-1.65-4.34,0-5.99l9.73-9.73,9.73,9.73c1.65,1.65,1.65,4.34,0,5.99l-9.73,9.73Zm25.55-9.73l-14.65,14.65c-1.65,1.65-4.34,1.65-5.99,0l-1.32-1.32,9.73-9.73c3.64-3.64,3.64-9.55,0-13.19l-9.73-9.73,1.32-1.32c.8-.8,1.87-1.24,3-1.24s2.2.44,3,1.24l14.65,14.65c1.65,1.65,1.65,4.34,0,5.99Z"
            }),
            /*#__PURE__*/ _jsxs("g", {
                children: [
                    /*#__PURE__*/ _jsx("path", {
                        d: "m77.07,27.53h-4.49l-.6,1.9h-3.02l4.11-12.09h3.52l4.11,12.09h-3.02l-.6-1.9Zm-.83-2.59l-1.42-4.44-1.42,4.44h2.83Z"
                    }),
                    /*#__PURE__*/ _jsx("path", {
                        d: "m80.79,23.38c0-3.56,2.64-6.29,6.29-6.29,2.19,0,4.13,1.09,5.18,2.8l-2.38,1.38c-.54-.93-1.57-1.49-2.8-1.49-2.14,0-3.52,1.43-3.52,3.59s1.38,3.59,3.52,3.59c1.23,0,2.28-.55,2.8-1.49l2.38,1.38c-1.04,1.71-2.97,2.8-5.18,2.8-3.64,0-6.29-2.73-6.29-6.29Z"
                    }),
                    /*#__PURE__*/ _jsx("path", {
                        d: "m105.65,29.43h-2.76v-7.03l-3.13,5.13h-.31l-3.13-5.13v7.03h-2.76v-12.09h2.76l3.28,5.37,3.28-5.37h2.76v12.09Z"
                    }),
                    /*#__PURE__*/ _jsx("path", {
                        d: "m120.82,20.79v8.64h-2.59v-.81c-.57.66-1.42,1.05-2.57,1.05-2.26,0-4.13-1.99-4.13-4.56s1.87-4.56,4.13-4.56c1.16,0,2,.4,2.57,1.05v-.81h2.59Zm-2.59,4.32c0-1.3-.86-2.11-2.06-2.11s-2.06.81-2.06,2.11.86,2.11,2.06,2.11,2.06-.81,2.06-2.11Z"
                    }),
                    /*#__PURE__*/ _jsx("path", {
                        d: "m126,23.28v3.06c0,.74.64.81,1.78.74v2.35c-3.39.35-4.37-.67-4.37-3.09v-3.06h-1.38v-2.49h1.38v-1.64l2.59-.78v2.42h1.78v2.49h-1.78Z"
                    }),
                    /*#__PURE__*/ _jsx("path", {
                        d: "m133.74,25.52v-8.19h2.76v7.95c0,.92.43,1.69,1.9,1.69s1.9-.78,1.9-1.69v-7.95h2.76v8.19c0,2.59-2,4.15-4.66,4.15s-4.66-1.55-4.66-4.15Z"
                    }),
                    /*#__PURE__*/ _jsx("path", {
                        d: "m153.17,19.99h-3.11v9.43h-2.76v-9.43h-3.11v-2.66h8.98v2.66Z"
                    }),
                    /*#__PURE__*/ _jsx("path", {
                        d: "m160.6,27.53h-4.49l-.6,1.9h-3.02l4.11-12.09h3.52l4.11,12.09h-3.02l-.6-1.9Zm-.83-2.59l-1.42-4.44-1.42,4.44h2.83Z"
                    })
                ]
            })
        ]
    });
};

// EXTERNAL MODULE: ./src/app/SiteFooter.module.css
var SiteFooter_module = __webpack_require__(53205);
var SiteFooter_module_default = /*#__PURE__*/__webpack_require__.n(SiteFooter_module);
;// CONCATENATED MODULE: ./src/app/SiteFooter.tsx
// import { Discord, Instagram, Twitter } from 'iconoir-react'




function SiteFooter() {
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)(Footer, {
        children: [
            /*#__PURE__*/ jsx_runtime.jsx(FooterNav, {
                title: "Socials",
                linkClassName: (SiteFooter_module_default()).socials,
                links: []
            }),
            /*#__PURE__*/ jsx_runtime.jsx(FooterNav, {
                title: "Policy",
                links: [
                    /*#__PURE__*/ jsx_runtime.jsx((link_default()), {
                        href: "https://www.acm.org/code-of-ethics",
                        children: "ACM Code of Ethics"
                    }, "acm"),
                    /*#__PURE__*/ jsx_runtime.jsx((link_default()), {
                        href: "https://static.mlh.io/docs/mlh-code-of-conduct.pdf",
                        children: "MLH Code of Conduct"
                    }, "mlh"),
                    /*#__PURE__*/ jsx_runtime.jsx((link_default()), {
                        href: "https://libraries.uta.edu/about/policies",
                        children: "UTA Library Policies"
                    }, "uta"),
                    /*#__PURE__*/ jsx_runtime.jsx((link_default()), {
                        href: "https://guide.mlh.io",
                        children: "We closely followed the MLH Hackathon Organizer Guide"
                    }, "mlh-guide")
                ]
            })
        ]
    });
}


/***/ }),

/***/ 72781:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "x": () => (/* reexport */ Box)
});

// EXTERNAL MODULE: ./node_modules/next/dist/compiled/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(83146);
// EXTERNAL MODULE: ./node_modules/classnames/index.js
var classnames = __webpack_require__(98791);
var classnames_default = /*#__PURE__*/__webpack_require__.n(classnames);
// EXTERNAL MODULE: ./src/components/Box/Box.module.css
var Box_module = __webpack_require__(64893);
var Box_module_default = /*#__PURE__*/__webpack_require__.n(Box_module);
;// CONCATENATED MODULE: ./src/components/Box/Box.tsx



function Box({ as ="div" , display ="flex" , direction ="row" , justifyContent ="normal" , alignItems ="stretch" , wrap ="nowrap" , gap , className , style , children , ...props }) {
    const Component = as;
    const isFlex = display === "flex" || display === "inline-flex";
    return /*#__PURE__*/ jsx_runtime.jsx(Component, {
        className: classnames_default()((Box_module_default())[display], {
            [(Box_module_default())[`flex-${direction}`]]: isFlex,
            [(Box_module_default())[`justify-${justifyContent}`]]: isFlex,
            [(Box_module_default())[`align-${alignItems}`]]: isFlex,
            [(Box_module_default())[`flex-wrap-${wrap}`]]: isFlex
        }, className),
        style: {
            ...style && style,
            ...gap && {
                gap: gap
            }
        },
        ...props,
        children: children
    });
}

;// CONCATENATED MODULE: ./src/components/Box/index.ts




/***/ }),

/***/ 83711:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "X": () => (/* binding */ Heading)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(83146);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(98791);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Heading_module_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(40312);
/* harmony import */ var _Heading_module_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_Heading_module_css__WEBPACK_IMPORTED_MODULE_2__);



const Heading = ({ level =1 , children , className , ...props })=>{
    const Tag = !level ? "h1" : `h${level}`;
    const HeadingTag = Tag;
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(HeadingTag, {
        className: classnames__WEBPACK_IMPORTED_MODULE_1___default()((_Heading_module_css__WEBPACK_IMPORTED_MODULE_2___default().heading), className),
        ...props,
        children: children
    });
};


/***/ })

};
;