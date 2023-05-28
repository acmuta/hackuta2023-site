"use strict";
exports.id = 2096;
exports.ids = [2096];
exports.modules = {

/***/ 5652:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


const client = __webpack_require__(33075);
const Client = __webpack_require__(18630);
module.exports = client;
module.exports.Client = Client;


/***/ }),

/***/ 67256:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


module.exports = __webpack_require__(99534);


/***/ }),

/***/ 54502:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var utils = __webpack_require__(60986);
var settle = __webpack_require__(5596);
var buildFullPath = __webpack_require__(80605);
var buildURL = __webpack_require__(46926);
var http = __webpack_require__(13685);
var https = __webpack_require__(95687);
var httpFollow = (__webpack_require__(64932).http);
var httpsFollow = (__webpack_require__(64932).https);
var url = __webpack_require__(57310);
var zlib = __webpack_require__(59796);
var VERSION = (__webpack_require__(14589).version);
var createError = __webpack_require__(73717);
var enhanceError = __webpack_require__(50779);
var transitionalDefaults = __webpack_require__(54600);
var Cancel = __webpack_require__(45710);
var isHttps = /https:?/;
/**
 *
 * @param {http.ClientRequestArgs} options
 * @param {AxiosProxyConfig} proxy
 * @param {string} location
 */ function setProxy(options, proxy, location) {
    options.hostname = proxy.host;
    options.host = proxy.host;
    options.port = proxy.port;
    options.path = location;
    // Basic proxy authorization
    if (proxy.auth) {
        var base64 = Buffer.from(proxy.auth.username + ":" + proxy.auth.password, "utf8").toString("base64");
        options.headers["Proxy-Authorization"] = "Basic " + base64;
    }
    // If a proxy is used, any redirects must also pass through the proxy
    options.beforeRedirect = function beforeRedirect(redirection) {
        redirection.headers.host = redirection.host;
        setProxy(redirection, proxy, redirection.href);
    };
}
/*eslint consistent-return:0*/ module.exports = function httpAdapter(config) {
    return new Promise(function dispatchHttpRequest(resolvePromise, rejectPromise) {
        var onCanceled;
        function done() {
            if (config.cancelToken) {
                config.cancelToken.unsubscribe(onCanceled);
            }
            if (config.signal) {
                config.signal.removeEventListener("abort", onCanceled);
            }
        }
        var resolve = function resolve(value) {
            done();
            resolvePromise(value);
        };
        var rejected = false;
        var reject = function reject(value) {
            done();
            rejected = true;
            rejectPromise(value);
        };
        var data = config.data;
        var headers = config.headers;
        var headerNames = {};
        Object.keys(headers).forEach(function storeLowerName(name) {
            headerNames[name.toLowerCase()] = name;
        });
        // Set User-Agent (required by some servers)
        // See https://github.com/axios/axios/issues/69
        if ("user-agent" in headerNames) {
            // User-Agent is specified; handle case where no UA header is desired
            if (!headers[headerNames["user-agent"]]) {
                delete headers[headerNames["user-agent"]];
            }
        // Otherwise, use specified value
        } else {
            // Only set header if it hasn't been set in config
            headers["User-Agent"] = "axios/" + VERSION;
        }
        if (data && !utils.isStream(data)) {
            if (Buffer.isBuffer(data)) {
            // Nothing to do...
            } else if (utils.isArrayBuffer(data)) {
                data = Buffer.from(new Uint8Array(data));
            } else if (utils.isString(data)) {
                data = Buffer.from(data, "utf-8");
            } else {
                return reject(createError("Data after transformation must be a string, an ArrayBuffer, a Buffer, or a Stream", config));
            }
            if (config.maxBodyLength > -1 && data.length > config.maxBodyLength) {
                return reject(createError("Request body larger than maxBodyLength limit", config));
            }
            // Add Content-Length header if data exists
            if (!headerNames["content-length"]) {
                headers["Content-Length"] = data.length;
            }
        }
        // HTTP basic authentication
        var auth = undefined;
        if (config.auth) {
            var username = config.auth.username || "";
            var password = config.auth.password || "";
            auth = username + ":" + password;
        }
        // Parse url
        var fullPath = buildFullPath(config.baseURL, config.url);
        var parsed = url.parse(fullPath);
        var protocol = parsed.protocol || "http:";
        if (!auth && parsed.auth) {
            var urlAuth = parsed.auth.split(":");
            var urlUsername = urlAuth[0] || "";
            var urlPassword = urlAuth[1] || "";
            auth = urlUsername + ":" + urlPassword;
        }
        if (auth && headerNames.authorization) {
            delete headers[headerNames.authorization];
        }
        var isHttpsRequest = isHttps.test(protocol);
        var agent = isHttpsRequest ? config.httpsAgent : config.httpAgent;
        try {
            buildURL(parsed.path, config.params, config.paramsSerializer).replace(/^\?/, "");
        } catch (err) {
            var customErr = new Error(err.message);
            customErr.config = config;
            customErr.url = config.url;
            customErr.exists = true;
            reject(customErr);
        }
        var options = {
            path: buildURL(parsed.path, config.params, config.paramsSerializer).replace(/^\?/, ""),
            method: config.method.toUpperCase(),
            headers: headers,
            agent: agent,
            agents: {
                http: config.httpAgent,
                https: config.httpsAgent
            },
            auth: auth
        };
        if (config.socketPath) {
            options.socketPath = config.socketPath;
        } else {
            options.hostname = parsed.hostname;
            options.port = parsed.port;
        }
        var proxy = config.proxy;
        if (!proxy && proxy !== false) {
            var proxyEnv = protocol.slice(0, -1) + "_proxy";
            var proxyUrl = process.env[proxyEnv] || process.env[proxyEnv.toUpperCase()];
            if (proxyUrl) {
                var parsedProxyUrl = url.parse(proxyUrl);
                var noProxyEnv = process.env.no_proxy || process.env.NO_PROXY;
                var shouldProxy = true;
                if (noProxyEnv) {
                    var noProxy = noProxyEnv.split(",").map(function trim(s) {
                        return s.trim();
                    });
                    shouldProxy = !noProxy.some(function proxyMatch(proxyElement) {
                        if (!proxyElement) {
                            return false;
                        }
                        if (proxyElement === "*") {
                            return true;
                        }
                        if (proxyElement[0] === "." && parsed.hostname.substr(parsed.hostname.length - proxyElement.length) === proxyElement) {
                            return true;
                        }
                        return parsed.hostname === proxyElement;
                    });
                }
                if (shouldProxy) {
                    proxy = {
                        host: parsedProxyUrl.hostname,
                        port: parsedProxyUrl.port,
                        protocol: parsedProxyUrl.protocol
                    };
                    if (parsedProxyUrl.auth) {
                        var proxyUrlAuth = parsedProxyUrl.auth.split(":");
                        proxy.auth = {
                            username: proxyUrlAuth[0],
                            password: proxyUrlAuth[1]
                        };
                    }
                }
            }
        }
        if (proxy) {
            options.headers.host = parsed.hostname + (parsed.port ? ":" + parsed.port : "");
            setProxy(options, proxy, protocol + "//" + parsed.hostname + (parsed.port ? ":" + parsed.port : "") + options.path);
        }
        var transport;
        var isHttpsProxy = isHttpsRequest && (proxy ? isHttps.test(proxy.protocol) : true);
        if (config.transport) {
            transport = config.transport;
        } else if (config.maxRedirects === 0) {
            transport = isHttpsProxy ? https : http;
        } else {
            if (config.maxRedirects) {
                options.maxRedirects = config.maxRedirects;
            }
            transport = isHttpsProxy ? httpsFollow : httpFollow;
        }
        if (config.maxBodyLength > -1) {
            options.maxBodyLength = config.maxBodyLength;
        }
        if (config.insecureHTTPParser) {
            options.insecureHTTPParser = config.insecureHTTPParser;
        }
        // Create the request
        var req = transport.request(options, function handleResponse(res) {
            if (req.aborted) return;
            // uncompress the response body transparently if required
            var stream = res;
            // return the last request in case of redirects
            var lastRequest = res.req || req;
            // if no content, is HEAD request or decompress disabled we should not decompress
            if (res.statusCode !== 204 && lastRequest.method !== "HEAD" && config.decompress !== false) {
                switch(res.headers["content-encoding"]){
                    /*eslint default-case:0*/ case "gzip":
                    case "compress":
                    case "deflate":
                        // add the unzipper to the body stream processing pipeline
                        stream = stream.pipe(zlib.createUnzip());
                        // remove the content-encoding in order to not confuse downstream operations
                        delete res.headers["content-encoding"];
                        break;
                }
            }
            var response = {
                status: res.statusCode,
                statusText: res.statusMessage,
                headers: res.headers,
                config: config,
                request: lastRequest
            };
            if (config.responseType === "stream") {
                response.data = stream;
                settle(resolve, reject, response);
            } else {
                var responseBuffer = [];
                var totalResponseBytes = 0;
                stream.on("data", function handleStreamData(chunk) {
                    responseBuffer.push(chunk);
                    totalResponseBytes += chunk.length;
                    // make sure the content length is not over the maxContentLength if specified
                    if (config.maxContentLength > -1 && totalResponseBytes > config.maxContentLength) {
                        // stream.destoy() emit aborted event before calling reject() on Node.js v16
                        rejected = true;
                        stream.destroy();
                        reject(createError("maxContentLength size of " + config.maxContentLength + " exceeded", config, null, lastRequest));
                    }
                });
                stream.on("aborted", function handlerStreamAborted() {
                    if (rejected) {
                        return;
                    }
                    stream.destroy();
                    reject(createError("error request aborted", config, "ERR_REQUEST_ABORTED", lastRequest));
                });
                stream.on("error", function handleStreamError(err) {
                    if (req.aborted) return;
                    reject(enhanceError(err, config, null, lastRequest));
                });
                stream.on("end", function handleStreamEnd() {
                    try {
                        var responseData = responseBuffer.length === 1 ? responseBuffer[0] : Buffer.concat(responseBuffer);
                        if (config.responseType !== "arraybuffer") {
                            responseData = responseData.toString(config.responseEncoding);
                            if (!config.responseEncoding || config.responseEncoding === "utf8") {
                                responseData = utils.stripBOM(responseData);
                            }
                        }
                        response.data = responseData;
                    } catch (err) {
                        reject(enhanceError(err, config, err.code, response.request, response));
                    }
                    settle(resolve, reject, response);
                });
            }
        });
        // Handle errors
        req.on("error", function handleRequestError(err) {
            if (req.aborted && err.code !== "ERR_FR_TOO_MANY_REDIRECTS") return;
            reject(enhanceError(err, config, null, req));
        });
        // set tcp keep alive to prevent drop connection by peer
        req.on("socket", function handleRequestSocket(socket) {
            // default interval of sending ack packet is 1 minute
            socket.setKeepAlive(true, 1000 * 60);
        });
        // Handle request timeout
        if (config.timeout) {
            // This is forcing a int timeout to avoid problems if the `req` interface doesn't handle other types.
            var timeout = parseInt(config.timeout, 10);
            if (isNaN(timeout)) {
                reject(createError("error trying to parse `config.timeout` to int", config, "ERR_PARSE_TIMEOUT", req));
                return;
            }
            // Sometime, the response will be very slow, and does not respond, the connect event will be block by event loop system.
            // And timer callback will be fired, and abort() will be invoked before connection, then get "socket hang up" and code ECONNRESET.
            // At this time, if we have a large number of request, nodejs will hang up some socket on background. and the number will up and up.
            // And then these socket which be hang up will devoring CPU little by little.
            // ClientRequest.setTimeout will be fired on the specify milliseconds, and can make sure that abort() will be fired after connect.
            req.setTimeout(timeout, function handleRequestTimeout() {
                req.abort();
                var timeoutErrorMessage = "";
                if (config.timeoutErrorMessage) {
                    timeoutErrorMessage = config.timeoutErrorMessage;
                } else {
                    timeoutErrorMessage = "timeout of " + config.timeout + "ms exceeded";
                }
                var transitional = config.transitional || transitionalDefaults;
                reject(createError(timeoutErrorMessage, config, transitional.clarifyTimeoutError ? "ETIMEDOUT" : "ECONNABORTED", req));
            });
        }
        if (config.cancelToken || config.signal) {
            // Handle cancellation
            // eslint-disable-next-line func-names
            onCanceled = function(cancel) {
                if (req.aborted) return;
                req.abort();
                reject(!cancel || cancel && cancel.type ? new Cancel("canceled") : cancel);
            };
            config.cancelToken && config.cancelToken.subscribe(onCanceled);
            if (config.signal) {
                config.signal.aborted ? onCanceled() : config.signal.addEventListener("abort", onCanceled);
            }
        }
        // Send the request
        if (utils.isStream(data)) {
            data.on("error", function handleStreamError(err) {
                reject(enhanceError(err, config, null, req));
            }).pipe(req);
        } else {
            req.end(data);
        }
    });
};


/***/ }),

