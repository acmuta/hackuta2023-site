"use strict";
exports.id = 904;
exports.ids = [904];
exports.modules = {

/***/ 904:
/***/ ((module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.headers = headers;
exports.previewData = previewData;
exports.cookies = cookies;
var _requestCookies = __webpack_require__(60127);
var _headers = __webpack_require__(91778);
var _cookies = __webpack_require__(8306);
var _requestAsyncStorage = __webpack_require__(35120);
var _staticGenerationBailout = __webpack_require__(79282);
function headers() {
    if ((0, _staticGenerationBailout).staticGenerationBailout("headers")) {
        return _headers.HeadersAdapter.seal(new Headers({}));
    }
    const requestStore = _requestAsyncStorage.requestAsyncStorage.getStore();
    if (!requestStore) {
        throw new Error(`Invariant: Method expects to have requestAsyncStorage, none available`);
    }
    return requestStore.headers;
}
function previewData() {
    const requestStore = _requestAsyncStorage.requestAsyncStorage.getStore();
    if (!requestStore) {
        throw new Error(`Invariant: Method expects to have requestAsyncStorage, none available`);
    }
    return requestStore.previewData;
}
function cookies() {
    if ((0, _staticGenerationBailout).staticGenerationBailout("cookies")) {
        return _requestCookies.RequestCookiesAdapter.seal(new _cookies.RequestCookies(new Headers({})));
    }
    const requestStore = _requestAsyncStorage.requestAsyncStorage.getStore();
    if (!requestStore) {
        throw new Error(`Invariant: Method expects to have requestAsyncStorage, none available`);
    }
    return requestStore.cookies;
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=headers.js.map


/***/ }),

/***/ 91778:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
var _reflect = __webpack_require__(99877);
class ReadonlyHeadersError extends Error {
    constructor(){
        super("Headers cannot be modified. Read more: https://nextjs.org/docs/api-reference/headers");
    }
    static callable() {
        throw new ReadonlyHeadersError();
    }
}
exports.ReadonlyHeadersError = ReadonlyHeadersError;
class HeadersAdapter extends Headers {
    constructor(headers){
        // We've already overridden the methods that would be called, so we're just
        // calling the super constructor to ensure that the instanceof check works.
        super();
        this.headers = new Proxy(headers, {
            get (target, prop, receiver) {
                // Because this is just an object, we expect that all "get" operations
                // are for properties. If it's a "get" for a symbol, we'll just return
                // the symbol.
                if (typeof prop === "symbol") {
                    return _reflect.ReflectAdapter.get(target, prop, receiver);
                }
                const lowercased = prop.toLowerCase();
                // Let's find the original casing of the key. This assumes that there is
                // no mixed case keys (e.g. "Content-Type" and "content-type") in the
                // headers object.
                const original = Object.keys(headers).find((o)=>o.toLowerCase() === lowercased);
                // If the original casing doesn't exist, return undefined.
                if (typeof original === "undefined") return;
                // If the original casing exists, return the value.
                return _reflect.ReflectAdapter.get(target, original, receiver);
            },
            set (target, prop, value, receiver) {
                if (typeof prop === "symbol") {
                    return _reflect.ReflectAdapter.set(target, prop, value, receiver);
                }
                const lowercased = prop.toLowerCase();
                // Let's find the original casing of the key. This assumes that there is
                // no mixed case keys (e.g. "Content-Type" and "content-type") in the
                // headers object.
                const original = Object.keys(headers).find((o)=>o.toLowerCase() === lowercased);
                // If the original casing doesn't exist, use the prop as the key.
                return _reflect.ReflectAdapter.set(target, original ?? prop, value, receiver);
            },
            has (target, prop) {
                if (typeof prop === "symbol") return _reflect.ReflectAdapter.has(target, prop);
                const lowercased = prop.toLowerCase();
                // Let's find the original casing of the key. This assumes that there is
                // no mixed case keys (e.g. "Content-Type" and "content-type") in the
                // headers object.
                const original = Object.keys(headers).find((o)=>o.toLowerCase() === lowercased);
                // If the original casing doesn't exist, return false.
                if (typeof original === "undefined") return false;
                // If the original casing exists, return true.
                return _reflect.ReflectAdapter.has(target, original);
            },
            deleteProperty (target, prop) {
                if (typeof prop === "symbol") return _reflect.ReflectAdapter.deleteProperty(target, prop);
                const lowercased = prop.toLowerCase();
                // Let's find the original casing of the key. This assumes that there is
                // no mixed case keys (e.g. "Content-Type" and "content-type") in the
                // headers object.
                const original = Object.keys(headers).find((o)=>o.toLowerCase() === lowercased);
                // If the original casing doesn't exist, return true.
                if (typeof original === "undefined") return true;
                // If the original casing exists, delete the property.
                return _reflect.ReflectAdapter.deleteProperty(target, original);
            }
        });
    }
    /**
   * Seals a Headers instance to prevent modification by throwing an error when
   * any mutating method is called.
   */ static seal(headers) {
        return new Proxy(headers, {
            get (target, prop, receiver) {
                switch(prop){
                    case "append":
                    case "delete":
                    case "set":
                        return ReadonlyHeadersError.callable;
                    default:
                        return _reflect.ReflectAdapter.get(target, prop, receiver);
                }
            }
        });
    }
    /**
   * Merges a header value into a string. This stores multiple values as an
   * array, so we need to merge them into a string.
   *
   * @param value a header value
   * @returns a merged header value (a string)
   */ merge(value) {
        if (Array.isArray(value)) return value.join(", ");
        return value;
    }
    /**
   * Creates a Headers instance from a plain object or a Headers instance.
   *
   * @param headers a plain object or a Headers instance
   * @returns a headers instance
   */ static from(headers) {
        if (headers instanceof Headers) return headers;
        return new HeadersAdapter(headers);
    }
    append(name, value) {
        const existing = this.headers[name];
        if (typeof existing === "string") {
            this.headers[name] = [
                existing,
                value
            ];
        } else if (Array.isArray(existing)) {
            existing.push(value);
        } else {
            this.headers[name] = value;
        }
    }
    delete(name) {
        delete this.headers[name];
    }
    get(name) {
        const value = this.headers[name];
        if (typeof value !== "undefined") return this.merge(value);
        return null;
    }
    has(name) {
        return typeof this.headers[name] !== "undefined";
    }
    set(name, value) {
        this.headers[name] = value;
    }
    forEach(callbackfn, thisArg) {
        for (const [name, value] of this.entries()){
            callbackfn.call(thisArg, value, name, this);
        }
    }
    *entries() {
        for (const key of Object.keys(this.headers)){
            const name = key.toLowerCase();
            // We assert here that this is a string because we got it from the
            // Object.keys() call above.
            const value = this.get(name);
            yield [
                name,
                value
            ];
        }
    }
    *keys() {
        for (const key of Object.keys(this.headers)){
            const name = key.toLowerCase();
            yield name;
        }
    }
    *values() {
        for (const key of Object.keys(this.headers)){
            // We assert here that this is a string because we got it from the
            // Object.keys() call above.
            const value = this.get(key);
            yield value;
        }
    }
    [Symbol.iterator]() {
        return this.entries();
    }
}
exports.HeadersAdapter = HeadersAdapter; //# sourceMappingURL=headers.js.map


/***/ }),

