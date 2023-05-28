"use strict";
exports.id = 3655;
exports.ids = [3655];
exports.modules = {

/***/ 69438:
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_RESULT__;
// doT.js
// 2011-2014, Laura Doktorova, https://github.com/olado/doT
// Licensed under the MIT license.
(function() {
    "use strict";
    var doT = {
        name: "doT",
        version: "1.1.1",
        templateSettings: {
            evaluate: /\{\{([\s\S]+?(\}?)+)\}\}/g,
            interpolate: /\{\{=([\s\S]+?)\}\}/g,
            encode: /\{\{!([\s\S]+?)\}\}/g,
            use: /\{\{#([\s\S]+?)\}\}/g,
            useParams: /(^|[^\w$])def(?:\.|\[[\'\"])([\w$\.]+)(?:[\'\"]\])?\s*\:\s*([\w$\.]+|\"[^\"]+\"|\'[^\']+\'|\{[^\}]+\})/g,
            define: /\{\{##\s*([\w\.$]+)\s*(\:|=)([\s\S]+?)#\}\}/g,
            defineParams: /^\s*([\w$]+):([\s\S]+)/,
            conditional: /\{\{\?(\?)?\s*([\s\S]*?)\s*\}\}/g,
            iterate: /\{\{~\s*(?:\}\}|([\s\S]+?)\s*\:\s*([\w$]+)\s*(?:\:\s*([\w$]+))?\s*\}\})/g,
            varname: "it",
            strip: true,
            append: true,
            selfcontained: false,
            doNotSkipEncoded: false
        },
        template: undefined,
        compile: undefined,
        log: true
    }, _globals;
    doT.encodeHTMLSource = function(doNotSkipEncoded) {
        var encodeHTMLRules = {
            "&": "&#38;",
            "<": "&#60;",
            ">": "&#62;",
            '"': "&#34;",
            "'": "&#39;",
            "/": "&#47;"
        }, matchHTML = doNotSkipEncoded ? /[&<>"'\/]/g : /&(?!#?\w+;)|<|>|"|'|\//g;
        return function(code) {
            return code ? code.toString().replace(matchHTML, function(m) {
                return encodeHTMLRules[m] || m;
            }) : "";
        };
    };
    _globals = function() {
        return this || (0, eval)("this");
    }();
    /* istanbul ignore else */ if ( true && module.exports) {
        module.exports = doT;
    } else if (true) {
        !(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {
            return doT;
        }).call(exports, __webpack_require__, exports, module),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else {}
    var startend = {
        append: {
            start: "'+(",
            end: ")+'",
            startencode: "'+encodeHTML("
        },
        split: {
            start: "';out+=(",
            end: ");out+='",
            startencode: "';out+=encodeHTML("
        }
    }, skip = /$^/;
    function resolveDefs(c, block, def) {
        return (typeof block === "string" ? block : block.toString()).replace(c.define || skip, function(m, code, assign, value) {
            if (code.indexOf("def.") === 0) {
                code = code.substring(4);
            }
            if (!(code in def)) {
                if (assign === ":") {
                    if (c.defineParams) value.replace(c.defineParams, function(m, param, v) {
                        def[code] = {
                            arg: param,
                            text: v
                        };
                    });
                    if (!(code in def)) def[code] = value;
                } else {
                    new Function("def", "def['" + code + "']=" + value)(def);
                }
            }
            return "";
        }).replace(c.use || skip, function(m, code) {
            if (c.useParams) code = code.replace(c.useParams, function(m, s, d, param) {
                if (def[d] && def[d].arg && param) {
                    var rw = (d + ":" + param).replace(/'|\\/g, "_");
                    def.__exp = def.__exp || {};
                    def.__exp[rw] = def[d].text.replace(new RegExp("(^|[^\\w$])" + def[d].arg + "([^\\w$])", "g"), "$1" + param + "$2");
                    return s + "def.__exp['" + rw + "']";
                }
            });
            var v = new Function("def", "return " + code)(def);
            return v ? resolveDefs(c, v, def) : v;
        });
    }
    function unescape(code) {
        return code.replace(/\\('|\\)/g, "$1").replace(/[\r\t\n]/g, " ");
    }
    doT.template = function(tmpl, c, def) {
        c = c || doT.templateSettings;
        var cse = c.append ? startend.append : startend.split, needhtmlencode, sid = 0, indv, str = c.use || c.define ? resolveDefs(c, tmpl, def || {}) : tmpl;
        str = ("var out='" + (c.strip ? str.replace(/(^|\r|\n)\t* +| +\t*(\r|\n|$)/g, " ").replace(/\r|\n|\t|\/\*[\s\S]*?\*\//g, "") : str).replace(/'|\\/g, "\\$&").replace(c.interpolate || skip, function(m, code) {
            return cse.start + unescape(code) + cse.end;
        }).replace(c.encode || skip, function(m, code) {
            needhtmlencode = true;
            return cse.startencode + unescape(code) + cse.end;
        }).replace(c.conditional || skip, function(m, elsecase, code) {
            return elsecase ? code ? "';}else if(" + unescape(code) + "){out+='" : "';}else{out+='" : code ? "';if(" + unescape(code) + "){out+='" : "';}out+='";
        }).replace(c.iterate || skip, function(m, iterate, vname, iname) {
            if (!iterate) return "';} } out+='";
            sid += 1;
            indv = iname || "i" + sid;
            iterate = unescape(iterate);
            return "';var arr" + sid + "=" + iterate + ";if(arr" + sid + "){var " + vname + "," + indv + "=-1,l" + sid + "=arr" + sid + ".length-1;while(" + indv + "<l" + sid + "){" + vname + "=arr" + sid + "[" + indv + "+=1];out+='";
        }).replace(c.evaluate || skip, function(m, code) {
            return "';" + unescape(code) + "out+='";
        }) + "';return out;").replace(/\n/g, "\\n").replace(/\t/g, "\\t").replace(/\r/g, "\\r").replace(/(\s|;|\}|^|\{)out\+='';/g, "$1").replace(/\+''/g, "");
        //.replace(/(\s|;|\}|^|\{)out\+=''\+/g,'$1out+=');
        if (needhtmlencode) {
            if (!c.selfcontained && _globals && !_globals._encodeHTML) _globals._encodeHTML = doT.encodeHTMLSource(c.doNotSkipEncoded);
            str = "var encodeHTML = typeof _encodeHTML !== 'undefined' ? _encodeHTML : (" + doT.encodeHTMLSource.toString() + "(" + (c.doNotSkipEncoded || "") + "));" + str;
        }
        try {
            return new Function(c.varname, str);
        } catch (e) {
            /* istanbul ignore else */ if (typeof console !== "undefined") console.log("Could not create a template function: " + str);
            throw e;
        }
    };
    doT.compile = function(tmpl, def) {
        return doT.template(tmpl, null, def);
    };
})();


/***/ }),

/***/ 23655:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* doT + auto-compilation of doT templates
 *
 * 2012, Laura Doktorova, https://github.com/olado/doT
 * Licensed under the MIT license
 *
 * Compiles .def, .dot, .jst files found under the specified path.
 * It ignores sub-directories.
 * Template files can have multiple extensions at the same time.
 * Files with .def extension can be included in other files via {{#def.name}}
 * Files with .dot extension are compiled into functions with the same name and
 * can be accessed as renderer.filename
 * Files with .jst extension are compiled into .js files. Produced .js file can be
 * loaded as a commonJS, AMD module, or just installed into a global variable
 * (default is set to window.render).
 * All inline defines defined in the .jst file are
 * compiled into separate functions and are available via _render.filename.definename
 *
 * Basic usage:
 * var dots = require("dot").process({path: "./views"});
 * dots.mytemplate({foo:"hello world"});
 *
 * The above snippet will:
 * 1. Compile all templates in views folder (.dot, .def, .jst)
 * 2. Place .js files compiled from .jst templates into the same folder.
 *    These files can be used with require, i.e. require("./views/mytemplate").
 * 3. Return an object with functions compiled from .dot templates as its properties.
 * 4. Render mytemplate template.
 */ 
var fs = __webpack_require__(57147), doT = module.exports = __webpack_require__(69438);
doT.process = function(options) {
    //path, destination, global, rendermodule, templateSettings
    return new InstallDots(options).compileAll();
};
function InstallDots(o) {
    this.__path = o.path || "./";
    if (this.__path[this.__path.length - 1] !== "/") this.__path += "/";
    this.__destination = o.destination || this.__path;
    if (this.__destination[this.__destination.length - 1] !== "/") this.__destination += "/";
    this.__global = o.global || "window.render";
    this.__rendermodule = o.rendermodule || {};
    this.__settings = Object.prototype.hasOwnProperty.call(o, "templateSettings") ? copy(o.templateSettings, copy(doT.templateSettings)) : undefined;
    this.__includes = {};
}
InstallDots.prototype.compileToFile = function(path, template, def) {
    def = def || {};
    var modulename = path.substring(path.lastIndexOf("/") + 1, path.lastIndexOf(".")), defs = copy(this.__includes, copy(def)), settings = this.__settings || doT.templateSettings, compileoptions = copy(settings), defaultcompiled = doT.template(template, settings, defs), exports = [], compiled = "", fn;
    for(var property in defs){
        // It looks like the code block inside "if" below can never be executed,
        // because InstallDots constructor is private, compileToFile is only called from compileAll method
        // and def parameter is never passed to it, so the condition in if will always fail.
        // This code will be removed from the next major version.
        // For now it is only excluded from coverage report
        /* istanbul ignore if */ if (defs[property] !== def[property] && defs[property] !== this.__includes[property]) {
            fn = undefined;
            if (typeof defs[property] === "string") {
                fn = doT.template(defs[property], settings, defs);
            } else if (typeof defs[property] === "function") {
                fn = defs[property];
            } else if (defs[property].arg) {
                compileoptions.varname = defs[property].arg;
                fn = doT.template(defs[property].text, compileoptions, defs);
            }
            if (fn) {
                compiled += fn.toString().replace("anonymous", property);
                exports.push(property);
            }
        }
    }
    compiled += defaultcompiled.toString().replace("anonymous", modulename);
    fs.writeFileSync(path, "(function(){" + compiled + "var itself=" + modulename + ", _encodeHTML=(" + doT.encodeHTMLSource.toString() + "(" + (settings.doNotSkipEncoded || "") + "));" + addexports(exports) + "if(typeof module!=='undefined' && module.exports) module.exports=itself;else if(typeof define==='function')define(function(){return itself;});else {" + this.__global + "=" + this.__global + "||{};" + this.__global + "['" + modulename + "']=itself;}}());");
};
function addexports(exports) {
    var ret = "";
    for(var i = 0; i < exports.length; i++){
        ret += "itself." + exports[i] + "=" + exports[i] + ";";
    }
    return ret;
}
function copy(o, to) {
    to = to || {};
    for(var property in o){
        to[property] = o[property];
    }
    return to;
}
function readdata(path) {
    var data = fs.readFileSync(path);
    if (data) return data.toString();
    console.log("problems with " + path);
}
InstallDots.prototype.compilePath = function(path) {
    var data = readdata(path);
    if (data) {
        return doT.template(data, this.__settings || doT.templateSettings, copy(this.__includes));
    }
};
InstallDots.prototype.compileAll = function() {
    if (doT.log) console.log("Compiling all doT templates...");
    var defFolder = this.__path, sources = fs.readdirSync(defFolder), k, l, name;
    for(k = 0, l = sources.length; k < l; k++){
        name = sources[k];
        if (/\.def(\.dot|\.jst)?$/.test(name)) {
            if (doT.log) console.log("Loaded def " + name);
            this.__includes[name.substring(0, name.indexOf("."))] = readdata(defFolder + name);
        }
    }
    for(k = 0, l = sources.length; k < l; k++){
        name = sources[k];
        if (/\.dot(\.def|\.jst)?$/.test(name)) {
            if (doT.log) console.log("Compiling " + name + " to function");
            this.__rendermodule[name.substring(0, name.indexOf("."))] = this.compilePath(defFolder + name);
        }
        if (/\.jst(\.dot|\.def)?$/.test(name)) {
            if (doT.log) console.log("Compiling " + name + " to file");
            this.compileToFile(this.__destination + name.substring(0, name.indexOf(".")) + ".js", readdata(defFolder + name));
        }
    }
    return this.__rendermodule;
};


/***/ })

};
;