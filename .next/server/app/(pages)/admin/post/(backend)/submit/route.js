"use strict";
(() => {
var exports = {};
exports.id = 60;
exports.ids = [60];
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

/***/ 6113:
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ 82361:
/***/ ((module) => {

module.exports = require("events");

/***/ }),

/***/ 57147:
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ 98188:
/***/ ((module) => {

module.exports = require("module");

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

/***/ 63477:
/***/ ((module) => {

module.exports = require("querystring");

/***/ }),

/***/ 12781:
/***/ ((module) => {

module.exports = require("stream");

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

/***/ 74116:
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

// NAMESPACE OBJECT: ./src/app/(pages)/admin/post/(backend)/submit/route.ts
var route_namespaceObject = {};
__webpack_require__.r(route_namespaceObject);
__webpack_require__.d(route_namespaceObject, {
  "POST": () => (POST)
});

// EXTERNAL MODULE: ./node_modules/next/dist/server/node-polyfill-headers.js
var node_polyfill_headers = __webpack_require__(76145);
// EXTERNAL MODULE: ./node_modules/next/dist/server/future/route-modules/app-route/module.js
var app_route_module = __webpack_require__(19532);
// EXTERNAL MODULE: ./node_modules/next/dist/server/web/exports/next-response.js
var next_response = __webpack_require__(83804);
// EXTERNAL MODULE: ./src/lib/db/index.ts
var db = __webpack_require__(58051);
// EXTERNAL MODULE: ./node_modules/zod/lib/index.js
var lib = __webpack_require__(64617);
var lib_default = /*#__PURE__*/__webpack_require__.n(lib);
;// CONCATENATED MODULE: ./src/lib/db/models/Post.ts

const PostSlugPattern = /^[a-z0-9-]+$/;
const CardStyleSchema = lib_default()["enum"]([
    "blue",
    "green",
    "red",
    "yellow",
    "white"
]);
const PostSchema = lib_default().object({
    name: lib_default().string().nonempty(),
    slug: lib_default().string().regex(PostSlugPattern),
    priority: lib_default().number({
        description: "Lower number, higher priority."
    }),
    hidden: lib_default().boolean().optional(),
    cardStyle: CardStyleSchema.optional(),
    briefSource: lib_default().string({
        description: "A brief over the post in MarkDown using doT template"
    }).optional(),
    contentSource: lib_default().string({
        description: "The main content of the post in MarkDown using doT template"
    }).optional()
});

// EXTERNAL MODULE: ./src/lib/logger/index.ts + 1 modules
var logger = __webpack_require__(21494);
// EXTERNAL MODULE: ./src/lib/utils/server.ts
var server = __webpack_require__(44942);
;// CONCATENATED MODULE: ./src/app/(pages)/admin/post/(backend)/submit/route.ts





async function POST(request) {
    try {
        // Convert form data to regular object.
        const formData = await request.formData();
        const bodyObj = Object.fromEntries(formData);
        if (bodyObj.hidden === "on") {
            bodyObj.hidden = true;
        }
        if ("priority" in bodyObj) {
            bodyObj.priority = parseInt(bodyObj.priority);
        }
        bodyObj.briefSource = bodyObj.brief;
        bodyObj.contentSource = bodyObj.content;
        const post = PostSchema.parse(bodyObj);
        // Save post to DB.
        const client = await db/* default */.Z;
        await client.db().collection("posts").replaceOne({
            slug: post.slug
        }, post, {
            upsert: true
        });
        return next_response/* default.redirect */.Z.redirect(`${server/* siteUrl */.or}/admin/post`, 303);
    } catch (e) {
        logger/* default.error */.Z.error(e, "[/admin/post/submit]");
        return next_response/* default.redirect */.Z.redirect(`${server/* siteUrl */.or}/admin/post?error=1`, 303);
    }
}

;// CONCATENATED MODULE: ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?page=%2F(pages)%2Fadmin%2Fpost%2F(backend)%2Fsubmit%2Froute&name=app%2F(pages)%2Fadmin%2Fpost%2F(backend)%2Fsubmit%2Froute&pagePath=private-next-app-dir%2F(pages)%2Fadmin%2Fpost%2F(backend)%2Fsubmit%2Froute.ts&appDir=%2Fhome%2Frunner%2Fwork%2Fhackuta2023-site%2Fhackuta2023-site%2Fsrc%2Fapp&appPaths=%2F(pages)%2Fadmin%2Fpost%2F(backend)%2Fsubmit%2Froute&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&assetPrefix=&nextConfigOutput=!

    

    

    

    const routeModule = new app_route_module/* default */.ZP({
    userland: route_namespaceObject,
    pathname: "/admin/post/submit",
    resolvedPagePath: "/home/runner/work/hackuta2023-site/hackuta2023-site/src/app/(pages)/admin/post/(backend)/submit/route.ts",
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
var __webpack_require__ = require("../../../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [2802,904,3198,474,4617,4942,8051], () => (__webpack_exec__(74116)));
module.exports = __webpack_exports__;

})();