/***/ 62291:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var utils = __webpack_require__(60986);
var settle = __webpack_require__(5596);
var cookies = __webpack_require__(38592);
var buildURL = __webpack_require__(46926);
var buildFullPath = __webpack_require__(80605);
var parseHeaders = __webpack_require__(23189);
var isURLSameOrigin = __webpack_require__(80207);
var createError = __webpack_require__(73717);
var transitionalDefaults = __webpack_require__(54600);
var Cancel = __webpack_require__(45710);
module.exports = function xhrAdapter(config) {
    return new Promise(function dispatchXhrRequest(resolve, reject) {
        var requestData = config.data;
        var requestHeaders = config.headers;
        var responseType = config.responseType;
        var onCanceled;
        function done() {
            if (config.cancelToken) {
                config.cancelToken.unsubscribe(onCanceled);
            }
            if (config.signal) {
                config.signal.removeEventListener("abort", onCanceled);
            }
        }
        if (utils.isFormData(requestData)) {
            delete requestHeaders["Content-Type"]; // Let the browser set it
        }
        var request = new XMLHttpRequest();
        // HTTP basic authentication
        if (config.auth) {
            var username = config.auth.username || "";
            var password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : "";
            requestHeaders.Authorization = "Basic " + btoa(username + ":" + password);
        }
        var fullPath = buildFullPath(config.baseURL, config.url);
        request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);
        // Set the request timeout in MS
        request.timeout = config.timeout;
        function onloadend() {
            if (!request) {
                return;
            }
            // Prepare the response
            var responseHeaders = "getAllResponseHeaders" in request ? parseHeaders(request.getAllResponseHeaders()) : null;
            var responseData = !responseType || responseType === "text" || responseType === "json" ? request.responseText : request.response;
            var response = {
                data: responseData,
                status: request.status,
                statusText: request.statusText,
                headers: responseHeaders,
                config: config,
                request: request
            };
            settle(function _resolve(value) {
                resolve(value);
                done();
            }, function _reject(err) {
                reject(err);
                done();
            }, response);
            // Clean up request
            request = null;
        }
        if ("onloadend" in request) {
            // Use onloadend if available
            request.onloadend = onloadend;
        } else {
            // Listen for ready state to emulate onloadend
            request.onreadystatechange = function handleLoad() {
                if (!request || request.readyState !== 4) {
                    return;
                }
                // The request errored out and we didn't get a response, this will be
                // handled by onerror instead
                // With one exception: request that using file: protocol, most browsers
                // will return status as 0 even though it's a successful request
                if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf("file:") === 0)) {
                    return;
                }
                // readystate handler is calling before onerror or ontimeout handlers,
                // so we should call onloadend on the next 'tick'
                setTimeout(onloadend);
            };
        }
        // Handle browser request cancellation (as opposed to a manual cancellation)
        request.onabort = function handleAbort() {
            if (!request) {
                return;
            }
            reject(createError("Request aborted", config, "ECONNABORTED", request));
            // Clean up request
            request = null;
        };
        // Handle low level network errors
        request.onerror = function handleError() {
            // Real errors are hidden from us by the browser
            // onerror should only fire if it's a network error
            reject(createError("Network Error", config, null, request));
            // Clean up request
            request = null;
        };
        // Handle timeout
        request.ontimeout = function handleTimeout() {
            var timeoutErrorMessage = config.timeout ? "timeout of " + config.timeout + "ms exceeded" : "timeout exceeded";
            var transitional = config.transitional || transitionalDefaults;
            if (config.timeoutErrorMessage) {
                timeoutErrorMessage = config.timeoutErrorMessage;
            }
            reject(createError(timeoutErrorMessage, config, transitional.clarifyTimeoutError ? "ETIMEDOUT" : "ECONNABORTED", request));
            // Clean up request
            request = null;
        };
        // Add xsrf header
        // This is only done if running in a standard browser environment.
        // Specifically not if we're in a web worker, or react-native.
        if (utils.isStandardBrowserEnv()) {
            // Add xsrf header
            var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ? cookies.read(config.xsrfCookieName) : undefined;
            if (xsrfValue) {
                requestHeaders[config.xsrfHeaderName] = xsrfValue;
            }
        }
        // Add headers to the request
        if ("setRequestHeader" in request) {
            utils.forEach(requestHeaders, function setRequestHeader(val, key) {
                if (typeof requestData === "undefined" && key.toLowerCase() === "content-type") {
                    // Remove Content-Type if data is undefined
                    delete requestHeaders[key];
                } else {
                    // Otherwise add header to the request
                    request.setRequestHeader(key, val);
                }
            });
        }
        // Add withCredentials to request if needed
        if (!utils.isUndefined(config.withCredentials)) {
            request.withCredentials = !!config.withCredentials;
        }
        // Add responseType to request if needed
        if (responseType && responseType !== "json") {
            request.responseType = config.responseType;
        }
        // Handle progress if needed
        if (typeof config.onDownloadProgress === "function") {
            request.addEventListener("progress", config.onDownloadProgress);
        }
        // Not all browsers support upload events
        if (typeof config.onUploadProgress === "function" && request.upload) {
            request.upload.addEventListener("progress", config.onUploadProgress);
        }
        if (config.cancelToken || config.signal) {
            // Handle cancellation
            // eslint-disable-next-line func-names
            onCanceled = function(cancel) {
                if (!request) {
                    return;
                }
                reject(!cancel || cancel && cancel.type ? new Cancel("canceled") : cancel);
                request.abort();
                request = null;
            };
            config.cancelToken && config.cancelToken.subscribe(onCanceled);
            if (config.signal) {
                config.signal.aborted ? onCanceled() : config.signal.addEventListener("abort", onCanceled);
            }
        }
        if (!requestData) {
            requestData = null;
        }
        // Send the request
        request.send(requestData);
    });
};


/***/ }),

/***/ 99534:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var utils = __webpack_require__(60986);
var bind = __webpack_require__(90102);
var Axios = __webpack_require__(51152);
var mergeConfig = __webpack_require__(11823);
var defaults = __webpack_require__(21979);
/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */ function createInstance(defaultConfig) {
    var context = new Axios(defaultConfig);
    var instance = bind(Axios.prototype.request, context);
    // Copy axios.prototype to instance
    utils.extend(instance, Axios.prototype, context);
    // Copy context to instance
    utils.extend(instance, context);
    // Factory for creating new instances
    instance.create = function create(instanceConfig) {
        return createInstance(mergeConfig(defaultConfig, instanceConfig));
    };
    return instance;
}
// Create the default instance to be exported
var axios = createInstance(defaults);
// Expose Axios class to allow class inheritance
axios.Axios = Axios;
// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__(45710);
axios.CancelToken = __webpack_require__(1150);
axios.isCancel = __webpack_require__(21946);
axios.VERSION = (__webpack_require__(14589).version);
// Expose all/spread
axios.all = function all(promises) {
    return Promise.all(promises);
};
axios.spread = __webpack_require__(69614);
// Expose isAxiosError
axios.isAxiosError = __webpack_require__(32542);
module.exports = axios;
// Allow use of default import syntax in TypeScript
module.exports["default"] = axios;


/***/ }),

/***/ 45710:
/***/ ((module) => {


/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */ function Cancel(message) {
    this.message = message;
}
Cancel.prototype.toString = function toString() {
    return "Cancel" + (this.message ? ": " + this.message : "");
};
Cancel.prototype.__CANCEL__ = true;
module.exports = Cancel;


/***/ }),

/***/ 1150:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var Cancel = __webpack_require__(45710);
/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */ function CancelToken(executor) {
    if (typeof executor !== "function") {
        throw new TypeError("executor must be a function.");
    }
    var resolvePromise;
    this.promise = new Promise(function promiseExecutor(resolve) {
        resolvePromise = resolve;
    });
    var token = this;
    // eslint-disable-next-line func-names
    this.promise.then(function(cancel) {
        if (!token._listeners) return;
        var i;
        var l = token._listeners.length;
        for(i = 0; i < l; i++){
            token._listeners[i](cancel);
        }
        token._listeners = null;
    });
    // eslint-disable-next-line func-names
    this.promise.then = function(onfulfilled) {
        var _resolve;
        // eslint-disable-next-line func-names
        var promise = new Promise(function(resolve) {
            token.subscribe(resolve);
            _resolve = resolve;
        }).then(onfulfilled);
        promise.cancel = function reject() {
            token.unsubscribe(_resolve);
        };
        return promise;
    };
    executor(function cancel(message) {
        if (token.reason) {
            // Cancellation has already been requested
            return;
        }
        token.reason = new Cancel(message);
        resolvePromise(token.reason);
    });
}
/**
 * Throws a `Cancel` if cancellation has been requested.
 */ CancelToken.prototype.throwIfRequested = function throwIfRequested() {
    if (this.reason) {
        throw this.reason;
    }
};
/**
 * Subscribe to the cancel signal
 */ CancelToken.prototype.subscribe = function subscribe(listener) {
    if (this.reason) {
        listener(this.reason);
        return;
    }
    if (this._listeners) {
        this._listeners.push(listener);
    } else {
        this._listeners = [
            listener
        ];
    }
};
/**
 * Unsubscribe from the cancel signal
 */ CancelToken.prototype.unsubscribe = function unsubscribe(listener) {
    if (!this._listeners) {
        return;
    }
    var index = this._listeners.indexOf(listener);
    if (index !== -1) {
        this._listeners.splice(index, 1);
    }
};
/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */ CancelToken.source = function source() {
    var cancel;
    var token = new CancelToken(function executor(c) {
        cancel = c;
    });
    return {
        token: token,
        cancel: cancel
    };
};
module.exports = CancelToken;


/***/ }),

/***/ 21946:
/***/ ((module) => {


module.exports = function isCancel(value) {
    return !!(value && value.__CANCEL__);
};


/***/ }),

/***/ 51152:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var utils = __webpack_require__(60986);
var buildURL = __webpack_require__(46926);
var InterceptorManager = __webpack_require__(32274);
var dispatchRequest = __webpack_require__(47856);
var mergeConfig = __webpack_require__(11823);
var validator = __webpack_require__(20631);
var validators = validator.validators;
/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */ function Axios(instanceConfig) {
    this.defaults = instanceConfig;
    this.interceptors = {
        request: new InterceptorManager(),
        response: new InterceptorManager()
    };
}
/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */ Axios.prototype.request = function request(configOrUrl, config) {
    /*eslint no-param-reassign:0*/ // Allow for axios('example/url'[, config]) a la fetch API
    if (typeof configOrUrl === "string") {
        config = config || {};
        config.url = configOrUrl;
    } else {
        config = configOrUrl || {};
    }
    config = mergeConfig(this.defaults, config);
    // Set config.method
    if (config.method) {
        config.method = config.method.toLowerCase();
    } else if (this.defaults.method) {
        config.method = this.defaults.method.toLowerCase();
    } else {
        config.method = "get";
    }
    var transitional = config.transitional;
    if (transitional !== undefined) {
        validator.assertOptions(transitional, {
            silentJSONParsing: validators.transitional(validators.boolean),
            forcedJSONParsing: validators.transitional(validators.boolean),
            clarifyTimeoutError: validators.transitional(validators.boolean)
        }, false);
    }
    // filter out skipped interceptors
    var requestInterceptorChain = [];
    var synchronousRequestInterceptors = true;
    this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
        if (typeof interceptor.runWhen === "function" && interceptor.runWhen(config) === false) {
            return;
        }
        synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;
        requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
    });
    var responseInterceptorChain = [];
    this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
        responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
    });
    var promise;
    if (!synchronousRequestInterceptors) {
        var chain = [
            dispatchRequest,
            undefined
        ];
        Array.prototype.unshift.apply(chain, requestInterceptorChain);
        chain = chain.concat(responseInterceptorChain);
        promise = Promise.resolve(config);
        while(chain.length){
            promise = promise.then(chain.shift(), chain.shift());
        }
        return promise;
    }
    var newConfig = config;
    while(requestInterceptorChain.length){
        var onFulfilled = requestInterceptorChain.shift();
        var onRejected = requestInterceptorChain.shift();
        try {
            newConfig = onFulfilled(newConfig);
        } catch (error) {
            onRejected(error);
            break;
        }
    }
    try {
        promise = dispatchRequest(newConfig);
    } catch (error) {
        return Promise.reject(error);
    }
    while(responseInterceptorChain.length){
        promise = promise.then(responseInterceptorChain.shift(), responseInterceptorChain.shift());
    }
    return promise;
};
Axios.prototype.getUri = function getUri(config) {
    config = mergeConfig(this.defaults, config);
    return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, "");
};
// Provide aliases for supported request methods
utils.forEach([
    "delete",
    "get",
    "head",
    "options"
], function forEachMethodNoData(method) {
    /*eslint func-names:0*/ Axios.prototype[method] = function(url, config) {
        return this.request(mergeConfig(config || {}, {
            method: method,
            url: url,
            data: (config || {}).data
        }));
    };
});
utils.forEach([
    "post",
    "put",
    "patch"
], function forEachMethodWithData(method) {
    /*eslint func-names:0*/ Axios.prototype[method] = function(url, data, config) {
        return this.request(mergeConfig(config || {}, {
            method: method,
            url: url,
            data: data
        }));
    };
});
module.exports = Axios;


/***/ }),

/***/ 32274:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var utils = __webpack_require__(60986);
function InterceptorManager() {
    this.handlers = [];
}
/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */ InterceptorManager.prototype.use = function use(fulfilled, rejected, options) {
    this.handlers.push({
        fulfilled: fulfilled,
        rejected: rejected,
        synchronous: options ? options.synchronous : false,
        runWhen: options ? options.runWhen : null
    });
    return this.handlers.length - 1;
};
/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */ InterceptorManager.prototype.eject = function eject(id) {
    if (this.handlers[id]) {
        this.handlers[id] = null;
    }
};
/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */ InterceptorManager.prototype.forEach = function forEach(fn) {
    utils.forEach(this.handlers, function forEachHandler(h) {
        if (h !== null) {
            fn(h);
        }
    });
};
module.exports = InterceptorManager;


/***/ }),

/***/ 80605:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var isAbsoluteURL = __webpack_require__(29789);
var combineURLs = __webpack_require__(66368);
/**
 * Creates a new URL by combining the baseURL with the requestedURL,
 * only when the requestedURL is not already an absolute URL.
 * If the requestURL is absolute, this function returns the requestedURL untouched.
 *
 * @param {string} baseURL The base URL
 * @param {string} requestedURL Absolute or relative URL to combine
 * @returns {string} The combined full path
 */ module.exports = function buildFullPath(baseURL, requestedURL) {
    if (baseURL && !isAbsoluteURL(requestedURL)) {
        return combineURLs(baseURL, requestedURL);
    }
    return requestedURL;
};


/***/ }),

/***/ 73717:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var enhanceError = __webpack_require__(50779);
/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */ module.exports = function createError(message, config, code, request, response) {
    var error = new Error(message);
    return enhanceError(error, config, code, request, response);
};


/***/ }),

/***/ 47856:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var utils = __webpack_require__(60986);
var transformData = __webpack_require__(26618);
var isCancel = __webpack_require__(21946);
var defaults = __webpack_require__(21979);
var Cancel = __webpack_require__(45710);
/**
 * Throws a `Cancel` if cancellation has been requested.
 */ function throwIfCancellationRequested(config) {
    if (config.cancelToken) {
        config.cancelToken.throwIfRequested();
    }
    if (config.signal && config.signal.aborted) {
        throw new Cancel("canceled");
    }
}
/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */ module.exports = function dispatchRequest(config) {
    throwIfCancellationRequested(config);
    // Ensure headers exist
    config.headers = config.headers || {};
    // Transform request data
    config.data = transformData.call(config, config.data, config.headers, config.transformRequest);
    // Flatten headers
    config.headers = utils.merge(config.headers.common || {}, config.headers[config.method] || {}, config.headers);
    utils.forEach([
        "delete",
        "get",
        "head",
        "post",
        "put",
        "patch",
        "common"
    ], function cleanHeaderConfig(method) {
        delete config.headers[method];
    });
    var adapter = config.adapter || defaults.adapter;
    return adapter(config).then(function onAdapterResolution(response) {
        throwIfCancellationRequested(config);
        // Transform response data
        response.data = transformData.call(config, response.data, response.headers, config.transformResponse);
        return response;
    }, function onAdapterRejection(reason) {
        if (!isCancel(reason)) {
            throwIfCancellationRequested(config);
            // Transform response data
            if (reason && reason.response) {
                reason.response.data = transformData.call(config, reason.response.data, reason.response.headers, config.transformResponse);
            }
        }
        return Promise.reject(reason);
    });
};


