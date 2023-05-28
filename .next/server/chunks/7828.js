exports.id = 7828;
exports.ids = [7828];
exports.modules = {

/***/ 39620:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ SubpageHeader)
});

// EXTERNAL MODULE: external "next/dist/compiled/react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(56786);
// EXTERNAL MODULE: ./src/components/Header/index.tsx
var Header = __webpack_require__(43939);
;// CONCATENATED MODULE: ./src/lib/auth/shared.ts
const RolePermissionMap = {
    "@unauthenticated": {
    },
    "@authenticated": {
    },
    organizer: {
        administration: true,
        applications: {
            submit: true,
            manage: {
                basic: true
            }
        },
        checkIn: true
    },
    sponsor: {
        administration: true,
        posts: true,
        teams: true,
        users: true
    },
    admin: {
        administration: true,
        applications: {
            submit: true,
            manage: {
                basic: true
            }
        },
        checkIn: true,
        faqs: true,
        marketing: true,
        posts: true,
        schedule: true,
        teams: true,
        users: true
    }
};
function hasPermission(granted, required) {
    if (granted === true || required === undefined) {
        return true;
    } else if (granted === undefined || required === true) {
        // An object with every possible field set to `true` is NOT equivalent to a literal `true`.
        // If a route requires a permission to be `true`, the `true` must be explicitly granted.
        return false;
    } else {
        return Object.entries(required).every(([k, v])=>hasPermission(granted[k], v));
    }
}
/**
 * @param permissions Permissions to merge.
 * @returns The merged permission. Once a permission is given, it CANNOT be revoked by a later permission during merging.
 */ function mergePermission(...permissions) {
    const result = {};
    for (const permission of permissions){
        if (permission === undefined) {
            continue;
        } else if (permission === true) {
            // This is the highest possible permission.
            // There's nothing to merge anymore. Return immediately.
            return true;
        }
        for (const [key, value] of Object.entries(permission)){
            result[key] = mergePermission(result[key], value);
        }
    }
    return result;
}
const RoutePermissions = [
    {
        matcher: new RegExp("^/$"),
        perms: undefined
    },
    {
        matcher: new RegExp("^/admin($|/)"),
        perms: {
            administration: {
                read: true
            }
        }
    },
    {
        matcher: new RegExp("^/admin/applications"),
        perms: {
            applications: {
                manage: {
                    basic: {
                        read: true
                    }
                }
            }
        }
    },
    {
        matcher: new RegExp("^/admin/check-in"),
        perms: {
            checkIn: {
                write: true
            }
        }
    },
    {
        matcher: new RegExp("^/admin/marketing"),
        perms: {
            marketing: {
                write: true
            }
        }
    },
    {
        matcher: new RegExp("^/admin/post"),
        perms: {
            posts: {
                write: true
            }
        }
    },
    {
        matcher: new RegExp("^/admin/teams"),
        perms: {
            teams: {
                read: true
            }
        }
    },
    {
        matcher: new RegExp("^/admin/users"),
        perms: {
            users: {
                read: true
            }
        }
    },
    {
        matcher: new RegExp("^/api/admin/user"),
        perms: {
            applications: {
                manage: {
                    basic: {
                        write: true
                    }
                }
            }
        }
    },
    {
        matcher: new RegExp("^/api/auth"),
        perms: {
            auth: {
                write: true
            }
        }
    },
    {
        matcher: new RegExp("^/faq$"),
        perms: {
            faqs: {
                read: true
            }
        }
    },
    {
        matcher: new RegExp("^/post/"),
        perms: {
            posts: {
                read: true
            }
        }
    },
    {
        matcher: new RegExp("^/schedule$"),
        perms: {
            schedule: {
                read: true
            }
        }
    }
];

// EXTERNAL MODULE: ./src/lib/utils/client.ts
var client = __webpack_require__(20623);
;// CONCATENATED MODULE: ./src/app/(pages)/SubpageHeader.tsx




