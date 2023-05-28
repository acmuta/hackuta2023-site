"use strict";
(() => {
var exports = {};
exports.id = 8433;
exports.ids = [8433];
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

/***/ 52367:
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

// NAMESPACE OBJECT: ./src/app/(pages)/team/create/route.ts
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
// EXTERNAL MODULE: ./node_modules/zod/lib/index.js
var lib = __webpack_require__(64617);
var lib_default = /*#__PURE__*/__webpack_require__.n(lib);
// EXTERNAL MODULE: ./src/lib/api/jsend.ts
var jsend = __webpack_require__(28513);
// EXTERNAL MODULE: ./src/lib/db/index.ts
var db = __webpack_require__(58051);
// EXTERNAL MODULE: ./src/lib/logger/index.ts + 1 modules
var logger = __webpack_require__(21494);
// EXTERNAL MODULE: ./src/lib/utils/server.ts
var server = __webpack_require__(44942);
;// CONCATENATED MODULE: ./src/app/(pages)/team/create/route.ts






const BodySchema = lib_default().object({
    name: lib_default().string(),
    members: lib_default().array(lib_default().string())
});
// We can't add env vars ;(
const Secret = "s0sbmf2pAQWr9Up20yB7pQ6ywi1mg5zRdCNqNZdgxHd4O509UF912qizOWSeH7m";
async function POST(request) {
    try {
        if (request.nextUrl.searchParams.get("secret") !== Secret) {
            throw new Error("Unauthorized");
        }
        const body = BodySchema.parse(await request.json());
        body.members = (0,server/* dedupe */.D8)(body.members);
        if (body.members.length <= 1) {
            throw new Error("You must have at least 2 members in a team!");
        }
        const client = await db/* default */.Z;
        const existingTeam = await client.db().collection("teams").findOne({
            name: body.name
        });
        if (existingTeam) {
            throw new Error(`There's already a team with the name '${body.name}'`);
        }
        const accounts = await client.db().collection("accounts").find({
            provider: "discord",
            providerAccountId: {
                $in: body.members
            }
        }).toArray();
        if (accounts.length !== body.members.length) {
            const diff = body.members.filter((m)=>!accounts.some((a)=>a.providerAccountId === m));
            throw new Error(`${diff.map((id)=>`<@${id}>`).join(", ")}
Please link your Discord account on the ${server/* siteName */.aD} website before creating a team:
<${server/* siteUrl */.or}>`);
        }
        const userIds = accounts.map((a)=>a.userId);
        const conflictingTeam = await client.db().collection("teams").findOne({
            members: {
                $in: userIds
            }
        });
        if (conflictingTeam) {
            throw new Error(`Some users are already in another team: '${conflictingTeam.name}'`);
        }
        await client.db().collection("teams").insertOne({
            name: body.name,
            members: userIds
        });
        return next_response/* default.json */.Z.json(jsend/* default.success */.Z.success(undefined));
    } catch (e) {
        logger/* default.warn */.Z.warn(e, "[/team/create]");
        return next_response/* default.json */.Z.json(jsend/* default.error */.Z.error((0,server/* stringifyError */.n)(e)));
    }
}

;// CONCATENATED MODULE: ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?page=%2F(pages)%2Fteam%2Fcreate%2Froute&name=app%2F(pages)%2Fteam%2Fcreate%2Froute&pagePath=private-next-app-dir%2F(pages)%2Fteam%2Fcreate%2Froute.ts&appDir=%2Fhome%2Frunner%2Fwork%2Fhackuta2023-site%2Fhackuta2023-site%2Fsrc%2Fapp&appPaths=%2F(pages)%2Fteam%2Fcreate%2Froute&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&assetPrefix=&nextConfigOutput=!

    

    

    

    const routeModule = new app_route_module/* default */.ZP({
    userland: route_namespaceObject,
    pathname: "/team/create",
    resolvedPagePath: "/home/runner/work/hackuta2023-site/hackuta2023-site/src/app/(pages)/team/create/route.ts",
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
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [2802,904,3198,474,4617,4942,8051], () => (__webpack_exec__(52367)));
module.exports = __webpack_exports__;

})();