/***/ }),

/***/ 50779:
/***/ ((module) => {


/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */ module.exports = function enhanceError(error, config, code, request, response) {
    error.config = config;
    if (code) {
        error.code = code;
    }
    error.request = request;
    error.response = response;
    error.isAxiosError = true;
    error.toJSON = function toJSON() {
        return {
            // Standard
            message: this.message,
            name: this.name,
            // Microsoft
            description: this.description,
            number: this.number,
            // Mozilla
            fileName: this.fileName,
            lineNumber: this.lineNumber,
            columnNumber: this.columnNumber,
            stack: this.stack,
            // Axios
            config: this.config,
            code: this.code,
            status: this.response && this.response.status ? this.response.status : null
        };
    };
    return error;
};


/***/ }),

/***/ 11823:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var utils = __webpack_require__(60986);
/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 * @returns {Object} New object resulting from merging config2 to config1
 */ module.exports = function mergeConfig(config1, config2) {
    // eslint-disable-next-line no-param-reassign
    config2 = config2 || {};
    var config = {};
    function getMergedValue(target, source) {
        if (utils.isPlainObject(target) && utils.isPlainObject(source)) {
            return utils.merge(target, source);
        } else if (utils.isPlainObject(source)) {
            return utils.merge({}, source);
        } else if (utils.isArray(source)) {
            return source.slice();
        }
        return source;
    }
    // eslint-disable-next-line consistent-return
    function mergeDeepProperties(prop) {
        if (!utils.isUndefined(config2[prop])) {
            return getMergedValue(config1[prop], config2[prop]);
        } else if (!utils.isUndefined(config1[prop])) {
            return getMergedValue(undefined, config1[prop]);
        }
    }
    // eslint-disable-next-line consistent-return
    function valueFromConfig2(prop) {
        if (!utils.isUndefined(config2[prop])) {
            return getMergedValue(undefined, config2[prop]);
        }
    }
    // eslint-disable-next-line consistent-return
    function defaultToConfig2(prop) {
        if (!utils.isUndefined(config2[prop])) {
            return getMergedValue(undefined, config2[prop]);
        } else if (!utils.isUndefined(config1[prop])) {
            return getMergedValue(undefined, config1[prop]);
        }
    }
    // eslint-disable-next-line consistent-return
    function mergeDirectKeys(prop) {
        if (prop in config2) {
            return getMergedValue(config1[prop], config2[prop]);
        } else if (prop in config1) {
            return getMergedValue(undefined, config1[prop]);
        }
    }
    var mergeMap = {
        "url": valueFromConfig2,
        "method": valueFromConfig2,
        "data": valueFromConfig2,
        "baseURL": defaultToConfig2,
        "transformRequest": defaultToConfig2,
        "transformResponse": defaultToConfig2,
        "paramsSerializer": defaultToConfig2,
        "timeout": defaultToConfig2,
        "timeoutMessage": defaultToConfig2,
        "withCredentials": defaultToConfig2,
        "adapter": defaultToConfig2,
        "responseType": defaultToConfig2,
        "xsrfCookieName": defaultToConfig2,
        "xsrfHeaderName": defaultToConfig2,
        "onUploadProgress": defaultToConfig2,
        "onDownloadProgress": defaultToConfig2,
        "decompress": defaultToConfig2,
        "maxContentLength": defaultToConfig2,
        "maxBodyLength": defaultToConfig2,
        "transport": defaultToConfig2,
        "httpAgent": defaultToConfig2,
        "httpsAgent": defaultToConfig2,
        "cancelToken": defaultToConfig2,
        "socketPath": defaultToConfig2,
        "responseEncoding": defaultToConfig2,
        "validateStatus": mergeDirectKeys
    };
    utils.forEach(Object.keys(config1).concat(Object.keys(config2)), function computeConfigValue(prop) {
        var merge = mergeMap[prop] || mergeDeepProperties;
        var configValue = merge(prop);
        utils.isUndefined(configValue) && merge !== mergeDirectKeys || (config[prop] = configValue);
    });
    return config;
};


/***/ }),

/***/ 5596:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var createError = __webpack_require__(73717);
/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */ module.exports = function settle(resolve, reject, response) {
    var validateStatus = response.config.validateStatus;
    if (!response.status || !validateStatus || validateStatus(response.status)) {
        resolve(response);
    } else {
        reject(createError("Request failed with status code " + response.status, response.config, null, response.request, response));
    }
};


/***/ }),

/***/ 26618:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var utils = __webpack_require__(60986);
var defaults = __webpack_require__(21979);
/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */ module.exports = function transformData(data, headers, fns) {
    var context = this || defaults;
    /*eslint no-param-reassign:0*/ utils.forEach(fns, function transform(fn) {
        data = fn.call(context, data, headers);
    });
    return data;
};


/***/ }),

/***/ 21979:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var utils = __webpack_require__(60986);
var normalizeHeaderName = __webpack_require__(75431);
var enhanceError = __webpack_require__(50779);
var transitionalDefaults = __webpack_require__(54600);
var DEFAULT_CONTENT_TYPE = {
    "Content-Type": "application/x-www-form-urlencoded"
};
function setContentTypeIfUnset(headers, value) {
    if (!utils.isUndefined(headers) && utils.isUndefined(headers["Content-Type"])) {
        headers["Content-Type"] = value;
    }
}
function getDefaultAdapter() {
    var adapter;
    if (typeof XMLHttpRequest !== "undefined") {
        // For browsers use XHR adapter
        adapter = __webpack_require__(62291);
    } else if (typeof process !== "undefined" && Object.prototype.toString.call(process) === "[object process]") {
        // For node use HTTP adapter
        adapter = __webpack_require__(54502);
    }
    return adapter;
}
function stringifySafely(rawValue, parser, encoder) {
    if (utils.isString(rawValue)) {
        try {
            (parser || JSON.parse)(rawValue);
            return utils.trim(rawValue);
        } catch (e) {
            if (e.name !== "SyntaxError") {
                throw e;
            }
        }
    }
    return (encoder || JSON.stringify)(rawValue);
}
var defaults = {
    transitional: transitionalDefaults,
    adapter: getDefaultAdapter(),
    transformRequest: [
        function transformRequest(data, headers) {
            normalizeHeaderName(headers, "Accept");
            normalizeHeaderName(headers, "Content-Type");
            if (utils.isFormData(data) || utils.isArrayBuffer(data) || utils.isBuffer(data) || utils.isStream(data) || utils.isFile(data) || utils.isBlob(data)) {
                return data;
            }
            if (utils.isArrayBufferView(data)) {
                return data.buffer;
            }
            if (utils.isURLSearchParams(data)) {
                setContentTypeIfUnset(headers, "application/x-www-form-urlencoded;charset=utf-8");
                return data.toString();
            }
            if (utils.isObject(data) || headers && headers["Content-Type"] === "application/json") {
                setContentTypeIfUnset(headers, "application/json");
                return stringifySafely(data);
            }
            return data;
        }
    ],
    transformResponse: [
        function transformResponse(data) {
            var transitional = this.transitional || defaults.transitional;
            var silentJSONParsing = transitional && transitional.silentJSONParsing;
            var forcedJSONParsing = transitional && transitional.forcedJSONParsing;
            var strictJSONParsing = !silentJSONParsing && this.responseType === "json";
            if (strictJSONParsing || forcedJSONParsing && utils.isString(data) && data.length) {
                try {
                    return JSON.parse(data);
                } catch (e) {
                    if (strictJSONParsing) {
                        if (e.name === "SyntaxError") {
                            throw enhanceError(e, this, "E_JSON_PARSE");
                        }
                        throw e;
                    }
                }
            }
            return data;
        }
    ],
    /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */ timeout: 0,
    xsrfCookieName: "XSRF-TOKEN",
    xsrfHeaderName: "X-XSRF-TOKEN",
    maxContentLength: -1,
    maxBodyLength: -1,
    validateStatus: function validateStatus(status) {
        return status >= 200 && status < 300;
    },
    headers: {
        common: {
            "Accept": "application/json, text/plain, */*"
        }
    }
};
utils.forEach([
    "delete",
    "get",
    "head"
], function forEachMethodNoData(method) {
    defaults.headers[method] = {};
});
utils.forEach([
    "post",
    "put",
    "patch"
], function forEachMethodWithData(method) {
    defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});
module.exports = defaults;


/***/ }),

/***/ 54600:
/***/ ((module) => {


module.exports = {
    silentJSONParsing: true,
    forcedJSONParsing: true,
    clarifyTimeoutError: false
};


/***/ }),

/***/ 14589:
/***/ ((module) => {


module.exports = {
    "version": "0.26.1"
};


/***/ }),

/***/ 90102:
/***/ ((module) => {


module.exports = function bind(fn, thisArg) {
    return function wrap() {
        var args = new Array(arguments.length);
        for(var i = 0; i < args.length; i++){
            args[i] = arguments[i];
        }
        return fn.apply(thisArg, args);
    };
};


/***/ }),

/***/ 46926:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var utils = __webpack_require__(60986);
function encode(val) {
    return encodeURIComponent(val).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}
/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */ module.exports = function buildURL(url, params, paramsSerializer) {
    /*eslint no-param-reassign:0*/ if (!params) {
        return url;
    }
    var serializedParams;
    if (paramsSerializer) {
        serializedParams = paramsSerializer(params);
    } else if (utils.isURLSearchParams(params)) {
        serializedParams = params.toString();
    } else {
        var parts = [];
        utils.forEach(params, function serialize(val, key) {
            if (val === null || typeof val === "undefined") {
                return;
            }
            if (utils.isArray(val)) {
                key = key + "[]";
            } else {
                val = [
                    val
                ];
            }
            utils.forEach(val, function parseValue(v) {
                if (utils.isDate(v)) {
                    v = v.toISOString();
                } else if (utils.isObject(v)) {
                    v = JSON.stringify(v);
                }
                parts.push(encode(key) + "=" + encode(v));
            });
        });
        serializedParams = parts.join("&");
    }
    if (serializedParams) {
        var hashmarkIndex = url.indexOf("#");
        if (hashmarkIndex !== -1) {
            url = url.slice(0, hashmarkIndex);
        }
        url += (url.indexOf("?") === -1 ? "?" : "&") + serializedParams;
    }
    return url;
};


/***/ }),

/***/ 66368:
/***/ ((module) => {


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */ module.exports = function combineURLs(baseURL, relativeURL) {
    return relativeURL ? baseURL.replace(/\/+$/, "") + "/" + relativeURL.replace(/^\/+/, "") : baseURL;
};


/***/ }),

/***/ 38592:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var utils = __webpack_require__(60986);
module.exports = utils.isStandardBrowserEnv() ? // Standard browser envs support document.cookie
function standardBrowserEnv() {
    return {
        write: function write(name, value, expires, path, domain, secure) {
            var cookie = [];
            cookie.push(name + "=" + encodeURIComponent(value));
            if (utils.isNumber(expires)) {
                cookie.push("expires=" + new Date(expires).toGMTString());
            }
            if (utils.isString(path)) {
                cookie.push("path=" + path);
            }
            if (utils.isString(domain)) {
                cookie.push("domain=" + domain);
            }
            if (secure === true) {
                cookie.push("secure");
            }
            document.cookie = cookie.join("; ");
        },
        read: function read(name) {
            var match = document.cookie.match(new RegExp("(^|;\\s*)(" + name + ")=([^;]*)"));
            return match ? decodeURIComponent(match[3]) : null;
        },
        remove: function remove(name) {
            this.write(name, "", Date.now() - 86400000);
        }
    };
}() : // Non standard browser env (web workers, react-native) lack needed support.
function nonStandardBrowserEnv() {
    return {
        write: function write() {},
        read: function read() {
            return null;
        },
        remove: function remove() {}
    };
}();


/***/ }),

/***/ 29789:
/***/ ((module) => {


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */ module.exports = function isAbsoluteURL(url) {
    // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
    // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
    // by any combination of letters, digits, plus, period, or hyphen.
    return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
};


/***/ }),

/***/ 32542:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var utils = __webpack_require__(60986);
/**
 * Determines whether the payload is an error thrown by Axios
 *
 * @param {*} payload The value to test
 * @returns {boolean} True if the payload is an error thrown by Axios, otherwise false
 */ module.exports = function isAxiosError(payload) {
    return utils.isObject(payload) && payload.isAxiosError === true;
};


/***/ }),

/***/ 80207:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var utils = __webpack_require__(60986);
module.exports = utils.isStandardBrowserEnv() ? // Standard browser envs have full support of the APIs needed to test
// whether the request URL is of the same origin as current location.
function standardBrowserEnv() {
    var msie = /(msie|trident)/i.test(navigator.userAgent);
    var urlParsingNode = document.createElement("a");
    var originURL;
    /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */ function resolveURL(url) {
        var href = url;
        if (msie) {
            // IE needs attribute set twice to normalize properties
            urlParsingNode.setAttribute("href", href);
            href = urlParsingNode.href;
        }
        urlParsingNode.setAttribute("href", href);
        // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
        return {
            href: urlParsingNode.href,
            protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, "") : "",
            host: urlParsingNode.host,
            search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, "") : "",
            hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, "") : "",
            hostname: urlParsingNode.hostname,
            port: urlParsingNode.port,
            pathname: urlParsingNode.pathname.charAt(0) === "/" ? urlParsingNode.pathname : "/" + urlParsingNode.pathname
        };
    }
    originURL = resolveURL(window.location.href);
    /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */ return function isURLSameOrigin(requestURL) {
        var parsed = utils.isString(requestURL) ? resolveURL(requestURL) : requestURL;
        return parsed.protocol === originURL.protocol && parsed.host === originURL.host;
    };
}() : // Non standard browser envs (web workers, react-native) lack needed support.
function nonStandardBrowserEnv() {
    return function isURLSameOrigin() {
        return true;
    };
}();


/***/ }),

