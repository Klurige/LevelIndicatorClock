/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ const $def2de46b9306e8a$var$t = globalThis, $def2de46b9306e8a$export$b4d10f6001c083c2 = $def2de46b9306e8a$var$t.ShadowRoot && (void 0 === $def2de46b9306e8a$var$t.ShadyCSS || $def2de46b9306e8a$var$t.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, $def2de46b9306e8a$var$s = Symbol(), $def2de46b9306e8a$var$o = new WeakMap;
class $def2de46b9306e8a$export$505d1e8739bad805 {
    constructor(t, e, o){
        if (this._$cssResult$ = !0, o !== $def2de46b9306e8a$var$s) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
        this.cssText = t, this.t = e;
    }
    get styleSheet() {
        let t = this.o;
        const s = this.t;
        if ($def2de46b9306e8a$export$b4d10f6001c083c2 && void 0 === t) {
            const e = void 0 !== s && 1 === s.length;
            e && (t = $def2de46b9306e8a$var$o.get(s)), void 0 === t && ((this.o = t = new CSSStyleSheet).replaceSync(this.cssText), e && $def2de46b9306e8a$var$o.set(s, t));
        }
        return t;
    }
    toString() {
        return this.cssText;
    }
}
const $def2de46b9306e8a$export$8d80f9cac07cdb3 = (t)=>new $def2de46b9306e8a$export$505d1e8739bad805("string" == typeof t ? t : t + "", void 0, $def2de46b9306e8a$var$s), $def2de46b9306e8a$export$dbf350e5966cf602 = (t, ...e)=>{
    const o = 1 === t.length ? t[0] : e.reduce((e, s, o)=>e + ((t)=>{
            if (!0 === t._$cssResult$) return t.cssText;
            if ("number" == typeof t) return t;
            throw Error("Value passed to 'css' function must be a 'css' function result: " + t + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
        })(s) + t[o + 1], t[0]);
    return new $def2de46b9306e8a$export$505d1e8739bad805(o, t, $def2de46b9306e8a$var$s);
}, $def2de46b9306e8a$export$2ca4a66ec4cecb90 = (s, o)=>{
    if ($def2de46b9306e8a$export$b4d10f6001c083c2) s.adoptedStyleSheets = o.map((t)=>t instanceof CSSStyleSheet ? t : t.styleSheet);
    else for (const e of o){
        const o = document.createElement("style"), n = $def2de46b9306e8a$var$t.litNonce;
        void 0 !== n && o.setAttribute("nonce", n), o.textContent = e.cssText, s.appendChild(o);
    }
}, $def2de46b9306e8a$export$ee69dfd951e24778 = $def2de46b9306e8a$export$b4d10f6001c083c2 ? (t)=>t : (t)=>t instanceof CSSStyleSheet ? ((t)=>{
        let e = "";
        for (const s of t.cssRules)e += s.cssText;
        return $def2de46b9306e8a$export$8d80f9cac07cdb3(e);
    })(t) : t;


/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ const { is: $19fe8e3abedf4df0$var$i, defineProperty: $19fe8e3abedf4df0$var$e, getOwnPropertyDescriptor: $19fe8e3abedf4df0$var$r, getOwnPropertyNames: $19fe8e3abedf4df0$var$h, getOwnPropertySymbols: $19fe8e3abedf4df0$var$o, getPrototypeOf: $19fe8e3abedf4df0$var$n } = Object, $19fe8e3abedf4df0$var$a = globalThis, $19fe8e3abedf4df0$var$c = $19fe8e3abedf4df0$var$a.trustedTypes, $19fe8e3abedf4df0$var$l = $19fe8e3abedf4df0$var$c ? $19fe8e3abedf4df0$var$c.emptyScript : "", $19fe8e3abedf4df0$var$p = $19fe8e3abedf4df0$var$a.reactiveElementPolyfillSupport, $19fe8e3abedf4df0$var$d = (t, s)=>t, $19fe8e3abedf4df0$export$7312b35fbf521afb = {
    toAttribute (t, s) {
        switch(s){
            case Boolean:
                t = t ? $19fe8e3abedf4df0$var$l : null;
                break;
            case Object:
            case Array:
                t = null == t ? t : JSON.stringify(t);
        }
        return t;
    },
    fromAttribute (t, s) {
        let i = t;
        switch(s){
            case Boolean:
                i = null !== t;
                break;
            case Number:
                i = null === t ? null : Number(t);
                break;
            case Object:
            case Array:
                try {
                    i = JSON.parse(t);
                } catch (t) {
                    i = null;
                }
        }
        return i;
    }
}, $19fe8e3abedf4df0$export$53a6892c50694894 = (t, s)=>!$19fe8e3abedf4df0$var$i(t, s), $19fe8e3abedf4df0$var$y = {
    attribute: !0,
    type: String,
    converter: $19fe8e3abedf4df0$export$7312b35fbf521afb,
    reflect: !1,
    hasChanged: $19fe8e3abedf4df0$export$53a6892c50694894
};
Symbol.metadata ??= Symbol("metadata"), $19fe8e3abedf4df0$var$a.litPropertyMetadata ??= new WeakMap;
class $19fe8e3abedf4df0$export$c7c07a37856565d extends HTMLElement {
    static addInitializer(t) {
        this._$Ei(), (this.l ??= []).push(t);
    }
    static get observedAttributes() {
        return this.finalize(), this._$Eh && [
            ...this._$Eh.keys()
        ];
    }
    static createProperty(t, s = $19fe8e3abedf4df0$var$y) {
        if (s.state && (s.attribute = !1), this._$Ei(), this.elementProperties.set(t, s), !s.noAccessor) {
            const i = Symbol(), r = this.getPropertyDescriptor(t, i, s);
            void 0 !== r && $19fe8e3abedf4df0$var$e(this.prototype, t, r);
        }
    }
    static getPropertyDescriptor(t, s, i) {
        const { get: e, set: h } = $19fe8e3abedf4df0$var$r(this.prototype, t) ?? {
            get () {
                return this[s];
            },
            set (t) {
                this[s] = t;
            }
        };
        return {
            get () {
                return e?.call(this);
            },
            set (s) {
                const r = e?.call(this);
                h.call(this, s), this.requestUpdate(t, r, i);
            },
            configurable: !0,
            enumerable: !0
        };
    }
    static getPropertyOptions(t) {
        return this.elementProperties.get(t) ?? $19fe8e3abedf4df0$var$y;
    }
    static _$Ei() {
        if (this.hasOwnProperty($19fe8e3abedf4df0$var$d("elementProperties"))) return;
        const t = $19fe8e3abedf4df0$var$n(this);
        t.finalize(), void 0 !== t.l && (this.l = [
            ...t.l
        ]), this.elementProperties = new Map(t.elementProperties);
    }
    static finalize() {
        if (this.hasOwnProperty($19fe8e3abedf4df0$var$d("finalized"))) return;
        if (this.finalized = !0, this._$Ei(), this.hasOwnProperty($19fe8e3abedf4df0$var$d("properties"))) {
            const t = this.properties, s = [
                ...$19fe8e3abedf4df0$var$h(t),
                ...$19fe8e3abedf4df0$var$o(t)
            ];
            for (const i of s)this.createProperty(i, t[i]);
        }
        const t = this[Symbol.metadata];
        if (null !== t) {
            const s = litPropertyMetadata.get(t);
            if (void 0 !== s) for (const [t, i] of s)this.elementProperties.set(t, i);
        }
        this._$Eh = new Map;
        for (const [t, s] of this.elementProperties){
            const i = this._$Eu(t, s);
            void 0 !== i && this._$Eh.set(i, t);
        }
        this.elementStyles = this.finalizeStyles(this.styles);
    }
    static finalizeStyles(s) {
        const i = [];
        if (Array.isArray(s)) {
            const e = new Set(s.flat(1 / 0).reverse());
            for (const s of e)i.unshift((0, $def2de46b9306e8a$export$ee69dfd951e24778)(s));
        } else void 0 !== s && i.push((0, $def2de46b9306e8a$export$ee69dfd951e24778)(s));
        return i;
    }
    static _$Eu(t, s) {
        const i = s.attribute;
        return !1 === i ? void 0 : "string" == typeof i ? i : "string" == typeof t ? t.toLowerCase() : void 0;
    }
    constructor(){
        super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
    }
    _$Ev() {
        this._$ES = new Promise((t)=>this.enableUpdating = t), this._$AL = new Map, this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((t)=>t(this));
    }
    addController(t) {
        (this._$EO ??= new Set).add(t), void 0 !== this.renderRoot && this.isConnected && t.hostConnected?.();
    }
    removeController(t) {
        this._$EO?.delete(t);
    }
    _$E_() {
        const t = new Map, s = this.constructor.elementProperties;
        for (const i of s.keys())this.hasOwnProperty(i) && (t.set(i, this[i]), delete this[i]);
        t.size > 0 && (this._$Ep = t);
    }
    createRenderRoot() {
        const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
        return (0, $def2de46b9306e8a$export$2ca4a66ec4cecb90)(t, this.constructor.elementStyles), t;
    }
    connectedCallback() {
        this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((t)=>t.hostConnected?.());
    }
    enableUpdating(t) {}
    disconnectedCallback() {
        this._$EO?.forEach((t)=>t.hostDisconnected?.());
    }
    attributeChangedCallback(t, s, i) {
        this._$AK(t, i);
    }
    _$EC(t, s) {
        const i = this.constructor.elementProperties.get(t), e = this.constructor._$Eu(t, i);
        if (void 0 !== e && !0 === i.reflect) {
            const r = (void 0 !== i.converter?.toAttribute ? i.converter : $19fe8e3abedf4df0$export$7312b35fbf521afb).toAttribute(s, i.type);
            this._$Em = t, null == r ? this.removeAttribute(e) : this.setAttribute(e, r), this._$Em = null;
        }
    }
    _$AK(t, s) {
        const i = this.constructor, e = i._$Eh.get(t);
        if (void 0 !== e && this._$Em !== e) {
            const t = i.getPropertyOptions(e), r = "function" == typeof t.converter ? {
                fromAttribute: t.converter
            } : void 0 !== t.converter?.fromAttribute ? t.converter : $19fe8e3abedf4df0$export$7312b35fbf521afb;
            this._$Em = e, this[e] = r.fromAttribute(s, t.type), this._$Em = null;
        }
    }
    requestUpdate(t, s, i) {
        if (void 0 !== t) {
            if (i ??= this.constructor.getPropertyOptions(t), !(i.hasChanged ?? $19fe8e3abedf4df0$export$53a6892c50694894)(this[t], s)) return;
            this.P(t, s, i);
        }
        !1 === this.isUpdatePending && (this._$ES = this._$ET());
    }
    P(t, s, i) {
        this._$AL.has(t) || this._$AL.set(t, s), !0 === i.reflect && this._$Em !== t && (this._$Ej ??= new Set).add(t);
    }
    async _$ET() {
        this.isUpdatePending = !0;
        try {
            await this._$ES;
        } catch (t) {
            Promise.reject(t);
        }
        const t = this.scheduleUpdate();
        return null != t && await t, !this.isUpdatePending;
    }
    scheduleUpdate() {
        return this.performUpdate();
    }
    performUpdate() {
        if (!this.isUpdatePending) return;
        if (!this.hasUpdated) {
            if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
                for (const [t, s] of this._$Ep)this[t] = s;
                this._$Ep = void 0;
            }
            const t = this.constructor.elementProperties;
            if (t.size > 0) for (const [s, i] of t)!0 !== i.wrapped || this._$AL.has(s) || void 0 === this[s] || this.P(s, this[s], i);
        }
        let t = !1;
        const s = this._$AL;
        try {
            t = this.shouldUpdate(s), t ? (this.willUpdate(s), this._$EO?.forEach((t)=>t.hostUpdate?.()), this.update(s)) : this._$EU();
        } catch (s) {
            throw t = !1, this._$EU(), s;
        }
        t && this._$AE(s);
    }
    willUpdate(t) {}
    _$AE(t) {
        this._$EO?.forEach((t)=>t.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
    }
    _$EU() {
        this._$AL = new Map, this.isUpdatePending = !1;
    }
    get updateComplete() {
        return this.getUpdateComplete();
    }
    getUpdateComplete() {
        return this._$ES;
    }
    shouldUpdate(t) {
        return !0;
    }
    update(t) {
        this._$Ej &&= this._$Ej.forEach((t)=>this._$EC(t, this[t])), this._$EU();
    }
    updated(t) {}
    firstUpdated(t) {}
}
$19fe8e3abedf4df0$export$c7c07a37856565d.elementStyles = [], $19fe8e3abedf4df0$export$c7c07a37856565d.shadowRootOptions = {
    mode: "open"
}, $19fe8e3abedf4df0$export$c7c07a37856565d[$19fe8e3abedf4df0$var$d("elementProperties")] = new Map, $19fe8e3abedf4df0$export$c7c07a37856565d[$19fe8e3abedf4df0$var$d("finalized")] = new Map, $19fe8e3abedf4df0$var$p?.({
    ReactiveElement: $19fe8e3abedf4df0$export$c7c07a37856565d
}), ($19fe8e3abedf4df0$var$a.reactiveElementVersions ??= []).push("2.0.4");


/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ const $f58f44579a4747ac$var$t = globalThis, $f58f44579a4747ac$var$i = $f58f44579a4747ac$var$t.trustedTypes, $f58f44579a4747ac$var$s = $f58f44579a4747ac$var$i ? $f58f44579a4747ac$var$i.createPolicy("lit-html", {
    createHTML: (t)=>t
}) : void 0, $f58f44579a4747ac$var$e = "$lit$", $f58f44579a4747ac$var$h = `lit$${Math.random().toFixed(9).slice(2)}$`, $f58f44579a4747ac$var$o = "?" + $f58f44579a4747ac$var$h, $f58f44579a4747ac$var$n = `<${$f58f44579a4747ac$var$o}>`, $f58f44579a4747ac$var$r = document, $f58f44579a4747ac$var$l = ()=>$f58f44579a4747ac$var$r.createComment(""), $f58f44579a4747ac$var$c = (t)=>null === t || "object" != typeof t && "function" != typeof t, $f58f44579a4747ac$var$a = Array.isArray, $f58f44579a4747ac$var$u = (t)=>$f58f44579a4747ac$var$a(t) || "function" == typeof t?.[Symbol.iterator], $f58f44579a4747ac$var$d = "[ \t\n\f\r]", $f58f44579a4747ac$var$f = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, $f58f44579a4747ac$var$v = /-->/g, $f58f44579a4747ac$var$_ = />/g, $f58f44579a4747ac$var$m = RegExp(`>|${$f58f44579a4747ac$var$d}(?:([^\\s"'>=/]+)(${$f58f44579a4747ac$var$d}*=${$f58f44579a4747ac$var$d}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`, "g"), $f58f44579a4747ac$var$p = /'/g, $f58f44579a4747ac$var$g = /"/g, $f58f44579a4747ac$var$$ = /^(?:script|style|textarea|title)$/i, $f58f44579a4747ac$var$y = (t)=>(i, ...s)=>({
            _$litType$: t,
            strings: i,
            values: s
        }), $f58f44579a4747ac$export$c0bb0b647f701bb5 = $f58f44579a4747ac$var$y(1), $f58f44579a4747ac$export$7ed1367e7fa1ad68 = $f58f44579a4747ac$var$y(2), $f58f44579a4747ac$export$47d5b44d225be5b4 = $f58f44579a4747ac$var$y(3), $f58f44579a4747ac$export$9c068ae9cc5db4e8 = Symbol.for("lit-noChange"), $f58f44579a4747ac$export$45b790e32b2810ee = Symbol.for("lit-nothing"), $f58f44579a4747ac$var$A = new WeakMap, $f58f44579a4747ac$var$C = $f58f44579a4747ac$var$r.createTreeWalker($f58f44579a4747ac$var$r, 129);
