"use strict";
(() => {
var exports = {};
exports.id = 2588;
exports.ids = [2588];
exports.modules = {

/***/ 38013:
/***/ ((module) => {

module.exports = require("mongodb");

/***/ }),

/***/ 97783:
/***/ ((module) => {

module.exports = require("next/dist/compiled/@edge-runtime/cookies");

/***/ }),

/***/ 28530:
/***/ ((module) => {

module.exports = require("next/dist/compiled/@opentelemetry/api");

/***/ }),

/***/ 35547:
/***/ ((module) => {

module.exports = require("next/dist/compiled/bytes");

/***/ }),

/***/ 54426:
/***/ ((module) => {

module.exports = require("next/dist/compiled/chalk");

/***/ }),

/***/ 74929:
/***/ ((module) => {

module.exports = require("next/dist/compiled/content-type");

/***/ }),

/***/ 40252:
/***/ ((module) => {

module.exports = require("next/dist/compiled/cookie");

/***/ }),

/***/ 47664:
/***/ ((module) => {

module.exports = require("next/dist/compiled/fresh");

/***/ }),

/***/ 45644:
/***/ ((module) => {

module.exports = require("next/dist/compiled/jsonwebtoken");

/***/ }),

/***/ 27798:
/***/ ((module) => {

module.exports = require("next/dist/compiled/raw-body");

/***/ }),

/***/ 39491:
/***/ ((module) => {

module.exports = require("assert");

/***/ }),

/***/ 14300:
/***/ ((module) => {

module.exports = require("buffer");

/***/ }),

/***/ 32081:
/***/ ((module) => {

module.exports = require("child_process");

/***/ }),

/***/ 6113:
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ 9523:
/***/ ((module) => {

module.exports = require("dns");

/***/ }),

/***/ 82361:
/***/ ((module) => {

module.exports = require("events");

/***/ }),

/***/ 57147:
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ 13685:
/***/ ((module) => {

module.exports = require("http");

/***/ }),

/***/ 95687:
/***/ ((module) => {

module.exports = require("https");

/***/ }),

/***/ 98188:
/***/ ((module) => {

module.exports = require("module");

/***/ }),

/***/ 41808:
/***/ ((module) => {

module.exports = require("net");

/***/ }),

/***/ 72254:
/***/ ((module) => {

module.exports = require("node:buffer");

/***/ }),

/***/ 87561:
/***/ ((module) => {

module.exports = require("node:fs");

/***/ }),

/***/ 88849:
/***/ ((module) => {

module.exports = require("node:http");

/***/ }),

/***/ 22286:
/***/ ((module) => {

module.exports = require("node:https");

/***/ }),

/***/ 87503:
/***/ ((module) => {

module.exports = require("node:net");

/***/ }),

/***/ 49411:
/***/ ((module) => {

module.exports = require("node:path");

/***/ }),

/***/ 97742:
/***/ ((module) => {

module.exports = require("node:process");

/***/ }),

/***/ 84492:
/***/ ((module) => {

module.exports = require("node:stream");

/***/ }),

/***/ 72477:
/***/ ((module) => {

module.exports = require("node:stream/web");

/***/ }),

/***/ 41041:
/***/ ((module) => {

module.exports = require("node:url");

/***/ }),

/***/ 47261:
/***/ ((module) => {

module.exports = require("node:util");

/***/ }),

/***/ 65628:
/***/ ((module) => {

module.exports = require("node:zlib");

/***/ }),

/***/ 22037:
/***/ ((module) => {

module.exports = require("os");

/***/ }),

/***/ 71017:
/***/ ((module) => {

module.exports = require("path");

/***/ }),

/***/ 85477:
/***/ ((module) => {

module.exports = require("punycode");

/***/ }),

/***/ 63477:
/***/ ((module) => {

module.exports = require("querystring");

/***/ }),

/***/ 12781:
/***/ ((module) => {

module.exports = require("stream");

/***/ }),

/***/ 24404:
/***/ ((module) => {

module.exports = require("tls");

/***/ }),

/***/ 76224:
/***/ ((module) => {

module.exports = require("tty");

/***/ }),

/***/ 57310:
/***/ ((module) => {

module.exports = require("url");

/***/ }),

/***/ 73837:
/***/ ((module) => {

module.exports = require("util");

/***/ }),

/***/ 26144:
/***/ ((module) => {

module.exports = require("vm");

/***/ }),

/***/ 71267:
/***/ ((module) => {

module.exports = require("worker_threads");

/***/ }),

/***/ 59796:
/***/ ((module) => {

module.exports = require("zlib");

/***/ }),

/***/ 14066:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "headerHooks": () => (/* binding */ headerHooks),
  "requestAsyncStorage": () => (/* binding */ requestAsyncStorage),
  "routeModule": () => (/* binding */ routeModule),
  "serverHooks": () => (/* binding */ serverHooks),
  "staticGenerationAsyncStorage": () => (/* binding */ staticGenerationAsyncStorage),
  "staticGenerationBailout": () => (/* binding */ staticGenerationBailout)
});

// NAMESPACE OBJECT: ./src/app/(pages)/admin/marketing/send/route.ts
var route_namespaceObject = {};
__webpack_require__.r(route_namespaceObject);
__webpack_require__.d(route_namespaceObject, {
  "POST": () => (POST)
});

// EXTERNAL MODULE: ./node_modules/next/dist/server/node-polyfill-headers.js
var node_polyfill_headers = __webpack_require__(76145);
// EXTERNAL MODULE: ./node_modules/next/dist/server/future/route-modules/app-route/module.js
var app_route_module = __webpack_require__(19532);
// EXTERNAL MODULE: ./node_modules/dot/index.js
var dot = __webpack_require__(23655);
var dot_default = /*#__PURE__*/__webpack_require__.n(dot);
// EXTERNAL MODULE: ./node_modules/next/dist/server/web/exports/next-response.js
var next_response = __webpack_require__(83804);
// EXTERNAL MODULE: ./src/lib/api/jsend.ts
var jsend = __webpack_require__(28513);
// EXTERNAL MODULE: ./src/lib/db/index.ts
var db = __webpack_require__(58051);
// EXTERNAL MODULE: ./src/lib/utils/server.ts
var server = __webpack_require__(44942);
;// CONCATENATED MODULE: ./src/lib/email/index.ts


const { MAILCHIMP_TRANSACTIONAL_API_KEY: mcApiKey , SENDGRID_API_KEY: sgApiKey , TRANSACTIONAL_FROM_EMAIL: fromEmail , TRANSACTIONAL_FROM_NAME: fromName , TRANSACTIONAL_REPLY_TO_EMAIL: replyToEmail , TRANSACTIONAL_REPLY_TO_NAME: replyToName  } = process.env;
if (!fromEmail) {
    throw new Error('Invalid/Missing environment variable: "TRANSACTIONAL_FROM_EMAIL"');
}
let client;
if (mcApiKey) {
    client = Promise.all(/* import() */[__webpack_require__.e(4932), __webpack_require__.e(8792), __webpack_require__.e(8731)]).then(__webpack_require__.bind(__webpack_require__, 8731));
} else if (sgApiKey) {
    client = Promise.all(/* import() */[__webpack_require__.e(4932), __webpack_require__.e(2096), __webpack_require__.e(7839)]).then(__webpack_require__.bind(__webpack_require__, 27839));
} else {
    client = Promise.all(/* import() */[__webpack_require__.e(6361), __webpack_require__.e(3149)]).then(__webpack_require__.bind(__webpack_require__, 43149));
}
async function sendEmail(data) {
    const subject = (0,server/* isDevelopment */.yG)() ? `[TEST] [NOT PROD] ${data.subject}` : data.subject;
    return (await client).default({
        mail: {
            ...data,
            subject
        },
        fromEmail: fromEmail,
        fromName: fromName,
        replyToEmail: replyToEmail,
        replyToName: replyToName
    });
}

// EXTERNAL MODULE: ./src/lib/logger/index.ts + 1 modules
var logger = __webpack_require__(21494);
// EXTERNAL MODULE: ./src/lib/utils/shared.ts
var shared = __webpack_require__(91628);
// EXTERNAL MODULE: ./node_modules/zod/lib/index.js
var lib = __webpack_require__(64617);
var lib_default = /*#__PURE__*/__webpack_require__.n(lib);
;// CONCATENATED MODULE: ./src/app/(pages)/admin/marketing/constants.ts

const PostBodySchema = lib_default().object({
    recipients: lib_default().array(lib_default().string()),
    tag: lib_default().string().nonempty(),
    subject: lib_default().string().nonempty(),
    text: lib_default().string(),
    html: lib_default().string()
});
const RecipientFilters = {
    "All Users": {},
    "Application - Applied": {
        application: {
            $exists: true
        }
    },
    "Application - Applied and Received no Decision": {
        application: {
            $exists: true
        },
        applicationStatus: {
            $exists: false
        }
    },
    "Application - Accepted": {
        applicationStatus: "accepted"
    },
    "Application - Rejected": {
        applicationStatus: "rejected"
    },
    "Application - Waitlisted": {
        applicationStatus: "waitlisted"
    }
};
const CooldownMs = 50;

;// CONCATENATED MODULE: ./src/app/(pages)/admin/marketing/send/route.ts








async function POST(request) {
    try {
        const client = await db/* default */.Z;
        const body = PostBodySchema.parse(await request.json());
        const users = (await Promise.all(body.recipients.map(async (recipient)=>{
            if (recipient.startsWith("{")) {
                // This is a filter.
                const filter = JSON.parse(recipient);
                return client.db().collection("users").find({
                    // Skip users that have already received this email.
                    receivedEmailTags: {
                        $nin: [
                            body.tag
                        ]
                    },
                    ...filter
                }).toArray();
            } else {
                // This is an email address.
                return client.db().collection("users").findOne({
                    email: recipient
                });
            }
        }))).flat().filter((u)=>!!u);
        logger/* default.info */.Z.info(users.slice(0, 10).map((u)=>u.email), `[/admin/marketing/send] sending emails to ${users.length} addresses: ${body.subject} ${body.tag}`);
        const htmlRenderer = dot_default().template(body.html);
        const textRenderer = dot_default().template(body.text);
        for (const user of users){
            const renderContext = {
                user: {
                    name: `${user.application?.firstName} ${user.application?.lastName}`
                }
            };
            await sendEmail({
                to: [
                    {
                        email: user.email
                    }
                ],
                subject: body.subject,
                html: htmlRenderer(renderContext),
                text: textRenderer(renderContext)
            });
            // Add the tag of this email to the user.
            await client.db().collection("users").updateOne(user, {
                $addToSet: {
                    receivedEmailTags: body.tag
                }
            });
            await (0,shared/* delay */.gw)(CooldownMs);
        }
        return next_response/* default.json */.Z.json(jsend/* default.success */.Z.success({
            number_recipients: users.length
        }));
    } catch (e) {
        logger/* default.error */.Z.error(e, "[/admin/marketing/send]");
        return next_response/* default.json */.Z.json(jsend/* default.error */.Z.error("/admin/marketing/send Error: see log for more information."));
    }
}

;// CONCATENATED MODULE: ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?page=%2F(pages)%2Fadmin%2Fmarketing%2Fsend%2Froute&name=app%2F(pages)%2Fadmin%2Fmarketing%2Fsend%2Froute&pagePath=private-next-app-dir%2F(pages)%2Fadmin%2Fmarketing%2Fsend%2Froute.ts&appDir=%2Fhome%2Frunner%2Fwork%2Fhackuta2023-site%2Fhackuta2023-site%2Fsrc%2Fapp&appPaths=%2F(pages)%2Fadmin%2Fmarketing%2Fsend%2Froute&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&assetPrefix=&nextConfigOutput=!

    

    

    

    const routeModule = new app_route_module/* default */.ZP({
    userland: route_namespaceObject,
    pathname: "/admin/marketing/send",
    resolvedPagePath: "/home/runner/work/hackuta2023-site/hackuta2023-site/src/app/(pages)/admin/marketing/send/route.ts",
    nextConfigOutput: undefined,
  })

    // Pull out the exports that we need to expose from the module. This should
    // be eliminated when we've moved the other routes to the new format. These
    // are used to hook into the route.
    const {
      requestAsyncStorage,
      staticGenerationAsyncStorage,
      serverHooks,
      headerHooks,
      staticGenerationBailout
    } = routeModule

    

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [2802,904,3198,474,4617,3655,4942,8051], () => (__webpack_exec__(14066)));
module.exports = __webpack_exports__;

})();