/***/ 75431:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var utils = __webpack_require__(60986);
module.exports = function normalizeHeaderName(headers, normalizedName) {
    utils.forEach(headers, function processHeader(value, name) {
        if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
            headers[normalizedName] = value;
            delete headers[name];
        }
    });
};


/***/ }),

/***/ 23189:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var utils = __webpack_require__(60986);
// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
    "age",
    "authorization",
    "content-length",
    "content-type",
    "etag",
    "expires",
    "from",
    "host",
    "if-modified-since",
    "if-unmodified-since",
    "last-modified",
    "location",
    "max-forwards",
    "proxy-authorization",
    "referer",
    "retry-after",
    "user-agent"
];
/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */ module.exports = function parseHeaders(headers) {
    var parsed = {};
    var key;
    var val;
    var i;
    if (!headers) {
        return parsed;
    }
    utils.forEach(headers.split("\n"), function parser(line) {
        i = line.indexOf(":");
        key = utils.trim(line.substr(0, i)).toLowerCase();
        val = utils.trim(line.substr(i + 1));
        if (key) {
            if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
                return;
            }
            if (key === "set-cookie") {
                parsed[key] = (parsed[key] ? parsed[key] : []).concat([
                    val
                ]);
            } else {
                parsed[key] = parsed[key] ? parsed[key] + ", " + val : val;
            }
        }
    });
    return parsed;
};


/***/ }),

/***/ 69614:
/***/ ((module) => {


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */ module.exports = function spread(callback) {
    return function wrap(arr) {
        return callback.apply(null, arr);
    };
};


/***/ }),

/***/ 20631:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var VERSION = (__webpack_require__(14589).version);
var validators = {};
// eslint-disable-next-line func-names
[
    "object",
    "boolean",
    "number",
    "function",
    "string",
    "symbol"
].forEach(function(type, i) {
    validators[type] = function validator(thing) {
        return typeof thing === type || "a" + (i < 1 ? "n " : " ") + type;
    };
});
var deprecatedWarnings = {};
/**
 * Transitional option validator
 * @param {function|boolean?} validator - set to false if the transitional option has been removed
 * @param {string?} version - deprecated version / removed since version
 * @param {string?} message - some message with additional info
 * @returns {function}
 */ validators.transitional = function transitional(validator, version, message) {
    function formatMessage(opt, desc) {
        return "[Axios v" + VERSION + "] Transitional option '" + opt + "'" + desc + (message ? ". " + message : "");
    }
    // eslint-disable-next-line func-names
    return function(value, opt, opts) {
        if (validator === false) {
            throw new Error(formatMessage(opt, " has been removed" + (version ? " in " + version : "")));
        }
        if (version && !deprecatedWarnings[opt]) {
            deprecatedWarnings[opt] = true;
            // eslint-disable-next-line no-console
            console.warn(formatMessage(opt, " has been deprecated since v" + version + " and will be removed in the near future"));
        }
        return validator ? validator(value, opt, opts) : true;
    };
};
/**
 * Assert object's properties type
 * @param {object} options
 * @param {object} schema
 * @param {boolean?} allowUnknown
 */ function assertOptions(options, schema, allowUnknown) {
    if (typeof options !== "object") {
        throw new TypeError("options must be an object");
    }
    var keys = Object.keys(options);
    var i = keys.length;
    while(i-- > 0){
        var opt = keys[i];
        var validator = schema[opt];
        if (validator) {
            var value = options[opt];
            var result = value === undefined || validator(value, opt, options);
            if (result !== true) {
                throw new TypeError("option " + opt + " must be " + result);
            }
            continue;
        }
        if (allowUnknown !== true) {
            throw Error("Unknown option " + opt);
        }
    }
}
module.exports = {
    assertOptions: assertOptions,
    validators: validators
};


/***/ }),

/***/ 60986:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var bind = __webpack_require__(90102);
// utils is a library of generic helper functions non-specific to axios
var toString = Object.prototype.toString;
/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */ function isArray(val) {
    return Array.isArray(val);
}
/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */ function isUndefined(val) {
    return typeof val === "undefined";
}
/**
 * Determine if a value is a Buffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Buffer, otherwise false
 */ function isBuffer(val) {
    return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor) && typeof val.constructor.isBuffer === "function" && val.constructor.isBuffer(val);
}
/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */ function isArrayBuffer(val) {
    return toString.call(val) === "[object ArrayBuffer]";
}
/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */ function isFormData(val) {
    return toString.call(val) === "[object FormData]";
}
/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */ function isArrayBufferView(val) {
    var result;
    if (typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView) {
        result = ArrayBuffer.isView(val);
    } else {
        result = val && val.buffer && isArrayBuffer(val.buffer);
    }
    return result;
}
/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */ function isString(val) {
    return typeof val === "string";
}
/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */ function isNumber(val) {
    return typeof val === "number";
}
/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */ function isObject(val) {
    return val !== null && typeof val === "object";
}
/**
 * Determine if a value is a plain Object
 *
 * @param {Object} val The value to test
 * @return {boolean} True if value is a plain Object, otherwise false
 */ function isPlainObject(val) {
    if (toString.call(val) !== "[object Object]") {
        return false;
    }
    var prototype = Object.getPrototypeOf(val);
    return prototype === null || prototype === Object.prototype;
}
/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */ function isDate(val) {
    return toString.call(val) === "[object Date]";
}
/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */ function isFile(val) {
    return toString.call(val) === "[object File]";
}
/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */ function isBlob(val) {
    return toString.call(val) === "[object Blob]";
}
/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */ function isFunction(val) {
    return toString.call(val) === "[object Function]";
}
/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */ function isStream(val) {
    return isObject(val) && isFunction(val.pipe);
}
/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */ function isURLSearchParams(val) {
    return toString.call(val) === "[object URLSearchParams]";
}
/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */ function trim(str) {
    return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, "");
}
/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 */ function isStandardBrowserEnv() {
    if (typeof navigator !== "undefined" && (navigator.product === "ReactNative" || navigator.product === "NativeScript" || navigator.product === "NS")) {
        return false;
    }
    return  false && 0;
}
/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */ function forEach(obj, fn) {
    // Don't bother if no value provided
    if (obj === null || typeof obj === "undefined") {
        return;
    }
    // Force an array if not already something iterable
    if (typeof obj !== "object") {
        /*eslint no-param-reassign:0*/ obj = [
            obj
        ];
    }
    if (isArray(obj)) {
        // Iterate over array values
        for(var i = 0, l = obj.length; i < l; i++){
            fn.call(null, obj[i], i, obj);
        }
    } else {
        // Iterate over object keys
        for(var key in obj){
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                fn.call(null, obj[key], key, obj);
            }
        }
    }
}
/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */ function merge() {
    var result = {};
    function assignValue(val, key) {
        if (isPlainObject(result[key]) && isPlainObject(val)) {
            result[key] = merge(result[key], val);
        } else if (isPlainObject(val)) {
            result[key] = merge({}, val);
        } else if (isArray(val)) {
            result[key] = val.slice();
        } else {
            result[key] = val;
        }
    }
    for(var i = 0, l = arguments.length; i < l; i++){
        forEach(arguments[i], assignValue);
    }
    return result;
}
/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */ function extend(a, b, thisArg) {
    forEach(b, function assignValue(val, key) {
        if (thisArg && typeof val === "function") {
            a[key] = bind(val, thisArg);
        } else {
            a[key] = val;
        }
    });
    return a;
}
/**
 * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
 *
 * @param {string} content with BOM
 * @return {string} content value without BOM
 */ function stripBOM(content) {
    if (content.charCodeAt(0) === 0xFEFF) {
        content = content.slice(1);
    }
    return content;
}
module.exports = {
    isArray: isArray,
    isArrayBuffer: isArrayBuffer,
    isBuffer: isBuffer,
    isFormData: isFormData,
    isArrayBufferView: isArrayBufferView,
    isString: isString,
    isNumber: isNumber,
    isObject: isObject,
    isPlainObject: isPlainObject,
    isUndefined: isUndefined,
    isDate: isDate,
    isFile: isFile,
    isBlob: isBlob,
    isFunction: isFunction,
    isStream: isStream,
    isURLSearchParams: isURLSearchParams,
    isStandardBrowserEnv: isStandardBrowserEnv,
    forEach: forEach,
    merge: merge,
    extend: extend,
    trim: trim,
    stripBOM: stripBOM
};


/***/ }),

/***/ 18630:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


const axios = __webpack_require__(67256);
const pkg = __webpack_require__(12286);
const { helpers: { mergeData  } , classes: { Response , ResponseError  }  } = __webpack_require__(51443);
const API_KEY_PREFIX = "SG.";
const SENDGRID_BASE_URL = "https://api.sendgrid.com/";
const TWILIO_BASE_URL = "https://email.twilio.com/";
class Client {
    constructor(){
        this.auth = "";
        this.impersonateSubuser = "";
        this.defaultHeaders = {
            Accept: "application/json",
            "Content-Type": "application/json",
            "User-Agent": "sendgrid/" + pkg.version + ";nodejs"
        };
        this.defaultRequest = {
            baseUrl: SENDGRID_BASE_URL,
            url: "",
            method: "GET",
            headers: {},
            maxContentLength: Infinity,
            maxBodyLength: Infinity
        };
    }
    setApiKey(apiKey) {
        this.auth = "Bearer " + apiKey;
        this.setDefaultRequest("baseUrl", SENDGRID_BASE_URL);
        if (!this.isValidApiKey(apiKey)) {
            console.warn(`API key does not start with "${API_KEY_PREFIX}".`);
        }
    }
    setTwilioEmailAuth(username, password) {
        const b64Auth = Buffer.from(username + ":" + password).toString("base64");
        this.auth = "Basic " + b64Auth;
        this.setDefaultRequest("baseUrl", TWILIO_BASE_URL);
        if (!this.isValidTwilioAuth(username, password)) {
            console.warn("Twilio Email credentials must be non-empty strings.");
        }
    }
    isValidApiKey(apiKey) {
        return this.isString(apiKey) && apiKey.trim().startsWith(API_KEY_PREFIX);
    }
    isValidTwilioAuth(username, password) {
        return this.isString(username) && username && this.isString(password) && password;
    }
    isString(value) {
        return typeof value === "string" || value instanceof String;
    }
    setImpersonateSubuser(subuser) {
        this.impersonateSubuser = subuser;
    }
    setDefaultHeader(key, value) {
        if (key !== null && typeof key === "object") {
            // key is an object
            Object.assign(this.defaultHeaders, key);
            return this;
        }
        this.defaultHeaders[key] = value;
        return this;
    }
    setDefaultRequest(key, value) {
        if (key !== null && typeof key === "object") {
            // key is an object
            Object.assign(this.defaultRequest, key);
            return this;
        }
        this.defaultRequest[key] = value;
        return this;
    }
    createHeaders(data) {
        // Merge data with default headers.
        const headers = mergeData(this.defaultHeaders, data);
        // Add auth, but don't overwrite if header already set.
        if (typeof headers.Authorization === "undefined" && this.auth) {
            headers.Authorization = this.auth;
        }
        if (this.impersonateSubuser) {
            headers["On-Behalf-Of"] = this.impersonateSubuser;
        }
        return headers;
    }
    createRequest(data) {
        let options = {
            url: data.uri || data.url,
            baseUrl: data.baseUrl,
            method: data.method,
            data: data.body,
            params: data.qs,
            headers: data.headers
        };
        // Merge data with default request.
        options = mergeData(this.defaultRequest, options);
        options.headers = this.createHeaders(options.headers);
        options.baseURL = options.baseUrl;
        delete options.baseUrl;
        return options;
    }
    request(data, cb) {
        data = this.createRequest(data);
        const promise = new Promise((resolve, reject)=>{
            axios(data).then((response)=>{
                return resolve([
                    new Response(response.status, response.data, response.headers),
                    response.data
                ]);
            }).catch((error)=>{
                if (error.response) {
                    if (error.response.status >= 400) {
                        return reject(new ResponseError(error.response));
                    }
                }
                return reject(error);
            });
        });
        // Throw an error in case a callback function was not passed.
        if (cb && typeof cb !== "function") {
            throw new Error("Callback passed is not a function.");
        }
        if (cb) {
            return promise.then((result)=>cb(null, result)).catch((error)=>cb(error, null));
        }
        return promise;
    }
}
module.exports = Client;


/***/ }),

/***/ 33075:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


/**
 * Dependencies
 */ const Client = __webpack_require__(18630);
//Export singleton instance
module.exports = new Client();


/***/ }),

/***/ 14532:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


/**
 * Dependencies
 */ const toCamelCase = __webpack_require__(56409);
const toSnakeCase = __webpack_require__(33905);
const deepClone = __webpack_require__(6655);
const fs = __webpack_require__(57147);
const path = __webpack_require__(71017);
/**
 * Attachment class
 */ class Attachment {
    /**
   * Constructor
   */ constructor(data){
        //Create from data
        if (data) {
            this.fromData(data);
        }
    }
    /**
   * From data
   */ fromData(data) {
        //Expecting object
        if (typeof data !== "object") {
            throw new Error("Expecting object for Mail data");
        }
        //Convert to camel case to make it workable, making a copy to prevent
        //changes to the original objects
        data = deepClone(data);
        data = toCamelCase(data);
        //Extract properties from data
        const { content , filename , type , disposition , contentId , filePath  } = data;
        if (typeof content !== "undefined" && typeof filePath !== "undefined") {
            throw new Error("The props 'content' and 'filePath' cannot be used together.");
        }
        //Set data
        this.setFilename(filename);
        this.setType(type);
        this.setDisposition(disposition);
        this.setContentId(contentId);
        this.setContent(filePath ? this.readFile(filePath) : content);
    }
    /**
   * Read a file and return its content as base64
   */ readFile(filePath) {
        return fs.readFileSync(path.resolve(filePath));
    }
    /**
   * Set content
   */ setContent(content) {
        //Duck type check toString on content if it's a Buffer as that's the method that will be called.
        if (typeof content === "string") {
            this.content = content;
            return;
        } else if (content instanceof Buffer && content.toString !== undefined) {
            this.content = content.toString();
            if (this.disposition === "attachment") {
                this.content = content.toString("base64");
            }
            return;
        }
        throw new Error("`content` expected to be either Buffer or string");
    }
    /**
   * Set content
   */ setFileContent(content) {
        if (content instanceof Buffer && content.toString !== undefined) {
            this.content = content.toString("base64");
            return;
        }
        throw new Error("`content` expected to be Buffer");
    }
    /**
   * Set filename
   */ setFilename(filename) {
        if (typeof filename === "undefined") {
            return;
        }
        if (filename && typeof filename !== "string") {
            throw new Error("String expected for `filename`");
        }
        this.filename = filename;
    }
    /**
   * Set type
   */ setType(type) {
        if (typeof type === "undefined") {
            return;
        }
        if (typeof type !== "string") {
            throw new Error("String expected for `type`");
        }
        this.type = type;
    }
    /**
   * Set disposition
   */ setDisposition(disposition) {
        if (typeof disposition === "undefined") {
            return;
        }
        if (typeof disposition !== "string") {
            throw new Error("String expected for `disposition`");
        }
        this.disposition = disposition;
    }
    /**
   * Set content ID
   */ setContentId(contentId) {
        if (typeof contentId === "undefined") {
            return;
        }
        if (typeof contentId !== "string") {
            throw new Error("String expected for `contentId`");
        }
        this.contentId = contentId;
    }
    /**
   * To JSON
   */ toJSON() {
        //Extract properties from self
        const { content , filename , type , disposition , contentId  } = this;
        //Initialize with mandatory properties
        const json = {
            content,
            filename
        };
        //Add whatever else we have
        if (typeof type !== "undefined") {
            json.type = type;
        }
        if (typeof disposition !== "undefined") {
            json.disposition = disposition;
        }
        if (typeof contentId !== "undefined") {
            json.contentId = contentId;
        }
        //Return
        return toSnakeCase(json);
    }
}
//Export class
module.exports = Attachment;