function $f58f44579a4747ac$var$P(t, i) {
    if (!$f58f44579a4747ac$var$a(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
    return void 0 !== $f58f44579a4747ac$var$s ? $f58f44579a4747ac$var$s.createHTML(i) : i;
}
const $f58f44579a4747ac$var$V = (t, i)=>{
    const s = t.length - 1, o = [];
    let r, l = 2 === i ? "<svg>" : 3 === i ? "<math>" : "", c = $f58f44579a4747ac$var$f;
    for(let i = 0; i < s; i++){
        const s = t[i];
        let a, u, d = -1, y = 0;
        for(; y < s.length && (c.lastIndex = y, u = c.exec(s), null !== u);)y = c.lastIndex, c === $f58f44579a4747ac$var$f ? "!--" === u[1] ? c = $f58f44579a4747ac$var$v : void 0 !== u[1] ? c = $f58f44579a4747ac$var$_ : void 0 !== u[2] ? ($f58f44579a4747ac$var$$.test(u[2]) && (r = RegExp("</" + u[2], "g")), c = $f58f44579a4747ac$var$m) : void 0 !== u[3] && (c = $f58f44579a4747ac$var$m) : c === $f58f44579a4747ac$var$m ? ">" === u[0] ? (c = r ?? $f58f44579a4747ac$var$f, d = -1) : void 0 === u[1] ? d = -2 : (d = c.lastIndex - u[2].length, a = u[1], c = void 0 === u[3] ? $f58f44579a4747ac$var$m : '"' === u[3] ? $f58f44579a4747ac$var$g : $f58f44579a4747ac$var$p) : c === $f58f44579a4747ac$var$g || c === $f58f44579a4747ac$var$p ? c = $f58f44579a4747ac$var$m : c === $f58f44579a4747ac$var$v || c === $f58f44579a4747ac$var$_ ? c = $f58f44579a4747ac$var$f : (c = $f58f44579a4747ac$var$m, r = void 0);
        const x = c === $f58f44579a4747ac$var$m && t[i + 1].startsWith("/>") ? " " : "";
        l += c === $f58f44579a4747ac$var$f ? s + $f58f44579a4747ac$var$n : d >= 0 ? (o.push(a), s.slice(0, d) + $f58f44579a4747ac$var$e + s.slice(d) + $f58f44579a4747ac$var$h + x) : s + $f58f44579a4747ac$var$h + (-2 === d ? i : x);
    }
    return [
        $f58f44579a4747ac$var$P(t, l + (t[s] || "<?>") + (2 === i ? "</svg>" : 3 === i ? "</math>" : "")),
        o
    ];
};
class $f58f44579a4747ac$var$N {
    constructor({ strings: t, _$litType$: s }, n){
        let r;
        this.parts = [];
        let c = 0, a = 0;
        const u = t.length - 1, d = this.parts, [f, v] = $f58f44579a4747ac$var$V(t, s);
        if (this.el = $f58f44579a4747ac$var$N.createElement(f, n), $f58f44579a4747ac$var$C.currentNode = this.el.content, 2 === s || 3 === s) {
            const t = this.el.content.firstChild;
            t.replaceWith(...t.childNodes);
        }
        for(; null !== (r = $f58f44579a4747ac$var$C.nextNode()) && d.length < u;){
            if (1 === r.nodeType) {
                if (r.hasAttributes()) for (const t of r.getAttributeNames())if (t.endsWith($f58f44579a4747ac$var$e)) {
                    const i = v[a++], s = r.getAttribute(t).split($f58f44579a4747ac$var$h), e = /([.?@])?(.*)/.exec(i);
                    d.push({
                        type: 1,
                        index: c,
                        name: e[2],
                        strings: s,
                        ctor: "." === e[1] ? $f58f44579a4747ac$var$H : "?" === e[1] ? $f58f44579a4747ac$var$I : "@" === e[1] ? $f58f44579a4747ac$var$L : $f58f44579a4747ac$var$k
                    }), r.removeAttribute(t);
                } else t.startsWith($f58f44579a4747ac$var$h) && (d.push({
                    type: 6,
                    index: c
                }), r.removeAttribute(t));
                if ($f58f44579a4747ac$var$$.test(r.tagName)) {
                    const t = r.textContent.split($f58f44579a4747ac$var$h), s = t.length - 1;
                    if (s > 0) {
                        r.textContent = $f58f44579a4747ac$var$i ? $f58f44579a4747ac$var$i.emptyScript : "";
                        for(let i = 0; i < s; i++)r.append(t[i], $f58f44579a4747ac$var$l()), $f58f44579a4747ac$var$C.nextNode(), d.push({
                            type: 2,
                            index: ++c
                        });
                        r.append(t[s], $f58f44579a4747ac$var$l());
                    }
                }
            } else if (8 === r.nodeType) {
                if (r.data === $f58f44579a4747ac$var$o) d.push({
                    type: 2,
                    index: c
                });
                else {
                    let t = -1;
                    for(; -1 !== (t = r.data.indexOf($f58f44579a4747ac$var$h, t + 1));)d.push({
                        type: 7,
                        index: c
                    }), t += $f58f44579a4747ac$var$h.length - 1;
                }
            }
            c++;
        }
    }
    static createElement(t, i) {
        const s = $f58f44579a4747ac$var$r.createElement("template");
        return s.innerHTML = t, s;
    }
}
function $f58f44579a4747ac$var$S(t, i, s = t, e) {
    if (i === $f58f44579a4747ac$export$9c068ae9cc5db4e8) return i;
    let h = void 0 !== e ? s._$Co?.[e] : s._$Cl;
    const o = $f58f44579a4747ac$var$c(i) ? void 0 : i._$litDirective$;
    return h?.constructor !== o && (h?._$AO?.(!1), void 0 === o ? h = void 0 : (h = new o(t), h._$AT(t, s, e)), void 0 !== e ? (s._$Co ??= [])[e] = h : s._$Cl = h), void 0 !== h && (i = $f58f44579a4747ac$var$S(t, h._$AS(t, i.values), h, e)), i;
}
class $f58f44579a4747ac$var$M {
    constructor(t, i){
        this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = i;
    }
    get parentNode() {
        return this._$AM.parentNode;
    }
    get _$AU() {
        return this._$AM._$AU;
    }
    u(t) {
        const { el: { content: i }, parts: s } = this._$AD, e = (t?.creationScope ?? $f58f44579a4747ac$var$r).importNode(i, !0);
        $f58f44579a4747ac$var$C.currentNode = e;
        let h = $f58f44579a4747ac$var$C.nextNode(), o = 0, n = 0, l = s[0];
        for(; void 0 !== l;){
            if (o === l.index) {
                let i;
                2 === l.type ? i = new $f58f44579a4747ac$var$R(h, h.nextSibling, this, t) : 1 === l.type ? i = new l.ctor(h, l.name, l.strings, this, t) : 6 === l.type && (i = new $f58f44579a4747ac$var$z(h, this, t)), this._$AV.push(i), l = s[++n];
            }
            o !== l?.index && (h = $f58f44579a4747ac$var$C.nextNode(), o++);
        }
        return $f58f44579a4747ac$var$C.currentNode = $f58f44579a4747ac$var$r, e;
    }
    p(t) {
        let i = 0;
        for (const s of this._$AV)void 0 !== s && (void 0 !== s.strings ? (s._$AI(t, s, i), i += s.strings.length - 2) : s._$AI(t[i])), i++;
    }
}
class $f58f44579a4747ac$var$R {
    get _$AU() {
        return this._$AM?._$AU ?? this._$Cv;
    }
    constructor(t, i, s, e){
        this.type = 2, this._$AH = $f58f44579a4747ac$export$45b790e32b2810ee, this._$AN = void 0, this._$AA = t, this._$AB = i, this._$AM = s, this.options = e, this._$Cv = e?.isConnected ?? !0;
    }
    get parentNode() {
        let t = this._$AA.parentNode;
        const i = this._$AM;
        return void 0 !== i && 11 === t?.nodeType && (t = i.parentNode), t;
    }
    get startNode() {
        return this._$AA;
    }
    get endNode() {
        return this._$AB;
    }
    _$AI(t, i = this) {
        t = $f58f44579a4747ac$var$S(this, t, i), $f58f44579a4747ac$var$c(t) ? t === $f58f44579a4747ac$export$45b790e32b2810ee || null == t || "" === t ? (this._$AH !== $f58f44579a4747ac$export$45b790e32b2810ee && this._$AR(), this._$AH = $f58f44579a4747ac$export$45b790e32b2810ee) : t !== this._$AH && t !== $f58f44579a4747ac$export$9c068ae9cc5db4e8 && this._(t) : void 0 !== t._$litType$ ? this.$(t) : void 0 !== t.nodeType ? this.T(t) : $f58f44579a4747ac$var$u(t) ? this.k(t) : this._(t);
    }
    O(t) {
        return this._$AA.parentNode.insertBefore(t, this._$AB);
    }
    T(t) {
        this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
    }
    _(t) {
        this._$AH !== $f58f44579a4747ac$export$45b790e32b2810ee && $f58f44579a4747ac$var$c(this._$AH) ? this._$AA.nextSibling.data = t : this.T($f58f44579a4747ac$var$r.createTextNode(t)), this._$AH = t;
    }
    $(t) {
        const { values: i, _$litType$: s } = t, e = "number" == typeof s ? this._$AC(t) : (void 0 === s.el && (s.el = $f58f44579a4747ac$var$N.createElement($f58f44579a4747ac$var$P(s.h, s.h[0]), this.options)), s);
        if (this._$AH?._$AD === e) this._$AH.p(i);
        else {
            const t = new $f58f44579a4747ac$var$M(e, this), s = t.u(this.options);
            t.p(i), this.T(s), this._$AH = t;
        }
    }
    _$AC(t) {
        let i = $f58f44579a4747ac$var$A.get(t.strings);
        return void 0 === i && $f58f44579a4747ac$var$A.set(t.strings, i = new $f58f44579a4747ac$var$N(t)), i;
    }
    k(t) {
        $f58f44579a4747ac$var$a(this._$AH) || (this._$AH = [], this._$AR());
        const i = this._$AH;
        let s, e = 0;
        for (const h of t)e === i.length ? i.push(s = new $f58f44579a4747ac$var$R(this.O($f58f44579a4747ac$var$l()), this.O($f58f44579a4747ac$var$l()), this, this.options)) : s = i[e], s._$AI(h), e++;
        e < i.length && (this._$AR(s && s._$AB.nextSibling, e), i.length = e);
    }
    _$AR(t = this._$AA.nextSibling, i) {
        for(this._$AP?.(!1, !0, i); t && t !== this._$AB;){
            const i = t.nextSibling;
            t.remove(), t = i;
        }
    }
    setConnected(t) {
        void 0 === this._$AM && (this._$Cv = t, this._$AP?.(t));
    }
}
class $f58f44579a4747ac$var$k {
    get tagName() {
        return this.element.tagName;
    }
    get _$AU() {
        return this._$AM._$AU;
    }
    constructor(t, i, s, e, h){
        this.type = 1, this._$AH = $f58f44579a4747ac$export$45b790e32b2810ee, this._$AN = void 0, this.element = t, this.name = i, this._$AM = e, this.options = h, s.length > 2 || "" !== s[0] || "" !== s[1] ? (this._$AH = Array(s.length - 1).fill(new String), this.strings = s) : this._$AH = $f58f44579a4747ac$export$45b790e32b2810ee;
    }
    _$AI(t, i = this, s, e) {
        const h = this.strings;
        let o = !1;
        if (void 0 === h) t = $f58f44579a4747ac$var$S(this, t, i, 0), o = !$f58f44579a4747ac$var$c(t) || t !== this._$AH && t !== $f58f44579a4747ac$export$9c068ae9cc5db4e8, o && (this._$AH = t);
        else {
            const e = t;
            let n, r;
            for(t = h[0], n = 0; n < h.length - 1; n++)r = $f58f44579a4747ac$var$S(this, e[s + n], i, n), r === $f58f44579a4747ac$export$9c068ae9cc5db4e8 && (r = this._$AH[n]), o ||= !$f58f44579a4747ac$var$c(r) || r !== this._$AH[n], r === $f58f44579a4747ac$export$45b790e32b2810ee ? t = $f58f44579a4747ac$export$45b790e32b2810ee : t !== $f58f44579a4747ac$export$45b790e32b2810ee && (t += (r ?? "") + h[n + 1]), this._$AH[n] = r;
        }
        o && !e && this.j(t);
    }
    j(t) {
        t === $f58f44579a4747ac$export$45b790e32b2810ee ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
    }
}
class $f58f44579a4747ac$var$H extends $f58f44579a4747ac$var$k {
    constructor(){
        super(...arguments), this.type = 3;
    }
    j(t) {
        this.element[this.name] = t === $f58f44579a4747ac$export$45b790e32b2810ee ? void 0 : t;
    }
}
class $f58f44579a4747ac$var$I extends $f58f44579a4747ac$var$k {
    constructor(){
        super(...arguments), this.type = 4;
    }
    j(t) {
        this.element.toggleAttribute(this.name, !!t && t !== $f58f44579a4747ac$export$45b790e32b2810ee);
    }
}
class $f58f44579a4747ac$var$L extends $f58f44579a4747ac$var$k {
    constructor(t, i, s, e, h){
        super(t, i, s, e, h), this.type = 5;
    }
    _$AI(t, i = this) {
        if ((t = $f58f44579a4747ac$var$S(this, t, i, 0) ?? $f58f44579a4747ac$export$45b790e32b2810ee) === $f58f44579a4747ac$export$9c068ae9cc5db4e8) return;
        const s = this._$AH, e = t === $f58f44579a4747ac$export$45b790e32b2810ee && s !== $f58f44579a4747ac$export$45b790e32b2810ee || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, h = t !== $f58f44579a4747ac$export$45b790e32b2810ee && (s === $f58f44579a4747ac$export$45b790e32b2810ee || e);
        e && this.element.removeEventListener(this.name, this, s), h && this.element.addEventListener(this.name, this, t), this._$AH = t;
    }
    handleEvent(t) {
        "function" == typeof this._$AH ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
    }
}
class $f58f44579a4747ac$var$z {
    constructor(t, i, s){
        this.element = t, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = s;
    }
    get _$AU() {
        return this._$AM._$AU;
    }
    _$AI(t) {
        $f58f44579a4747ac$var$S(this, t);
    }
}
const $f58f44579a4747ac$export$8613d1ca9052b22e = {
    M: $f58f44579a4747ac$var$e,
    P: $f58f44579a4747ac$var$h,
    A: $f58f44579a4747ac$var$o,
    C: 1,
    L: $f58f44579a4747ac$var$V,
    R: $f58f44579a4747ac$var$M,
    D: $f58f44579a4747ac$var$u,
    V: $f58f44579a4747ac$var$S,
    I: $f58f44579a4747ac$var$R,
    H: $f58f44579a4747ac$var$k,
    N: $f58f44579a4747ac$var$I,
    U: $f58f44579a4747ac$var$L,
    B: $f58f44579a4747ac$var$H,
    F: $f58f44579a4747ac$var$z
}, $f58f44579a4747ac$var$j = $f58f44579a4747ac$var$t.litHtmlPolyfillSupport;
$f58f44579a4747ac$var$j?.($f58f44579a4747ac$var$N, $f58f44579a4747ac$var$R), ($f58f44579a4747ac$var$t.litHtmlVersions ??= []).push("3.2.1");
const $f58f44579a4747ac$export$b3890eb0ae9dca99 = (t, i, s)=>{
    const e = s?.renderBefore ?? i;
    let h = e._$litPart$;
    if (void 0 === h) {
        const t = s?.renderBefore ?? null;
        e._$litPart$ = h = new $f58f44579a4747ac$var$R(i.insertBefore($f58f44579a4747ac$var$l(), t), t, void 0, s ?? {});
    }
    return h._$AI(t), h;
};




/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ class $ab210b2da7b39b9d$export$3f2f9f5909897157 extends (0, $19fe8e3abedf4df0$export$c7c07a37856565d) {
    constructor(){
        super(...arguments), this.renderOptions = {
            host: this
        }, this._$Do = void 0;
    }
    createRenderRoot() {
        const t = super.createRenderRoot();
        return this.renderOptions.renderBefore ??= t.firstChild, t;
    }
    update(t) {
        const s = this.render();
        this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = (0, $f58f44579a4747ac$export$b3890eb0ae9dca99)(s, this.renderRoot, this.renderOptions);
    }
    connectedCallback() {
        super.connectedCallback(), this._$Do?.setConnected(!0);
    }
    disconnectedCallback() {
        super.disconnectedCallback(), this._$Do?.setConnected(!1);
    }
    render() {
        return 0, $f58f44579a4747ac$export$9c068ae9cc5db4e8;
    }
}
$ab210b2da7b39b9d$export$3f2f9f5909897157._$litElement$ = !0, $ab210b2da7b39b9d$export$3f2f9f5909897157["finalized"] = !0, globalThis.litElementHydrateSupport?.({
    LitElement: $ab210b2da7b39b9d$export$3f2f9f5909897157
});
const $ab210b2da7b39b9d$var$i = globalThis.litElementPolyfillSupport;
$ab210b2da7b39b9d$var$i?.({
    LitElement: $ab210b2da7b39b9d$export$3f2f9f5909897157
});
const $ab210b2da7b39b9d$export$f5c524615a7708d6 = {
    _$AK: (t, e, s)=>{
        t._$AK(e, s);
    },
    _$AL: (t)=>t._$AL
};
(globalThis.litElementVersions ??= []).push("4.1.1");


/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ const $a00bca1a101a9088$export$6acf61af03e62db = !1;




/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ const $14742f68afc766d6$export$da64fc29f17f9d0e = (t)=>(e, o)=>{
        void 0 !== o ? o.addInitializer(()=>{
            customElements.define(t, e);
        }) : customElements.define(t, e);
    };



/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ const $9cd908ed2625c047$var$o = {
    attribute: !0,
    type: String,
    converter: (0, $19fe8e3abedf4df0$export$7312b35fbf521afb),
    reflect: !1,
    hasChanged: (0, $19fe8e3abedf4df0$export$53a6892c50694894)
}, $9cd908ed2625c047$export$8d623b1670eb40f4 = (t = $9cd908ed2625c047$var$o, e, r)=>{
    const { kind: n, metadata: i } = r;
    let s = globalThis.litPropertyMetadata.get(i);
    if (void 0 === s && globalThis.litPropertyMetadata.set(i, s = new Map), s.set(r.name, t), "accessor" === n) {
        const { name: o } = r;
        return {
            set (r) {
                const n = e.get.call(this);
                e.set.call(this, r), this.requestUpdate(o, n, t);
            },
            init (e) {
                return void 0 !== e && this.P(o, void 0, t), e;
            }
        };
    }
    if ("setter" === n) {
        const { name: o } = r;
        return function(r) {
            const n = this[o];
            e.call(this, r), this.requestUpdate(o, n, t);
        };
    }
    throw Error("Unsupported decorator location: " + n);
};
function $9cd908ed2625c047$export$d541bacb2bda4494(t) {
    return (e, o)=>"object" == typeof o ? $9cd908ed2625c047$export$8d623b1670eb40f4(t, e, o) : ((t, e, o)=>{
            const r = e.hasOwnProperty(o);
            return e.constructor.createProperty(o, r ? {
                ...t,
                wrapped: !0
            } : t), r ? Object.getOwnPropertyDescriptor(e, o) : void 0;
        })(t, e, o);
}



/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ function $04c21ea1ce1f6057$export$ca000e230c0caa3e(r) {
    return (0, $9cd908ed2625c047$export$d541bacb2bda4494)({
        ...r,
        state: !0,
        attribute: !1
    });
}


/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ function $b4269277b3c48b0c$export$b2b799818fbabcf3(t) {
    return (n, o)=>{
        const c = "function" == typeof n ? n : n[o];
        Object.assign(c, t);
    };
}


/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ const $25e9c5a8f7ecfc69$export$51987bb50e1f6752 = (e, t, c)=>(c.configurable = !0, c.enumerable = !0, Reflect.decorate && "object" != typeof t && Object.defineProperty(e, t, c), c);


/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ function $02a1f3a787c54a30$export$2fa187e846a241c4(e, r) {
    return (n, s, i)=>{
        const o = (t)=>t.renderRoot?.querySelector(e) ?? null;
        if (r) {
            const { get: e, set: r } = "object" == typeof s ? n : i ?? (()=>{
                const t = Symbol();
                return {
                    get () {
                        return this[t];
                    },
                    set (e) {
                        this[t] = e;
                    }
                };
            })();
            return (0, $25e9c5a8f7ecfc69$export$51987bb50e1f6752)(n, s, {
                get () {
                    let t = e.call(this);
                    return void 0 === t && (t = o(this), (null !== t || this.hasUpdated) && r.call(this, t)), t;
                }
            });
        }
        return (0, $25e9c5a8f7ecfc69$export$51987bb50e1f6752)(n, s, {
            get () {
                return o(this);
            }
        });
    };
}



/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ let $ed34c589b230c255$var$e;
function $ed34c589b230c255$export$dcd0d083aa86c355(r) {
    return (n, o)=>(0, $25e9c5a8f7ecfc69$export$51987bb50e1f6752)(n, o, {
            get () {
                return (this.renderRoot ?? ($ed34c589b230c255$var$e ??= document.createDocumentFragment())).querySelectorAll(r);
            }
        });
}



/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ function $ea50f1870b80cbec$export$163dfc35cc43f240(r) {
    return (n, e)=>(0, $25e9c5a8f7ecfc69$export$51987bb50e1f6752)(n, e, {
            async get () {
                return await this.updateComplete, this.renderRoot?.querySelector(r) ?? null;
            }
        });
}



/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ function $563fcf7ce7e6c5aa$export$4682af2d9ee91415(o) {
    return (e, n)=>{
        const { slot: r, selector: s } = o ?? {}, c = "slot" + (r ? `[name=${r}]` : ":not([name])");
        return (0, $25e9c5a8f7ecfc69$export$51987bb50e1f6752)(e, n, {
            get () {
                const t = this.renderRoot?.querySelector(c), e = t?.assignedElements(o) ?? [];
                return void 0 === s ? e : e.filter((t)=>t.matches(s));
            }
        });
    };
}



/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ function $728f1385dd7bf557$export$1bdbe53f9df1b8(n) {
    return (o, r)=>{
        const { slot: e } = n ?? {}, s = "slot" + (e ? `[name=${e}]` : ":not([name])");
        return (0, $25e9c5a8f7ecfc69$export$51987bb50e1f6752)(o, r, {
            get () {
                const t = this.renderRoot?.querySelector(s);
                return t?.assignedNodes(n) ?? [];
            }
        });
    };
}





var $af2e54d923abca22$export$2e2bcd8739ae039 = (0, $def2de46b9306e8a$export$dbf350e5966cf602)`
    .error {
        color: var(--error-color, crimson);
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 3;
        text-align: center;
        background-color: var(--card-background-color, rgba(255, 255, 255, 0.7));
        padding: 1em;
        border-radius: 1em;
    }

    ha-card {
        display: flex;
        position: relative;
        flex-direction: column;
        align-items: center;
        font-family: Helvetica, sans-serif;
        aspect-ratio: 1 / 1;
    }

    /* Light mode (default) */
    .clock-face {
        fill: var(--card-background-color, whitesmoke);
        stroke: var(--secondary-text-color, darkslategray);
        stroke-width: 2.5;
    }

    .hour-digits {
        fill: var(--primary-text-color, black);
    }

    .hour-hand {
        position: absolute;
        width: 100%;
        height: 100%;
        transform-origin: center;
        z-index: 2;
        stroke: #333;
    }

    .minute-hand {
        position: absolute;
        width: 100%;
        height: 100%;
        transform-origin: center;
        z-index: 2;
        stroke: #333;
    }

    .center-dot {
        fill: #333;
    }

    /* Dark mode overrides */
    :host(.dark) .clock-face {
        fill: var(--secondary-text-color, gray);
        stroke: #333;
    }

    :host(.dark) .hour-digits {
        fill: #222;
    }

    :host(.dark) .hour-hand {
        stroke: var(--card-background-color, whitesmoke);
    }

    :host(.dark) .minute-hand {
        stroke: var(--card-background-color, whitesmoke);
    }

    :host(.dark) .center-dot {
        fill: var(--card-background-color, whitesmoke);
    }
`;


// Utility functions for LevelIndicatorClock
function $60b09ee0d5d2adab$export$ea51778fdc018295(minutes) {
    let angle = minutes / 2;
    while(angle < 0)angle += 360;
    while(angle > 360)angle -= 360;
    return angle;
}
const $60b09ee0d5d2adab$export$a05a539118602648 = {
    minutes_since_midnight: 0,
    level_length: 0,
    passed_levels: '',
    future_levels: ''
};
function $60b09ee0d5d2adab$export$c46cf0b3c9436807(compactLevels) {
    // Expecting format: "minutes_since_midnight:level_length:passed_levels:future_levels"
    if (!compactLevels) return $60b09ee0d5d2adab$export$a05a539118602648;
    const parts = compactLevels.split(":");
    if (parts.length < 4) {
        console.error('[ClockCard] Invalid compactLevels format:', compactLevels);
        return $60b09ee0d5d2adab$export$a05a539118602648;
    }
    const minutesSinceMidnight = parseInt(parts[0], 10);
    const levelLength = parseInt(parts[1], 10);
    if (isNaN(minutesSinceMidnight) || isNaN(levelLength)) {
        console.error('[ClockCard] Invalid numeric values in compactLevels:', compactLevels);
        return $60b09ee0d5d2adab$export$a05a539118602648;
    }
    const passedLevels = parts[2];
    const futureLevels = parts[3];
    return {
        minutes_since_midnight: minutesSinceMidnight,
        level_length: levelLength,
        passed_levels: passedLevels,
        future_levels: futureLevels
    };
}
function $60b09ee0d5d2adab$export$615f3482ca768fa4() {
    const now = new Date();
    return now.getHours() * 60 + now.getMinutes();
}
function $60b09ee0d5d2adab$export$398e9b43dc594d8e(level) {
    switch(level){
        case "L":
            return "green";
        // Green for low
        case "l":
            return "darkgreen";
        // Dark green for low
        case "M":
            return "yellow";
        // Yellow for medium
        case "m":
            return "olive";
        // Dark yellow for medium
        case "H":
            return "red";
        // Red for high
        case "h":
            return "maroon";
        // Dark red for high
        case "S":
            return "blue";
        // Blue for solar
        case "s":
            return "navy";
        // Dark blue for solar
        case "U":
            return "magenta";
        // Magenta for unknown
        case "u":
            return "purple";
        // Dark magenta for unknown
        case "E":
            return "cyan";
        // Cyan for error
        case "e":
            return "teal";
        // Dark cyan for error
        case "P":
            return "transparent";
        case "p":
            return "transparent";
        default:
            console.debug(`Unknown level character '${level}', defaulting to black.`);
            return "black";
    }
}


class $c0718f6920ed4f91$export$e85a5502f4e59624 {
    constructor(color, start, end){
        this.color = void 0;
        this.start = void 0;
        this.end = void 0;
        this.color = color;
        this.start = start;
        this.end = end;
    }
    arcToPath(cx, cy, r) {
        let angleDiff = Math.abs(this.end - this.start);
        // If the arc is a full circle or nearly so, extend the end angle slightly
        if (angleDiff >= 360 || angleDiff === 0) {
            // Draw two arcs to make a full circle
            const path1 = $c0718f6920ed4f91$export$e85a5502f4e59624.describeArcSegment(cx, cy, r, this.start, this.start + 180);
            const path2 = $c0718f6920ed4f91$export$e85a5502f4e59624.describeArcSegment(cx, cy, r, this.start + 180, this.end);
            return `${path1} ${path2}`;
        } else return $c0718f6920ed4f91$export$e85a5502f4e59624.describeArcSegment(cx, cy, r, this.start, this.end);
    }
    static polarToCartesian(cx, cy, r, angleRad) {
        return {
            x: cx + r * Math.cos(angleRad - Math.PI / 2),
            y: cy + r * Math.sin(angleRad - Math.PI / 2)
        };
    }
    static describeArcSegment(cx, cy, r, startAngle, endAngle) {
        const OVERLAP = 0.12;
        const start = startAngle == 0 ? -OVERLAP : startAngle;
        const end = endAngle == 360 ? 360 + OVERLAP : endAngle;
        const arcStart = $c0718f6920ed4f91$export$e85a5502f4e59624.polarToCartesian(cx, cy, r, end * (Math.PI / 180));
        const arcEnd = $c0718f6920ed4f91$export$e85a5502f4e59624.polarToCartesian(cx, cy, r, start * (Math.PI / 180));
        const largeArcFlag = Math.abs(end - start) > 180 ? '1' : '0';
        return `M ${arcStart.x} ${arcStart.y} A ${r} ${r} 0 ${largeArcFlag} 0 ${arcEnd.x} ${arcEnd.y}`;
    }
}
class $c0718f6920ed4f91$export$aa6be83ed25c328c {
    constructor(initialLevel = 'U'){
        this.arcs = [];
        this.arcs = [
            new $c0718f6920ed4f91$export$e85a5502f4e59624((0, $60b09ee0d5d2adab$export$398e9b43dc594d8e)(initialLevel), 0, 360)
        ];
    }
    getArcs() {
        return this.arcs;
    }
    insertLevelArc(color, startAngle, endAngle) {
        //console.debug(`Inserting level arc: color=${color}, startAngle=${startAngle}, endAngle=${endAngle}`);
        if (startAngle >= 0 && startAngle <= 360 && endAngle >= 0 && endAngle <= 360) {
            if (startAngle < endAngle) this.insertAndMergeLevelArc(color, startAngle, endAngle);
            else if (startAngle > endAngle) {
                if (startAngle < 360) this.insertAndMergeLevelArc(color, startAngle, 360);
                if (endAngle > 0) this.insertAndMergeLevelArc(color, 0, endAngle);
            }
        }
    }
    insertLevelAtMinute(startMinute, lengthMinutes, level) {
        const startAngle = (0, $60b09ee0d5d2adab$export$ea51778fdc018295)(startMinute);
        const endAngle = (0, $60b09ee0d5d2adab$export$ea51778fdc018295)(startMinute + lengthMinutes);
        this.insertLevelArc((0, $60b09ee0d5d2adab$export$398e9b43dc594d8e)(level), startAngle, endAngle);
    }
    insertAndMergeLevelArc(color, startAngle, endAngle) {
        let i = 0;
        while(i < this.arcs.length){
            const arc = this.arcs[i];
            if (startAngle >= arc.end || endAngle <= arc.start) {
                i++;
                continue;
            }
            const originalEnd = arc.end;
            if (startAngle > arc.start && endAngle < originalEnd) {
                arc.end = startAngle;
                const newArc = new $c0718f6920ed4f91$export$e85a5502f4e59624(color, startAngle, endAngle);
                const afterArc = new $c0718f6920ed4f91$export$e85a5502f4e59624(arc.color, endAngle, originalEnd);
                this.arcs.splice(i + 1, 0, newArc, afterArc);
                break;
            }
            if (startAngle <= arc.start && endAngle < originalEnd && endAngle > arc.start) {
                arc.start = endAngle;
                const newArc = new $c0718f6920ed4f91$export$e85a5502f4e59624(color, startAngle, endAngle);
                this.arcs.splice(i, 0, newArc);
                break;
            }
            if (startAngle > arc.start && endAngle >= originalEnd) {
                arc.end = startAngle;
                const newArc = new $c0718f6920ed4f91$export$e85a5502f4e59624(color, startAngle, endAngle);
                this.arcs.splice(i + 1, 0, newArc);
                i++;
                continue;
            }
            if (startAngle <= arc.start && endAngle >= originalEnd) {
                this.arcs.splice(i, 1);
                continue;
            }
            throw new Error('Unreachable');
        //i++;
        }
        let inserted = this.arcs.some((g)=>g.start === startAngle && g.end === endAngle);
        if (!inserted) {
            let insertedInLoop = false;
            for(let j = 0; j < this.arcs.length; j++)if (startAngle < this.arcs[j].start) {
                this.arcs.splice(j, 0, new $c0718f6920ed4f91$export$e85a5502f4e59624(color, startAngle, endAngle));
                insertedInLoop = true;
                break;
            }
            if (!insertedInLoop) this.arcs.push(new $c0718f6920ed4f91$export$e85a5502f4e59624(color, startAngle, endAngle));
        }
        i = 0;
        while(i < this.arcs.length - 1){
            const current = this.arcs[i];
            const next = this.arcs[i + 1];
            if (current.color === next.color && current.end === next.start) {
                current.end = next.end;
                this.arcs.splice(i + 1, 1);
            } else i++;
        }
    }
}



var $dc03dc8aeb30ad35$var$_dec, $dc03dc8aeb30ad35$var$_dec2, $dc03dc8aeb30ad35$var$_dec3, $dc03dc8aeb30ad35$var$_dec4, $dc03dc8aeb30ad35$var$_class, $dc03dc8aeb30ad35$var$_descriptor, $dc03dc8aeb30ad35$var$_descriptor2, $dc03dc8aeb30ad35$var$_descriptor3, $dc03dc8aeb30ad35$var$_descriptor4, $dc03dc8aeb30ad35$var$_LevelIndicatorClockCard;
function $dc03dc8aeb30ad35$var$_initializerDefineProperty(e, i, r, l) {
    r && Object.defineProperty(e, i, {
        enumerable: r.enumerable,
        configurable: r.configurable,
        writable: r.writable,
        value: r.initializer ? r.initializer.call(l) : void 0
    });
}
function $dc03dc8aeb30ad35$var$_applyDecoratedDescriptor(i, e, r, n, l) {
    var a = {};
    return Object.keys(n).forEach(function(i) {
        a[i] = n[i];
    }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function(r, n) {
        return n(i, e, r) || r;
    }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a;
}
function $dc03dc8aeb30ad35$var$_initializerWarningHelper(r, e) {
    throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform.");
}
let $dc03dc8aeb30ad35$export$b085454a5d0b0b56 = ($dc03dc8aeb30ad35$var$_dec = (0, $9cd908ed2625c047$export$d541bacb2bda4494)({
    type: String
}), $dc03dc8aeb30ad35$var$_dec2 = (0, $04c21ea1ce1f6057$export$ca000e230c0caa3e)(), $dc03dc8aeb30ad35$var$_dec3 = (0, $04c21ea1ce1f6057$export$ca000e230c0caa3e)(), $dc03dc8aeb30ad35$var$_dec4 = (0, $04c21ea1ce1f6057$export$ca000e230c0caa3e)(), $dc03dc8aeb30ad35$var$_class = ($dc03dc8aeb30ad35$var$_LevelIndicatorClockCard = class LevelIndicatorClockCard extends (0, $ab210b2da7b39b9d$export$3f2f9f5909897157) {
    constructor(...args){
        super(...args);
        this.intervalId = void 0;
        this.isSimulating = false;
        this.SIMULATE_LEVEL_LENGTH = 60;
        this.SIMULATION_STEP_MINUTES = 1;
        this.SIMULATION_UPDATE_PERIOD_MS = 200;
        this.currentTimeMinutes = 0;
        $dc03dc8aeb30ad35$var$_initializerDefineProperty(this, "compactLevels", $dc03dc8aeb30ad35$var$_descriptor, this);
        this.compactLevelsEntity = '';
        this.hasReceivedData = false;
        this._hass = void 0;
        $dc03dc8aeb30ad35$var$_initializerDefineProperty(this, "dependencyMet", $dc03dc8aeb30ad35$var$_descriptor2, this);
        $dc03dc8aeb30ad35$var$_initializerDefineProperty(this, "hourHandEnd", $dc03dc8aeb30ad35$var$_descriptor3, this);
        $dc03dc8aeb30ad35$var$_initializerDefineProperty(this, "minuteHandEnd", $dc03dc8aeb30ad35$var$_descriptor4, this);
        this.levelLength = 0;
        this.currentLevels = '';
        this.currentStartMinute = 0;
        this.futureLevels = '';
        this.futureStartMinute = 0;
        this.isFirstUpdate = true;
        // New: ticker for advancing the clock every minute (real mode)
        this.minuteTickerId = void 0;
        // Level to show for passed and future levels. requestUpdate() must be called to display any changes.
        this.levelArcs = new (0, $c0718f6920ed4f91$export$aa6be83ed25c328c)('U');
    }
    setConfig(config) {
        if (!config) throw new Error('No configuration provided.');
        const newEntity = config.compact_levels ?? '';
        if (newEntity !== this.compactLevelsEntity) {
            this.compactLevelsEntity = newEntity;
            this.compactLevels = '';
            this.hasReceivedData = false;
            if (this._hass && this.compactLevelsEntity) this.updateFromHass(this._hass);
        }
    }
    set hass(hass) {
        this._hass = hass;
        this.dependencyMet = hass?.config?.components?.includes('electricitypricelevels');
        // Toggle dark mode class based on HA theme
        const isDark = !!hass?.themes?.darkMode;
        this.classList.toggle('dark', isDark);
        if (this.isSimulating || !hass) {
            console.debug("[ClockCard] Skipping update: simulating or hass not available.");
            return;
        }
        if (this.dependencyMet === false) console.error("HACS integration 'electricitypricelevels' is not installed or loaded.");
        else if (this.compactLevelsEntity) this.updateFromHass(hass);
    }
    updateFromHass(hass) {
        const compactLevelsState = hass.states?.[this.compactLevelsEntity];
        const compactLevels = compactLevelsState?.attributes?.compact ?? undefined;
        if (compactLevels !== this.compactLevels) {
            this.hasReceivedData = true;
            this.compactLevels = compactLevels ?? '';
            console.debug(`[ClockCard] ${this.compactLevelsEntity} state:`, this.compactLevels);
            const result = (0, $60b09ee0d5d2adab$export$c46cf0b3c9436807)(compactLevels);
            this.updateLevels(result);
        }
    }
    getCardSize() {
        console.debug("[ClockCard] getCardSize()");
        return 5;
    }
    getLayoutOptions() {
        console.debug("[ClockCard] getLayoutOptions");
        return {
            grid_rows: 8,
            grid_columns: 12
        };
    }
    // Helper to stop the minute ticker
    stopMinuteTicker() {
        if (this.minuteTickerId !== undefined) {
            console.debug('[ClockCard] Stopping existing minute ticker:', this.minuteTickerId);
            clearTimeout(this.minuteTickerId);
            this.minuteTickerId = undefined;
        }
    }
    // Helper to start the minute ticker. Immediately sets the current minute and then
    // schedules the next tick aligned to the wall-clock minute boundary to avoid drift.
    startMinuteTicker(startMinutes) {
        if (this.isSimulating) {
            console.debug('[ClockCard] Simulation mode active; skipping startMinuteTicker.');
            return;
        }
        this.stopMinuteTicker();
        console.debug('[ClockCard] Starting minute ticker at', startMinutes);
        this.setCurrentMinute(startMinutes);
        this.scheduleNextMinuteTick();
    }
    scheduleNextMinuteTick() {
        const now = new Date();
        const msUntilNextMinute = (60 - now.getSeconds()) * 1000 - now.getMilliseconds();
        this.minuteTickerId = window.setTimeout(()=>{
            this.setCurrentMinute((0, $60b09ee0d5d2adab$export$615f3482ca768fa4)());
            this.scheduleNextMinuteTick();
        }, msUntilNextMinute);
    }
    /**
   * Update levels based on new data from electricitypricelevels.
   *
   * When extracting the levels, there is always one level overlap since time could be in the middle of a level.
   * The current level is included in both passed_levels and future_levels. The first char of future_levels is at the end of current levels.
   * @param levels
   * @private
   */ updateLevels(levels) {
        this.currentTimeMinutes = this.isFirstUpdate ? (0, $60b09ee0d5d2adab$export$615f3482ca768fa4)() : levels.minutes_since_midnight;
        if (this.isFirstUpdate) {
            console.debug('[ClockCard] First update - using actual current time:', this.currentTimeMinutes, 'instead of levels time:', levels.minutes_since_midnight);
            this.isFirstUpdate = false;
        }
        // Set the current time FIRST, before calculating any arcs
        //this.current_time_minutes = levels.minutes_since_midnight;
        this.levelLength = levels.level_length;
        const startOfCurrentLevel = Math.floor(levels.minutes_since_midnight / this.levelLength) * this.levelLength;
        const currentLevel = levels.future_levels.length > 0 ? levels.future_levels.charAt(0) : 'U';
        const passedLevels = levels.passed_levels.toLowerCase() + currentLevel.toLowerCase();
        const historyLengthLevels = Math.ceil(LevelIndicatorClockCard.HISTORY_LENGTH_MINUTES / this.levelLength);
        this.currentLevels = levels.future_levels.substring(0, historyLengthLevels);
        this.currentStartMinute = startOfCurrentLevel;
        const currentLengthLevels = Math.floor(720 / this.levelLength) - historyLengthLevels;
        const current = levels.future_levels.substring(0, currentLengthLevels + 1);
        this.futureLevels = levels.future_levels.substring(currentLengthLevels, currentLengthLevels + historyLengthLevels);
        this.futureStartMinute = startOfCurrentLevel + currentLengthLevels * this.levelLength;
        // Part of current level that has passed.
        let slotIndex = passedLevels.length - 1;
        const historyStartMinute = this.currentTimeMinutes - LevelIndicatorClockCard.HISTORY_LENGTH_MINUTES;
        let currentMinute = this.currentTimeMinutes;
        if (currentMinute > startOfCurrentLevel) this.levelArcs.insertLevelAtMinute(startOfCurrentLevel, currentMinute - startOfCurrentLevel, passedLevels.charAt(slotIndex));
        currentMinute = startOfCurrentLevel - 1;
        slotIndex--;
        // Fill in all passed levels, until we reach historyStartMinute. This will occasionally fill in a few minutes too much,
        // but that will be corrected when filling in future levels.
        while(currentMinute >= historyStartMinute && slotIndex >= 0){
            const levelChar = passedLevels.charAt(slotIndex);
            this.levelArcs.insertLevelAtMinute(currentMinute - this.levelLength + 1, this.levelLength, levelChar);
            currentMinute -= this.levelLength;
            slotIndex--;
        }
        // Part of current level that has not yet passed.
        this.levelArcs.insertLevelAtMinute(this.currentTimeMinutes, startOfCurrentLevel + this.levelLength - this.currentTimeMinutes, currentLevel);
        // Fill in all currently visible levels, until we reach currentMinute + 12 hours - history length.
        slotIndex = 1;
        currentMinute = startOfCurrentLevel + this.levelLength;
        const currentEndMinute = this.currentTimeMinutes + 720 - LevelIndicatorClockCard.HISTORY_LENGTH_MINUTES;
        while(currentMinute <= currentEndMinute - this.levelLength){
            const levelChar = current.charAt(slotIndex);
            this.levelArcs.insertLevelAtMinute(currentMinute, this.levelLength, levelChar);
            currentMinute += this.levelLength;
            slotIndex++;
        }
        // Fill in remaining part to reach currentEndMinute
        if (currentMinute < currentEndMinute) {
            const levelChar = slotIndex < current.length ? current.charAt(slotIndex) : 'U';
            const minutesLeft = currentEndMinute - currentMinute;
            console.debug("[ClockCard] Filling remaining part:", currentMinute, "length:", minutesLeft, "level:", levelChar);
            this.levelArcs.insertLevelAtMinute(currentMinute, minutesLeft, levelChar);
        }
        // Start the cyclic task that advances the displayed minute once per real minute.
        // This will immediately set the clock to this.current_time_minutes and then increment every minute.
        this.startMinuteTicker(this.currentTimeMinutes);
    }
    setAngle(hand, angle) {
        const handElement = this.shadowRoot?.querySelector("." + hand);
        if (handElement) handElement.style.transform = "rotate(" + angle + "deg)";
        else console.error(`[ClockCard]: Hand element '${hand}' not found.`);
    }
    setCurrentMinute(currentMinutes) {
        const previousCurrentTime = this.currentTimeMinutes;
        this.currentTimeMinutes = currentMinutes;
        const hours = Math.floor(this.currentTimeMinutes / 60);
        const minutes = this.currentTimeMinutes % 60;
        const hrAngle = hours % 12 * 30 + minutes * 0.5;
        const minAngle = minutes * 6;
        this.setAngle("hour-hand", hrAngle);
        this.setAngle("minute-hand", minAngle);
        if (this.currentLevels === undefined) {
            console.debug("[ClockCard] No current levels defined yet, skipping level update.");
            return;
        }
        console.debug(`[ClockCard] Time updated: ${hours}:${minutes < 10 ? '0' + minutes : minutes} (${this.currentTimeMinutes} minutes since midnight)`);
        console.debug("[ClockCard] Current levels:", this.currentLevels);
        const passedMinutes = this.currentTimeMinutes - previousCurrentTime;
        let passedStart = previousCurrentTime;
        let passedEnd = this.currentTimeMinutes;
        console.debug("[ClockCard] passed: ", passedStart, "->", passedEnd, "current:", this.currentTimeMinutes);
        let passedIndex = 0;
        while(passedStart < passedEnd){
            const minutes = passedEnd - passedStart < this.levelLength ? passedEnd - passedStart : this.levelLength;
            const levelChar = passedIndex < this.currentLevels.length ? this.currentLevels.charAt(passedIndex).toLowerCase() : 'u';
            this.levelArcs.insertLevelAtMinute(passedStart, minutes, levelChar);
            passedStart += minutes;
            passedIndex++;
        }
        let futureStart = previousCurrentTime + 720 - LevelIndicatorClockCard.HISTORY_LENGTH_MINUTES;
        let futureEnd = futureStart + passedMinutes;
        console.debug("[ClockCard] Filling future levels from", futureStart, "to", futureEnd);
        let futureIndex = 0;
        while(futureStart < futureEnd){
            const minutes = futureEnd - futureStart < this.levelLength ? futureEnd - futureStart : this.levelLength;
            const levelChar = futureIndex < this.futureLevels.length ? this.futureLevels.charAt(futureIndex) : 'U';
            this.levelArcs.insertLevelAtMinute(futureStart, minutes, levelChar);
            futureStart += minutes;
            futureIndex++;
        }
        console.debug("[ClockCard] Inserting marker at", this.currentTimeMinutes);
        this.levelArcs.insertLevelAtMinute(futureEnd, LevelIndicatorClockCard.MARKER_WIDTH_MINUTES, 'P');
        this.requestUpdate();
    }
    render() {
        const arcPaths = this.levelArcs.getArcs().map((levelArc)=>{
            const path = levelArc.arcToPath(LevelIndicatorClockCard.CENTER_X, LevelIndicatorClockCard.CENTER_Y, LevelIndicatorClockCard.ARC_RADIUS);
            return (0, $f58f44579a4747ac$export$7ed1367e7fa1ad68)`<path d="${path}" stroke="${levelArc.color}" stroke-width="${LevelIndicatorClockCard.ARC_STROKE_WIDTH}" fill="none" />`;
        });
        return (0, $f58f44579a4747ac$export$c0bb0b647f701bb5)`
            <ha-card>
                ${!this.dependencyMet ? (0, $f58f44579a4747ac$export$c0bb0b647f701bb5)`
                            <div class="error">
                                <p>HACS integration 'electricitypricelevels' is not installed or loaded.</p>
                            </div>
                        ` : ''}
                ${(0, $f58f44579a4747ac$export$7ed1367e7fa1ad68)`
                <svg width="100%" height="100%" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="100" cy="100" r="95" class="clock-face" />

                    ${arcPaths}

                    <g class="hour-digits" font-family="Helvetica, sans-serif" font-size="14" text-anchor="middle" dominant-baseline="middle">
                        ${LevelIndicatorClockCard.hourDigits}
                    </g>

                    <line class="hour-hand" x1="100" y1="100" x2="${this.hourHandEnd.x}" y2="${this.hourHandEnd.y}"
                          stroke-width="5" stroke-linecap="round" />
                    <line class="minute-hand" x1="100" y1="100" x2="${this.minuteHandEnd.x}" y2="${this.minuteHandEnd.y}"
                          stroke-width="3" stroke-linecap="round" />
                    <circle cx="100" cy="100" r="4" class="center-dot" />
                </svg>
            `}
            </ha-card>
        `;
    }
    static getConfigForm() {
        return {
            schema: [
                {
                    name: 'compact_levels',
                    selector: {
                        entity: {
                            domain: 'sensor'
                        }
                    }
                }
            ]
        };
    }
    static getStubConfig() {
        return {
            type: 'custom:level-indicator-clock',
            compact_levels: ''
        };
    }
    generateCompactLevels(currentMinutes) {
        // Should generate a string of format minutes_since_midnight:level_length:passed_levels:future_levels
        // Each char in passed_levels represents level_length minutes, total length should be at least one hour.
        // Each char in future_levels represents level_length minutes, total length should be at least 12 hours.
        const levelLength = this.SIMULATE_LEVEL_LENGTH;
        //        const staticData = "LMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMHMLMH";
        const staticData = "LLLMMMHHHMMMLLLMMMHHHMMMLLLMMMHHHMMMLLLMMMHHHMMMLLLMMMHHHMMMLLLMMMHHHMMMLLLMMMHHHMMMLLLMMMHHHMMMLLLMMMHHHMMMLLLMMMHHHMMMLLLMMMHHHMMMLLLMMMHHHMMMLLLMMMHHHMMMLLLMMMHHHMMMLLLMMMHHHMMMLLLMM";
        const currentLevelIndex = Math.floor(currentMinutes / levelLength);
        const numPassed = Math.ceil(60 / levelLength);
        let passedStart = Math.max(0, currentLevelIndex - numPassed);
        let passedLevels = staticData.substring(passedStart, currentLevelIndex);
        // Pad with 'U' if not enough data (e.g., at midnight)
        if (passedLevels.length < numPassed) passedLevels = 'U'.repeat(numPassed - passedLevels.length) + passedLevels;
        const numFuture = Math.ceil(720 / levelLength);
        let futureLevels = staticData.substring(currentLevelIndex, currentLevelIndex + numFuture);
        // Pad with 'U' if not enough data (e.g., near end of day)
        if (futureLevels.length < numFuture) futureLevels = futureLevels + 'U'.repeat(numFuture - futureLevels.length);
        return `${currentMinutes}:${levelLength}:${passedLevels}:${futureLevels}`;
    }
    firstUpdated() {
        console.log("[ClockCard] First updated, initializing clock...");
        if (this.isSimulating) {
            console.debug("[ClockCard] Starting in simulation mode.");
            const startTime = new Date();
            startTime.setHours(0, 0, 0, 0);
            this.currentTimeMinutes = startTime.getHours() * 60 + startTime.getMinutes();
            const levels = this.generateCompactLevels(this.currentTimeMinutes);
            const result = (0, $60b09ee0d5d2adab$export$c46cf0b3c9436807)(levels);
            this.updateLevels(result);
            const scheduleNextTick = ()=>{
                this.setCurrentMinute(this.currentTimeMinutes + this.SIMULATION_STEP_MINUTES);
                if (this.currentTimeMinutes % 60 === 0) {
                    const levels = this.generateCompactLevels(this.currentTimeMinutes);
                    const result = (0, $60b09ee0d5d2adab$export$c46cf0b3c9436807)(levels);
                    this.updateLevels(result);
                }
                this.intervalId = window.setTimeout(()=>{
                    scheduleNextTick();
                }, this.SIMULATION_UPDATE_PERIOD_MS);
            };
            scheduleNextTick();
        } else if (!this.hasReceivedData) {
            // No real sensor data yet (e.g. card picker preview). Show demo arcs.
            const now = (0, $60b09ee0d5d2adab$export$615f3482ca768fa4)();
            const demoLevelLength = 60;
            const pattern = 'LLLMMHHMMMHMMMLLLLMHMLLL';
            const numPassed = Math.ceil(60 / demoLevelLength);
            const numFuture = Math.ceil(720 / demoLevelLength);
            const passed = pattern.substring(0, numPassed);
            const future = pattern.substring(0, numFuture);
            const demoCompact = `${now}:${demoLevelLength}:${passed}:${future}`;
            const result = (0, $60b09ee0d5d2adab$export$c46cf0b3c9436807)(demoCompact);
            this.updateLevels(result);
        } else this.setCurrentMinute(this.currentTimeMinutes);
    }
    connectedCallback() {
        super.connectedCallback();
        // Restart the minute ticker when the card is reconnected (e.g. tab switch)
        if (!this.isSimulating && this.currentTimeMinutes > 0) this.startMinuteTicker((0, $60b09ee0d5d2adab$export$615f3482ca768fa4)());
    }
    disconnectedCallback() {
        if (this.intervalId) clearTimeout(this.intervalId);
        // Ensure minute ticker is stopped too
        this.stopMinuteTicker();
        super.disconnectedCallback();
    }
}, $dc03dc8aeb30ad35$var$_LevelIndicatorClockCard.CENTER_X = 100, $dc03dc8aeb30ad35$var$_LevelIndicatorClockCard.CENTER_Y = 100, $dc03dc8aeb30ad35$var$_LevelIndicatorClockCard.HOUR_DIGITS_RADIUS = 82, $dc03dc8aeb30ad35$var$_LevelIndicatorClockCard.hourDigits = Array.from({
    length: 12
}, (_, i)=>{
    const hour = i + 1;
    const angle = (hour - 3) * Math.PI * 2 / 12;
    const x = $dc03dc8aeb30ad35$var$_LevelIndicatorClockCard.CENTER_X + $dc03dc8aeb30ad35$var$_LevelIndicatorClockCard.HOUR_DIGITS_RADIUS * Math.cos(angle);
    const y = $dc03dc8aeb30ad35$var$_LevelIndicatorClockCard.CENTER_Y + $dc03dc8aeb30ad35$var$_LevelIndicatorClockCard.HOUR_DIGITS_RADIUS * Math.sin(angle);
    return (0, $f58f44579a4747ac$export$7ed1367e7fa1ad68)`<text x="${x}" y="${y}" font-weight="bold">${hour}</text>`;
}), $dc03dc8aeb30ad35$var$_LevelIndicatorClockCard.ARC_RADIUS = $dc03dc8aeb30ad35$var$_LevelIndicatorClockCard.HOUR_DIGITS_RADIUS + 1, $dc03dc8aeb30ad35$var$_LevelIndicatorClockCard.ARC_STROKE_WIDTH = 22, $dc03dc8aeb30ad35$var$_LevelIndicatorClockCard.MARKER_WIDTH_MINUTES = 3, $dc03dc8aeb30ad35$var$_LevelIndicatorClockCard.HISTORY_LENGTH_MINUTES = 60, $dc03dc8aeb30ad35$var$_LevelIndicatorClockCard.styles = (0, $af2e54d923abca22$export$2e2bcd8739ae039), $dc03dc8aeb30ad35$var$_LevelIndicatorClockCard), $dc03dc8aeb30ad35$var$_descriptor = $dc03dc8aeb30ad35$var$_applyDecoratedDescriptor($dc03dc8aeb30ad35$var$_class.prototype, "compactLevels", [
    $dc03dc8aeb30ad35$var$_dec
], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function() {
        return '';
    }
}), $dc03dc8aeb30ad35$var$_descriptor2 = $dc03dc8aeb30ad35$var$_applyDecoratedDescriptor($dc03dc8aeb30ad35$var$_class.prototype, "dependencyMet", [
    $dc03dc8aeb30ad35$var$_dec2
], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function() {
        return false;
    }
}), $dc03dc8aeb30ad35$var$_descriptor3 = $dc03dc8aeb30ad35$var$_applyDecoratedDescriptor($dc03dc8aeb30ad35$var$_class.prototype, "hourHandEnd", [
    $dc03dc8aeb30ad35$var$_dec3
], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function() {
        return {
            x: 100,
            y: 55
        };
    }
}), $dc03dc8aeb30ad35$var$_descriptor4 = $dc03dc8aeb30ad35$var$_applyDecoratedDescriptor($dc03dc8aeb30ad35$var$_class.prototype, "minuteHandEnd", [
    $dc03dc8aeb30ad35$var$_dec4
], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function() {
        return {
            x: 100,
            y: 40
        };
    }
}), $dc03dc8aeb30ad35$var$_class);



customElements.define("level-indicator-clock", (0, $dc03dc8aeb30ad35$export$b085454a5d0b0b56));
window.customCards = window.customCards || [];
window.customCards.push({
    type: "level-indicator-clock",
    name: "LevelIndicatorClock",
    description: "Clock with level indicators",
    preview: true
});


//# sourceMappingURL=LevelIndicatorClock.js.map
