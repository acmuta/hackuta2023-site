"use strict";
exports.id = 4942;
exports.ids = [4942];
exports.modules = {

/***/ 28513:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _lib_utils_shared__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(91628);
// JSend is a specification for JSON-based application-level communication.
// https://github.com/omniti-labs/jsend

const jsend = Object.freeze({
    error: (message, data)=>({
            status: "error",
            data,
            message: (0,_lib_utils_shared__WEBPACK_IMPORTED_MODULE_0__/* .stringifyError */ .n)(message)
        }),
    fail: (data)=>({
            status: "fail",
            data
        }),
    success: (data)=>({
            status: "success",
            data
        })
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (jsend);


/***/ }),

/***/ 96707:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Fs": () => (/* binding */ hasPermission),
/* harmony export */   "wI": () => (/* binding */ RolePermissionMap)
/* harmony export */ });
/* unused harmony exports mergePermission, RoutePermissions */
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


/***/ }),

/***/ 21494:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ lib_logger)
});

// EXTERNAL MODULE: ./node_modules/pino/pino.js
var pino = __webpack_require__(5624);
var pino_default = /*#__PURE__*/__webpack_require__.n(pino);
// EXTERNAL MODULE: ./node_modules/node-fetch/src/index.js + 12 modules
var src = __webpack_require__(21945);
// EXTERNAL MODULE: external "stream"
var external_stream_ = __webpack_require__(12781);
;// CONCATENATED MODULE: ./src/lib/logger/DiscordWebhookDestination.ts


class DiscordWebhookStream extends external_stream_.Writable {
    constructor(webhookUrl){
        super({
            objectMode: true
        });
        this.webhookUrl = webhookUrl;
    }
    async _write(chunk, encoding, callback) {
        const data = chunk.toString();
        try {
            await (0,src/* default */.ZP)(this.webhookUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    content: `\`\`\`json\n${data.slice(0, 1980)}\n\`\`\``
                })
            });
            callback();
        } catch (e) {
            callback(e);
        }
    }
}

;// CONCATENATED MODULE: ./src/lib/logger/index.ts


const { LOGGER_DISCORD_WEBHOOK: webhookUrl  } = process.env;
const streams = [
    // STDOUT
    pino_default().destination(1),
    ...webhookUrl ? [
        new DiscordWebhookStream(webhookUrl)
    ] : []
];
const logger = pino_default()({}, pino_default().multistream(streams));
/* harmony default export */ const lib_logger = (logger);


/***/ }),

/***/ 44942:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "D8": () => (/* reexport safe */ _shared__WEBPACK_IMPORTED_MODULE_3__.D8),
/* harmony export */   "HR": () => (/* binding */ getAllDocuments),
/* harmony export */   "Kj": () => (/* binding */ getEnhancedSession),
/* harmony export */   "aD": () => (/* binding */ siteName),
/* harmony export */   "n": () => (/* reexport safe */ _shared__WEBPACK_IMPORTED_MODULE_3__.n),
/* harmony export */   "or": () => (/* binding */ siteUrl),
/* harmony export */   "yG": () => (/* binding */ isDevelopment)
/* harmony export */ });
/* unused harmony exports getUser, verifyRoles, addRoles, paginateDocuments, checkPermissions, makeApiPostHandler */
/* harmony import */ var _lib_api_jsend__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(28513);
/* harmony import */ var _lib_logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(21494);
/* harmony import */ var _auth_shared__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(96707);
/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(91628);





function isDevelopment() {
    return "production" === "development";
}
async function getUser(client, email) {
    return client.db().collection("users").findOne({
        email
    });
}
async function verifyRoles(client, email, role) {
    const user = await getUser(client, email);
    if (!user) {
        throw new Error(`User with email "${email}" not found.`);
    }
    const roles = user.roles ?? [];
    return role === "participant" || roles.includes(role);
}
async function addRoles(client, email, role) {
    const user = await client.db().collection("users").updateOne({
        email
    }, {
        $addToSet: {
            roles: {
                $each: [
                    "participant",
                    role
                ]
            }
        }
    });
    return user;
}
async function getAllDocuments(client, collection, withId = false) {
    return await client.db().collection(collection).find({}, withId ? undefined : {
        projection: {
            _id: 0
        }
    }).toArray();
}
async function paginateDocuments(client, collection, { limit , after  }) {
    return await client.db().collection(collection).find({
        _id: {
            $gt: after
        }
    }).limit(limit).toArray();
}
const { SITE_NAME: siteName , SITE_URL: siteUrl  } = process.env;
if (!(siteName && siteUrl)) {
    throw new Error('Invalid/Missing environment variable: "SITE_NAME", "SITE_URL"');
}
function getEnhancedSession(...args) {
    let sessionHeader;
    if (args.length === 1) {
        const [headers] = args;
        sessionHeader = headers.get("x-middleware-session");
    } else {
        const [req] = args;
        const value = req.headers["x-middleware-session"];
        sessionHeader = Array.isArray(value) ? value[0] : value;
    }
    return sessionHeader ? JSON.parse(sessionHeader) : {
        user: null,
        perms: _auth_shared__WEBPACK_IMPORTED_MODULE_2__/* .RolePermissionMap["@unauthenticated"] */ .wI["@unauthenticated"]
    };
}
async function checkPermissions(req, res, role) {
    const { user  } = getEnhancedSession(req, res);
    if (!user) {
        throw new Error("Unauthenticated");
    }
    if (!user.roles.includes(role)) {
        throw new Error("Unauthorized");
    }
}
async function makeApiPostHandler(req, res, client, schema, collectionName) {
    try {
        await checkPermissions(req, res, "admin");
        if (req.method === "POST") {
            const body = req.body;
            const models = schema.array().parse(body);
            await client.db().collection(collectionName).bulkWrite([
                {
                    deleteMany: {
                        filter: {}
                    }
                },
                ...models.map((e)=>({
                        insertOne: {
                            document: e
                        }
                    }))
            ]);
            res.status(200).json(jsend.success(models));
        } else {
            throw new Error(`Unsupported ${req.method}`);
        }
    } catch (e) {
        logger.error(e, req.url);
        res.status(500).json(jsend.error(e));
    }
}


/***/ }),

/***/ 91628:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "D8": () => (/* binding */ dedupe),
/* harmony export */   "gw": () => (/* binding */ delay),
/* harmony export */   "n": () => (/* binding */ stringifyError)
/* harmony export */ });
/* unused harmony exports range, intersection, toOption, zodEnumToOptions, fetchPost */
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


/***/ })

};
;