/***/ }),

/***/ 39448:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


/**
 * Dependencies
 */ const splitNameEmail = __webpack_require__(56876);
/**
 * Email address class
 */ class EmailAddress {
    /**
	 * Constructor
	 */ constructor(data){
        //Construct from data
        if (data) {
            this.fromData(data);
        }
    }
    /**
   * From data
   */ fromData(data) {
        //String given
        if (typeof data === "string") {
            const [name, email] = splitNameEmail(data);
            data = {
                name,
                email
            };
        }
        //Expecting object
        if (typeof data !== "object") {
            throw new Error("Expecting object or string for EmailAddress data");
        }
        //Extract name and email
        const { name , email  } = data;
        //Set
        this.setEmail(email);
        this.setName(name);
    }
    /**
   * Set name
   */ setName(name) {
        if (typeof name === "undefined") {
            return;
        }
        if (typeof name !== "string") {
            throw new Error("String expected for `name`");
        }
        this.name = name;
    }
    /**
   * Set email (mandatory)
   */ setEmail(email) {
        if (typeof email === "undefined") {
            throw new Error("Must provide `email`");
        }
        if (typeof email !== "string") {
            throw new Error("String expected for `email`");
        }
        this.email = email;
    }
    /**
	 * To JSON
	 */ toJSON() {
        //Get properties
        const { email , name  } = this;
        //Initialize with mandatory properties
        const json = {
            email
        };
        //Add name if present
        if (name !== "") {
            json.name = name;
        }
        //Return
        return json;
    }
    /**************************************************************************
   * Static helpers
   ***/ /**
   * Create an EmailAddress instance from given data
   */ static create(data) {
        //Array?
        if (Array.isArray(data)) {
            return data.filter((item)=>!!item).map((item)=>this.create(item));
        }
        //Already instance of EmailAddress class?
        if (data instanceof EmailAddress) {
            return data;
        }
        //Create instance
        return new EmailAddress(data);
    }
}
//Export class
module.exports = EmailAddress;


/***/ }),

/***/ 88244:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


/**
 * Expose classes
 */ const Attachment = __webpack_require__(14532);
const EmailAddress = __webpack_require__(39448);
const Mail = __webpack_require__(69569);
const Personalization = __webpack_require__(4548);
const Response = __webpack_require__(23062);
const ResponseError = __webpack_require__(30781);
const Statistics = __webpack_require__(49867);
/**
 * Export
 */ module.exports = {
    Attachment,
    EmailAddress,
    Mail,
    Personalization,
    Response,
    ResponseError,
    Statistics
};


/***/ }),

/***/ 69569:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


/**
 * Dependencies
 */ const EmailAddress = __webpack_require__(39448);
const Personalization = __webpack_require__(4548);
const toCamelCase = __webpack_require__(56409);
const toSnakeCase = __webpack_require__(33905);
const deepClone = __webpack_require__(6655);
const arrayToJSON = __webpack_require__(1674);
const { DYNAMIC_TEMPLATE_CHAR_WARNING  } = __webpack_require__(15638);
const { validateMailSettings , validateTrackingSettings  } = __webpack_require__(89767);
/**
 * Mail class
 */ class Mail {
    /**
   * Constructor
   */ constructor(data){
        //Initialize array and object properties
        this.isDynamic = false;
        this.hideWarnings = false;
        this.personalizations = [];
        this.attachments = [];
        this.content = [];
        this.categories = [];
        this.headers = {};
        this.sections = {};
        this.customArgs = {};
        this.trackingSettings = {};
        this.mailSettings = {};
        this.asm = {};
        //Helper properties
        this.substitutions = null;
        this.substitutionWrappers = null;
        this.dynamicTemplateData = null;
        //Process data if given
        if (data) {
            this.fromData(data);
        }
    }
    /**
   * Build from data
   */ fromData(data) {
        //Expecting object
        if (typeof data !== "object") {
            throw new Error("Expecting object for Mail data");
        }
        //Convert to camel case to make it workable, making a copy to prevent
        //changes to the original objects
        data = deepClone(data);
        data = toCamelCase(data, [
            "substitutions",
            "dynamicTemplateData",
            "customArgs",
            "headers",
            "sections"
        ]);
        //Extract properties from data
        const { to , from , replyTo , cc , bcc , sendAt , subject , text , html , content , templateId , personalizations , attachments , ipPoolName , batchId , sections , headers , categories , category , customArgs , asm , mailSettings , trackingSettings , substitutions , substitutionWrappers , dynamicTemplateData , isMultiple , hideWarnings , replyToList  } = data;
        //Set data
        this.setFrom(from);
        this.setReplyTo(replyTo);
        this.setSubject(subject);
        this.setSendAt(sendAt);
        this.setTemplateId(templateId);
        this.setBatchId(batchId);
        this.setIpPoolName(ipPoolName);
        this.setAttachments(attachments);
        this.setContent(content);
        this.setSections(sections);
        this.setHeaders(headers);
        this.setCategories(category);
        this.setCategories(categories);
        this.setCustomArgs(customArgs);
        this.setAsm(asm);
        this.setMailSettings(mailSettings);
        this.setTrackingSettings(trackingSettings);
        this.setHideWarnings(hideWarnings);
        this.setReplyToList(replyToList);
        if (this.isDynamic) {
            this.setDynamicTemplateData(dynamicTemplateData);
        } else {
            this.setSubstitutions(substitutions);
            this.setSubstitutionWrappers(substitutionWrappers);
        }
        //Add contents from text/html properties
        this.addTextContent(text);
        this.addHtmlContent(html);
        //Using "to" property for personalizations
        if (personalizations) {
            this.setPersonalizations(personalizations);
        } else if (isMultiple && Array.isArray(to)) {
            //Multiple individual emails
            to.forEach((to)=>this.addTo(to, cc, bcc));
        } else {
            //Single email (possibly with multiple recipients in the to field)
            this.addTo(to, cc, bcc);
        }
    }
    /**
   * Set from email
   */ setFrom(from) {
        if (this._checkProperty("from", from, [
            this._checkUndefined
        ])) {
            if (typeof from !== "string" && typeof from.email !== "string") {
                throw new Error("String or address object expected for `from`");
            }
            this.from = EmailAddress.create(from);
        }
    }
    /**
   * Set reply to
   */ setReplyTo(replyTo) {
        if (this._checkProperty("replyTo", replyTo, [
            this._checkUndefined
        ])) {
            if (typeof replyTo !== "string" && typeof replyTo.email !== "string") {
                throw new Error("String or address object expected for `replyTo`");
            }
            this.replyTo = EmailAddress.create(replyTo);
        }
    }
    /**
   * Set subject
   */ setSubject(subject) {
        this._setProperty("subject", subject, "string");
    }
    /**
   * Set send at
   */ setSendAt(sendAt) {
        if (this._checkProperty("sendAt", sendAt, [
            this._checkUndefined,
            this._createCheckThatThrows(Number.isInteger, "Integer expected for `sendAt`")
        ])) {
            this.sendAt = sendAt;
        }
    }
    /**
   * Set template ID, also checks if the template is dynamic or legacy
   */ setTemplateId(templateId) {
        if (this._setProperty("templateId", templateId, "string")) {
            if (templateId.indexOf("d-") === 0) {
                this.isDynamic = true;
            }
        }
    }
    /**
   * Set batch ID
   */ setBatchId(batchId) {
        this._setProperty("batchId", batchId, "string");
    }
    /**
   * Set IP pool name
   */ setIpPoolName(ipPoolName) {
        this._setProperty("ipPoolName", ipPoolName, "string");
    }
    /**
   * Set ASM
   */ setAsm(asm) {
        if (this._checkProperty("asm", asm, [
            this._checkUndefined,
            this._createTypeCheck("object")
        ])) {
            if (typeof asm.groupId !== "number") {
                throw new Error("Expected `asm` to include an integer in its `groupId` field");
            }
            if (asm.groupsToDisplay && (!Array.isArray(asm.groupsToDisplay) || !asm.groupsToDisplay.every((group)=>typeof group === "number"))) {
                throw new Error("Array of integers expected for `asm.groupsToDisplay`");
            }
            this.asm = asm;
        }
    }
    /**
   * Set personalizations
   */ setPersonalizations(personalizations) {
        if (!this._doArrayCheck("personalizations", personalizations)) {
            return;
        }
        if (!personalizations.every((personalization)=>typeof personalization === "object")) {
            throw new Error("Array of objects expected for `personalizations`");
        }
        //Clear and use add helper to add one by one
        this.personalizations = [];
        personalizations.forEach((personalization)=>this.addPersonalization(personalization));
    }
    /**
   * Add personalization
   */ addPersonalization(personalization) {
        //We should either send substitutions or dynamicTemplateData
        //depending on the templateId
        if (this.isDynamic && personalization.substitutions) {
            delete personalization.substitutions;
        } else if (!this.isDynamic && personalization.dynamicTemplateData) {
            delete personalization.dynamicTemplateData;
        }
        //Convert to class if needed
        if (!(personalization instanceof Personalization)) {
            personalization = new Personalization(personalization);
        }
        //If this is dynamic, set dynamicTemplateData, or set substitutions
        if (this.isDynamic) {
            this.applyDynamicTemplateData(personalization);
        } else {
            this.applySubstitutions(personalization);
        }
        //Push personalization to array
        this.personalizations.push(personalization);
    }
    /**
   * Convenience method for quickly creating personalizations
   */ addTo(to, cc, bcc) {
        if (typeof to === "undefined" && typeof cc === "undefined" && typeof bcc === "undefined") {
            throw new Error("Provide at least one of to, cc or bcc");
        }
        this.addPersonalization(new Personalization({
            to,
            cc,
            bcc
        }));
    }
    /**
   * Set substitutions
   */ setSubstitutions(substitutions) {
        this._setProperty("substitutions", substitutions, "object");
    }
    /**
   * Set substitution wrappers
   */ setSubstitutionWrappers(substitutionWrappers) {
        let lengthCheck = (propertyName, value)=>{
            if (!Array.isArray(value) || value.length !== 2) {
                throw new Error("Array expected with two elements for `" + propertyName + "`");
            }
        };
        if (this._checkProperty("substitutionWrappers", substitutionWrappers, [
            this._checkUndefined,
            lengthCheck
        ])) {
            this.substitutionWrappers = substitutionWrappers;
        }
    }
    /**
   * Helper which applies globally set substitutions to personalizations
   */ applySubstitutions(personalization) {
        if (personalization instanceof Personalization) {
            personalization.reverseMergeSubstitutions(this.substitutions);
            personalization.setSubstitutionWrappers(this.substitutionWrappers);
        }
    }
    /**
   * Helper which applies globally set dynamic_template_data to personalizations
   */ applyDynamicTemplateData(personalization) {
        if (personalization instanceof Personalization) {
            personalization.deepMergeDynamicTemplateData(this.dynamicTemplateData);
        }
    }
    /**
   * Set dynamicTemplateData
   */ setDynamicTemplateData(dynamicTemplateData) {
        if (typeof dynamicTemplateData === "undefined") {
            return;
        }
        if (typeof dynamicTemplateData !== "object") {
            throw new Error("Object expected for `dynamicTemplateData`");
        }
        // Check dynamic template for non-escaped characters and warn if found
        if (!this.hideWarnings) {
            Object.values(dynamicTemplateData).forEach((value)=>{
                if (/['"&]/.test(value)) {
                    console.warn(DYNAMIC_TEMPLATE_CHAR_WARNING);
                }
            });
        }
        this.dynamicTemplateData = dynamicTemplateData;
    }
    /**
   * Set content
   */ setContent(content) {
        if (this._doArrayCheck("content", content)) {
            if (!content.every((contentField)=>typeof contentField === "object")) {
                throw new Error("Expected each entry in `content` to be an object");
            }
            if (!content.every((contentField)=>typeof contentField.type === "string")) {
                throw new Error("Expected each `content` entry to contain a `type` string");
            }
            if (!content.every((contentField)=>typeof contentField.value === "string")) {
                throw new Error("Expected each `content` entry to contain a `value` string");
            }
            this.content = content;
        }
    }
    /**
   * Add content
   */ addContent(content) {
        if (this._checkProperty("content", content, [
            this._createTypeCheck("object")
        ])) {
            this.content.push(content);
        }
    }
    /**
   * Add text content
   */ addTextContent(text) {
        if (this._checkProperty("text", text, [
            this._checkUndefined,
            this._createTypeCheck("string")
        ])) {
            this.addContent({
                value: text,
                type: "text/plain"
            });
        }
    }
    /**
   * Add HTML content
   */ addHtmlContent(html) {
        if (this._checkProperty("html", html, [
            this._checkUndefined,
            this._createTypeCheck("string")
        ])) {
            this.addContent({
                value: html,
                type: "text/html"
            });
        }
    }
    /**
   * Set attachments
   */ setAttachments(attachments) {
        if (this._doArrayCheck("attachments", attachments)) {
            if (!attachments.every((attachment)=>typeof attachment.content === "string")) {
                throw new Error("Expected each attachment to contain a `content` string");
            }
            if (!attachments.every((attachment)=>typeof attachment.filename === "string")) {
                throw new Error("Expected each attachment to contain a `filename` string");
            }
            if (!attachments.every((attachment)=>!attachment.type || typeof attachment.type === "string")) {
                throw new Error("Expected the attachment's `type` field to be a string");
            }
            if (!attachments.every((attachment)=>!attachment.disposition || typeof attachment.disposition === "string")) {
                throw new Error("Expected the attachment's `disposition` field to be a string");
            }
            this.attachments = attachments;
        }
    }
    /**
   * Add attachment
   */ addAttachment(attachment) {
        if (this._checkProperty("attachment", attachment, [
            this._checkUndefined,
            this._createTypeCheck("object")
        ])) {
            this.attachments.push(attachment);
        }
    }
    /**
   * Set categories
   */ setCategories(categories) {
        let allElementsAreStrings = (propertyName, value)=>{
            if (!Array.isArray(value) || !value.every((item)=>typeof item === "string")) {
                throw new Error("Array of strings expected for `" + propertyName + "`");
            }
        };
        if (typeof categories === "string") {
            categories = [
                categories
            ];
        }
        if (this._checkProperty("categories", categories, [
            this._checkUndefined,
            allElementsAreStrings
        ])) {
            this.categories = categories;
        }
    }
    /**
   * Add category
   */ addCategory(category) {
        if (this._checkProperty("category", category, [
            this._createTypeCheck("string")
        ])) {
            this.categories.push(category);
        }
    }
    /**
   * Set headers
   */ setHeaders(headers) {
        this._setProperty("headers", headers, "object");
    }
    /**
   * Add a header
   */ addHeader(key, value) {
        if (this._checkProperty("key", key, [
            this._createTypeCheck("string")
        ]) && this._checkProperty("value", value, [
            this._createTypeCheck("string")
        ])) {
            this.headers[key] = value;
        }
    }
    /**
   * Set sections
   */ setSections(sections) {
        this._setProperty("sections", sections, "object");
    }
    /**
   * Set custom args
   */ setCustomArgs(customArgs) {
        this._setProperty("customArgs", customArgs, "object");
    }
    /**
   * Set tracking settings
   */ setTrackingSettings(settings) {
        if (typeof settings === "undefined") {
            return;
        }
        validateTrackingSettings(settings);
        this.trackingSettings = settings;
    }
    /**
   * Set mail settings
   */ setMailSettings(settings) {
        if (typeof settings === "undefined") {
            return;
        }
        validateMailSettings(settings);
        this.mailSettings = settings;
    }
    /**
   * Set hide warnings
   */ setHideWarnings(hide) {
        if (typeof hide === "undefined") {
            return;
        }
        if (typeof hide !== "boolean") {
            throw new Error("Boolean expected for `hideWarnings`");
        }
        this.hideWarnings = hide;
    }
    /**
   * To JSON
   */ toJSON() {
        //Extract properties from self
        const { from , replyTo , sendAt , subject , content , templateId , personalizations , attachments , ipPoolName , batchId , asm , sections , headers , categories , customArgs , mailSettings , trackingSettings , replyToList  } = this;
        //Initialize with mandatory values
        const json = {
            from,
            subject,
            personalizations: arrayToJSON(personalizations)
        };
        //Array properties
        if (Array.isArray(attachments) && attachments.length > 0) {
            json.attachments = arrayToJSON(attachments);
        }
        if (Array.isArray(categories) && categories.length > 0) {
            json.categories = categories.filter((cat)=>cat !== "");
        }
        if (Array.isArray(content) && content.length > 0) {
            json.content = arrayToJSON(content);
        }
        //Object properties
        if (Object.keys(headers).length > 0) {
            json.headers = headers;
        }
        if (Object.keys(mailSettings).length > 0) {
            json.mailSettings = mailSettings;
        }
        if (Object.keys(trackingSettings).length > 0) {
            json.trackingSettings = trackingSettings;
        }
        if (Object.keys(customArgs).length > 0) {
            json.customArgs = customArgs;
        }
        if (Object.keys(sections).length > 0) {
            json.sections = sections;
        }
        if (Object.keys(asm).length > 0) {
            json.asm = asm;
        }
        //Simple properties
        if (typeof replyTo !== "undefined") {
            json.replyTo = replyTo;
        }
        if (typeof sendAt !== "undefined") {
            json.sendAt = sendAt;
        }
        if (typeof batchId !== "undefined") {
            json.batchId = batchId;
        }
        if (typeof templateId !== "undefined") {
            json.templateId = templateId;
        }
        if (typeof ipPoolName !== "undefined") {
            json.ipPoolName = ipPoolName;
        }
        if (typeof replyToList !== "undefined") {
            json.replyToList = replyToList;
        }
        //Return as snake cased object
        return toSnakeCase(json, [
            "substitutions",
            "dynamicTemplateData",
            "customArgs",
            "headers",
            "sections"
        ]);
    }
    /**************************************************************************
   * Static helpers
   ***/ /**
   * Create a Mail instance from given data
   */ static create(data) {
        //Array?
        if (Array.isArray(data)) {
            return data.filter((item)=>!!item).map((item)=>this.create(item));
        }
        //Already instance of Mail class?
        if (data instanceof Mail) {
            return data;
        }
        //Create instance
        return new Mail(data);
    }
    /**************************************************************************
   * helpers for property-setting checks
   ***/ /**
   * Perform a set of checks on the new property value. Returns true if all
   * checks complete successfully without throwing errors or returning true.
   */ _checkProperty(propertyName, value, checks) {
        return !checks.some((e)=>e(propertyName, value));
    }
    /**
   * Set a property with normal undefined and type-checks
   */ _setProperty(propertyName, value, propertyType) {
        let propertyChecksPassed = this._checkProperty(propertyName, value, [
            this._checkUndefined,
            this._createTypeCheck(propertyType)
        ]);
        if (propertyChecksPassed) {
            this[propertyName] = value;
        }
        return propertyChecksPassed;
    }
    /**
   * Fail if the value is undefined.
   */ _checkUndefined(propertyName, value) {
        return typeof value === "undefined";
    }
    /**
   * Create and return a function that checks for a given type
   */ _createTypeCheck(propertyType) {
        return (propertyName, value)=>{
            if (typeof value !== propertyType) {
                throw new Error(propertyType + " expected for `" + propertyName + "`");
            }
        };
    }
    /**
   * Create a check out of a callback. If the callback
   * returns false, the check will throw an error.
   */ _createCheckThatThrows(check, errorString) {
        return (propertyName, value)=>{
            if (!check(value)) {
                throw new Error(errorString);
            }
        };
    }
    /**
   * Set an array property after checking that the new value is an
   * array.
   */ _setArrayProperty(propertyName, value) {
        if (this._doArrayCheck(propertyName, value)) {
            this[propertyName] = value;
        }
    }
    /**
   * Check that a value isn't undefined and is an array.
   */ _doArrayCheck(propertyName, value) {
        return this._checkProperty(propertyName, value, [
            this._checkUndefined,
            this._createCheckThatThrows(Array.isArray, "Array expected for`" + propertyName + "`")
        ]);
    }
    /**
   * Set the replyToList from email body
   */ setReplyToList(replyToList) {
        if (this._doArrayCheck("replyToList", replyToList) && replyToList.length) {
            if (!replyToList.every((replyTo)=>replyTo && typeof replyTo.email === "string")) {
                throw new Error("Expected each replyTo to contain an `email` string");
            }
            this.replyToList = replyToList;
        }
    }
}
//Export class
module.exports = Mail;


/***/ }),

