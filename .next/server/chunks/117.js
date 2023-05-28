"use strict";
exports.id = 117;
exports.ids = [117];
exports.modules = {

/***/ 12469:
/***/ ((__unused_webpack_module, exports) => {

var __webpack_unused_export__;

__webpack_unused_export__ = ({
    value: true
});
Object.defineProperty(exports, "Z", ({
    enumerable: true,
    get: function() {
        return _interopRequireDefault;
    }
}));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}


/***/ }),

/***/ 16780:
/***/ ((module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.bailoutToClientRendering = bailoutToClientRendering;
var _dynamicNoSsr = __webpack_require__(97425);
var _staticGenerationAsyncStorage = __webpack_require__(1839);
function bailoutToClientRendering() {
    const staticGenerationStore = _staticGenerationAsyncStorage.staticGenerationAsyncStorage.getStore();
    if (staticGenerationStore == null ? void 0 : staticGenerationStore.forceStatic) {
        return true;
    }
    if (staticGenerationStore == null ? void 0 : staticGenerationStore.isStaticGeneration) {
        (0, _dynamicNoSsr).suspense();
    }
    return false;
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=bailout-to-client-rendering.js.map


/***/ }),

/***/ 71466:
/***/ ((module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.clientHookInServerComponentError = clientHookInServerComponentError;
var _interop_require_default = (__webpack_require__(12469)/* ["default"] */ .Z);
var _react = _interop_require_default(__webpack_require__(34212));
function clientHookInServerComponentError(hookName) {
    if (false) {}
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=client-hook-in-server-component-error.js.map


/***/ }),

/***/ 32401:
/***/ ((module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.useSearchParams = useSearchParams;
exports.usePathname = usePathname;
Object.defineProperty(exports, "ServerInsertedHTMLContext", ({
    enumerable: true,
    get: function() {
        return _serverInsertedHtml.ServerInsertedHTMLContext;
    }
}));
Object.defineProperty(exports, "useServerInsertedHTML", ({
    enumerable: true,
    get: function() {
        return _serverInsertedHtml.useServerInsertedHTML;
    }
}));
exports.useRouter = useRouter;
exports.useParams = useParams;
exports.useSelectedLayoutSegments = useSelectedLayoutSegments;
exports.useSelectedLayoutSegment = useSelectedLayoutSegment;
Object.defineProperty(exports, "redirect", ({
    enumerable: true,
    get: function() {
        return _redirect.redirect;
    }
}));
Object.defineProperty(exports, "notFound", ({
    enumerable: true,
    get: function() {
        return _notFound.notFound;
    }
}));
var _react = __webpack_require__(34212);
var _appRouterContext = __webpack_require__(25449);
var _hooksClientContext = __webpack_require__(36878);
var _clientHookInServerComponentError = __webpack_require__(71466);
var _getSegmentValue = __webpack_require__(67639);
var _serverInsertedHtml = __webpack_require__(97201);
var _redirect = __webpack_require__(48295);
var _notFound = __webpack_require__(93716);
const INTERNAL_URLSEARCHPARAMS_INSTANCE = Symbol("internal for urlsearchparams readonly");
function readonlyURLSearchParamsError() {
    return new Error("ReadonlyURLSearchParams cannot be modified");
}
class ReadonlyURLSearchParams {
    [Symbol.iterator]() {
        return this[INTERNAL_URLSEARCHPARAMS_INSTANCE][Symbol.iterator]();
    }
    append() {
        throw readonlyURLSearchParamsError();
    }
    delete() {
        throw readonlyURLSearchParamsError();
    }
    set() {
        throw readonlyURLSearchParamsError();
    }
    sort() {
        throw readonlyURLSearchParamsError();
    }
    constructor(urlSearchParams){
        this[INTERNAL_URLSEARCHPARAMS_INSTANCE] = urlSearchParams;
        this.entries = urlSearchParams.entries.bind(urlSearchParams);
        this.forEach = urlSearchParams.forEach.bind(urlSearchParams);
        this.get = urlSearchParams.get.bind(urlSearchParams);
        this.getAll = urlSearchParams.getAll.bind(urlSearchParams);
        this.has = urlSearchParams.has.bind(urlSearchParams);
        this.keys = urlSearchParams.keys.bind(urlSearchParams);
        this.values = urlSearchParams.values.bind(urlSearchParams);
        this.toString = urlSearchParams.toString.bind(urlSearchParams);
    }
}
exports.ReadonlyURLSearchParams = ReadonlyURLSearchParams;
function useSearchParams() {
    (0, _clientHookInServerComponentError).clientHookInServerComponentError("useSearchParams");
    const searchParams = (0, _react).useContext(_hooksClientContext.SearchParamsContext);
    // In the case where this is `null`, the compat types added in
    // `next-env.d.ts` will add a new overload that changes the return type to
    // include `null`.
    const readonlySearchParams = (0, _react).useMemo(()=>{
        if (!searchParams) {
            // When the router is not ready in pages, we won't have the search params
            // available.
            return null;
        }
        return new ReadonlyURLSearchParams(searchParams);
    }, [
        searchParams
    ]);
    if (true) {
        // AsyncLocalStorage should not be included in the client bundle.
        const { bailoutToClientRendering  } = __webpack_require__(16780);
        if (bailoutToClientRendering()) {
            // TODO-APP: handle dynamic = 'force-static' here and on the client
            return readonlySearchParams;
        }
    }
    return readonlySearchParams;
}
function usePathname() {
    (0, _clientHookInServerComponentError).clientHookInServerComponentError("usePathname");
    // In the case where this is `null`, the compat types added in `next-env.d.ts`
    // will add a new overload that changes the return type to include `null`.
    return (0, _react).useContext(_hooksClientContext.PathnameContext);
}
function useRouter() {
    (0, _clientHookInServerComponentError).clientHookInServerComponentError("useRouter");
    const router = (0, _react).useContext(_appRouterContext.AppRouterContext);
    if (router === null) {
        throw new Error("invariant expected app router to be mounted");
    }
    return router;
}
// TODO-APP: handle parallel routes
function getSelectedParams(tree, params = {}) {
    // After first parallel route prefer children, if there's no children pick the first parallel route.
    const parallelRoutes = tree[1];
    var _children;
    const node = (_children = parallelRoutes.children) != null ? _children : Object.values(parallelRoutes)[0];
    if (!node) return params;
    const segment = node[0];
    const isDynamicParameter = Array.isArray(segment);
    const segmentValue = isDynamicParameter ? segment[1] : segment;
    if (!segmentValue || segmentValue.startsWith("__PAGE__")) return params;
    if (isDynamicParameter) {
        params[segment[0]] = segment[1];
    }
    return getSelectedParams(node, params);
}
function useParams() {
    (0, _clientHookInServerComponentError).clientHookInServerComponentError("useParams");
    const globalLayoutRouterContext = (0, _react).useContext(_appRouterContext.GlobalLayoutRouterContext);
    if (!globalLayoutRouterContext) {
        // This only happens in `pages`. Type is overwritten in navigation.d.ts
        return null;
    }
    return getSelectedParams(globalLayoutRouterContext.tree);
}
// TODO-APP: handle parallel routes
/**
 * Get the canonical parameters from the current level to the leaf node.
 */ function getSelectedLayoutSegmentPath(tree, parallelRouteKey, first = true, segmentPath = []) {
    let node;
    if (first) {
        // Use the provided parallel route key on the first parallel route
        node = tree[1][parallelRouteKey];
    } else {
        // After first parallel route prefer children, if there's no children pick the first parallel route.
        const parallelRoutes = tree[1];
        var _children;
        node = (_children = parallelRoutes.children) != null ? _children : Object.values(parallelRoutes)[0];
    }
    if (!node) return segmentPath;
    const segment = node[0];
    const segmentValue = (0, _getSegmentValue).getSegmentValue(segment);
    if (!segmentValue || segmentValue.startsWith("__PAGE__")) return segmentPath;
    segmentPath.push(segmentValue);
    return getSelectedLayoutSegmentPath(node, parallelRouteKey, false, segmentPath);
}
function useSelectedLayoutSegments(parallelRouteKey = "children") {
    (0, _clientHookInServerComponentError).clientHookInServerComponentError("useSelectedLayoutSegments");
    const { tree  } = (0, _react).useContext(_appRouterContext.LayoutRouterContext);
    return getSelectedLayoutSegmentPath(tree, parallelRouteKey);
}
function useSelectedLayoutSegment(parallelRouteKey = "children") {
    (0, _clientHookInServerComponentError).clientHookInServerComponentError("useSelectedLayoutSegment");
    const selectedLayoutSegments = useSelectedLayoutSegments(parallelRouteKey);
    if (selectedLayoutSegments.length === 0) {
        return null;
    }
    return selectedLayoutSegments[0];
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=navigation.js.map


/***/ }),

/***/ 67639:
/***/ ((module, exports) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.getSegmentValue = getSegmentValue;
function getSegmentValue(segment) {
    return Array.isArray(segment) ? segment[1] : segment;
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=get-segment-value.js.map


/***/ }),

/***/ 25449:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* __next_internal_client_entry_do_not_use__  cjs */ 
const { createProxy  } = __webpack_require__(35985);
module.exports = createProxy("/home/runner/work/hackuta2023-site/hackuta2023-site/node_modules/next/dist/shared/lib/app-router-context.js");
 //# sourceMappingURL=app-router-context.js.map


/***/ }),

/***/ 36878:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* __next_internal_client_entry_do_not_use__  cjs */ 
const { createProxy  } = __webpack_require__(35985);
module.exports = createProxy("/home/runner/work/hackuta2023-site/hackuta2023-site/node_modules/next/dist/shared/lib/hooks-client-context.js");
 //# sourceMappingURL=hooks-client-context.js.map


/***/ }),

/***/ 97425:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* __next_internal_client_entry_do_not_use__  cjs */ 
const { createProxy  } = __webpack_require__(35985);
module.exports = createProxy("/home/runner/work/hackuta2023-site/hackuta2023-site/node_modules/next/dist/shared/lib/lazy-dynamic/dynamic-no-ssr.js");
 //# sourceMappingURL=dynamic-no-ssr.js.map


/***/ }),

/***/ 97201:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* __next_internal_client_entry_do_not_use__  cjs */ 
const { createProxy  } = __webpack_require__(35985);
module.exports = createProxy("/home/runner/work/hackuta2023-site/hackuta2023-site/node_modules/next/dist/shared/lib/server-inserted-html.js");
 //# sourceMappingURL=server-inserted-html.js.map


/***/ }),

/***/ 80117:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


module.exports = __webpack_require__(32401);


/***/ })

};
;