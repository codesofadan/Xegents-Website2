(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Desktop/xegents/node_modules/.pnpm/@calcom+embed-react@1.5.3_r_9eaf20ba7cd008387fd4d51bc4502201/node_modules/@calcom/embed-react/dist/Cal.es.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>R,
    "getCalApi",
    ()=>j
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$xegents$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/xegents/node_modules/.pnpm/next@16.1.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$xegents$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/xegents/node_modules/.pnpm/next@16.1.0_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
;
;
const b = "https://app.cal.com/embed/embed.js";
function m(s = b) {
    (function(r, e, l) {
        let t = function(n, i) {
            n.q.push(i);
        }, o = r.document;
        r.Cal = r.Cal || function() {
            let n = r.Cal, i = arguments;
            if (n.loaded || (n.ns = {}, n.q = n.q || [], o.head.appendChild(o.createElement("script")).src = e, n.loaded = !0), i[0] === l) {
                const u = function() {
                    t(u, arguments);
                }, c = i[1];
                u.q = u.q || [], typeof c == "string" ? (n.ns[c] = n.ns[c] || u, t(n.ns[c], i), t(n, [
                    "initNamespace",
                    c
                ])) : t(n, i);
                return;
            }
            t(n, i);
        };
    })(window, //! Replace it with "https://cal.com/embed.js" or the URL where you have embed.js installed
    s, "init");
    /*!  Copying ends here. */ return window.Cal;
}
m.toString();
function q(s) {
    const [r, e] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$xegents$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$xegents$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        e(()=>m(s));
    }, []), r;
}
const h = function(r) {
    const { calLink: e, calOrigin: l, namespace: t = "", config: o, initConfig: n = {}, embedJsUrl: i, ...u } = r;
    if (!e) throw new Error("calLink is required");
    const c = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$xegents$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(!1), a = q(i), f = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$xegents$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$xegents$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!a || c.current || !f.current) return;
        c.current = !0;
        const d = f.current;
        t ? (a("init", t, {
            ...n,
            origin: l
        }), a.ns[t]("inline", {
            elementOrSelector: d,
            calLink: e,
            config: o
        })) : (a("init", {
            ...n,
            origin: l
        }), a("inline", {
            elementOrSelector: d,
            calLink: e,
            config: o
        }));
    }, [
        a,
        e,
        o,
        t,
        l,
        n
    ]), a ? /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$xegents$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$0_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("div", {
        ref: f,
        ...u
    }) : null;
}, R = h;
function j(s) {
    const r = typeof s == "string" ? {
        embedJsUrl: s
    } : s ?? {}, { namespace: e = "", embedJsUrl: l } = r;
    return new Promise(function t(o) {
        const n = m(l);
        n("init", e);
        const i = e ? n.ns[e] : n;
        if (!i) {
            setTimeout(()=>{
                t(o);
            }, 50);
            return;
        }
        o(i);
    });
}
;
}),
]);

//# sourceMappingURL=12858_%40calcom_embed-react_dist_Cal_es_mjs_84fd84e1._.js.map