/***/ 4548:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


/**
 * Dependencies
 */ const EmailAddress = __webpack_require__(39448);
const toCamelCase = __webpack_require__(56409);
const toSnakeCase = __webpack_require__(33905);
const deepClone = __webpack_require__(6655);
const deepMerge = __webpack_require__(44398);
const wrapSubstitutions = __webpack_require__(63524);
/**
 * Personalization class
 */ class Personalization {
    /**
   * Constructor
   */ constructor(data){
        //Init array and object placeholders
        this.to = [];
        this.cc = [];
        this.bcc = [];
        this.headers = {};
        this.customArgs = {};
        this.substitutions = {};
        this.substitutionWrappers = [
            "{{",
            "}}"
        ];
        this.dynamicTemplateData = {};
        //Build from data if given
        if (data) {
            this.fromData(data);
        }
    }
    /**
   * From data
   */ fromData(data) {
        //Expecting object
        if (typeof data !== "object") {
            throw new Error("Expecting object for Mail data");
        }
        //Convert to camel case to make it workable, making a copy to prevent
        //changes to the original objects
        data = deepClone(data);
        data = toCamelCase(data, [
            "substitutions",
            "dynamicTemplateData",
            "customArgs",
            "headers"
        ]);
        //Extract properties from data
        const { to , from , cc , bcc , subject , headers , customArgs , sendAt , substitutions , substitutionWrappers , dynamicTemplateData  } = data;
        //Set data
        this.setTo(to);
        this.setFrom(from);
        this.setCc(cc);
        this.setBcc(bcc);
        this.setSubject(subject);
        this.setHeaders(headers);
        this.setSubstitutions(substitutions);
        this.setSubstitutionWrappers(substitutionWrappers);
        this.setCustomArgs(customArgs);
        this.setDynamicTemplateData(dynamicTemplateData);
        this.setSendAt(sendAt);
    }
    /**
   * Set subject
   */ setSubject(subject) {
        if (typeof subject === "undefined") {
            return;
        }
        if (typeof subject !== "string") {
            throw new Error("String expected for `subject`");
        }
        this.subject = subject;
    }
    /**
   * Set send at
   */ setSendAt(sendAt) {
        if (typeof sendAt === "undefined") {
            return;
        }
        if (!Number.isInteger(sendAt)) {
            throw new Error("Integer expected for `sendAt`");
        }
        this.sendAt = sendAt;
    }
    /**
   * Set to
   */ setTo(to) {
        if (typeof to === "undefined") {
            return;
        }
        if (!Array.isArray(to)) {
            to = [
                to
            ];
        }
        this.to = EmailAddress.create(to);
    }
    /**
   * Set from
   * */ setFrom(from) {
        if (typeof from === "undefined") {
            return;
        }
        this.from = EmailAddress.create(from);
    }
    /**
   * Add a single to
   */ addTo(to) {
        if (typeof to === "undefined") {
            return;
        }
        this.to.push(EmailAddress.create(to));
    }
    /**
   * Set cc
   */ setCc(cc) {
        if (typeof cc === "undefined") {
            return;
        }
        if (!Array.isArray(cc)) {
            cc = [
                cc
            ];
        }
        this.cc = EmailAddress.create(cc);
    }
    /**
   * Add a single cc
   */ addCc(cc) {
        if (typeof cc === "undefined") {
            return;
        }
        this.cc.push(EmailAddress.create(cc));
    }
    /**
   * Set bcc
   */ setBcc(bcc) {
        if (typeof bcc === "undefined") {
            return;
        }
        if (!Array.isArray(bcc)) {
            bcc = [
                bcc
            ];
        }
        this.bcc = EmailAddress.create(bcc);
    }
    /**
   * Add a single bcc
   */ addBcc(bcc) {
        if (typeof bcc === "undefined") {
            return;
        }
        this.bcc.push(EmailAddress.create(bcc));
    }
    /**
   * Set headers
   */ setHeaders(headers) {
        if (typeof headers === "undefined") {
            return;
        }
        if (typeof headers !== "object" || headers === null) {
            throw new Error("Object expected for `headers`");
        }
        this.headers = headers;
    }
    /**
   * Add a header
   */ addHeader(key, value) {
        if (typeof key !== "string") {
            throw new Error("String expected for header key");
        }
        if (typeof value !== "string") {
            throw new Error("String expected for header value");
        }
        this.headers[key] = value;
    }
    /**
   * Set custom args
   */ setCustomArgs(customArgs) {
        if (typeof customArgs === "undefined") {
            return;
        }
        if (typeof customArgs !== "object" || customArgs === null) {
            throw new Error("Object expected for `customArgs`");
        }
        this.customArgs = customArgs;
    }
    /**
   * Add a custom arg
   */ addCustomArg(key, value) {
        if (typeof key !== "string") {
            throw new Error("String expected for custom arg key");
        }
        if (typeof value !== "string") {
            throw new Error("String expected for custom arg value");
        }
        this.customArgs[key] = value;
    }
    /**
   * Set substitutions
   */ setSubstitutions(substitutions) {
        if (typeof substitutions === "undefined") {
            return;
        }
        if (typeof substitutions !== "object") {
            throw new Error("Object expected for `substitutions`");
        }
        this.substitutions = substitutions;
    }
    /**
   * Add a substitution
   */ addSubstitution(key, value) {
        if (typeof key !== "string") {
            throw new Error("String expected for substitution key");
        }
        if (typeof value !== "string" && typeof value !== "number") {
            throw new Error("String or Number expected for substitution value");
        }
        this.substitutions[key] = value;
    }
    /**
   * Reverse merge substitutions, preserving existing ones
   */ reverseMergeSubstitutions(substitutions) {
        if (typeof substitutions === "undefined" || substitutions === null) {
            return;
        }
        if (typeof substitutions !== "object") {
            throw new Error("Object expected for `substitutions` in reverseMergeSubstitutions");
        }
        this.substitutions = Object.assign({}, substitutions, this.substitutions);
    }
    /**
   * Set substitution wrappers
   */ setSubstitutionWrappers(wrappers) {
        if (typeof wrappers === "undefined" || wrappers === null) {
            return;
        }
        if (!Array.isArray(wrappers) || wrappers.length !== 2) {
            throw new Error("Array expected with two elements for `substitutionWrappers`");
        }
        this.substitutionWrappers = wrappers;
    }
    /**
   * Reverse merge dynamic template data, preserving existing ones
   */ deepMergeDynamicTemplateData(dynamicTemplateData) {
        if (typeof dynamicTemplateData === "undefined" || dynamicTemplateData === null) {
            return;
        }
        if (typeof dynamicTemplateData !== "object") {
            throw new Error("Object expected for `dynamicTemplateData` in deepMergeDynamicTemplateData");
        }
        this.dynamicTemplateData = deepMerge(dynamicTemplateData, this.dynamicTemplateData);
    }
    /**
   * Set dynamic template data
   */ setDynamicTemplateData(dynamicTemplateData) {
        if (typeof dynamicTemplateData === "undefined") {
            return;
        }
        if (typeof dynamicTemplateData !== "object") {
            throw new Error("Object expected for `dynamicTemplateData`");
        }
        this.dynamicTemplateData = dynamicTemplateData;
    }
    /**
   * To JSON
   */ toJSON() {
        //Get data from self
        const { to , from , cc , bcc , subject , headers , customArgs , sendAt , substitutions , substitutionWrappers , dynamicTemplateData  } = this;
        //Initialize with mandatory values
        const json = {
            to
        };
        //Arrays
        if (Array.isArray(cc) && cc.length > 0) {
            json.cc = cc;
        }
        if (Array.isArray(bcc) && bcc.length > 0) {
            json.bcc = bcc;
        }
        //Objects
        if (Object.keys(headers).length > 0) {
            json.headers = headers;
        }
        if (substitutions && Object.keys(substitutions).length > 0) {
            const [left, right] = substitutionWrappers;
            json.substitutions = wrapSubstitutions(substitutions, left, right);
        }
        if (Object.keys(customArgs).length > 0) {
            json.customArgs = customArgs;
        }
        if (dynamicTemplateData && Object.keys(dynamicTemplateData).length > 0) {
            json.dynamicTemplateData = dynamicTemplateData;
        }
        //Simple properties
        if (typeof subject !== "undefined") {
            json.subject = subject;
        }
        if (typeof sendAt !== "undefined") {
            json.sendAt = sendAt;
        }
        if (typeof from !== "undefined") {
            json.from = from;
        }
        //Return as snake cased object
        return toSnakeCase(json, [
            "substitutions",
            "dynamicTemplateData",
            "customArgs",
            "headers"
        ]);
    }
}
//Export class
module.exports = Personalization;