/***/ 99877:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
class ReflectAdapter {
    static get(target, prop, receiver) {
        const value = Reflect.get(target, prop, receiver);
        if (typeof value === "function") {
            return value.bind(target);
        }
        return value;
    }
    static set(target, prop, value, receiver) {
        return Reflect.set(target, prop, value, receiver);
    }
    static has(target, prop) {
        return Reflect.has(target, prop);
    }
    static deleteProperty(target, prop) {
        return Reflect.deleteProperty(target, prop);
    }
}
exports.ReflectAdapter = ReflectAdapter; //# sourceMappingURL=reflect.js.map


/***/ }),

/***/ 60127:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
var _reflect = __webpack_require__(99877);
class ReadonlyRequestCookiesError extends Error {
    constructor(){
        super("ReadonlyRequestCookies cannot be modified. Read more: https://nextjs.org/docs/api-reference/cookies");
    }
    static callable() {
        throw new ReadonlyRequestCookiesError();
    }
}
exports.ReadonlyRequestCookiesError = ReadonlyRequestCookiesError;
class RequestCookiesAdapter {
    static seal(cookies) {
        return new Proxy(cookies, {
            get (target, prop, receiver) {
                switch(prop){
                    case "clear":
                    case "delete":
                    case "set":
                        return ReadonlyRequestCookiesError.callable;
                    default:
                        return _reflect.ReflectAdapter.get(target, prop, receiver);
                }
            }
        });
    }
}
exports.RequestCookiesAdapter = RequestCookiesAdapter; //# sourceMappingURL=request-cookies.js.map


/***/ }),

/***/ 8306:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({
    value: true
}));
var _cookies = _interopRequireWildcard(__webpack_require__(97783));
Object.keys(_cookies).forEach(function(key) {
    if (key === "default" || key === "__esModule") return;
    if (key in exports && exports[key] === _cookies[key]) return;
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function() {
            return _cookies[key];
        }
    });
});
function _getRequireWildcardCache() {
    if (typeof WeakMap !== "function") return null;
    var cache = new WeakMap();
    _getRequireWildcardCache = function() {
        return cache;
    };
    return cache;
}
function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
        return obj;
    }
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return {
            default: obj
        };
    }
    var cache = _getRequireWildcardCache();
    if (cache && cache.has(obj)) {
        return cache.get(obj);
    }
    var newObj = {};
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for(var key in obj){
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) {
                Object.defineProperty(newObj, key, desc);
            } else {
                newObj[key] = obj[key];
            }
        }
    }
    newObj.default = obj;
    if (cache) {
        cache.set(obj, newObj);
    }
    return newObj;
} //# sourceMappingURL=cookies.js.map


/***/ })

};
;