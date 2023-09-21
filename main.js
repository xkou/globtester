var asdfe = function(e) {
    "use strict";
    e = e && e.hasOwnProperty("default") ? e.default : e;
    var t = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {}
      , n = function(e, t) {
        for (var n = [], i = 0; i < e.length; i++) {
            var s = t(e[i], i);
            r(s) ? n.push.apply(n, s) : n.push(s)
        }
        return n
    }
      , r = Array.isArray || function(e) {
        return "[object Array]" === Object.prototype.toString.call(e)
    }
      , i = s;
    function s(e, t, n) {
        e instanceof RegExp && (e = a(e, n)),
        t instanceof RegExp && (t = a(t, n));
        var r = o(e, t, n);
        return r && {
            start: r[0],
            end: r[1],
            pre: n.slice(0, r[0]),
            body: n.slice(r[0] + e.length, r[1]),
            post: n.slice(r[1] + t.length)
        }
    }
    function a(e, t) {
        var n = t.match(e);
        return n ? n[0] : null
    }
    function o(e, t, n) {
        var r, i, s, a, o, u = n.indexOf(e), c = n.indexOf(t, u + 1), l = u;
        if (u >= 0 && c > 0) {
            for (r = [],
            s = n.length; l >= 0 && !o; )
                l == u ? (r.push(l),
                u = n.indexOf(e, l + 1)) : 1 == r.length ? o = [r.pop(), c] : ((i = r.pop()) < s && (s = i,
                a = c),
                c = n.indexOf(t, l + 1)),
                l = u < c && u >= 0 ? u : c;
            r.length && (o = [s, a])
        }
        return o
    }
    s.range = o;
    var u = function(e) {
        if (!e)
            return [];
        "{}" === e.substr(0, 2) && (e = "\\{\\}" + e.substr(2));
        return function e(t, r) {
            var s = [];
            var a = i("{", "}", t);
            if (!a || /\$$/.test(a.pre))
                return [t];
            var o = /^-?\d+\.\.-?\d+(?:\.\.-?\d+)?$/.test(a.body);
            var u = /^[a-zA-Z]\.\.[a-zA-Z](?:\.\.-?\d+)?$/.test(a.body);
            var c = o || u;
            var l = a.body.indexOf(",") >= 0;
            if (!c && !l)
                return a.post.match(/,.*\}/) ? (t = a.pre + "{" + a.body + p + a.post,
                e(t)) : [t];
            var h;
            if (c)
                h = a.body.split(/\.\./);
            else if (1 === (h = function e(t) {
                if (!t)
                    return [""];
                var n = [];
                var r = i("{", "}", t);
                if (!r)
                    return t.split(",");
                var s = r.pre;
                var a = r.body;
                var o = r.post;
                var u = s.split(",");
                u[u.length - 1] += "{" + a + "}";
                var c = e(o);
                o.length && (u[u.length - 1] += c.shift(),
                u.push.apply(u, c));
                n.push.apply(n, u);
                return n
            }(a.body)).length && 1 === (h = e(h[0], !1).map(m)).length) {
                var d = a.post.length ? e(a.post, !1) : [""];
                return d.map(function(e) {
                    return a.pre + h[0] + e
                })
            }
            var g = a.pre;
            var d = a.post.length ? e(a.post, !1) : [""];
            var E;
            if (c) {
                var w = f(h[0])
                  , x = f(h[1])
                  , j = Math.max(h[0].length, h[1].length)
                  , _ = 3 == h.length ? Math.abs(f(h[2])) : 1
                  , S = y
                  , $ = x < w;
                $ && (_ *= -1,
                S = b);
                var A = h.some(v);
                E = [];
                for (var k = w; S(k, x); k += _) {
                    var O;
                    if (u)
                        "\\" === (O = String.fromCharCode(k)) && (O = "");
                    else if (O = String(k),
                    A) {
                        var T = j - O.length;
                        if (T > 0) {
                            var L = new Array(T + 1).join("0");
                            O = k < 0 ? "-" + L + O.slice(1) : L + O
                        }
                    }
                    E.push(O)
                }
            } else
                E = n(h, function(t) {
                    return e(t, !1)
                });
            for (var N = 0; N < E.length; N++)
                for (var B = 0; B < d.length; B++) {
                    var I = g + E[N] + d[B];
                    (!r || c || I) && s.push(I)
                }
            return s
        }(function(e) {
            return e.split("\\\\").join(c).split("\\{").join(l).split("\\}").join(p).split("\\,").join(h).split("\\.").join(d)
        }(e), !0).map(g)
    }
      , c = "\0SLASH" + Math.random() + "\0"
      , l = "\0OPEN" + Math.random() + "\0"
      , p = "\0CLOSE" + Math.random() + "\0"
      , h = "\0COMMA" + Math.random() + "\0"
      , d = "\0PERIOD" + Math.random() + "\0";
    function f(e) {
        return parseInt(e, 10) == e ? parseInt(e, 10) : e.charCodeAt(0)
    }
    function g(e) {
        return e.split(c).join("\\").split(l).join("{").split(p).join("}").split(h).join(",").split(d).join(".")
    }
    function m(e) {
        return "{" + e + "}"
    }
    function v(e) {
        return /^-?0\d/.test(e)
    }
    function y(e, t) {
        return e <= t
    }
    function b(e, t) {
        return e >= t
    }
    var E = L;
    L.Minimatch = N;
    var w = {
        sep: "/"
    };
    try {
        w = e
    } catch (e) {}
    var x = L.GLOBSTAR = N.GLOBSTAR = {}
      , j = {
        "!": {
            open: "(?:(?!(?:",
            close: "))[^/]*?)"
        },
        "?": {
            open: "(?:",
            close: ")?"
        },
        "+": {
            open: "(?:",
            close: ")+"
        },
        "*": {
            open: "(?:",
            close: ")*"
        },
        "@": {
            open: "(?:",
            close: ")"
        }
    }
      , _ = "[^/]"
      , S = _ + "*?"
      , $ = "(?:(?!(?:\\/|^)(?:\\.{1,2})($|\\/)).)*?"
      , A = "(?:(?!(?:\\/|^)\\.).)*?"
      , k = "().*{}+?[]^$\\!".split("").reduce(function(e, t) {
        return e[t] = !0,
        e
    }, {});
    var O = /\/+/;
    function T(e, t) {
        e = e || {},
        t = t || {};
        var n = {};
        return Object.keys(t).forEach(function(e) {
            n[e] = t[e]
        }),
        Object.keys(e).forEach(function(t) {
            n[t] = e[t]
        }),
        n
    }
    function L(e, t, n) {
        if ("string" != typeof t)
            throw new TypeError("glob pattern string required");
        return n || (n = {}),
        !(!n.nocomment && "#" === t.charAt(0)) && ("" === t.trim() ? "" === e : new N(t,n).match(e))
    }
    function N(e, t) {
        if (!(this instanceof N))
            return new N(e,t);
        if ("string" != typeof e)
            throw new TypeError("glob pattern string required");
        t || (t = {}),
        e = e.trim(),
        "/" !== w.sep && (e = e.split(w.sep).join("/")),
        this.options = t,
        this.set = [],
        this.pattern = e,
        this.regexp = null,
        this.negate = !1,
        this.comment = !1,
        this.empty = !1,
        this.make()
    }
    function B(e, t) {
        if (t || (t = this instanceof N ? this.options : {}),
        void 0 === (e = void 0 === e ? this.pattern : e))
            throw new TypeError("undefined pattern");
        return t.nobrace || !e.match(/\{.*\}/) ? [e] : u(e)
    }
    L.filter = function(e, t) {
        return t = t || {},
        function(n, r, i) {
            return L(n, e, t)
        }
    }
    ,
    L.defaults = function(e) {
        if (!e || !Object.keys(e).length)
            return L;
        var t = L
          , n = function(n, r, i) {
            return t.minimatch(n, r, T(e, i))
        };
        return n.Minimatch = function(n, r) {
            return new t.Minimatch(n,T(e, r))
        }
        ,
        n
    }
    ,
    N.defaults = function(e) {
        return e && Object.keys(e).length ? L.defaults(e).Minimatch : N
    }
    ,
    N.prototype.debug = function() {}
    ,
    N.prototype.make = function() {
        if (this._made)
            return;
        var e = this.pattern
          , t = this.options;
        if (!t.nocomment && "#" === e.charAt(0))
            return void (this.comment = !0);
        if (!e)
            return void (this.empty = !0);
        this.parseNegate();
        var n = this.globSet = this.braceExpand();
        t.debug && (this.debug = console.error);
        this.debug(this.pattern, n),
        App.state.setExpandedQuery(n),
        n = this.globParts = n.map(function(e) {
            return e.split(O)
        }),
        this.debug(this.pattern, n),
        n = n.map(function(e, t, n) {
            return e.map(this.parse, this)
        }, this),
        this.debug(this.pattern, n),
        n = n.filter(function(e) {
            return -1 === e.indexOf(!1)
        }),
        this.debug(this.pattern, n),
        this.set = n
    }
    ,
    N.prototype.parseNegate = function() {
        var e = this.pattern
          , t = !1
          , n = this.options
          , r = 0;
        if (n.nonegate)
            return;
        for (var i = 0, s = e.length; i < s && "!" === e.charAt(i); i++)
            t = !t,
            r++;
        r && (this.pattern = e.substr(r));
        this.negate = t
    }
    ,
    L.braceExpand = function(e, t) {
        return B(e, t)
    }
    ,
    N.prototype.braceExpand = B,
    N.prototype.parse = function(e, t) {
        if (e.length > 65536)
            throw new TypeError("pattern is too long");
        var n = this.options;
        if (!n.noglobstar && "**" === e)
            return x;
        if ("" === e)
            return "";
        var r, i = "", s = !!n.nocase, a = !1, o = [], u = [], c = !1, l = -1, p = -1, h = "." === e.charAt(0) ? "" : n.dot ? "(?!(?:^|\\/)\\.{1,2}(?:$|\\/))" : "(?!\\.)", d = this;
        function f() {
            if (r) {
                switch (r) {
                case "*":
                    i += S,
                    s = !0;
                    break;
                case "?":
                    i += _,
                    s = !0;
                    break;
                default:
                    i += "\\" + r
                }
                d.debug("clearStateChar %j %j", r, i),
                r = !1
            }
        }
        for (var g, m = 0, v = e.length; m < v && (g = e.charAt(m)); m++)
            if (this.debug("%s\t%s %s %j", e, m, i, g),
            a && k[g])
                i += "\\" + g,
                a = !1;
            else
                switch (g) {
                case "/":
                    return !1;
                case "\\":
                    f(),
                    a = !0;
                    continue;
                case "?":
                case "*":
                case "+":
                case "@":
                case "!":
                    if (this.debug("%s\t%s %s %j <-- stateChar", e, m, i, g),
                    c) {
                        this.debug("  in class"),
                        "!" === g && m === p + 1 && (g = "^"),
                        i += g;
                        continue
                    }
                    d.debug("call clearStateChar %j", r),
                    f(),
                    r = g,
                    n.noext && f();
                    continue;
                case "(":
                    if (c) {
                        i += "(";
                        continue
                    }
                    if (!r) {
                        i += "\\(";
                        continue
                    }
                    o.push({
                        type: r,
                        start: m - 1,
                        reStart: i.length,
                        open: j[r].open,
                        close: j[r].close
                    }),
                    i += "!" === r ? "(?:(?!(?:" : "(?:",
                    this.debug("plType %j %j", r, i),
                    r = !1;
                    continue;
                case ")":
                    if (c || !o.length) {
                        i += "\\)";
                        continue
                    }
                    f(),
                    s = !0;
                    var y = o.pop();
                    i += y.close,
                    "!" === y.type && u.push(y),
                    y.reEnd = i.length;
                    continue;
                case "|":
                    if (c || !o.length || a) {
                        i += "\\|",
                        a = !1;
                        continue
                    }
                    f(),
                    i += "|";
                    continue;
                case "[":
                    if (f(),
                    c) {
                        i += "\\" + g;
                        continue
                    }
                    c = !0,
                    p = m,
                    l = i.length,
                    i += g;
                    continue;
                case "]":
                    if (m === p + 1 || !c) {
                        i += "\\" + g,
                        a = !1;
                        continue
                    }
                    if (c)
                        var b, E = e.substring(p + 1, m);
                    s = !0,
                    c = !1,
                    i += g;
                    continue;
                default:
                    f(),
                    a ? a = !1 : !k[g] || "^" === g && c || (i += "\\"),
                    i += g
                }
        c && (E = e.substr(p + 1),
        b = this.parse(E, I),
        i = i.substr(0, l) + "\\[" + b[0],
        s = s || b[1]);
        for (y = o.pop(); y; y = o.pop()) {
            var w = i.slice(y.reStart + y.open.length);
            this.debug("setting tail", i, y),
            w = w.replace(/((?:\\{2}){0,64})(\\?)\|/g, function(e, t, n) {
                return n || (n = "\\"),
                t + t + n + "|"
            }),
            this.debug("tail=%j\n   %s", w, w, y, i);
            var $ = "*" === y.type ? S : "?" === y.type ? _ : "\\" + y.type;
            s = !0,
            i = i.slice(0, y.reStart) + $ + "\\(" + w
        }
        f(),
        a && (i += "\\\\");
        var A = !1;
        switch (i.charAt(0)) {
        case ".":
        case "[":
        case "(":
            A = !0
        }
        for (var O = u.length - 1; O > -1; O--) {
            var T = u[O]
              , L = i.slice(0, T.reStart)
              , N = i.slice(T.reStart, T.reEnd - 8)
              , B = i.slice(T.reEnd - 8, T.reEnd)
              , C = i.slice(T.reEnd);
            B += C;
            var M = L.split("(").length - 1
              , R = C;
            for (m = 0; m < M; m++)
                R = R.replace(/\)[+*?]?/, "");
            var q = "";
            "" === (C = R) && t !== I && (q = "$");
            var Q = L + N + C + q + B;
            i = Q
        }
        "" !== i && s && (i = "(?=.)" + i);
        A && (i = h + i);
        if (t === I)
            return [i, s];
        if (!s)
            return e.replace(/\\(.)/g, "$1");
        var F = n.nocase ? "i" : "";
        try {
            var U = new RegExp("^" + i + "$",F)
        } catch (e) {
            return new RegExp("$.")
        }
        return U._glob = e,
        U._src = i,
        U
    }
    ;
    var I = {};
    L.makeRe = function(e, t) {
        return new N(e,t || {}).makeRe()
    }
    ,
    N.prototype.makeRe = function() {
        if (this.regexp || !1 === this.regexp)
            return this.regexp;
        var e = this.set;
        if (!e.length)
            return this.regexp = !1,
            this.regexp;
        var t = this.options
          , n = t.noglobstar ? S : t.dot ? $ : A
          , r = t.nocase ? "i" : ""
          , i = e.map(function(e) {
            return e.map(function(e) {
                return e === x ? n : "string" == typeof e ? e.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&") : e._src
            }).join("\\/")
        }).join("|");
        i = "^(?:" + i + ")$",
        this.negate && (i = "^(?!" + i + ").*$");
        try {
            this.regexp = new RegExp(i,r)
        } catch (e) {
            this.regexp = !1
        }
        return this.regexp
    }
    ,
    L.match = function(e, t, n) {
        var r = new N(t,n = n || {});
        return e = e.filter(function(e) {
            return r.match(e)
        }),
        r.options.nonull && !e.length && e.push(t),
        e
    }
    ,
    N.prototype.match = function(e, t) {
        if (this.debug("match", e, this.pattern),
        this.comment)
            return !1;
        if (this.empty)
            return "" === e;
        if ("/" === e && t)
            return !0;
        var n = this.options;
        "/" !== w.sep && (e = e.split(w.sep).join("/"));
        e = e.split(O),
        this.debug(this.pattern, "split", e);
        var r, i, s = this.set;
        for (this.debug(this.pattern, "set", s),
        i = e.length - 1; i >= 0 && !(r = e[i]); i--)
            ;
        for (i = 0; i < s.length; i++) {
            var a = s[i]
              , o = e;
            n.matchBase && 1 === a.length && (o = [r]);
            var u = this.matchOne(o, a, t);
            if (u)
                return !!n.flipNegate || !this.negate
        }
        return !n.flipNegate && this.negate
    }
    ,
    N.prototype.matchOne = function(e, t, n) {
        var r = this.options;
        this.debug("matchOne", {
            this: this,
            file: e,
            pattern: t
        }),
        this.debug("matchOne", e.length, t.length);
        for (var i = 0, s = 0, a = e.length, o = t.length; i < a && s < o; i++,
        s++) {
            this.debug("matchOne loop");
            var u, c = t[s], l = e[i];
            if (this.debug(t, c, l),
            !1 === c)
                return !1;
            if (c === x) {
                this.debug("GLOBSTAR", [t, c, l]);
                var p = i
                  , h = s + 1;
                if (h === o) {
                    for (this.debug("** at the end"); i < a; i++)
                        if ("." === e[i] || ".." === e[i] || !r.dot && "." === e[i].charAt(0))
                            return !1;
                    return !0
                }
                for (; p < a; ) {
                    var d = e[p];
                    if (this.debug("\nglobstar while", e, p, t, h, d),
                    this.matchOne(e.slice(p), t.slice(h), n))
                        return this.debug("globstar found match!", p, a, d),
                        !0;
                    if ("." === d || ".." === d || !r.dot && "." === d.charAt(0)) {
                        this.debug("dot detected!", e, p, t, h);
                        break
                    }
                    this.debug("globstar swallow a segment, and continue"),
                    p++
                }
                return !(!n || (this.debug("\n>>> no match, partial?", e, p, t, h),
                p !== a))
            }
            if ("string" == typeof c ? (u = r.nocase ? l.toLowerCase() === c.toLowerCase() : l === c,
            this.debug("string match", c, l, u)) : (u = l.match(c),
            this.debug("pattern match", c, l, u)),
            !u)
                return !1
        }
        if (i === a && s === o)
            return !0;
        if (i === a)
            return n;
        if (s === o)
            return i === a - 1 && "" === e[i];
        throw new Error("wtf?")
    }
    ,
    t.mm = E;
    return {}
}(path);
!function(e) {
    "use strict";
    e.utils = {
        debounce: function(e, t) {
            let n;
            return function(...r) {
                const i = this;
                clearTimeout(n),
                n = setTimeout(()=>{
                    n = null,
                    e.apply(i, r)
                }
                , t)
            }
        },
        escape: function(e) {
            return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;")
        },
        parseQueryParams: function() {
            const e = {};
            try {
                "" !== window.location.search && window.location.search.substr(1).split("&").forEach(t=>{
                    const [n,r] = t.split("=");
                    e[n] = decodeURIComponent(r)
                }
                )
            } catch (e) {
                console.warn(e)
            }
            return e
        },
        sendGaEvent: function(e, t, n, r) {},
        getShareUrl: function() {
            const {query: t, files: n} = e.state.get();
            return `https://globster.xyz/?q=${encodeURIComponent(t)}&f=${encodeURIComponent(n.join(","))}`
        },
        getEmbed: function() {
            return '<iframe width="500" height="500" ' + `src="${`${e.utils.getShareUrl()}&embed=1`}" frameborder="0" sandbox="allow-scripts">` + "</iframe>"
        }
    }
}(App),
function(e) {
    "use strict";
    e.tree = {
        pathsToTree: function(e) {
            const t = {};
            return e.map(e=>(function e(t, n, r) {
                if (1 === t.length)
                    return n.____ = n.____ || [],
                    n.____.push({
                        name: t[0],
                        path: r
                    }),
                    n;
                const [i,...s] = t
                  , a = "" === i ? "/" : i;
                return n[a] = n[a] || {},
                e(s, n[a], r)
            }
            )(e.split("/"), t, e)),
            t
        },
        treeToHTML: function t(n, r=null) {
            const i = e.utils.escape
              , s = (e,t)=>{
                if (!e)
                    return "";
                const n = e.map(e=>`<li><span id="${e.path}">${i(e.name)}</span></li>`).join("");
                return t ? `<li>${n}</li>` : `<li><span>${i(r)}</span><ul>${n}</ul></li>`
            }
            ;
            if (n.____ && 1 === Object.keys(n).length)
                return s(n.____);
            const a = Object.keys(n).filter(e=>"____" !== e).map(e=>t(n[e], e));
            return r ? `<li>\n            <span>${i(r)}</span>\n            <ul>${s(n.____, !0)}${a.join("")}</ul>\n          </li>` : `<ul class="root">\n            ${s(n.____, !0)}${a.join("")}\n          </ul>`
        }
    }
}(App),
function(e) {
    "use strict";
    e.ui = function() {
        const t = document.getElementById("tree")
          , n = document.getElementById("stage")
          , r = document.getElementById("editor")
          , i = document.getElementById("glob")
          , s = document.getElementById("example_list")
          , a = document.getElementsByTagName("nav")[0]
          , o = document.getElementById("saveEdit")
          , u = document.getElementById("shareUrl")
          , c = document.getElementById("embedSnippet")
          , l = document.getElementsByClassName("hints")[0]
          , p = document.getElementById("extraInfo")
          , h = document.getElementById("brace")
          , d = document.getElementById("expansionSet")
          , f = {}
          , g = {};
        function m(t) {
            if (t.preventDefault(),
            ("keypress" !== t.type || 13 === t.keyCode) && "SPAN" === t.target.nodeName) {
                const n = t.target.innerText;
                e.state.setQuery(n),
                e.utils.sendGaEvent("example", n)
            }
        }
        g.renderTree = function() {
            const {tree: n} = e.state.get();
            t.innerHTML = e.tree.treeToHTML(n)
        }
        ,
        g.renderQuery = function() {
            const {query: t} = e.state.get();
            i.value !== t && (i.value = t)
        }
        ,
        g.renderExpansion = function() {
            const {expandedQuery: t} = e.state.get();
            t.length > 1 ? (d.innerHTML = t.map(t=>`<span class="code">${e.utils.escape(t)}</span>`).join(" "),
            h.classList.add("active")) : h.classList.remove("active")
        }
        ,
        g.renderFileEditor = function() {
            const {files: t} = e.state.get();
            r.value = t.join("\n")
        }
        ,
        g.renderSelected = function() {
            const {files: t, matchedFiles: n} = e.state.get();
            t.forEach(e=>{
                let t = f[e];
                t && t.isConnected || (t = document.getElementById(e),
                f[e] = t),
                t.className = n.has(e) ? "active" : ""
            }
            )
        }
        ,
        g.renderShareUrl = function() {
            const t = e.utils.getShareUrl();
            u.innerText = t,
            u.setAttribute("href", t),
            c.innerText = e.utils.getEmbed()
        }
        ;
        const v = e.utils.debounce(t=>{
            e.state.setQuery(t.target.value)
        }
        , 500);
        function y(t) {
            if (t.preventDefault(),
            "keypress" === t.type && 13 !== t.keyCode)
                return;
            const n = r.value.split("\n").filter(e=>"" !== e);
            e.state.setFiles(n),
            e.utils.sendGaEvent("newFiles")
        }
        return a.addEventListener("click", function(t) {
            if ("A" === t.target.nodeName) {
                const r = t.target.className;
                if (e.utils.sendGaEvent("nav", r),
                "privacy" === r || "kofi" === r)
                    return;
                t.preventDefault(),
                n.className = r,
                a.className = r
            }
        }),
        i.addEventListener("input", v),
        i.addEventListener("focus", function() {
            e.utils.sendGaEvent("patternFocus")
        }),
        o.addEventListener("click", y),
        o.addEventListener("keypress", y),
        s.addEventListener("keypress", m),
        s.addEventListener("click", m),
        l.addEventListener("mouseover", function(t) {
            if ("SPAN" === t.target.nodeName) {
                const n = t.target.className.replace("code", "").replace("infoBtn", "").trim();
                l.className = `hints ${n}`,
                p.className = n,
                e.utils.sendGaEvent("infoBtn", n)
            }
        }),
        t.addEventListener("click", function() {
            n.className = "edit",
            a.className = "edit"
        }),
        g
    }()
}(App),
function(e) {
    "use strict";
    e.state = function() {
        let t = []
          , n = ""
          , r = []
          , i = {}
          , s = new Set;
        const a = []
          , o = {};
        return o.setFiles = function(r) {
            t = r,
            i = e.tree.pathsToTree(t),
            s = new Set(t.filter(e=>mm(e, n, {
                nonegate: !0
            }))),
            o.emit("files:updated")
        }
        ,
        o.setQuery = function(e) {
            r = [n = e],
            s = new Set(t.filter(e=>mm(e, n, {
                nonegate: !0
            }))),
            o.emit("query:updated")
        }
        ,
        o.setExpandedQuery = function(e) {
            r = e,
            o.emit("query:expanded")
        }
        ,
        o.get = function() {
            return {
                files: [...t],
                query: n,
                expandedQuery: r,
                tree: i,
                matchedFiles: s
            }
        }
        ,
        o.on = function(e, t) {
            a.push({
                event: e,
                callback: t
            })
        }
        ,
        o.emit = function(e) {
            a.forEach(({event: t, callback: n})=>{
                e === t && setTimeout(n, 0)
            }
            )
        }
        ,
        o
    }()
}(App),
function(e) {
    "use strict";
    e.state.on("files:updated", ()=>{
        e.ui.renderTree(),
        e.ui.renderFileEditor(),
        e.ui.renderSelected(),
        e.ui.renderShareUrl()
    }
    ),
    e.state.on("query:updated", ()=>{
        e.ui.renderQuery(),
        e.ui.renderExpansion(),
        e.ui.renderSelected(),
        e.ui.renderShareUrl()
    }
    ),
    e.state.on("query:expanded", ()=>{
        e.ui.renderExpansion()
    }
    );
    const t = e.utils.parseQueryParams();
    t.embed && document.body.classList.add("embed"),
    t.f ? e.state.setFiles(t.f.split(",")) : e.state.setFiles(["/myapp/readme.md", "/myapp/config/staging.js", "/myapp/config/production.js", "/myapp/src/services/utils.js", "/myapp/src/services/timezone.ts", "/myapp/src/controllers/health.js", "/myapp/src/controllers/user.module.ts", "/myapp/assets/logo.png", "/myapp/assets/logo_small.png", "/myapp/assets/favicon.ico"]),
    e.state.setQuery(t.q || "**/*.js")
}(App);