/***/ }),

/***/ 30781:
/***/ ((module) => {


/**
 * Response error class
 */ class ResponseError extends Error {
    /**
   * Constructor
   */ constructor(response){
        //Super
        super();
        //Extract data from response
        const { headers , status , statusText , data  } = response;
        //Set data
        this.code = status;
        this.message = statusText;
        this.response = {
            headers,
            body: data
        };
        //Capture stack trace
        if (!this.stack) {
            Error.captureStackTrace(this, this.constructor);
        }
        //Clean up stack trace
        const regex = new RegExp(process.cwd() + "/", "gi");
        this.stack = this.stack.replace(regex, "");
    }
    /**
   * Convert to string
   */ toString() {
        const { body  } = this.response;
        let err = `${this.message} (${this.code})`;
        if (body && Array.isArray(body.errors)) {
            body.errors.forEach((error)=>{
                const message = error.message;
                const field = error.field;
                const help = error.help;
                err += `\n  ${message}\n    ${field}\n    ${help}`;
            });
        }
        return err;
    }
    /**
   * Convert to simple object for JSON responses
   */ toJSON() {
        const { message , code , response  } = this;
        return {
            message,
            code,
            response
        };
    }
}
//Export
module.exports = ResponseError;


/***/ }),

/***/ 23062:
/***/ ((module) => {


class Response {
    constructor(statusCode, body, headers){
        this.statusCode = statusCode;
        this.body = body;
        this.headers = headers;
    }
    toString() {
        return "HTTP " + this.statusCode + " " + this.body;
    }
}
module.exports = Response;


/***/ }),

/***/ 49867:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


/**
 * Dependencies
 */ const toCamelCase = __webpack_require__(56409);
const deepClone = __webpack_require__(6655);
/**
 * Options
 */ const AggregatedByOptions = [
    "day",
    "week",
    "month"
];
const CountryOptions = [
    "us",
    "ca"
];
const SortByDirection = [
    "desc",
    "asc"
];
/**
 * Statistics class
 */ class Statistics {
    constructor(data){
        this.startDate = null;
        this.endDate = null;
        this.aggregatedBy = null;
        if (data) {
            this.fromData(data);
        }
    }
    /**
   * Build from data
   */ fromData(data) {
        //Expecting object
        if (typeof data !== "object") {
            throw new Error("Expecting object for Statistics data");
        }
        //Convert to camel case to make it workable, making a copy to prevent
        //changes to the original objects
        data = deepClone(data);
        data = toCamelCase(data, [
            "substitutions",
            "customArgs"
        ]);
        const { startDate , endDate , aggregatedBy  } = data;
        this.setStartDate(startDate);
        this.setEndDate(endDate);
        this.setAggregatedBy(aggregatedBy);
    }
    /**
   * Set startDate
   */ setStartDate(startDate) {
        if (typeof startDate === "undefined") {
            throw new Error("Date expected for `startDate`");
        }
        if (new Date(startDate) === "Invalid Date" || isNaN(new Date(startDate))) {
            throw new Error("Date expected for `startDate`");
        }
        console.log(startDate);
        this.startDate = new Date(startDate).toISOString().slice(0, 10);
    }
    /**
   * Set endDate
   */ setEndDate(endDate) {
        if (typeof endDate === "undefined") {
            this.endDate = new Date().toISOString().slice(0, 10);
            return;
        }
        if (new Date(endDate) === "Invalid Date" || isNaN(new Date(endDate))) {
            throw new Error("Date expected for `endDate`");
        }
        this.endDate = new Date(endDate).toISOString().slice(0, 10);
    }
    /**
   * Set aggregatedBy
   */ setAggregatedBy(aggregatedBy) {
        if (typeof aggregatedBy === "undefined") {
            return;
        }
        if (typeof aggregatedBy === "string" && AggregatedByOptions.includes(aggregatedBy.toLowerCase())) {
            this.aggregatedBy = aggregatedBy;
        } else {
            throw new Error("Incorrect value for `aggregatedBy`");
        }
    }
    /**
   * Get Global
   */ getGlobal() {
        const { startDate , endDate , aggregatedBy  } = this;
        return {
            startDate,
            endDate,
            aggregatedBy
        };
    }
    /**
   * Get Advanced
   */ getAdvanced(country) {
        const json = this.getGlobal();
        if (typeof country === "undefined") {
            return json;
        }
        if (typeof country === "string" && CountryOptions.includes(country.toLowerCase())) {
            json.country = country;
        }
        return json;
    }
    /**
   * Get Advanced Mailbox Providers
   */ getAdvancedMailboxProviders(mailBoxProviders) {
        const json = this.getGlobal();
        if (typeof mailBoxProviders === "undefined") {
            return json;
        }
        if (Array.isArray(mailBoxProviders) && mailBoxProviders.some((x)=>typeof x !== "string")) {
            throw new Error("Array of strings expected for `mailboxProviders`");
        }
        json.mailBoxProviders = mailBoxProviders;
        return json;
    }
    /**
   * Get Advanced Browsers
   */ getAdvancedBrowsers(browsers) {
        const json = this.getGlobal();
        if (typeof browsers === "undefined") {
            return json;
        }
        if (Array.isArray(browsers) && browsers.some((x)=>typeof x !== "string")) {
            throw new Error("Array of strings expected for `browsers`");
        }
        json.browsers = browsers;
        return json;
    }
    /**
   * Get Categories
   */ getCategories(categories) {
        if (typeof categories === "undefined") {
            throw new Error("Array of strings expected for `categories`");
        }
        if (!this._isValidArrayOfStrings(categories)) {
            throw new Error("Array of strings expected for `categories`");
        }
        const json = this.getGlobal();
        json.categories = categories;
        return json;
    }
    /**
   * Get Subuser
   */ getSubuser(subusers) {
        if (typeof subusers === "undefined") {
            throw new Error("Array of strings expected for `subusers`");
        }
        if (!this._isValidArrayOfStrings(subusers)) {
            throw new Error("Array of strings expected for `subusers`");
        }
        const json = this.getGlobal();
        json.subusers = subusers;
        return json;
    }
    /**
   * Get Subuser Sum
   */ getSubuserSum(sortByMetric = "delivered", sortByDirection = SortByDirection[0], limit = 5, offset = 0) {
        if (typeof sortByMetric !== "string") {
            throw new Error("string expected for `sortByMetric`");
        }
        if (!SortByDirection.includes(sortByDirection.toLowerCase())) {
            throw new Error("desc or asc expected for `sortByDirection`");
        }
        if (typeof limit !== "number") {
            throw new Error("number expected for `limit`");
        }
        if (typeof offset !== "number") {
            throw new Error("number expected for `offset`");
        }
        const json = this.getGlobal();
        json.sortByMetric = sortByMetric;
        json.sortByDirection = sortByDirection;
        json.limit = limit;
        json.offset = offset;
        return json;
    }
    /**
   * Get Subuser Monthly
   */ getSubuserMonthly(sortByMetric = "delivered", sortByDirection = SortByDirection[0], limit = 5, offset = 0) {
        if (typeof sortByMetric !== "string") {
            throw new Error("string expected for `sortByMetric`");
        }
        if (!SortByDirection.includes(sortByDirection.toLowerCase())) {
            throw new Error("desc or asc expected for `sortByDirection`");
        }
        if (typeof limit !== "number") {
            throw new Error("number expected for `limit`");
        }
        if (typeof offset !== "number") {
            throw new Error("number expected for `offset`");
        }
        const json = this.getGlobal();
        json.sortByMetric = sortByMetric;
        json.sortByDirection = sortByDirection;
        json.limit = limit;
        json.offset = offset;
        return json;
    }
    _isValidArrayOfStrings(arr) {
        if (!Array.isArray(arr)) {
            return false;
        }
        if (arr.length < 1 || arr.some((x)=>typeof x !== "string")) {
            return false;
        }
        return true;
    }
}
//Export class
module.exports = Statistics;


/***/ }),

/***/ 15638:
/***/ ((module) => {


const DYNAMIC_TEMPLATE_CHAR_WARNING = `
Content with characters ', " or & may need to be escaped with three brackets
{{{ content }}}
See https://sendgrid.com/docs/for-developers/sending-email/using-handlebars/ for more information.`;
module.exports = {
    DYNAMIC_TEMPLATE_CHAR_WARNING
};


/***/ }),

/***/ 1674:
/***/ ((module) => {


/**
 * Helper to convert an array of objects to JSON
 */ module.exports = function arrayToJSON(arr) {
    return arr.map((item)=>{
        if (typeof item === "object" && item !== null && typeof item.toJSON === "function") {
            return item.toJSON();
        }
        return item;
    });
};


/***/ }),

/***/ 24943:
/***/ ((module) => {


/**
 * Helper to convert an object's keys
 */ module.exports = function convertKeys(obj, converter, ignored) {
    //Validate
    if (typeof obj !== "object" || obj === null) {
        throw new Error("Non object passed to convertKeys: " + obj);
    }
    //Ignore arrays
    if (Array.isArray(obj)) {
        return obj;
    }
    //Ensure array for ignored values
    if (!Array.isArray(ignored)) {
        ignored = [];
    }
    //Process all properties
    for(const key in obj){
        //istanbul ignore else
        if (obj.hasOwnProperty(key)) {
            //Convert key to snake case
            const converted = converter(key);
            //Recursive for child objects, unless ignored
            //The ignored check checks both variants of the key
            if (typeof obj[key] === "object" && obj[key] !== null) {
                if (!ignored.includes(key) && !ignored.includes(converted)) {
                    obj[key] = convertKeys(obj[key], converter, ignored);
                }
            }
            //Convert key to snake case and set if needed
            if (converted !== key) {
                obj[converted] = obj[key];
                delete obj[key];
            }
        }
    }
    //Return object
    return obj;
};


/***/ }),

/***/ 6655:
/***/ ((module) => {


/**
 * Deep cloning helper for objects
 */ module.exports = function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
};


/***/ }),

/***/ 97277:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


/**
 * Expose helpers
 */ const arrayToJSON = __webpack_require__(1674);
const convertKeys = __webpack_require__(24943);
const deepClone = __webpack_require__(6655);
const mergeData = __webpack_require__(19713);
const splitNameEmail = __webpack_require__(56876);
const toCamelCase = __webpack_require__(56409);
const toSnakeCase = __webpack_require__(33905);
const wrapSubstitutions = __webpack_require__(63524);
/**
 * Export
 */ module.exports = {
    arrayToJSON,
    convertKeys,
    deepClone,
    mergeData,
    splitNameEmail,
    toCamelCase,
    toSnakeCase,
    wrapSubstitutions
};


/***/ }),

/***/ 19713:
/***/ ((module) => {


/**
 * Merge data helper
 */ module.exports = function mergeData(base, data) {
    //Validate data
    if (typeof base !== "object" || base === null) {
        throw new Error("Not an object provided for base");
    }
    if (typeof data !== "object" || data === null) {
        throw new Error("Not an object provided for data");
    }
    //Copy base
    const merged = Object.assign({}, base);
    //Add data
    for(const key in data){
        //istanbul ignore else
        if (data.hasOwnProperty(key)) {
            if (data[key] && Array.isArray(data[key])) {
                merged[key] = data[key];
            } else if (data[key] && typeof data[key] === "object") {
                merged[key] = Object.assign({}, data[key]);
            } else if (data[key]) {
                merged[key] = data[key];
            }
        }
    }
    //Return
    return merged;
};


/***/ }),

/***/ 56876:
/***/ ((module) => {


/**
 * Split name and email address from string
 */ module.exports = function splitNameEmail(str) {
    //If no email bracket present, return as is
    if (str.indexOf("<") === -1) {
        return [
            "",
            str
        ];
    }
    //Split into name and email
    let [name, email] = str.split("<");
    //Trim and fix up
    name = name.trim();
    email = email.replace(">", "").trim();
    //Return as array
    return [
        name,
        email
    ];
};


/***/ }),

/***/ 90469:
/***/ ((module) => {


/**
 * Internal conversion helper
 */ module.exports = function strToCamelCase(str) {
    if (typeof str !== "string") {
        throw new Error("String expected for conversion to snake case");
    }
    return str.trim().replace(/_+|\-+/g, " ").replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(match, index) {
        if (Number(match) === 0) {
            return "";
        }
        return index === 0 ? match.toLowerCase() : match.toUpperCase();
    });
};


/***/ }),

/***/ 99331:
/***/ ((module) => {


/**
 * Internal conversion helper
 */ module.exports = function strToSnakeCase(str) {
    if (typeof str !== "string") {
        throw new Error("String expected for conversion to snake case");
    }
    return str.trim().replace(/(\s*\-*\b\w|[A-Z])/g, function($1) {
        $1 = $1.trim().toLowerCase().replace("-", "");
        return ($1[0] === "_" ? "" : "_") + $1;
    }).slice(1);
};


/***/ }),

/***/ 56409:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


/**
 * Dependencies
 */ const convertKeys = __webpack_require__(24943);
const strToCamelCase = __webpack_require__(90469);
/**
 * Convert object keys to camel case
 */ module.exports = function toCamelCase(obj, ignored) {
    return convertKeys(obj, strToCamelCase, ignored);
};