function SubpageHeader() {
    const { user , perms  } = (0,client/* useEnhancedSession */.hT)();
    return /*#__PURE__*/ jsx_runtime_.jsx(Header.Header, {
        items: [
            {
                link: "/",
                name: user?.application ? "Dashboard" : user ? "Apply" : "Home"
            },
            {
                link: "/faq",
                name: "FAQ"
            },
            {
                link: "/schedule",
                name: "Schedule"
            }
        ],
        endItems: [
            ...hasPermission(perms, {
                administration: {
                    read: true
                }
            }) ? [
                {
                    link: "/admin",
                    name: "Admin"
                }
            ] : [],
            user ? {
                link: "/api/auth/signout",
                name: "Sign out"
            } : {
                link: "/api/auth/signin",
                name: "Sign in"
            }
        ]
    });
}


/***/ }),

/***/ 98209:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Error)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(56786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(18038);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


function Error({ error  }) {
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        console.error(error);
    }, [
        error
    ]);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h2", {
                children: "Error"
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                children: error.message
            })
        ]
    });
}


/***/ }),

/***/ 22152:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 98209))

/***/ }),

/***/ 66713:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 34027, 23));
Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 39620))

/***/ }),

/***/ 86944:
/***/ ((module) => {

// Exports
module.exports = {
	"subpageLayoutRoot": "layout_subpageLayoutRoot__XCDrl",
	"subpageMain": "layout_subpageMain__I__ct"
};


/***/ }),

/***/ 86655:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "$$typeof": () => (/* binding */ $$typeof),
/* harmony export */   "__esModule": () => (/* binding */ __esModule),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var next_dist_build_webpack_loaders_next_flight_loader_module_proxy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(35985);

const proxy = (0,next_dist_build_webpack_loaders_next_flight_loader_module_proxy__WEBPACK_IMPORTED_MODULE_0__.createProxy)("/home/runner/work/hackuta2023-site/hackuta2023-site/src/app/(pages)/error.tsx")

// Accessing the __esModule property and exporting $$typeof are required here.
// The __esModule getter forces the proxy target to create the default export
// and the $$typeof value is for rendering logic to determine if the module
// is a client boundary.
const { __esModule, $$typeof } = proxy;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (proxy.default);


/***/ }),

/***/ 99317:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ SubpageLayout)
});

// EXTERNAL MODULE: ./node_modules/next/dist/compiled/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(83146);
// EXTERNAL MODULE: ./src/components/Box/index.ts + 1 modules
var Box = __webpack_require__(72781);
// EXTERNAL MODULE: ./src/app/SiteFooter.tsx + 1 modules
var SiteFooter = __webpack_require__(53302);
// EXTERNAL MODULE: ./src/app/(pages)/layout.module.css
var layout_module = __webpack_require__(86944);
var layout_module_default = /*#__PURE__*/__webpack_require__.n(layout_module);
// EXTERNAL MODULE: ./node_modules/next/dist/build/webpack/loaders/next-flight-loader/module-proxy.js
var module_proxy = __webpack_require__(35985);
;// CONCATENATED MODULE: ./src/app/(pages)/SubpageHeader.tsx

const proxy = (0,module_proxy.createProxy)("/home/runner/work/hackuta2023-site/hackuta2023-site/src/app/(pages)/SubpageHeader.tsx")

// Accessing the __esModule property and exporting $$typeof are required here.
// The __esModule getter forces the proxy target to create the default export
// and the $$typeof value is for rendering logic to determine if the module
// is a client boundary.
const { __esModule, $$typeof } = proxy;
/* harmony default export */ const SubpageHeader = (proxy.default);

;// CONCATENATED MODULE: ./src/app/(pages)/layout.tsx





async function SubpageLayout({ children  }) {
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)(Box/* Box */.x, {
        direction: "column",
        className: (layout_module_default()).subpageLayoutRoot,
        children: [
            /*#__PURE__*/ jsx_runtime.jsx(SubpageHeader, {}),
            /*#__PURE__*/ jsx_runtime.jsx("main", {
                className: (layout_module_default()).subpageMain,
                children: children
            }),
            /*#__PURE__*/ jsx_runtime.jsx(SiteFooter/* default */.Z, {})
        ]
    });
}


/***/ })

};
;