/***/ }),

/***/ 33905:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


/**
 * Dependencies
 */ const convertKeys = __webpack_require__(24943);
const strToSnakeCase = __webpack_require__(99331);
/**
 * Convert object keys to snake case
 */ module.exports = function toSnakeCase(obj, ignored) {
    return convertKeys(obj, strToSnakeCase, ignored);
};


/***/ }),

/***/ 89767:
/***/ ((module) => {


const validate = (parent, parentName, childName, childType)=>{
    if (typeof parent === "undefined" || typeof parent[childName] === "undefined") {
        return;
    }
    if (typeof parent[childName] !== childType) {
        throw new Error(`${childType} expected for \`${parentName}.${childName}\``);
    }
};
module.exports = {
    validateMailSettings (settings) {
        if (typeof settings !== "object") {
            throw new Error("Object expected for `mailSettings`");
        }
        const { bcc , bypassListManagement , bypassSpamManagement , bypassBounceManagement , bypassUnsubscribeManagement , footer , sandboxMode , spamCheck  } = settings;
        validate(bcc, "bcc", "enable", "boolean");
        validate(bcc, "bcc", "email", "string");
        validate(bypassListManagement, "bypassListManagement", "enable", "boolean");
        validate(bypassSpamManagement, "bypassSpamManagement", "enable", "boolean");
        validate(bypassBounceManagement, "bypassBounceManagement", "enable", "boolean");
        validate(bypassUnsubscribeManagement, "bypassUnsubscribeManagement", "enable", "boolean");
        validate(footer, "footer", "enable", "boolean");
        validate(footer, "footer", "text", "string");
        validate(footer, "footer", "html", "string");
        validate(sandboxMode, "sandboxMode", "enable", "boolean");
        validate(spamCheck, "spamCheck", "enable", "boolean");
        validate(spamCheck, "spamCheck", "threshold", "number");
        validate(spamCheck, "spamCheck", "postToUrl", "string");
    },
    validateTrackingSettings (settings) {
        if (typeof settings !== "object") {
            throw new Error("Object expected for `trackingSettings`");
        }
        const { clickTracking , openTracking , subscriptionTracking , ganalytics  } = settings;
        validate(clickTracking, "clickTracking", "enable", "boolean");
        validate(clickTracking, "clickTracking", "enableText", "boolean");
        validate(openTracking, "openTracking", "enable", "boolean");
        validate(openTracking, "openTracking", "substitutionTag", "string");
        validate(subscriptionTracking, "subscriptionTracking", "enable", "boolean");
        validate(subscriptionTracking, "subscriptionTracking", "text", "string");
        validate(subscriptionTracking, "subscriptionTracking", "html", "string");
        validate(subscriptionTracking, "subscriptionTracking", "substitutionTag", "string");
        validate(ganalytics, "ganalytics", "enable", "boolean");
        validate(ganalytics, "ganalytics", "utm_source", "string");
        validate(ganalytics, "ganalytics", "utm_medium", "string");
        validate(ganalytics, "ganalytics", "utm_term", "string");
        validate(ganalytics, "ganalytics", "utm_content", "string");
        validate(ganalytics, "ganalytics", "utm_campaign", "string");
    }
};


/***/ }),

/***/ 63524:
/***/ ((module) => {


/**
 * Wrap substitutions
 */ module.exports = function wrap(substitutions, left = "{{", right = "}}") {
    //Process arrays
    if (Array.isArray(substitutions)) {
        return substitutions.map((subs)=>wrap(subs, left, right));
    }
    //Initialize new wrapped object
    const wrapped = {};
    //Map substitutions and ensure string for value
    for(const key in substitutions){
        //istanbul ignore else
        if (substitutions.hasOwnProperty(key)) {
            wrapped[left + key + right] = String(substitutions[key]);
        }
    }
    //Return wrapped substitutions
    return wrapped;
};


/***/ }),

/***/ 51443:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


/**
 * Load support assets
 */ const classes = __webpack_require__(88244);
const helpers = __webpack_require__(97277);
/**
 * Export
 */ module.exports = {
    classes,
    helpers
};


/***/ }),

/***/ 72096:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


const mailer = __webpack_require__(44523);
const MailService = __webpack_require__(28348);
module.exports = mailer;
module.exports.MailService = MailService;


/***/ }),

/***/ 28348:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


/**
 * Dependencies
 */ const { Client  } = __webpack_require__(5652);
const { classes: { Mail  }  } = __webpack_require__(51443);
/**
 * Mail service class
 */ class MailService {
    /**
   * Constructor
   */ constructor(){
        // Set client, initialize substitution wrappers and secret rules filter.
        this.setClient(new Client());
        this.setSubstitutionWrappers("{{", "}}");
        this.secretRules = [];
    }
    /**
   * Set client
   */ setClient(client) {
        this.client = client;
        return this;
    }
    /**
   * SendGrid API key passthrough for convenience.
   */ setApiKey(apiKey) {
        this.client.setApiKey(apiKey);
        return this;
    }
    /**
   * Twilio Email Auth passthrough for convenience.
   */ setTwilioEmailAuth(username, password) {
        this.client.setTwilioEmailAuth(username, password);
    }
    /**
   * Set client timeout
   */ setTimeout(timeout) {
        if (typeof timeout === "undefined") {
            return;
        }
        this.client.setDefaultRequest("timeout", timeout);
    }
    /**
   * Set substitution wrappers
   */ setSubstitutionWrappers(left, right) {
        if (typeof left === "undefined" || typeof right === "undefined") {
            throw new Error("Must provide both left and right side wrappers");
        }
        if (!Array.isArray(this.substitutionWrappers)) {
            this.substitutionWrappers = [];
        }
        this.substitutionWrappers[0] = left;
        this.substitutionWrappers[1] = right;
        return this;
    }
    /**
   * Set secret rules for filtering the e-mail content
   */ setSecretRules(rules) {
        if (!(rules instanceof Array)) {
            rules = [
                rules
            ];
        }
        const tmpRules = rules.map(function(rule) {
            const ruleType = typeof rule;
            if (ruleType === "string") {
                return {
                    pattern: new RegExp(rule)
                };
            } else if (ruleType === "object") {
                // normalize rule object
                if (rule instanceof RegExp) {
                    rule = {
                        pattern: rule
                    };
                } else if (rule.hasOwnProperty("pattern") && typeof rule.pattern === "string") {
                    rule.pattern = new RegExp(rule.pattern);
                }
                try {
                    // test if rule.pattern is a valid regex
                    rule.pattern.test("");
                    return rule;
                } catch (err) {
                // continue regardless of error
                }
            }
        });
        this.secretRules = tmpRules.filter(function(val) {
            return val;
        });
    }
    /**
   * Check if the e-mail is safe to be sent
   */ filterSecrets(body) {
        if (typeof body === "object" && !body.hasOwnProperty("content")) {
            return;
        }
        const self = this;
        body.content.forEach(function(data) {
            self.secretRules.forEach(function(rule) {
                if (rule.hasOwnProperty("pattern") && !rule.pattern.test(data.value)) {
                    return;
                }
                let message = `The pattern '${rule.pattern}'`;
                if (rule.name) {
                    message += `identified by '${rule.name}'`;
                }
                message += " was found in the Mail content!";
                throw new Error(message);
            });
        });
    }
    /**
   * Send email
   */ send(data, isMultiple = false, cb) {
        //Callback as second parameter
        if (typeof isMultiple === "function") {
            cb = isMultiple;
            isMultiple = false;
        }
        //Array? Send in parallel
        if (Array.isArray(data)) {
            //Create promise
            const promise = Promise.all(data.map((item)=>{
                return this.send(item, isMultiple);
            }));
            //Execute callback if provided
            if (cb) {
                promise.then((result)=>cb(null, result)).catch((error)=>cb(error, null));
            }
            //Return promise
            return promise;
        }
        //Send mail
        try {
            //Append multiple flag to data if not set
            if (typeof data.isMultiple === "undefined") {
                data.isMultiple = isMultiple;
            }
            //Append global substitution wrappers if not set in data
            if (typeof data.substitutionWrappers === "undefined") {
                data.substitutionWrappers = this.substitutionWrappers;
            }
            //Create Mail instance from data and get JSON body for request
            const mail = Mail.create(data);
            const body = mail.toJSON();
            //Filters the Mail body to avoid sensitive content leakage
            this.filterSecrets(body);
            //Create request
            const request = {
                method: "POST",
                url: "/v3/mail/send",
                headers: mail.headers,
                body
            };
            //Send
            return this.client.request(request, cb);
        } catch (error) {
            //Pass to callback if provided
            if (cb) {
                // eslint-disable-next-line callback-return
                cb(error, null);
            }
            //Reject promise
            return Promise.reject(error);
        }
    }
    /**
   * Send multiple emails (shortcut)
   */ sendMultiple(data, cb) {
        return this.send(data, true, cb);
    }
}
//Export class
module.exports = MailService;


/***/ }),

/***/ 44523:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


/**
 * Dependencies
 */ const MailService = __webpack_require__(28348);
//Export singleton instance
module.exports = new MailService();


/***/ }),

/***/ 44398:
/***/ ((module) => {


var isMergeableObject = function isMergeableObject(value) {
    return isNonNullObject(value) && !isSpecial(value);
};
function isNonNullObject(value) {
    return !!value && typeof value === "object";
}
function isSpecial(value) {
    var stringValue = Object.prototype.toString.call(value);
    return stringValue === "[object RegExp]" || stringValue === "[object Date]" || isReactElement(value);
}
// see https://github.com/facebook/react/blob/b5ac963fb791d1298e7f396236383bc955f916c1/src/isomorphic/classic/element/ReactElement.js#L21-L25
var canUseSymbol = typeof Symbol === "function" && Symbol.for;
var REACT_ELEMENT_TYPE = canUseSymbol ? Symbol.for("react.element") : 0xeac7;
function isReactElement(value) {
    return value.$$typeof === REACT_ELEMENT_TYPE;
}
function emptyTarget(val) {
    return Array.isArray(val) ? [] : {};
}
function cloneUnlessOtherwiseSpecified(value, options) {
    return options.clone !== false && options.isMergeableObject(value) ? deepmerge(emptyTarget(value), value, options) : value;
}
function defaultArrayMerge(target, source, options) {
    return target.concat(source).map(function(element) {
        return cloneUnlessOtherwiseSpecified(element, options);
    });
}
function getMergeFunction(key, options) {
    if (!options.customMerge) {
        return deepmerge;
    }
    var customMerge = options.customMerge(key);
    return typeof customMerge === "function" ? customMerge : deepmerge;
}
function getEnumerableOwnPropertySymbols(target) {
    return Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(target).filter(function(symbol) {
        return Object.propertyIsEnumerable.call(target, symbol);
    }) : [];
}
function getKeys(target) {
    return Object.keys(target).concat(getEnumerableOwnPropertySymbols(target));
}
function propertyIsOnObject(object, property) {
    try {
        return property in object;
    } catch (_) {
        return false;
    }
}
// Protects from prototype poisoning and unexpected merging up the prototype chain.
function propertyIsUnsafe(target, key) {
    return propertyIsOnObject(target, key) // Properties are safe to merge if they don't exist in the target yet,
     && !(Object.hasOwnProperty.call(target, key) // unsafe if they exist up the prototype chain,
     && Object.propertyIsEnumerable.call(target, key) // and also unsafe if they're nonenumerable.
    );
}
function mergeObject(target, source, options) {
    var destination = {};
    if (options.isMergeableObject(target)) {
        getKeys(target).forEach(function(key) {
            destination[key] = cloneUnlessOtherwiseSpecified(target[key], options);
        });
    }
    getKeys(source).forEach(function(key) {
        if (propertyIsUnsafe(target, key)) {
            return;
        }
        if (propertyIsOnObject(target, key) && options.isMergeableObject(source[key])) {
            destination[key] = getMergeFunction(key, options)(target[key], source[key], options);
        } else {
            destination[key] = cloneUnlessOtherwiseSpecified(source[key], options);
        }
    });
    return destination;
}
function deepmerge(target, source, options) {
    options = options || {};
    options.arrayMerge = options.arrayMerge || defaultArrayMerge;
    options.isMergeableObject = options.isMergeableObject || isMergeableObject;
    // cloneUnlessOtherwiseSpecified is added to `options` so that custom arrayMerge()
    // implementations can use it. The caller may not replace it.
    options.cloneUnlessOtherwiseSpecified = cloneUnlessOtherwiseSpecified;
    var sourceIsArray = Array.isArray(source);
    var targetIsArray = Array.isArray(target);
    var sourceAndTargetTypesMatch = sourceIsArray === targetIsArray;
    if (!sourceAndTargetTypesMatch) {
        return cloneUnlessOtherwiseSpecified(source, options);
    } else if (sourceIsArray) {
        return options.arrayMerge(target, source, options);
    } else {
        return mergeObject(target, source, options);
    }
}
deepmerge.all = function deepmergeAll(array, options) {
    if (!Array.isArray(array)) {
        throw new Error("first argument should be an array");
    }
    return array.reduce(function(prev, next) {
        return deepmerge(prev, next, options);
    }, {});
};
var deepmerge_1 = deepmerge;
module.exports = deepmerge_1;


/***/ }),

/***/ 12286:
/***/ ((module) => {

module.exports = JSON.parse('{"name":"@sendgrid/client","description":"Twilio SendGrid NodeJS API client","version":"7.7.0","author":"Twilio SendGrid <help@twilio.com> (sendgrid.com)","contributors":["Kyle Partridge <kyle.partridge@sendgrid.com>","David Tomberlin <david.tomberlin@sendgrid.com>","Swift <swift@sendgrid.com>","Brandon West <brandon.west@sendgrid.com>","Scott Motte <scott.motte@sendgrid.com>","Robert Acosta <robert.acosta@sendgrid.com>","Elmer Thomas <ethomas@twilio.com>","Adam Reis <adam@reis.nz>"],"license":"MIT","homepage":"https://sendgrid.com","repository":{"type":"git","url":"git://github.com/sendgrid/sendgrid-nodejs.git"},"publishConfig":{"access":"public"},"main":"index.js","engines":{"node":"6.* || 8.* || >=10.*"},"dependencies":{"@sendgrid/helpers":"^7.7.0","axios":"^0.26.0"},"devDependencies":{"chai":"4.2.0","nock":"^10.0.6"},"resolutions":{"chai":"4.2.0"},"tags":["http","rest","api","mail","sendgrid"],"gitHead":"30eebb16a51b51e6a2df1b3596044db6f5fdbe92"}');

/***/ })

};
;