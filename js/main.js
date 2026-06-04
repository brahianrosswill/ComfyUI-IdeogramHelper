(function(){var s=document.createElement('style');s.setAttribute('data-extension','comfyui-ideogramhelper');s.textContent=".canvas-wrap[data-v-237a165f]{display:flex;flex-direction:column;gap:6px}.toolbar[data-v-237a165f]{display:flex;flex-wrap:wrap;gap:6px;align-items:center}.lbl[data-v-237a165f]{font-size:11px;color:#999}.seg[data-v-237a165f]{display:flex;gap:2px}.seg button[data-v-237a165f],.ghost[data-v-237a165f]{background:#2a2a30;color:#ddd;border:1px solid #3a3a44;border-radius:5px;padding:3px 8px;font-size:11px;cursor:pointer}.seg button.on[data-v-237a165f]{background:#3b82f6;border-color:#3b82f6;color:#fff}.seg button.on.text[data-v-237a165f],.seg button.text.on[data-v-237a165f]{background:#f59e0b;border-color:#f59e0b;color:#1a1a1a}.ghost.on[data-v-237a165f]{background:#3b82f6;border-color:#3b82f6;color:#fff}.dims[data-v-237a165f]{font-size:11px;color:#888;font-family:monospace}.stage[data-v-237a165f]{position:relative;width:100%;background:#15151a;border:1px solid #3a3a44;border-radius:6px;overflow:hidden;background-image:linear-gradient(45deg,#1d1d22 25%,transparent 25%),linear-gradient(-45deg,#1d1d22 25%,transparent 25%),linear-gradient(45deg,transparent 75%,#1d1d22 75%),linear-gradient(-45deg,transparent 75%,#1d1d22 75%);background-size:18px 18px;background-position:0 0,0 9px,9px -9px,-9px 0;touch-action:none;user-select:none;cursor:crosshair}.stage.dragging[data-v-237a165f]{cursor:grabbing}.grid[data-v-237a165f]{position:absolute;inset:0;pointer-events:none;background-image:linear-gradient(to right,rgba(255,255,255,.06) 1px,transparent 1px),linear-gradient(to bottom,rgba(255,255,255,.06) 1px,transparent 1px);background-size:10% 10%}.box[data-v-237a165f]{position:absolute;border:2px solid;box-sizing:border-box;cursor:move;background:transparent;transition:background .1s}.box[data-v-237a165f]:hover{background:var(--fill)}.box.sel[data-v-237a165f]{background:var(--fill);box-shadow:0 0 0 1px #fff,0 0 10px #0009;z-index:5}.box.muted[data-v-237a165f]{opacity:.32;border-style:dashed;background:transparent!important}.box.muted .tag[data-v-237a165f]{opacity:.6}.box.draft[data-v-237a165f]{border-style:dashed;opacity:.8;pointer-events:none;background:#9ca3af1f}.tag[data-v-237a165f]{position:absolute;top:0;left:0;transform:translateY(-100%);font-size:10px;line-height:1.4;padding:1px 5px;white-space:nowrap;max-width:220px;overflow:hidden;text-overflow:ellipsis;border-radius:3px 3px 0 0;pointer-events:none}.h[data-v-237a165f]{position:absolute;width:11px;height:11px;background:#fff;border:1px solid #333;border-radius:2px}.h-nw[data-v-237a165f]{top:-6px;left:-6px;cursor:nwse-resize}.h-n[data-v-237a165f]{top:-6px;left:50%;margin-left:-5px;cursor:ns-resize}.h-ne[data-v-237a165f]{top:-6px;right:-6px;cursor:nesw-resize}.h-e[data-v-237a165f]{top:50%;right:-6px;margin-top:-5px;cursor:ew-resize}.h-se[data-v-237a165f]{bottom:-6px;right:-6px;cursor:nwse-resize}.h-s[data-v-237a165f]{bottom:-6px;left:50%;margin-left:-5px;cursor:ns-resize}.h-sw[data-v-237a165f]{bottom:-6px;left:-6px;cursor:nesw-resize}.h-w[data-v-237a165f]{top:50%;left:-6px;margin-top:-5px;cursor:ew-resize}.coordhint[data-v-237a165f]{font-size:10px;color:#ffffff73;font-family:monospace}.palette[data-v-3d11bea8]{display:flex;flex-direction:column;gap:4px}.swatches[data-v-3d11bea8]{display:flex;flex-wrap:wrap;gap:6px;align-items:center}.swatch-wrap[data-v-3d11bea8]{position:relative}.swatch[data-v-3d11bea8]{display:block;width:26px;height:26px;border-radius:5px;border:1px solid rgba(255,255,255,.25);cursor:pointer;overflow:hidden}.swatch input[data-v-3d11bea8]{opacity:0;width:100%;height:100%;cursor:pointer}.x[data-v-3d11bea8]{position:absolute;top:-6px;right:-6px;width:15px;height:15px;border-radius:50%;border:none;background:#b23;color:#fff;font-size:11px;line-height:11px;cursor:pointer;padding:0}.add[data-v-3d11bea8]{width:26px;height:26px;border-radius:5px;cursor:pointer;border:1px dashed rgba(255,255,255,.35);background:transparent;color:#ffffffb3;font-size:16px;line-height:1}.hint[data-v-3d11bea8]{font-size:10px;color:#ffffff73}.style[data-v-41f81c5e]{display:flex;flex-direction:column;gap:7px}.head[data-v-41f81c5e]{display:flex;justify-content:space-between;align-items:center}.en[data-v-41f81c5e]{font-size:12px;color:#ccc;display:flex;gap:5px;align-items:center;font-weight:600}.seg[data-v-41f81c5e]{display:flex;gap:2px}.seg button[data-v-41f81c5e]{background:#2a2a30;color:#ccc;border:1px solid #3a3a44;border-radius:4px;padding:2px 9px;font-size:11px;cursor:pointer}.seg button.on[data-v-41f81c5e]{background:#8b5cf6;border-color:#8b5cf6;color:#fff}.field[data-v-41f81c5e]{display:flex;flex-direction:column;gap:3px;font-size:11px;color:#aaa}.field input[data-v-41f81c5e]{background:#15151a;border:1px solid #3a3a44;color:#eee;border-radius:5px;padding:6px;font-size:12px}.ellist[data-v-e924e066]{display:flex;flex-direction:column;gap:6px}.head[data-v-e924e066]{display:flex;justify-content:space-between;align-items:center;font-size:12px;color:#ccc}.adds[data-v-e924e066]{display:flex;gap:4px}.adds button[data-v-e924e066]{border:none;border-radius:4px;padding:3px 8px;font-size:11px;cursor:pointer;color:#fff}.adds .obj[data-v-e924e066]{background:#3b82f6}.adds .text[data-v-e924e066]{background:#f59e0b;color:#1a1a1a}ul[data-v-e924e066]{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:3px;max-height:180px;overflow-y:auto}li[data-v-e924e066]{display:flex;align-items:center;gap:6px;padding:4px 6px;border-radius:5px;background:#232329;border:1px solid transparent;cursor:pointer;font-size:12px;color:#ddd}li[data-v-e924e066]:hover{background:#2b2b33}li.sel[data-v-e924e066]{border-color:#fff;background:#2e2e38}li.muted .snip[data-v-e924e066]{opacity:.45;text-decoration:line-through}.eye[data-v-e924e066]{background:none;border:none;cursor:pointer;padding:0;font-size:11px;flex:none;line-height:1;filter:grayscale(.3)}.dot[data-v-e924e066]{width:9px;height:9px;border-radius:2px;flex:none}.idx[data-v-e924e066]{color:#888;width:14px;flex:none}.link[data-v-e924e066]{flex:none;font-size:10px}.snip[data-v-e924e066]{flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.bb[data-v-e924e066]{color:#777;flex:none}.ops[data-v-e924e066]{display:flex;gap:1px;opacity:0;transition:opacity .12s}li:hover .ops[data-v-e924e066],li.sel .ops[data-v-e924e066]{opacity:1}.ops button[data-v-e924e066]{background:#34343c;border:none;color:#bbb;border-radius:3px;width:18px;height:18px;font-size:11px;cursor:pointer;padding:0}.ops button[data-v-e924e066]:hover{background:#44444e;color:#fff}.empty[data-v-e924e066]{font-size:11px;color:#777;margin:2px 0}.editor[data-v-ca5140c7]{display:flex;flex-direction:column;gap:8px;padding:8px;background:#202026;border-radius:6px;border:1px solid #32323c}.editor.empty[data-v-ca5140c7]{color:#777;font-size:12px;align-items:center}.row[data-v-ca5140c7]{display:flex;align-items:center;gap:8px;flex-wrap:wrap}.color[data-v-ca5140c7]{position:relative;width:22px;height:22px;cursor:pointer}.color .chip[data-v-ca5140c7]{display:block;width:22px;height:22px;border-radius:5px;border:1px solid rgba(255,255,255,.3)}.color input[data-v-ca5140c7]{position:absolute;inset:0;opacity:0;cursor:pointer}.lbl[data-v-ca5140c7]{font-size:12px;color:#ccc;font-weight:600}.seg[data-v-ca5140c7]{display:flex;gap:2px}.seg button[data-v-ca5140c7]{background:#2a2a30;color:#ccc;border:1px solid #3a3a44;border-radius:4px;padding:2px 8px;font-size:11px;cursor:pointer}.seg button.on[data-v-ca5140c7]{background:#3b82f6;border-color:#3b82f6;color:#fff}.mute[data-v-ca5140c7]{margin-left:auto;background:#2a2a30;color:#9ae6b4;border:1px solid #3a3a44;border-radius:4px;padding:2px 8px;font-size:11px;cursor:pointer}.mute.off[data-v-ca5140c7]{color:#f87171}.bbtoggle[data-v-ca5140c7]{font-size:11px;color:#aaa;display:flex;gap:4px;align-items:center}.link-row[data-v-ca5140c7]{font-size:11px}.linkbadge[data-v-ca5140c7]{border:1px solid;border-radius:4px;padding:1px 6px;color:#ddd}.unlinked[data-v-ca5140c7]{color:#666}.mini[data-v-ca5140c7]{background:#2a2a30;color:#ccc;border:1px solid #3a3a44;border-radius:4px;padding:2px 8px;font-size:11px;cursor:pointer}.mini[data-v-ca5140c7]:hover{background:#34343c;color:#fff}.hint[data-v-ca5140c7]{color:#777}.bbox-row[data-v-ca5140c7]{gap:6px}.bbox-row label[data-v-ca5140c7]{display:flex;flex-direction:column;font-size:10px;color:#999;gap:2px}.bbox-row input[data-v-ca5140c7]{width:52px;background:#15151a;border:1px solid #3a3a44;color:#eee;border-radius:4px;padding:3px;font-size:11px}.field[data-v-ca5140c7]{display:flex;flex-direction:column;gap:3px;font-size:11px;color:#aaa}.field input[type=text][data-v-ca5140c7],.field textarea[data-v-ca5140c7]{background:#15151a;border:1px solid #3a3a44;color:#eee;border-radius:5px;padding:6px;font-size:12px;resize:vertical;font-family:inherit}.preview[data-v-d02f898f]{display:flex;flex-direction:column;gap:5px}.head[data-v-d02f898f]{display:flex;justify-content:space-between;align-items:center;font-size:12px;color:#ccc}.actions[data-v-d02f898f]{display:flex;gap:6px;align-items:center}.actions button[data-v-d02f898f]{background:#2a2a30;color:#ccc;border:1px solid #3a3a44;border-radius:4px;padding:2px 8px;font-size:11px;cursor:pointer}.warns[data-v-d02f898f]{font-size:11px;color:#f59e0b;cursor:help}.warns.ok[data-v-d02f898f]{color:#34d399}.json[data-v-d02f898f]{margin:0;background:#121216;border:1px solid #2c2c34;border-radius:6px;padding:8px;font-size:11px;line-height:1.4;max-height:200px;overflow:auto;color:#cdd6f4;white-space:pre;font-family:ui-monospace,monospace}.warnlist[data-v-d02f898f]{margin:0;padding-left:16px;font-size:10px;color:#f59e0b;max-height:90px;overflow:auto}.studio[data-v-10629887]{display:flex;flex-direction:column;gap:9px;padding:10px;font-family:-apple-system,system-ui,sans-serif;color:#e5e5ea;background:#1a1a1f;border-radius:8px;box-sizing:border-box;width:100%}.topbar[data-v-10629887]{display:flex;justify-content:space-between;align-items:center;gap:8px}.title[data-v-10629887]{font-size:14px;font-weight:700;letter-spacing:.3px;white-space:nowrap}.tools[data-v-10629887]{display:flex;gap:5px;align-items:center}.ic[data-v-10629887]{background:#2a2a30;color:#ccc;border:1px solid #3a3a44;border-radius:5px;padding:3px 8px;font-size:12px;cursor:pointer}.ic[data-v-10629887]:disabled{opacity:.35;cursor:default}.ic.on[data-v-10629887]{background:#3b82f6;border-color:#3b82f6;color:#fff}.fmt[data-v-10629887]{background:#2a2a30;color:#ddd;border:1px solid #3a3a44;border-radius:5px;font-size:11px;padding:3px;max-width:150px}.reset[data-v-10629887]{background:#2a2a30;color:#bbb;border:1px solid #3a3a44;border-radius:5px;padding:3px 10px;font-size:11px;cursor:pointer}.advanced[data-v-10629887]{display:flex;flex-wrap:wrap;gap:8px;align-items:center;padding:7px 8px;background:#202026;border:1px solid #32323c;border-radius:6px;font-size:11px;color:#aaa}.advanced label[data-v-10629887]{display:flex;align-items:center;gap:4px}.advanced input[type=number][data-v-10629887]{width:56px;background:#15151a;border:1px solid #3a3a44;color:#eee;border-radius:4px;padding:3px;font-size:11px}.advanced input[type=range][data-v-10629887]{width:70px}.advanced .ck[data-v-10629887]{gap:3px}.hld[data-v-10629887],.bg[data-v-10629887]{display:flex;flex-direction:column;gap:3px;font-size:11px;color:#aaa}.hld textarea[data-v-10629887],.bg textarea[data-v-10629887]{background:#15151a;border:1px solid #3a3a44;color:#eee;border-radius:6px;padding:7px;font-size:12px;resize:vertical;font-family:inherit;line-height:1.4}.main[data-v-10629887]{display:grid;grid-template-columns:minmax(280px,1.4fr) minmax(220px,1fr);gap:12px;align-items:start}.left[data-v-10629887],.right[data-v-10629887]{display:flex;flex-direction:column;gap:8px;min-width:0}hr[data-v-10629887]{border:none;border-top:1px solid #2e2e36;width:100%;margin:2px 0}@media (max-width: 520px){.main[data-v-10629887]{grid-template-columns:1fr}}\n";document.head.appendChild(s);})();import { app as Zs } from "../../../scripts/app.js";
/**
* @vue/shared v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function Qs(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const s of e.split(",")) t[s] = 1;
  return (s) => s in t;
}
const q = {}, _t = [], je = () => {
}, gi = () => !1, as = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), en = (e) => e.startsWith("onUpdate:"), fe = Object.assign, tn = (e, t) => {
  const s = e.indexOf(t);
  s > -1 && e.splice(s, 1);
}, mi = Object.prototype.hasOwnProperty, U = (e, t) => mi.call(e, t), A = Array.isArray, vt = (e) => Bt(e) === "[object Map]", fs = (e) => Bt(e) === "[object Set]", yn = (e) => Bt(e) === "[object Date]", R = (e) => typeof e == "function", se = (e) => typeof e == "string", De = (e) => typeof e == "symbol", ee = (e) => e !== null && typeof e == "object", Qn = (e) => (ee(e) || R(e)) && R(e.then) && R(e.catch), eo = Object.prototype.toString, Bt = (e) => eo.call(e), bi = (e) => Bt(e).slice(8, -1), to = (e) => Bt(e) === "[object Object]", sn = (e) => se(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, kt = /* @__PURE__ */ Qs(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), ds = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (s) => t[s] || (t[s] = e(s));
}, _i = /-(\w)/g, Ze = ds(
  (e) => e.replace(_i, (t, s) => s ? s.toUpperCase() : "")
), vi = /\B([A-Z])/g, pt = ds(
  (e) => e.replace(vi, "-$1").toLowerCase()
), so = ds((e) => e.charAt(0).toUpperCase() + e.slice(1)), Cs = ds(
  (e) => e ? `on${so(e)}` : ""
), Xe = (e, t) => !Object.is(e, t), Zt = (e, ...t) => {
  for (let s = 0; s < e.length; s++)
    e[s](...t);
}, no = (e, t, s, n = !1) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    writable: n,
    value: s
  });
}, Ds = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
};
let xn;
const ps = () => xn || (xn = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function Te(e) {
  if (A(e)) {
    const t = {};
    for (let s = 0; s < e.length; s++) {
      const n = e[s], o = se(n) ? Si(n) : Te(n);
      if (o)
        for (const i in o)
          t[i] = o[i];
    }
    return t;
  } else if (se(e) || ee(e))
    return e;
}
const yi = /;(?![^(]*\))/g, xi = /:([^]+)/, wi = /\/\*[^]*?\*\//g;
function Si(e) {
  const t = {};
  return e.replace(wi, "").split(yi).forEach((s) => {
    if (s) {
      const n = s.split(xi);
      n.length > 1 && (t[n[0].trim()] = n[1].trim());
    }
  }), t;
}
function ie(e) {
  let t = "";
  if (se(e))
    t = e;
  else if (A(e))
    for (let s = 0; s < e.length; s++) {
      const n = ie(e[s]);
      n && (t += n + " ");
    }
  else if (ee(e))
    for (const s in e)
      e[s] && (t += s + " ");
  return t.trim();
}
const Ci = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", Ei = /* @__PURE__ */ Qs(Ci);
function oo(e) {
  return !!e || e === "";
}
function $i(e, t) {
  if (e.length !== t.length) return !1;
  let s = !0;
  for (let n = 0; s && n < e.length; n++)
    s = hs(e[n], t[n]);
  return s;
}
function hs(e, t) {
  if (e === t) return !0;
  let s = yn(e), n = yn(t);
  if (s || n)
    return s && n ? e.getTime() === t.getTime() : !1;
  if (s = De(e), n = De(t), s || n)
    return e === t;
  if (s = A(e), n = A(t), s || n)
    return s && n ? $i(e, t) : !1;
  if (s = ee(e), n = ee(t), s || n) {
    if (!s || !n)
      return !1;
    const o = Object.keys(e).length, i = Object.keys(t).length;
    if (o !== i)
      return !1;
    for (const l in e) {
      const r = e.hasOwnProperty(l), c = t.hasOwnProperty(l);
      if (r && !c || !r && c || !hs(e[l], t[l]))
        return !1;
    }
  }
  return String(e) === String(t);
}
function io(e, t) {
  return e.findIndex((s) => hs(s, t));
}
const lo = (e) => !!(e && e.__v_isRef === !0), z = (e) => se(e) ? e : e == null ? "" : A(e) || ee(e) && (e.toString === eo || !R(e.toString)) ? lo(e) ? z(e.value) : JSON.stringify(e, ro, 2) : String(e), ro = (e, t) => lo(t) ? ro(e, t.value) : vt(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (s, [n, o], i) => (s[Es(n, i) + " =>"] = o, s),
    {}
  )
} : fs(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((s) => Es(s))
} : De(t) ? Es(t) : ee(t) && !A(t) && !to(t) ? String(t) : t, Es = (e, t = "") => {
  var s;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    De(e) ? `Symbol(${(s = e.description) != null ? s : t})` : e
  );
};
/**
* @vue/reactivity v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let xe;
class Ti {
  constructor(t = !1) {
    this.detached = t, this._active = !0, this.effects = [], this.cleanups = [], this._isPaused = !1, this.parent = xe, !t && xe && (this.index = (xe.scopes || (xe.scopes = [])).push(
      this
    ) - 1);
  }
  get active() {
    return this._active;
  }
  pause() {
    if (this._active) {
      this._isPaused = !0;
      let t, s;
      if (this.scopes)
        for (t = 0, s = this.scopes.length; t < s; t++)
          this.scopes[t].pause();
      for (t = 0, s = this.effects.length; t < s; t++)
        this.effects[t].pause();
    }
  }
  /**
   * Resumes the effect scope, including all child scopes and effects.
   */
  resume() {
    if (this._active && this._isPaused) {
      this._isPaused = !1;
      let t, s;
      if (this.scopes)
        for (t = 0, s = this.scopes.length; t < s; t++)
          this.scopes[t].resume();
      for (t = 0, s = this.effects.length; t < s; t++)
        this.effects[t].resume();
    }
  }
  run(t) {
    if (this._active) {
      const s = xe;
      try {
        return xe = this, t();
      } finally {
        xe = s;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    xe = this;
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    xe = this.parent;
  }
  stop(t) {
    if (this._active) {
      this._active = !1;
      let s, n;
      for (s = 0, n = this.effects.length; s < n; s++)
        this.effects[s].stop();
      for (this.effects.length = 0, s = 0, n = this.cleanups.length; s < n; s++)
        this.cleanups[s]();
      if (this.cleanups.length = 0, this.scopes) {
        for (s = 0, n = this.scopes.length; s < n; s++)
          this.scopes[s].stop(!0);
        this.scopes.length = 0;
      }
      if (!this.detached && this.parent && !t) {
        const o = this.parent.scopes.pop();
        o && o !== this && (this.parent.scopes[this.index] = o, o.index = this.index);
      }
      this.parent = void 0;
    }
  }
}
function Ii() {
  return xe;
}
let Q;
const $s = /* @__PURE__ */ new WeakSet();
class co {
  constructor(t) {
    this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, xe && xe.active && xe.effects.push(this);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, $s.has(this) && ($s.delete(this), this.trigger()));
  }
  /**
   * @internal
   */
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || ao(this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, wn(this), fo(this);
    const t = Q, s = Oe;
    Q = this, Oe = !0;
    try {
      return this.fn();
    } finally {
      po(this), Q = t, Oe = s, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep)
        ln(t);
      this.deps = this.depsTail = void 0, wn(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? $s.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    Hs(this) && this.run();
  }
  get dirty() {
    return Hs(this);
  }
}
let uo = 0, At, Pt;
function ao(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = Pt, Pt = e;
    return;
  }
  e.next = At, At = e;
}
function nn() {
  uo++;
}
function on() {
  if (--uo > 0)
    return;
  if (Pt) {
    let t = Pt;
    for (Pt = void 0; t; ) {
      const s = t.next;
      t.next = void 0, t.flags &= -9, t = s;
    }
  }
  let e;
  for (; At; ) {
    let t = At;
    for (At = void 0; t; ) {
      const s = t.next;
      if (t.next = void 0, t.flags &= -9, t.flags & 1)
        try {
          t.trigger();
        } catch (n) {
          e || (e = n);
        }
      t = s;
    }
  }
  if (e) throw e;
}
function fo(e) {
  for (let t = e.deps; t; t = t.nextDep)
    t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function po(e) {
  let t, s = e.depsTail, n = s;
  for (; n; ) {
    const o = n.prevDep;
    n.version === -1 ? (n === s && (s = o), ln(n), Oi(n)) : t = n, n.dep.activeLink = n.prevActiveLink, n.prevActiveLink = void 0, n = o;
  }
  e.deps = t, e.depsTail = s;
}
function Hs(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (t.dep.version !== t.version || t.dep.computed && (ho(t.dep.computed) || t.dep.version !== t.version))
      return !0;
  return !!e._dirty;
}
function ho(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === Dt))
    return;
  e.globalVersion = Dt;
  const t = e.dep;
  if (e.flags |= 2, t.version > 0 && !e.isSSR && e.deps && !Hs(e)) {
    e.flags &= -3;
    return;
  }
  const s = Q, n = Oe;
  Q = e, Oe = !0;
  try {
    fo(e);
    const o = e.fn(e._value);
    (t.version === 0 || Xe(o, e._value)) && (e._value = o, t.version++);
  } catch (o) {
    throw t.version++, o;
  } finally {
    Q = s, Oe = n, po(e), e.flags &= -3;
  }
}
function ln(e, t = !1) {
  const { dep: s, prevSub: n, nextSub: o } = e;
  if (n && (n.nextSub = o, e.prevSub = void 0), o && (o.prevSub = n, e.nextSub = void 0), s.subs === e && (s.subs = n, !n && s.computed)) {
    s.computed.flags &= -5;
    for (let i = s.computed.deps; i; i = i.nextDep)
      ln(i, !0);
  }
  !t && !--s.sc && s.map && s.map.delete(s.key);
}
function Oi(e) {
  const { prevDep: t, nextDep: s } = e;
  t && (t.nextDep = s, e.prevDep = void 0), s && (s.prevDep = t, e.nextDep = void 0);
}
let Oe = !0;
const go = [];
function Qe() {
  go.push(Oe), Oe = !1;
}
function et() {
  const e = go.pop();
  Oe = e === void 0 ? !0 : e;
}
function wn(e) {
  const { cleanup: t } = e;
  if (e.cleanup = void 0, t) {
    const s = Q;
    Q = void 0;
    try {
      t();
    } finally {
      Q = s;
    }
  }
}
let Dt = 0;
class Mi {
  constructor(t, s) {
    this.sub = t, this.dep = s, this.version = s.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class rn {
  constructor(t) {
    this.computed = t, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0;
  }
  track(t) {
    if (!Q || !Oe || Q === this.computed)
      return;
    let s = this.activeLink;
    if (s === void 0 || s.sub !== Q)
      s = this.activeLink = new Mi(Q, this), Q.deps ? (s.prevDep = Q.depsTail, Q.depsTail.nextDep = s, Q.depsTail = s) : Q.deps = Q.depsTail = s, mo(s);
    else if (s.version === -1 && (s.version = this.version, s.nextDep)) {
      const n = s.nextDep;
      n.prevDep = s.prevDep, s.prevDep && (s.prevDep.nextDep = n), s.prevDep = Q.depsTail, s.nextDep = void 0, Q.depsTail.nextDep = s, Q.depsTail = s, Q.deps === s && (Q.deps = n);
    }
    return s;
  }
  trigger(t) {
    this.version++, Dt++, this.notify(t);
  }
  notify(t) {
    nn();
    try {
      for (let s = this.subs; s; s = s.prevSub)
        s.sub.notify() && s.sub.dep.notify();
    } finally {
      on();
    }
  }
}
function mo(e) {
  if (e.dep.sc++, e.sub.flags & 4) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let n = t.deps; n; n = n.nextDep)
        mo(n);
    }
    const s = e.dep.subs;
    s !== e && (e.prevSub = s, s && (s.nextSub = e)), e.dep.subs = e;
  }
}
const Ns = /* @__PURE__ */ new WeakMap(), ut = Symbol(
  ""
), Ls = Symbol(
  ""
), Ht = Symbol(
  ""
);
function re(e, t, s) {
  if (Oe && Q) {
    let n = Ns.get(e);
    n || Ns.set(e, n = /* @__PURE__ */ new Map());
    let o = n.get(s);
    o || (n.set(s, o = new rn()), o.map = n, o.key = s), o.track();
  }
}
function Be(e, t, s, n, o, i) {
  const l = Ns.get(e);
  if (!l) {
    Dt++;
    return;
  }
  const r = (c) => {
    c && c.trigger();
  };
  if (nn(), t === "clear")
    l.forEach(r);
  else {
    const c = A(e), p = c && sn(s);
    if (c && s === "length") {
      const a = Number(n);
      l.forEach((d, m) => {
        (m === "length" || m === Ht || !De(m) && m >= a) && r(d);
      });
    } else
      switch ((s !== void 0 || l.has(void 0)) && r(l.get(s)), p && r(l.get(Ht)), t) {
        case "add":
          c ? p && r(l.get("length")) : (r(l.get(ut)), vt(e) && r(l.get(Ls)));
          break;
        case "delete":
          c || (r(l.get(ut)), vt(e) && r(l.get(Ls)));
          break;
        case "set":
          vt(e) && r(l.get(ut));
          break;
      }
  }
  on();
}
function mt(e) {
  const t = L(e);
  return t === e ? t : (re(t, "iterate", Ht), Ee(e) ? t : t.map(ce));
}
function gs(e) {
  return re(e = L(e), "iterate", Ht), e;
}
const ki = {
  __proto__: null,
  [Symbol.iterator]() {
    return Ts(this, Symbol.iterator, ce);
  },
  concat(...e) {
    return mt(this).concat(
      ...e.map((t) => A(t) ? mt(t) : t)
    );
  },
  entries() {
    return Ts(this, "entries", (e) => (e[1] = ce(e[1]), e));
  },
  every(e, t) {
    return Le(this, "every", e, t, void 0, arguments);
  },
  filter(e, t) {
    return Le(this, "filter", e, t, (s) => s.map(ce), arguments);
  },
  find(e, t) {
    return Le(this, "find", e, t, ce, arguments);
  },
  findIndex(e, t) {
    return Le(this, "findIndex", e, t, void 0, arguments);
  },
  findLast(e, t) {
    return Le(this, "findLast", e, t, ce, arguments);
  },
  findLastIndex(e, t) {
    return Le(this, "findLastIndex", e, t, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(e, t) {
    return Le(this, "forEach", e, t, void 0, arguments);
  },
  includes(...e) {
    return Is(this, "includes", e);
  },
  indexOf(...e) {
    return Is(this, "indexOf", e);
  },
  join(e) {
    return mt(this).join(e);
  },
  // keys() iterator only reads `length`, no optimisation required
  lastIndexOf(...e) {
    return Is(this, "lastIndexOf", e);
  },
  map(e, t) {
    return Le(this, "map", e, t, void 0, arguments);
  },
  pop() {
    return It(this, "pop");
  },
  push(...e) {
    return It(this, "push", e);
  },
  reduce(e, ...t) {
    return Sn(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return Sn(this, "reduceRight", e, t);
  },
  shift() {
    return It(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(e, t) {
    return Le(this, "some", e, t, void 0, arguments);
  },
  splice(...e) {
    return It(this, "splice", e);
  },
  toReversed() {
    return mt(this).toReversed();
  },
  toSorted(e) {
    return mt(this).toSorted(e);
  },
  toSpliced(...e) {
    return mt(this).toSpliced(...e);
  },
  unshift(...e) {
    return It(this, "unshift", e);
  },
  values() {
    return Ts(this, "values", ce);
  }
};
function Ts(e, t, s) {
  const n = gs(e), o = n[t]();
  return n !== e && !Ee(e) && (o._next = o.next, o.next = () => {
    const i = o._next();
    return i.value && (i.value = s(i.value)), i;
  }), o;
}
const Ai = Array.prototype;
function Le(e, t, s, n, o, i) {
  const l = gs(e), r = l !== e && !Ee(e), c = l[t];
  if (c !== Ai[t]) {
    const d = c.apply(e, i);
    return r ? ce(d) : d;
  }
  let p = s;
  l !== e && (r ? p = function(d, m) {
    return s.call(this, ce(d), m, e);
  } : s.length > 2 && (p = function(d, m) {
    return s.call(this, d, m, e);
  }));
  const a = c.call(l, p, n);
  return r && o ? o(a) : a;
}
function Sn(e, t, s, n) {
  const o = gs(e);
  let i = s;
  return o !== e && (Ee(e) ? s.length > 3 && (i = function(l, r, c) {
    return s.call(this, l, r, c, e);
  }) : i = function(l, r, c) {
    return s.call(this, l, ce(r), c, e);
  }), o[t](i, ...n);
}
function Is(e, t, s) {
  const n = L(e);
  re(n, "iterate", Ht);
  const o = n[t](...s);
  return (o === -1 || o === !1) && an(s[0]) ? (s[0] = L(s[0]), n[t](...s)) : o;
}
function It(e, t, s = []) {
  Qe(), nn();
  const n = L(e)[t].apply(e, s);
  return on(), et(), n;
}
const Pi = /* @__PURE__ */ Qs("__proto__,__v_isRef,__isVue"), bo = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(De)
);
function Ri(e) {
  De(e) || (e = String(e));
  const t = L(this);
  return re(t, "has", e), t.hasOwnProperty(e);
}
class _o {
  constructor(t = !1, s = !1) {
    this._isReadonly = t, this._isShallow = s;
  }
  get(t, s, n) {
    if (s === "__v_skip") return t.__v_skip;
    const o = this._isReadonly, i = this._isShallow;
    if (s === "__v_isReactive")
      return !o;
    if (s === "__v_isReadonly")
      return o;
    if (s === "__v_isShallow")
      return i;
    if (s === "__v_raw")
      return n === (o ? i ? Ki : wo : i ? xo : yo).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(n) ? t : void 0;
    const l = A(t);
    if (!o) {
      let c;
      if (l && (c = ki[s]))
        return c;
      if (s === "hasOwnProperty")
        return Ri;
    }
    const r = Reflect.get(
      t,
      s,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      ae(t) ? t : n
    );
    return (De(s) ? bo.has(s) : Pi(s)) || (o || re(t, "get", s), i) ? r : ae(r) ? l && sn(s) ? r : r.value : ee(r) ? o ? So(r) : ms(r) : r;
  }
}
class vo extends _o {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, s, n, o) {
    let i = t[s];
    if (!this._isShallow) {
      const c = at(i);
      if (!Ee(n) && !at(n) && (i = L(i), n = L(n)), !A(t) && ae(i) && !ae(n))
        return c ? !1 : (i.value = n, !0);
    }
    const l = A(t) && sn(s) ? Number(s) < t.length : U(t, s), r = Reflect.set(
      t,
      s,
      n,
      ae(t) ? t : o
    );
    return t === L(o) && (l ? Xe(n, i) && Be(t, "set", s, n) : Be(t, "add", s, n)), r;
  }
  deleteProperty(t, s) {
    const n = U(t, s);
    t[s];
    const o = Reflect.deleteProperty(t, s);
    return o && n && Be(t, "delete", s, void 0), o;
  }
  has(t, s) {
    const n = Reflect.has(t, s);
    return (!De(s) || !bo.has(s)) && re(t, "has", s), n;
  }
  ownKeys(t) {
    return re(
      t,
      "iterate",
      A(t) ? "length" : ut
    ), Reflect.ownKeys(t);
  }
}
class Fi extends _o {
  constructor(t = !1) {
    super(!0, t);
  }
  set(t, s) {
    return !0;
  }
  deleteProperty(t, s) {
    return !0;
  }
}
const Vi = /* @__PURE__ */ new vo(), ji = /* @__PURE__ */ new Fi(), Di = /* @__PURE__ */ new vo(!0);
const Us = (e) => e, Gt = (e) => Reflect.getPrototypeOf(e);
function Hi(e, t, s) {
  return function(...n) {
    const o = this.__v_raw, i = L(o), l = vt(i), r = e === "entries" || e === Symbol.iterator && l, c = e === "keys" && l, p = o[e](...n), a = s ? Us : t ? Bs : ce;
    return !t && re(
      i,
      "iterate",
      c ? Ls : ut
    ), {
      // iterator protocol
      next() {
        const { value: d, done: m } = p.next();
        return m ? { value: d, done: m } : {
          value: r ? [a(d[0]), a(d[1])] : a(d),
          done: m
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function Yt(e) {
  return function(...t) {
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function Ni(e, t) {
  const s = {
    get(o) {
      const i = this.__v_raw, l = L(i), r = L(o);
      e || (Xe(o, r) && re(l, "get", o), re(l, "get", r));
      const { has: c } = Gt(l), p = t ? Us : e ? Bs : ce;
      if (c.call(l, o))
        return p(i.get(o));
      if (c.call(l, r))
        return p(i.get(r));
      i !== l && i.get(o);
    },
    get size() {
      const o = this.__v_raw;
      return !e && re(L(o), "iterate", ut), Reflect.get(o, "size", o);
    },
    has(o) {
      const i = this.__v_raw, l = L(i), r = L(o);
      return e || (Xe(o, r) && re(l, "has", o), re(l, "has", r)), o === r ? i.has(o) : i.has(o) || i.has(r);
    },
    forEach(o, i) {
      const l = this, r = l.__v_raw, c = L(r), p = t ? Us : e ? Bs : ce;
      return !e && re(c, "iterate", ut), r.forEach((a, d) => o.call(i, p(a), p(d), l));
    }
  };
  return fe(
    s,
    e ? {
      add: Yt("add"),
      set: Yt("set"),
      delete: Yt("delete"),
      clear: Yt("clear")
    } : {
      add(o) {
        !t && !Ee(o) && !at(o) && (o = L(o));
        const i = L(this);
        return Gt(i).has.call(i, o) || (i.add(o), Be(i, "add", o, o)), this;
      },
      set(o, i) {
        !t && !Ee(i) && !at(i) && (i = L(i));
        const l = L(this), { has: r, get: c } = Gt(l);
        let p = r.call(l, o);
        p || (o = L(o), p = r.call(l, o));
        const a = c.call(l, o);
        return l.set(o, i), p ? Xe(i, a) && Be(l, "set", o, i) : Be(l, "add", o, i), this;
      },
      delete(o) {
        const i = L(this), { has: l, get: r } = Gt(i);
        let c = l.call(i, o);
        c || (o = L(o), c = l.call(i, o)), r && r.call(i, o);
        const p = i.delete(o);
        return c && Be(i, "delete", o, void 0), p;
      },
      clear() {
        const o = L(this), i = o.size !== 0, l = o.clear();
        return i && Be(
          o,
          "clear",
          void 0,
          void 0
        ), l;
      }
    }
  ), [
    "keys",
    "values",
    "entries",
    Symbol.iterator
  ].forEach((o) => {
    s[o] = Hi(o, e, t);
  }), s;
}
function cn(e, t) {
  const s = Ni(e, t);
  return (n, o, i) => o === "__v_isReactive" ? !e : o === "__v_isReadonly" ? e : o === "__v_raw" ? n : Reflect.get(
    U(s, o) && o in n ? s : n,
    o,
    i
  );
}
const Li = {
  get: /* @__PURE__ */ cn(!1, !1)
}, Ui = {
  get: /* @__PURE__ */ cn(!1, !0)
}, Bi = {
  get: /* @__PURE__ */ cn(!0, !1)
};
const yo = /* @__PURE__ */ new WeakMap(), xo = /* @__PURE__ */ new WeakMap(), wo = /* @__PURE__ */ new WeakMap(), Ki = /* @__PURE__ */ new WeakMap();
function Wi(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function zi(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : Wi(bi(e));
}
function ms(e) {
  return at(e) ? e : un(
    e,
    !1,
    Vi,
    Li,
    yo
  );
}
function qi(e) {
  return un(
    e,
    !1,
    Di,
    Ui,
    xo
  );
}
function So(e) {
  return un(
    e,
    !0,
    ji,
    Bi,
    wo
  );
}
function un(e, t, s, n, o) {
  if (!ee(e) || e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const i = o.get(e);
  if (i)
    return i;
  const l = zi(e);
  if (l === 0)
    return e;
  const r = new Proxy(
    e,
    l === 2 ? n : s
  );
  return o.set(e, r), r;
}
function yt(e) {
  return at(e) ? yt(e.__v_raw) : !!(e && e.__v_isReactive);
}
function at(e) {
  return !!(e && e.__v_isReadonly);
}
function Ee(e) {
  return !!(e && e.__v_isShallow);
}
function an(e) {
  return e ? !!e.__v_raw : !1;
}
function L(e) {
  const t = e && e.__v_raw;
  return t ? L(t) : e;
}
function Ji(e) {
  return !U(e, "__v_skip") && Object.isExtensible(e) && no(e, "__v_skip", !0), e;
}
const ce = (e) => ee(e) ? ms(e) : e, Bs = (e) => ee(e) ? So(e) : e;
function ae(e) {
  return e ? e.__v_isRef === !0 : !1;
}
function Ye(e) {
  return Gi(e, !1);
}
function Gi(e, t) {
  return ae(e) ? e : new Yi(e, t);
}
class Yi {
  constructor(t, s) {
    this.dep = new rn(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = s ? t : L(t), this._value = s ? t : ce(t), this.__v_isShallow = s;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(t) {
    const s = this._rawValue, n = this.__v_isShallow || Ee(t) || at(t);
    t = n ? t : L(t), Xe(t, s) && (this._rawValue = t, this._value = n ? t : ce(t), this.dep.trigger());
  }
}
function $(e) {
  return ae(e) ? e.value : e;
}
const Xi = {
  get: (e, t, s) => t === "__v_raw" ? e : $(Reflect.get(e, t, s)),
  set: (e, t, s, n) => {
    const o = e[t];
    return ae(o) && !ae(s) ? (o.value = s, !0) : Reflect.set(e, t, s, n);
  }
};
function Co(e) {
  return yt(e) ? e : new Proxy(e, Xi);
}
class Zi {
  constructor(t, s, n) {
    this.fn = t, this.setter = s, this._value = void 0, this.dep = new rn(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = Dt - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !s, this.isSSR = n;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    Q !== this)
      return ao(this, !0), !0;
  }
  get value() {
    const t = this.dep.track();
    return ho(this), t && (t.version = this.dep.version), this._value;
  }
  set value(t) {
    this.setter && this.setter(t);
  }
}
function Qi(e, t, s = !1) {
  let n, o;
  return R(e) ? n = e : (n = e.get, o = e.set), new Zi(n, o, s);
}
const Xt = {}, ns = /* @__PURE__ */ new WeakMap();
let lt;
function el(e, t = !1, s = lt) {
  if (s) {
    let n = ns.get(s);
    n || ns.set(s, n = []), n.push(e);
  }
}
function tl(e, t, s = q) {
  const { immediate: n, deep: o, once: i, scheduler: l, augmentJob: r, call: c } = s, p = (x) => o ? x : Ee(x) || o === !1 || o === 0 ? Ke(x, 1) : Ke(x);
  let a, d, m, C, H = !1, T = !1;
  if (ae(e) ? (d = () => e.value, H = Ee(e)) : yt(e) ? (d = () => p(e), H = !0) : A(e) ? (T = !0, H = e.some((x) => yt(x) || Ee(x)), d = () => e.map((x) => {
    if (ae(x))
      return x.value;
    if (yt(x))
      return p(x);
    if (R(x))
      return c ? c(x, 2) : x();
  })) : R(e) ? t ? d = c ? () => c(e, 2) : e : d = () => {
    if (m) {
      Qe();
      try {
        m();
      } finally {
        et();
      }
    }
    const x = lt;
    lt = a;
    try {
      return c ? c(e, 3, [C]) : e(C);
    } finally {
      lt = x;
    }
  } : d = je, t && o) {
    const x = d, O = o === !0 ? 1 / 0 : o;
    d = () => Ke(x(), O);
  }
  const ne = Ii(), B = () => {
    a.stop(), ne && ne.active && tn(ne.effects, a);
  };
  if (i && t) {
    const x = t;
    t = (...O) => {
      x(...O), B();
    };
  }
  let J = T ? new Array(e.length).fill(Xt) : Xt;
  const G = (x) => {
    if (!(!(a.flags & 1) || !a.dirty && !x))
      if (t) {
        const O = a.run();
        if (o || H || (T ? O.some((F, Y) => Xe(F, J[Y])) : Xe(O, J))) {
          m && m();
          const F = lt;
          lt = a;
          try {
            const Y = [
              O,
              // pass undefined as the old value when it's changed for the first time
              J === Xt ? void 0 : T && J[0] === Xt ? [] : J,
              C
            ];
            c ? c(t, 3, Y) : (
              // @ts-expect-error
              t(...Y)
            ), J = O;
          } finally {
            lt = F;
          }
        }
      } else
        a.run();
  };
  return r && r(G), a = new co(d), a.scheduler = l ? () => l(G, !1) : G, C = (x) => el(x, !1, a), m = a.onStop = () => {
    const x = ns.get(a);
    if (x) {
      if (c)
        c(x, 4);
      else
        for (const O of x) O();
      ns.delete(a);
    }
  }, t ? n ? G(!0) : J = a.run() : l ? l(G.bind(null, !0), !0) : a.run(), B.pause = a.pause.bind(a), B.resume = a.resume.bind(a), B.stop = B, B;
}
function Ke(e, t = 1 / 0, s) {
  if (t <= 0 || !ee(e) || e.__v_skip || (s = s || /* @__PURE__ */ new Set(), s.has(e)))
    return e;
  if (s.add(e), t--, ae(e))
    Ke(e.value, t, s);
  else if (A(e))
    for (let n = 0; n < e.length; n++)
      Ke(e[n], t, s);
  else if (fs(e) || vt(e))
    e.forEach((n) => {
      Ke(n, t, s);
    });
  else if (to(e)) {
    for (const n in e)
      Ke(e[n], t, s);
    for (const n of Object.getOwnPropertySymbols(e))
      Object.prototype.propertyIsEnumerable.call(e, n) && Ke(e[n], t, s);
  }
  return e;
}
/**
* @vue/runtime-core v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function Kt(e, t, s, n) {
  try {
    return n ? e(...n) : e();
  } catch (o) {
    bs(o, t, s);
  }
}
function He(e, t, s, n) {
  if (R(e)) {
    const o = Kt(e, t, s, n);
    return o && Qn(o) && o.catch((i) => {
      bs(i, t, s);
    }), o;
  }
  if (A(e)) {
    const o = [];
    for (let i = 0; i < e.length; i++)
      o.push(He(e[i], t, s, n));
    return o;
  }
}
function bs(e, t, s, n = !0) {
  const o = t ? t.vnode : null, { errorHandler: i, throwUnhandledErrorInProduction: l } = t && t.appContext.config || q;
  if (t) {
    let r = t.parent;
    const c = t.proxy, p = `https://vuejs.org/error-reference/#runtime-${s}`;
    for (; r; ) {
      const a = r.ec;
      if (a) {
        for (let d = 0; d < a.length; d++)
          if (a[d](e, c, p) === !1)
            return;
      }
      r = r.parent;
    }
    if (i) {
      Qe(), Kt(i, null, 10, [
        e,
        c,
        p
      ]), et();
      return;
    }
  }
  sl(e, s, o, n, l);
}
function sl(e, t, s, n = !0, o = !1) {
  if (o)
    throw e;
  console.error(e);
}
const ge = [];
let Fe = -1;
const xt = [];
let Je = null, bt = 0;
const Eo = /* @__PURE__ */ Promise.resolve();
let os = null;
function nl(e) {
  const t = os || Eo;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function ol(e) {
  let t = Fe + 1, s = ge.length;
  for (; t < s; ) {
    const n = t + s >>> 1, o = ge[n], i = Nt(o);
    i < e || i === e && o.flags & 2 ? t = n + 1 : s = n;
  }
  return t;
}
function fn(e) {
  if (!(e.flags & 1)) {
    const t = Nt(e), s = ge[ge.length - 1];
    !s || // fast path when the job id is larger than the tail
    !(e.flags & 2) && t >= Nt(s) ? ge.push(e) : ge.splice(ol(t), 0, e), e.flags |= 1, $o();
  }
}
function $o() {
  os || (os = Eo.then(Io));
}
function il(e) {
  A(e) ? xt.push(...e) : Je && e.id === -1 ? Je.splice(bt + 1, 0, e) : e.flags & 1 || (xt.push(e), e.flags |= 1), $o();
}
function Cn(e, t, s = Fe + 1) {
  for (; s < ge.length; s++) {
    const n = ge[s];
    if (n && n.flags & 2) {
      if (e && n.id !== e.uid)
        continue;
      ge.splice(s, 1), s--, n.flags & 4 && (n.flags &= -2), n(), n.flags & 4 || (n.flags &= -2);
    }
  }
}
function To(e) {
  if (xt.length) {
    const t = [...new Set(xt)].sort(
      (s, n) => Nt(s) - Nt(n)
    );
    if (xt.length = 0, Je) {
      Je.push(...t);
      return;
    }
    for (Je = t, bt = 0; bt < Je.length; bt++) {
      const s = Je[bt];
      s.flags & 4 && (s.flags &= -2), s.flags & 8 || s(), s.flags &= -2;
    }
    Je = null, bt = 0;
  }
}
const Nt = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function Io(e) {
  try {
    for (Fe = 0; Fe < ge.length; Fe++) {
      const t = ge[Fe];
      t && !(t.flags & 8) && (t.flags & 4 && (t.flags &= -2), Kt(
        t,
        t.i,
        t.i ? 15 : 14
      ), t.flags & 4 || (t.flags &= -2));
    }
  } finally {
    for (; Fe < ge.length; Fe++) {
      const t = ge[Fe];
      t && (t.flags &= -2);
    }
    Fe = -1, ge.length = 0, To(), os = null, (ge.length || xt.length) && Io();
  }
}
let Ce = null, Oo = null;
function is(e) {
  const t = Ce;
  return Ce = e, Oo = e && e.type.__scopeId || null, t;
}
function ll(e, t = Ce, s) {
  if (!t || e._n)
    return e;
  const n = (...o) => {
    n._d && Pn(-1);
    const i = is(t);
    let l;
    try {
      l = e(...o);
    } finally {
      is(i), n._d && Pn(1);
    }
    return l;
  };
  return n._n = !0, n._c = !0, n._d = !0, n;
}
function he(e, t) {
  if (Ce === null)
    return e;
  const s = xs(Ce), n = e.dirs || (e.dirs = []);
  for (let o = 0; o < t.length; o++) {
    let [i, l, r, c = q] = t[o];
    i && (R(i) && (i = {
      mounted: i,
      updated: i
    }), i.deep && Ke(l), n.push({
      dir: i,
      instance: s,
      value: l,
      oldValue: void 0,
      arg: r,
      modifiers: c
    }));
  }
  return e;
}
function ot(e, t, s, n) {
  const o = e.dirs, i = t && t.dirs;
  for (let l = 0; l < o.length; l++) {
    const r = o[l];
    i && (r.oldValue = i[l].value);
    let c = r.dir[n];
    c && (Qe(), He(c, s, 8, [
      e.el,
      r,
      e,
      t
    ]), et());
  }
}
const rl = Symbol("_vte"), cl = (e) => e.__isTeleport;
function dn(e, t) {
  e.shapeFlag & 6 && e.component ? (e.transition = t, dn(e.component.subTree, t)) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function ht(e, t) {
  return R(e) ? (
    // #8236: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    fe({ name: e.name }, t, { setup: e })
  ) : e;
}
function Mo(e) {
  e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0];
}
function ls(e, t, s, n, o = !1) {
  if (A(e)) {
    e.forEach(
      (H, T) => ls(
        H,
        t && (A(t) ? t[T] : t),
        s,
        n,
        o
      )
    );
    return;
  }
  if (Rt(n) && !o) {
    n.shapeFlag & 512 && n.type.__asyncResolved && n.component.subTree.component && ls(e, t, s, n.component.subTree);
    return;
  }
  const i = n.shapeFlag & 4 ? xs(n.component) : n.el, l = o ? null : i, { i: r, r: c } = e, p = t && t.r, a = r.refs === q ? r.refs = {} : r.refs, d = r.setupState, m = L(d), C = d === q ? () => !1 : (H) => U(m, H);
  if (p != null && p !== c && (se(p) ? (a[p] = null, C(p) && (d[p] = null)) : ae(p) && (p.value = null)), R(c))
    Kt(c, r, 12, [l, a]);
  else {
    const H = se(c), T = ae(c);
    if (H || T) {
      const ne = () => {
        if (e.f) {
          const B = H ? C(c) ? d[c] : a[c] : c.value;
          o ? A(B) && tn(B, i) : A(B) ? B.includes(i) || B.push(i) : H ? (a[c] = [i], C(c) && (d[c] = a[c])) : (c.value = [i], e.k && (a[e.k] = c.value));
        } else H ? (a[c] = l, C(c) && (d[c] = l)) : T && (c.value = l, e.k && (a[e.k] = l));
      };
      l ? (ne.id = -1, ye(ne, s)) : ne();
    }
  }
}
ps().requestIdleCallback;
ps().cancelIdleCallback;
const Rt = (e) => !!e.type.__asyncLoader, ko = (e) => e.type.__isKeepAlive;
function ul(e, t) {
  Ao(e, "a", t);
}
function al(e, t) {
  Ao(e, "da", t);
}
function Ao(e, t, s = me) {
  const n = e.__wdc || (e.__wdc = () => {
    let o = s;
    for (; o; ) {
      if (o.isDeactivated)
        return;
      o = o.parent;
    }
    return e();
  });
  if (_s(t, n, s), s) {
    let o = s.parent;
    for (; o && o.parent; )
      ko(o.parent.vnode) && fl(n, t, s, o), o = o.parent;
  }
}
function fl(e, t, s, n) {
  const o = _s(
    t,
    e,
    n,
    !0
    /* prepend */
  );
  Ro(() => {
    tn(n[t], o);
  }, s);
}
function _s(e, t, s = me, n = !1) {
  if (s) {
    const o = s[e] || (s[e] = []), i = t.__weh || (t.__weh = (...l) => {
      Qe();
      const r = Wt(s), c = He(t, s, e, l);
      return r(), et(), c;
    });
    return n ? o.unshift(i) : o.push(i), i;
  }
}
const We = (e) => (t, s = me) => {
  (!Ut || e === "sp") && _s(e, (...n) => t(...n), s);
}, dl = We("bm"), Po = We("m"), pl = We(
  "bu"
), hl = We("u"), gl = We(
  "bum"
), Ro = We("um"), ml = We(
  "sp"
), bl = We("rtg"), _l = We("rtc");
function vl(e, t = me) {
  _s("ec", e, t);
}
const yl = Symbol.for("v-ndc");
function ft(e, t, s, n) {
  let o;
  const i = s, l = A(e);
  if (l || se(e)) {
    const r = l && yt(e);
    let c = !1;
    r && (c = !Ee(e), e = gs(e)), o = new Array(e.length);
    for (let p = 0, a = e.length; p < a; p++)
      o[p] = t(
        c ? ce(e[p]) : e[p],
        p,
        void 0,
        i
      );
  } else if (typeof e == "number") {
    o = new Array(e);
    for (let r = 0; r < e; r++)
      o[r] = t(r + 1, r, void 0, i);
  } else if (ee(e))
    if (e[Symbol.iterator])
      o = Array.from(
        e,
        (r, c) => t(r, c, void 0, i)
      );
    else {
      const r = Object.keys(e);
      o = new Array(r.length);
      for (let c = 0, p = r.length; c < p; c++) {
        const a = r[c];
        o[c] = t(e[a], a, c, i);
      }
    }
  else
    o = [];
  return o;
}
const Ks = (e) => e ? ni(e) ? xs(e) : Ks(e.parent) : null, Ft = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ fe(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => Ks(e.parent),
    $root: (e) => Ks(e.root),
    $host: (e) => e.ce,
    $emit: (e) => e.emit,
    $options: (e) => Vo(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      fn(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = nl.bind(e.proxy)),
    $watch: (e) => Ll.bind(e)
  })
), Os = (e, t) => e !== q && !e.__isScriptSetup && U(e, t), xl = {
  get({ _: e }, t) {
    if (t === "__v_skip")
      return !0;
    const { ctx: s, setupState: n, data: o, props: i, accessCache: l, type: r, appContext: c } = e;
    let p;
    if (t[0] !== "$") {
      const C = l[t];
      if (C !== void 0)
        switch (C) {
          case 1:
            return n[t];
          case 2:
            return o[t];
          case 4:
            return s[t];
          case 3:
            return i[t];
        }
      else {
        if (Os(n, t))
          return l[t] = 1, n[t];
        if (o !== q && U(o, t))
          return l[t] = 2, o[t];
        if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (p = e.propsOptions[0]) && U(p, t)
        )
          return l[t] = 3, i[t];
        if (s !== q && U(s, t))
          return l[t] = 4, s[t];
        Ws && (l[t] = 0);
      }
    }
    const a = Ft[t];
    let d, m;
    if (a)
      return t === "$attrs" && re(e.attrs, "get", ""), a(e);
    if (
      // css module (injected by vue-loader)
      (d = r.__cssModules) && (d = d[t])
    )
      return d;
    if (s !== q && U(s, t))
      return l[t] = 4, s[t];
    if (
      // global properties
      m = c.config.globalProperties, U(m, t)
    )
      return m[t];
  },
  set({ _: e }, t, s) {
    const { data: n, setupState: o, ctx: i } = e;
    return Os(o, t) ? (o[t] = s, !0) : n !== q && U(n, t) ? (n[t] = s, !0) : U(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (i[t] = s, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: s, ctx: n, appContext: o, propsOptions: i }
  }, l) {
    let r;
    return !!s[l] || e !== q && U(e, l) || Os(t, l) || (r = i[0]) && U(r, l) || U(n, l) || U(Ft, l) || U(o.config.globalProperties, l);
  },
  defineProperty(e, t, s) {
    return s.get != null ? e._.accessCache[t] = 0 : U(s, "value") && this.set(e, t, s.value, null), Reflect.defineProperty(e, t, s);
  }
};
function En(e) {
  return A(e) ? e.reduce(
    (t, s) => (t[s] = null, t),
    {}
  ) : e;
}
let Ws = !0;
function wl(e) {
  const t = Vo(e), s = e.proxy, n = e.ctx;
  Ws = !1, t.beforeCreate && $n(t.beforeCreate, e, "bc");
  const {
    // state
    data: o,
    computed: i,
    methods: l,
    watch: r,
    provide: c,
    inject: p,
    // lifecycle
    created: a,
    beforeMount: d,
    mounted: m,
    beforeUpdate: C,
    updated: H,
    activated: T,
    deactivated: ne,
    beforeDestroy: B,
    beforeUnmount: J,
    destroyed: G,
    unmounted: x,
    render: O,
    renderTracked: F,
    renderTriggered: Y,
    errorCaptured: D,
    serverPrefetch: K,
    // public API
    expose: Ne,
    inheritAttrs: tt,
    // assets
    components: ze,
    directives: qe,
    filters: ws
  } = t;
  if (p && Sl(p, n, null), l)
    for (const te in l) {
      const X = l[te];
      R(X) && (n[te] = X.bind(s));
    }
  if (o) {
    const te = o.call(s, s);
    ee(te) && (e.data = ms(te));
  }
  if (Ws = !0, i)
    for (const te in i) {
      const X = i[te], st = R(X) ? X.bind(s, s) : R(X.get) ? X.get.bind(s, s) : je, qt = !R(X) && R(X.set) ? X.set.bind(s) : je, nt = Ie({
        get: st,
        set: qt
      });
      Object.defineProperty(n, te, {
        enumerable: !0,
        configurable: !0,
        get: () => nt.value,
        set: (Me) => nt.value = Me
      });
    }
  if (r)
    for (const te in r)
      Fo(r[te], n, s, te);
  if (c) {
    const te = R(c) ? c.call(s) : c;
    Reflect.ownKeys(te).forEach((X) => {
      Do(X, te[X]);
    });
  }
  a && $n(a, e, "c");
  function de(te, X) {
    A(X) ? X.forEach((st) => te(st.bind(s))) : X && te(X.bind(s));
  }
  if (de(dl, d), de(Po, m), de(pl, C), de(hl, H), de(ul, T), de(al, ne), de(vl, D), de(_l, F), de(bl, Y), de(gl, J), de(Ro, x), de(ml, K), A(Ne))
    if (Ne.length) {
      const te = e.exposed || (e.exposed = {});
      Ne.forEach((X) => {
        Object.defineProperty(te, X, {
          get: () => s[X],
          set: (st) => s[X] = st
        });
      });
    } else e.exposed || (e.exposed = {});
  O && e.render === je && (e.render = O), tt != null && (e.inheritAttrs = tt), ze && (e.components = ze), qe && (e.directives = qe), K && Mo(e);
}
function Sl(e, t, s = je) {
  A(e) && (e = zs(e));
  for (const n in e) {
    const o = e[n];
    let i;
    ee(o) ? "default" in o ? i = Vt(
      o.from || n,
      o.default,
      !0
    ) : i = Vt(o.from || n) : i = Vt(o), ae(i) ? Object.defineProperty(t, n, {
      enumerable: !0,
      configurable: !0,
      get: () => i.value,
      set: (l) => i.value = l
    }) : t[n] = i;
  }
}
function $n(e, t, s) {
  He(
    A(e) ? e.map((n) => n.bind(t.proxy)) : e.bind(t.proxy),
    t,
    s
  );
}
function Fo(e, t, s, n) {
  let o = n.includes(".") ? Xo(s, n) : () => s[n];
  if (se(e)) {
    const i = t[e];
    R(i) && Qt(o, i);
  } else if (R(e))
    Qt(o, e.bind(s));
  else if (ee(e))
    if (A(e))
      e.forEach((i) => Fo(i, t, s, n));
    else {
      const i = R(e.handler) ? e.handler.bind(s) : t[e.handler];
      R(i) && Qt(o, i, e);
    }
}
function Vo(e) {
  const t = e.type, { mixins: s, extends: n } = t, {
    mixins: o,
    optionsCache: i,
    config: { optionMergeStrategies: l }
  } = e.appContext, r = i.get(t);
  let c;
  return r ? c = r : !o.length && !s && !n ? c = t : (c = {}, o.length && o.forEach(
    (p) => rs(c, p, l, !0)
  ), rs(c, t, l)), ee(t) && i.set(t, c), c;
}
function rs(e, t, s, n = !1) {
  const { mixins: o, extends: i } = t;
  i && rs(e, i, s, !0), o && o.forEach(
    (l) => rs(e, l, s, !0)
  );
  for (const l in t)
    if (!(n && l === "expose")) {
      const r = Cl[l] || s && s[l];
      e[l] = r ? r(e[l], t[l]) : t[l];
    }
  return e;
}
const Cl = {
  data: Tn,
  props: In,
  emits: In,
  // objects
  methods: Mt,
  computed: Mt,
  // lifecycle
  beforeCreate: pe,
  created: pe,
  beforeMount: pe,
  mounted: pe,
  beforeUpdate: pe,
  updated: pe,
  beforeDestroy: pe,
  beforeUnmount: pe,
  destroyed: pe,
  unmounted: pe,
  activated: pe,
  deactivated: pe,
  errorCaptured: pe,
  serverPrefetch: pe,
  // assets
  components: Mt,
  directives: Mt,
  // watch
  watch: $l,
  // provide / inject
  provide: Tn,
  inject: El
};
function Tn(e, t) {
  return t ? e ? function() {
    return fe(
      R(e) ? e.call(this, this) : e,
      R(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function El(e, t) {
  return Mt(zs(e), zs(t));
}
function zs(e) {
  if (A(e)) {
    const t = {};
    for (let s = 0; s < e.length; s++)
      t[e[s]] = e[s];
    return t;
  }
  return e;
}
function pe(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function Mt(e, t) {
  return e ? fe(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function In(e, t) {
  return e ? A(e) && A(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : fe(
    /* @__PURE__ */ Object.create(null),
    En(e),
    En(t ?? {})
  ) : t;
}
function $l(e, t) {
  if (!e) return t;
  if (!t) return e;
  const s = fe(/* @__PURE__ */ Object.create(null), e);
  for (const n in t)
    s[n] = pe(e[n], t[n]);
  return s;
}
function jo() {
  return {
    app: null,
    config: {
      isNativeTag: gi,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
let Tl = 0;
function Il(e, t) {
  return function(n, o = null) {
    R(n) || (n = fe({}, n)), o != null && !ee(o) && (o = null);
    const i = jo(), l = /* @__PURE__ */ new WeakSet(), r = [];
    let c = !1;
    const p = i.app = {
      _uid: Tl++,
      _component: n,
      _props: o,
      _container: null,
      _context: i,
      _instance: null,
      version: cr,
      get config() {
        return i.config;
      },
      set config(a) {
      },
      use(a, ...d) {
        return l.has(a) || (a && R(a.install) ? (l.add(a), a.install(p, ...d)) : R(a) && (l.add(a), a(p, ...d))), p;
      },
      mixin(a) {
        return i.mixins.includes(a) || i.mixins.push(a), p;
      },
      component(a, d) {
        return d ? (i.components[a] = d, p) : i.components[a];
      },
      directive(a, d) {
        return d ? (i.directives[a] = d, p) : i.directives[a];
      },
      mount(a, d, m) {
        if (!c) {
          const C = p._ceVNode || ue(n, o);
          return C.appContext = i, m === !0 ? m = "svg" : m === !1 && (m = void 0), e(C, a, m), c = !0, p._container = a, a.__vue_app__ = p, xs(C.component);
        }
      },
      onUnmount(a) {
        r.push(a);
      },
      unmount() {
        c && (He(
          r,
          p._instance,
          16
        ), e(null, p._container), delete p._container.__vue_app__);
      },
      provide(a, d) {
        return i.provides[a] = d, p;
      },
      runWithContext(a) {
        const d = wt;
        wt = p;
        try {
          return a();
        } finally {
          wt = d;
        }
      }
    };
    return p;
  };
}
let wt = null;
function Do(e, t) {
  if (me) {
    let s = me.provides;
    const n = me.parent && me.parent.provides;
    n === s && (s = me.provides = Object.create(n)), s[e] = t;
  }
}
function Vt(e, t, s = !1) {
  const n = me || Ce;
  if (n || wt) {
    const o = wt ? wt._context.provides : n ? n.parent == null ? n.vnode.appContext && n.vnode.appContext.provides : n.parent.provides : void 0;
    if (o && e in o)
      return o[e];
    if (arguments.length > 1)
      return s && R(t) ? t.call(n && n.proxy) : t;
  }
}
const Ho = {}, No = () => Object.create(Ho), Lo = (e) => Object.getPrototypeOf(e) === Ho;
function Ol(e, t, s, n = !1) {
  const o = {}, i = No();
  e.propsDefaults = /* @__PURE__ */ Object.create(null), Uo(e, t, o, i);
  for (const l in e.propsOptions[0])
    l in o || (o[l] = void 0);
  s ? e.props = n ? o : qi(o) : e.type.props ? e.props = o : e.props = i, e.attrs = i;
}
function Ml(e, t, s, n) {
  const {
    props: o,
    attrs: i,
    vnode: { patchFlag: l }
  } = e, r = L(o), [c] = e.propsOptions;
  let p = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (n || l > 0) && !(l & 16)
  ) {
    if (l & 8) {
      const a = e.vnode.dynamicProps;
      for (let d = 0; d < a.length; d++) {
        let m = a[d];
        if (vs(e.emitsOptions, m))
          continue;
        const C = t[m];
        if (c)
          if (U(i, m))
            C !== i[m] && (i[m] = C, p = !0);
          else {
            const H = Ze(m);
            o[H] = qs(
              c,
              r,
              H,
              C,
              e,
              !1
            );
          }
        else
          C !== i[m] && (i[m] = C, p = !0);
      }
    }
  } else {
    Uo(e, t, o, i) && (p = !0);
    let a;
    for (const d in r)
      (!t || // for camelCase
      !U(t, d) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((a = pt(d)) === d || !U(t, a))) && (c ? s && // for camelCase
      (s[d] !== void 0 || // for kebab-case
      s[a] !== void 0) && (o[d] = qs(
        c,
        r,
        d,
        void 0,
        e,
        !0
      )) : delete o[d]);
    if (i !== r)
      for (const d in i)
        (!t || !U(t, d)) && (delete i[d], p = !0);
  }
  p && Be(e.attrs, "set", "");
}
function Uo(e, t, s, n) {
  const [o, i] = e.propsOptions;
  let l = !1, r;
  if (t)
    for (let c in t) {
      if (kt(c))
        continue;
      const p = t[c];
      let a;
      o && U(o, a = Ze(c)) ? !i || !i.includes(a) ? s[a] = p : (r || (r = {}))[a] = p : vs(e.emitsOptions, c) || (!(c in n) || p !== n[c]) && (n[c] = p, l = !0);
    }
  if (i) {
    const c = L(s), p = r || q;
    for (let a = 0; a < i.length; a++) {
      const d = i[a];
      s[d] = qs(
        o,
        c,
        d,
        p[d],
        e,
        !U(p, d)
      );
    }
  }
  return l;
}
function qs(e, t, s, n, o, i) {
  const l = e[s];
  if (l != null) {
    const r = U(l, "default");
    if (r && n === void 0) {
      const c = l.default;
      if (l.type !== Function && !l.skipFactory && R(c)) {
        const { propsDefaults: p } = o;
        if (s in p)
          n = p[s];
        else {
          const a = Wt(o);
          n = p[s] = c.call(
            null,
            t
          ), a();
        }
      } else
        n = c;
      o.ce && o.ce._setProp(s, n);
    }
    l[
      0
      /* shouldCast */
    ] && (i && !r ? n = !1 : l[
      1
      /* shouldCastTrue */
    ] && (n === "" || n === pt(s)) && (n = !0));
  }
  return n;
}
const kl = /* @__PURE__ */ new WeakMap();
function Bo(e, t, s = !1) {
  const n = s ? kl : t.propsCache, o = n.get(e);
  if (o)
    return o;
  const i = e.props, l = {}, r = [];
  let c = !1;
  if (!R(e)) {
    const a = (d) => {
      c = !0;
      const [m, C] = Bo(d, t, !0);
      fe(l, m), C && r.push(...C);
    };
    !s && t.mixins.length && t.mixins.forEach(a), e.extends && a(e.extends), e.mixins && e.mixins.forEach(a);
  }
  if (!i && !c)
    return ee(e) && n.set(e, _t), _t;
  if (A(i))
    for (let a = 0; a < i.length; a++) {
      const d = Ze(i[a]);
      On(d) && (l[d] = q);
    }
  else if (i)
    for (const a in i) {
      const d = Ze(a);
      if (On(d)) {
        const m = i[a], C = l[d] = A(m) || R(m) ? { type: m } : fe({}, m), H = C.type;
        let T = !1, ne = !0;
        if (A(H))
          for (let B = 0; B < H.length; ++B) {
            const J = H[B], G = R(J) && J.name;
            if (G === "Boolean") {
              T = !0;
              break;
            } else G === "String" && (ne = !1);
          }
        else
          T = R(H) && H.name === "Boolean";
        C[
          0
          /* shouldCast */
        ] = T, C[
          1
          /* shouldCastTrue */
        ] = ne, (T || U(C, "default")) && r.push(d);
      }
    }
  const p = [l, r];
  return ee(e) && n.set(e, p), p;
}
function On(e) {
  return e[0] !== "$" && !kt(e);
}
const Ko = (e) => e[0] === "_" || e === "$stable", pn = (e) => A(e) ? e.map(Ve) : [Ve(e)], Al = (e, t, s) => {
  if (t._n)
    return t;
  const n = ll((...o) => pn(t(...o)), s);
  return n._c = !1, n;
}, Wo = (e, t, s) => {
  const n = e._ctx;
  for (const o in e) {
    if (Ko(o)) continue;
    const i = e[o];
    if (R(i))
      t[o] = Al(o, i, n);
    else if (i != null) {
      const l = pn(i);
      t[o] = () => l;
    }
  }
}, zo = (e, t) => {
  const s = pn(t);
  e.slots.default = () => s;
}, qo = (e, t, s) => {
  for (const n in t)
    (s || n !== "_") && (e[n] = t[n]);
}, Pl = (e, t, s) => {
  const n = e.slots = No();
  if (e.vnode.shapeFlag & 32) {
    const o = t._;
    o ? (qo(n, t, s), s && no(n, "_", o, !0)) : Wo(t, n);
  } else t && zo(e, t);
}, Rl = (e, t, s) => {
  const { vnode: n, slots: o } = e;
  let i = !0, l = q;
  if (n.shapeFlag & 32) {
    const r = t._;
    r ? s && r === 1 ? i = !1 : qo(o, t, s) : (i = !t.$stable, Wo(t, o)), l = t;
  } else t && (zo(e, t), l = { default: 1 });
  if (i)
    for (const r in o)
      !Ko(r) && l[r] == null && delete o[r];
}, ye = Jl;
function Fl(e) {
  return Vl(e);
}
function Vl(e, t) {
  const s = ps();
  s.__VUE__ = !0;
  const {
    insert: n,
    remove: o,
    patchProp: i,
    createElement: l,
    createText: r,
    createComment: c,
    setText: p,
    setElementText: a,
    parentNode: d,
    nextSibling: m,
    setScopeId: C = je,
    insertStaticContent: H
  } = e, T = (u, f, h, v = null, b = null, _ = null, E = void 0, S = null, w = !!f.dynamicChildren) => {
    if (u === f)
      return;
    u && !Ot(u, f) && (v = Jt(u), Me(u, b, _, !0), u = null), f.patchFlag === -2 && (w = !1, f.dynamicChildren = null);
    const { type: y, ref: k, shapeFlag: I } = f;
    switch (y) {
      case ys:
        ne(u, f, h, v);
        break;
      case dt:
        B(u, f, h, v);
        break;
      case ks:
        u == null && J(f, h, v, E);
        break;
      case le:
        ze(
          u,
          f,
          h,
          v,
          b,
          _,
          E,
          S,
          w
        );
        break;
      default:
        I & 1 ? O(
          u,
          f,
          h,
          v,
          b,
          _,
          E,
          S,
          w
        ) : I & 6 ? qe(
          u,
          f,
          h,
          v,
          b,
          _,
          E,
          S,
          w
        ) : (I & 64 || I & 128) && y.process(
          u,
          f,
          h,
          v,
          b,
          _,
          E,
          S,
          w,
          $t
        );
    }
    k != null && b && ls(k, u && u.ref, _, f || u, !f);
  }, ne = (u, f, h, v) => {
    if (u == null)
      n(
        f.el = r(f.children),
        h,
        v
      );
    else {
      const b = f.el = u.el;
      f.children !== u.children && p(b, f.children);
    }
  }, B = (u, f, h, v) => {
    u == null ? n(
      f.el = c(f.children || ""),
      h,
      v
    ) : f.el = u.el;
  }, J = (u, f, h, v) => {
    [u.el, u.anchor] = H(
      u.children,
      f,
      h,
      v,
      u.el,
      u.anchor
    );
  }, G = ({ el: u, anchor: f }, h, v) => {
    let b;
    for (; u && u !== f; )
      b = m(u), n(u, h, v), u = b;
    n(f, h, v);
  }, x = ({ el: u, anchor: f }) => {
    let h;
    for (; u && u !== f; )
      h = m(u), o(u), u = h;
    o(f);
  }, O = (u, f, h, v, b, _, E, S, w) => {
    f.type === "svg" ? E = "svg" : f.type === "math" && (E = "mathml"), u == null ? F(
      f,
      h,
      v,
      b,
      _,
      E,
      S,
      w
    ) : K(
      u,
      f,
      b,
      _,
      E,
      S,
      w
    );
  }, F = (u, f, h, v, b, _, E, S) => {
    let w, y;
    const { props: k, shapeFlag: I, transition: M, dirs: P } = u;
    if (w = u.el = l(
      u.type,
      _,
      k && k.is,
      k
    ), I & 8 ? a(w, u.children) : I & 16 && D(
      u.children,
      w,
      null,
      v,
      b,
      Ms(u, _),
      E,
      S
    ), P && ot(u, null, v, "created"), Y(w, u, u.scopeId, E, v), k) {
      for (const Z in k)
        Z !== "value" && !kt(Z) && i(w, Z, null, k[Z], _, v);
      "value" in k && i(w, "value", null, k.value, _), (y = k.onVnodeBeforeMount) && Re(y, v, u);
    }
    P && ot(u, null, v, "beforeMount");
    const N = jl(b, M);
    N && M.beforeEnter(w), n(w, f, h), ((y = k && k.onVnodeMounted) || N || P) && ye(() => {
      y && Re(y, v, u), N && M.enter(w), P && ot(u, null, v, "mounted");
    }, b);
  }, Y = (u, f, h, v, b) => {
    if (h && C(u, h), v)
      for (let _ = 0; _ < v.length; _++)
        C(u, v[_]);
    if (b) {
      let _ = b.subTree;
      if (f === _ || Qo(_.type) && (_.ssContent === f || _.ssFallback === f)) {
        const E = b.vnode;
        Y(
          u,
          E,
          E.scopeId,
          E.slotScopeIds,
          b.parent
        );
      }
    }
  }, D = (u, f, h, v, b, _, E, S, w = 0) => {
    for (let y = w; y < u.length; y++) {
      const k = u[y] = S ? Ge(u[y]) : Ve(u[y]);
      T(
        null,
        k,
        f,
        h,
        v,
        b,
        _,
        E,
        S
      );
    }
  }, K = (u, f, h, v, b, _, E) => {
    const S = f.el = u.el;
    let { patchFlag: w, dynamicChildren: y, dirs: k } = f;
    w |= u.patchFlag & 16;
    const I = u.props || q, M = f.props || q;
    let P;
    if (h && it(h, !1), (P = M.onVnodeBeforeUpdate) && Re(P, h, f, u), k && ot(f, u, h, "beforeUpdate"), h && it(h, !0), (I.innerHTML && M.innerHTML == null || I.textContent && M.textContent == null) && a(S, ""), y ? Ne(
      u.dynamicChildren,
      y,
      S,
      h,
      v,
      Ms(f, b),
      _
    ) : E || X(
      u,
      f,
      S,
      null,
      h,
      v,
      Ms(f, b),
      _,
      !1
    ), w > 0) {
      if (w & 16)
        tt(S, I, M, h, b);
      else if (w & 2 && I.class !== M.class && i(S, "class", null, M.class, b), w & 4 && i(S, "style", I.style, M.style, b), w & 8) {
        const N = f.dynamicProps;
        for (let Z = 0; Z < N.length; Z++) {
          const W = N[Z], _e = I[W], be = M[W];
          (be !== _e || W === "value") && i(S, W, _e, be, b, h);
        }
      }
      w & 1 && u.children !== f.children && a(S, f.children);
    } else !E && y == null && tt(S, I, M, h, b);
    ((P = M.onVnodeUpdated) || k) && ye(() => {
      P && Re(P, h, f, u), k && ot(f, u, h, "updated");
    }, v);
  }, Ne = (u, f, h, v, b, _, E) => {
    for (let S = 0; S < f.length; S++) {
      const w = u[S], y = f[S], k = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        w.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (w.type === le || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !Ot(w, y) || // - In the case of a component, it could contain anything.
        w.shapeFlag & 70) ? d(w.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          h
        )
      );
      T(
        w,
        y,
        k,
        null,
        v,
        b,
        _,
        E,
        !0
      );
    }
  }, tt = (u, f, h, v, b) => {
    if (f !== h) {
      if (f !== q)
        for (const _ in f)
          !kt(_) && !(_ in h) && i(
            u,
            _,
            f[_],
            null,
            b,
            v
          );
      for (const _ in h) {
        if (kt(_)) continue;
        const E = h[_], S = f[_];
        E !== S && _ !== "value" && i(u, _, S, E, b, v);
      }
      "value" in h && i(u, "value", f.value, h.value, b);
    }
  }, ze = (u, f, h, v, b, _, E, S, w) => {
    const y = f.el = u ? u.el : r(""), k = f.anchor = u ? u.anchor : r("");
    let { patchFlag: I, dynamicChildren: M, slotScopeIds: P } = f;
    P && (S = S ? S.concat(P) : P), u == null ? (n(y, h, v), n(k, h, v), D(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      f.children || [],
      h,
      k,
      b,
      _,
      E,
      S,
      w
    )) : I > 0 && I & 64 && M && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    u.dynamicChildren ? (Ne(
      u.dynamicChildren,
      M,
      h,
      b,
      _,
      E,
      S
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (f.key != null || b && f === b.subTree) && Jo(
      u,
      f,
      !0
      /* shallow */
    )) : X(
      u,
      f,
      h,
      k,
      b,
      _,
      E,
      S,
      w
    );
  }, qe = (u, f, h, v, b, _, E, S, w) => {
    f.slotScopeIds = S, u == null ? f.shapeFlag & 512 ? b.ctx.activate(
      f,
      h,
      v,
      E,
      w
    ) : ws(
      f,
      h,
      v,
      b,
      _,
      E,
      w
    ) : gn(u, f, w);
  }, ws = (u, f, h, v, b, _, E) => {
    const S = u.component = sr(
      u,
      v,
      b
    );
    if (ko(u) && (S.ctx.renderer = $t), nr(S, !1, E), S.asyncDep) {
      if (b && b.registerDep(S, de, E), !u.el) {
        const w = S.subTree = ue(dt);
        B(null, w, f, h);
      }
    } else
      de(
        S,
        u,
        f,
        h,
        b,
        _,
        E
      );
  }, gn = (u, f, h) => {
    const v = f.component = u.component;
    if (zl(u, f, h))
      if (v.asyncDep && !v.asyncResolved) {
        te(v, f, h);
        return;
      } else
        v.next = f, v.update();
    else
      f.el = u.el, v.vnode = f;
  }, de = (u, f, h, v, b, _, E) => {
    const S = () => {
      if (u.isMounted) {
        let { next: I, bu: M, u: P, parent: N, vnode: Z } = u;
        {
          const Ae = Go(u);
          if (Ae) {
            I && (I.el = Z.el, te(u, I, E)), Ae.asyncDep.then(() => {
              u.isUnmounted || S();
            });
            return;
          }
        }
        let W = I, _e;
        it(u, !1), I ? (I.el = Z.el, te(u, I, E)) : I = Z, M && Zt(M), (_e = I.props && I.props.onVnodeBeforeUpdate) && Re(_e, N, I, Z), it(u, !0);
        const be = kn(u), ke = u.subTree;
        u.subTree = be, T(
          ke,
          be,
          // parent may have changed if it's in a teleport
          d(ke.el),
          // anchor may have changed if it's in a fragment
          Jt(ke),
          u,
          b,
          _
        ), I.el = be.el, W === null && ql(u, be.el), P && ye(P, b), (_e = I.props && I.props.onVnodeUpdated) && ye(
          () => Re(_e, N, I, Z),
          b
        );
      } else {
        let I;
        const { el: M, props: P } = f, { bm: N, m: Z, parent: W, root: _e, type: be } = u, ke = Rt(f);
        it(u, !1), N && Zt(N), !ke && (I = P && P.onVnodeBeforeMount) && Re(I, W, f), it(u, !0);
        {
          _e.ce && _e.ce._injectChildStyle(be);
          const Ae = u.subTree = kn(u);
          T(
            null,
            Ae,
            h,
            v,
            u,
            b,
            _
          ), f.el = Ae.el;
        }
        if (Z && ye(Z, b), !ke && (I = P && P.onVnodeMounted)) {
          const Ae = f;
          ye(
            () => Re(I, W, Ae),
            b
          );
        }
        (f.shapeFlag & 256 || W && Rt(W.vnode) && W.vnode.shapeFlag & 256) && u.a && ye(u.a, b), u.isMounted = !0, f = h = v = null;
      }
    };
    u.scope.on();
    const w = u.effect = new co(S);
    u.scope.off();
    const y = u.update = w.run.bind(w), k = u.job = w.runIfDirty.bind(w);
    k.i = u, k.id = u.uid, w.scheduler = () => fn(k), it(u, !0), y();
  }, te = (u, f, h) => {
    f.component = u;
    const v = u.vnode.props;
    u.vnode = f, u.next = null, Ml(u, f.props, v, h), Rl(u, f.children, h), Qe(), Cn(u), et();
  }, X = (u, f, h, v, b, _, E, S, w = !1) => {
    const y = u && u.children, k = u ? u.shapeFlag : 0, I = f.children, { patchFlag: M, shapeFlag: P } = f;
    if (M > 0) {
      if (M & 128) {
        qt(
          y,
          I,
          h,
          v,
          b,
          _,
          E,
          S,
          w
        );
        return;
      } else if (M & 256) {
        st(
          y,
          I,
          h,
          v,
          b,
          _,
          E,
          S,
          w
        );
        return;
      }
    }
    P & 8 ? (k & 16 && Et(y, b, _), I !== y && a(h, I)) : k & 16 ? P & 16 ? qt(
      y,
      I,
      h,
      v,
      b,
      _,
      E,
      S,
      w
    ) : Et(y, b, _, !0) : (k & 8 && a(h, ""), P & 16 && D(
      I,
      h,
      v,
      b,
      _,
      E,
      S,
      w
    ));
  }, st = (u, f, h, v, b, _, E, S, w) => {
    u = u || _t, f = f || _t;
    const y = u.length, k = f.length, I = Math.min(y, k);
    let M;
    for (M = 0; M < I; M++) {
      const P = f[M] = w ? Ge(f[M]) : Ve(f[M]);
      T(
        u[M],
        P,
        h,
        null,
        b,
        _,
        E,
        S,
        w
      );
    }
    y > k ? Et(
      u,
      b,
      _,
      !0,
      !1,
      I
    ) : D(
      f,
      h,
      v,
      b,
      _,
      E,
      S,
      w,
      I
    );
  }, qt = (u, f, h, v, b, _, E, S, w) => {
    let y = 0;
    const k = f.length;
    let I = u.length - 1, M = k - 1;
    for (; y <= I && y <= M; ) {
      const P = u[y], N = f[y] = w ? Ge(f[y]) : Ve(f[y]);
      if (Ot(P, N))
        T(
          P,
          N,
          h,
          null,
          b,
          _,
          E,
          S,
          w
        );
      else
        break;
      y++;
    }
    for (; y <= I && y <= M; ) {
      const P = u[I], N = f[M] = w ? Ge(f[M]) : Ve(f[M]);
      if (Ot(P, N))
        T(
          P,
          N,
          h,
          null,
          b,
          _,
          E,
          S,
          w
        );
      else
        break;
      I--, M--;
    }
    if (y > I) {
      if (y <= M) {
        const P = M + 1, N = P < k ? f[P].el : v;
        for (; y <= M; )
          T(
            null,
            f[y] = w ? Ge(f[y]) : Ve(f[y]),
            h,
            N,
            b,
            _,
            E,
            S,
            w
          ), y++;
      }
    } else if (y > M)
      for (; y <= I; )
        Me(u[y], b, _, !0), y++;
    else {
      const P = y, N = y, Z = /* @__PURE__ */ new Map();
      for (y = N; y <= M; y++) {
        const ve = f[y] = w ? Ge(f[y]) : Ve(f[y]);
        ve.key != null && Z.set(ve.key, y);
      }
      let W, _e = 0;
      const be = M - N + 1;
      let ke = !1, Ae = 0;
      const Tt = new Array(be);
      for (y = 0; y < be; y++) Tt[y] = 0;
      for (y = P; y <= I; y++) {
        const ve = u[y];
        if (_e >= be) {
          Me(ve, b, _, !0);
          continue;
        }
        let Pe;
        if (ve.key != null)
          Pe = Z.get(ve.key);
        else
          for (W = N; W <= M; W++)
            if (Tt[W - N] === 0 && Ot(ve, f[W])) {
              Pe = W;
              break;
            }
        Pe === void 0 ? Me(ve, b, _, !0) : (Tt[Pe - N] = y + 1, Pe >= Ae ? Ae = Pe : ke = !0, T(
          ve,
          f[Pe],
          h,
          null,
          b,
          _,
          E,
          S,
          w
        ), _e++);
      }
      const _n = ke ? Dl(Tt) : _t;
      for (W = _n.length - 1, y = be - 1; y >= 0; y--) {
        const ve = N + y, Pe = f[ve], vn = ve + 1 < k ? f[ve + 1].el : v;
        Tt[y] === 0 ? T(
          null,
          Pe,
          h,
          vn,
          b,
          _,
          E,
          S,
          w
        ) : ke && (W < 0 || y !== _n[W] ? nt(Pe, h, vn, 2) : W--);
      }
    }
  }, nt = (u, f, h, v, b = null) => {
    const { el: _, type: E, transition: S, children: w, shapeFlag: y } = u;
    if (y & 6) {
      nt(u.component.subTree, f, h, v);
      return;
    }
    if (y & 128) {
      u.suspense.move(f, h, v);
      return;
    }
    if (y & 64) {
      E.move(u, f, h, $t);
      return;
    }
    if (E === le) {
      n(_, f, h);
      for (let I = 0; I < w.length; I++)
        nt(w[I], f, h, v);
      n(u.anchor, f, h);
      return;
    }
    if (E === ks) {
      G(u, f, h);
      return;
    }
    if (v !== 2 && y & 1 && S)
      if (v === 0)
        S.beforeEnter(_), n(_, f, h), ye(() => S.enter(_), b);
      else {
        const { leave: I, delayLeave: M, afterLeave: P } = S, N = () => n(_, f, h), Z = () => {
          I(_, () => {
            N(), P && P();
          });
        };
        M ? M(_, N, Z) : Z();
      }
    else
      n(_, f, h);
  }, Me = (u, f, h, v = !1, b = !1) => {
    const {
      type: _,
      props: E,
      ref: S,
      children: w,
      dynamicChildren: y,
      shapeFlag: k,
      patchFlag: I,
      dirs: M,
      cacheIndex: P
    } = u;
    if (I === -2 && (b = !1), S != null && ls(S, null, h, u, !0), P != null && (f.renderCache[P] = void 0), k & 256) {
      f.ctx.deactivate(u);
      return;
    }
    const N = k & 1 && M, Z = !Rt(u);
    let W;
    if (Z && (W = E && E.onVnodeBeforeUnmount) && Re(W, f, u), k & 6)
      hi(u.component, h, v);
    else {
      if (k & 128) {
        u.suspense.unmount(h, v);
        return;
      }
      N && ot(u, null, f, "beforeUnmount"), k & 64 ? u.type.remove(
        u,
        f,
        h,
        $t,
        v
      ) : y && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !y.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (_ !== le || I > 0 && I & 64) ? Et(
        y,
        f,
        h,
        !1,
        !0
      ) : (_ === le && I & 384 || !b && k & 16) && Et(w, f, h), v && mn(u);
    }
    (Z && (W = E && E.onVnodeUnmounted) || N) && ye(() => {
      W && Re(W, f, u), N && ot(u, null, f, "unmounted");
    }, h);
  }, mn = (u) => {
    const { type: f, el: h, anchor: v, transition: b } = u;
    if (f === le) {
      pi(h, v);
      return;
    }
    if (f === ks) {
      x(u);
      return;
    }
    const _ = () => {
      o(h), b && !b.persisted && b.afterLeave && b.afterLeave();
    };
    if (u.shapeFlag & 1 && b && !b.persisted) {
      const { leave: E, delayLeave: S } = b, w = () => E(h, _);
      S ? S(u.el, _, w) : w();
    } else
      _();
  }, pi = (u, f) => {
    let h;
    for (; u !== f; )
      h = m(u), o(u), u = h;
    o(f);
  }, hi = (u, f, h) => {
    const { bum: v, scope: b, job: _, subTree: E, um: S, m: w, a: y } = u;
    Mn(w), Mn(y), v && Zt(v), b.stop(), _ && (_.flags |= 8, Me(E, u, f, h)), S && ye(S, f), ye(() => {
      u.isUnmounted = !0;
    }, f), f && f.pendingBranch && !f.isUnmounted && u.asyncDep && !u.asyncResolved && u.suspenseId === f.pendingId && (f.deps--, f.deps === 0 && f.resolve());
  }, Et = (u, f, h, v = !1, b = !1, _ = 0) => {
    for (let E = _; E < u.length; E++)
      Me(u[E], f, h, v, b);
  }, Jt = (u) => {
    if (u.shapeFlag & 6)
      return Jt(u.component.subTree);
    if (u.shapeFlag & 128)
      return u.suspense.next();
    const f = m(u.anchor || u.el), h = f && f[rl];
    return h ? m(h) : f;
  };
  let Ss = !1;
  const bn = (u, f, h) => {
    u == null ? f._vnode && Me(f._vnode, null, null, !0) : T(
      f._vnode || null,
      u,
      f,
      null,
      null,
      null,
      h
    ), f._vnode = u, Ss || (Ss = !0, Cn(), To(), Ss = !1);
  }, $t = {
    p: T,
    um: Me,
    m: nt,
    r: mn,
    mt: ws,
    mc: D,
    pc: X,
    pbc: Ne,
    n: Jt,
    o: e
  };
  return {
    render: bn,
    hydrate: void 0,
    createApp: Il(bn)
  };
}
function Ms({ type: e, props: t }, s) {
  return s === "svg" && e === "foreignObject" || s === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : s;
}
function it({ effect: e, job: t }, s) {
  s ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function jl(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function Jo(e, t, s = !1) {
  const n = e.children, o = t.children;
  if (A(n) && A(o))
    for (let i = 0; i < n.length; i++) {
      const l = n[i];
      let r = o[i];
      r.shapeFlag & 1 && !r.dynamicChildren && ((r.patchFlag <= 0 || r.patchFlag === 32) && (r = o[i] = Ge(o[i]), r.el = l.el), !s && r.patchFlag !== -2 && Jo(l, r)), r.type === ys && (r.el = l.el);
    }
}
function Dl(e) {
  const t = e.slice(), s = [0];
  let n, o, i, l, r;
  const c = e.length;
  for (n = 0; n < c; n++) {
    const p = e[n];
    if (p !== 0) {
      if (o = s[s.length - 1], e[o] < p) {
        t[n] = o, s.push(n);
        continue;
      }
      for (i = 0, l = s.length - 1; i < l; )
        r = i + l >> 1, e[s[r]] < p ? i = r + 1 : l = r;
      p < e[s[i]] && (i > 0 && (t[n] = s[i - 1]), s[i] = n);
    }
  }
  for (i = s.length, l = s[i - 1]; i-- > 0; )
    s[i] = l, l = t[l];
  return s;
}
function Go(e) {
  const t = e.subTree.component;
  if (t)
    return t.asyncDep && !t.asyncResolved ? t : Go(t);
}
function Mn(e) {
  if (e)
    for (let t = 0; t < e.length; t++)
      e[t].flags |= 8;
}
const Hl = Symbol.for("v-scx"), Nl = () => Vt(Hl);
function Qt(e, t, s) {
  return Yo(e, t, s);
}
function Yo(e, t, s = q) {
  const { immediate: n, deep: o, flush: i, once: l } = s, r = fe({}, s), c = t && n || !t && i !== "post";
  let p;
  if (Ut) {
    if (i === "sync") {
      const C = Nl();
      p = C.__watcherHandles || (C.__watcherHandles = []);
    } else if (!c) {
      const C = () => {
      };
      return C.stop = je, C.resume = je, C.pause = je, C;
    }
  }
  const a = me;
  r.call = (C, H, T) => He(C, a, H, T);
  let d = !1;
  i === "post" ? r.scheduler = (C) => {
    ye(C, a && a.suspense);
  } : i !== "sync" && (d = !0, r.scheduler = (C, H) => {
    H ? C() : fn(C);
  }), r.augmentJob = (C) => {
    t && (C.flags |= 4), d && (C.flags |= 2, a && (C.id = a.uid, C.i = a));
  };
  const m = tl(e, t, r);
  return Ut && (p ? p.push(m) : c && m()), m;
}
function Ll(e, t, s) {
  const n = this.proxy, o = se(e) ? e.includes(".") ? Xo(n, e) : () => n[e] : e.bind(n, n);
  let i;
  R(t) ? i = t : (i = t.handler, s = t);
  const l = Wt(this), r = Yo(o, i.bind(n), s);
  return l(), r;
}
function Xo(e, t) {
  const s = t.split(".");
  return () => {
    let n = e;
    for (let o = 0; o < s.length && n; o++)
      n = n[s[o]];
    return n;
  };
}
const Ul = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${Ze(t)}Modifiers`] || e[`${pt(t)}Modifiers`];
function Bl(e, t, ...s) {
  if (e.isUnmounted) return;
  const n = e.vnode.props || q;
  let o = s;
  const i = t.startsWith("update:"), l = i && Ul(n, t.slice(7));
  l && (l.trim && (o = s.map((a) => se(a) ? a.trim() : a)), l.number && (o = s.map(Ds)));
  let r, c = n[r = Cs(t)] || // also try camelCase event handler (#2249)
  n[r = Cs(Ze(t))];
  !c && i && (c = n[r = Cs(pt(t))]), c && He(
    c,
    e,
    6,
    o
  );
  const p = n[r + "Once"];
  if (p) {
    if (!e.emitted)
      e.emitted = {};
    else if (e.emitted[r])
      return;
    e.emitted[r] = !0, He(
      p,
      e,
      6,
      o
    );
  }
}
function Zo(e, t, s = !1) {
  const n = t.emitsCache, o = n.get(e);
  if (o !== void 0)
    return o;
  const i = e.emits;
  let l = {}, r = !1;
  if (!R(e)) {
    const c = (p) => {
      const a = Zo(p, t, !0);
      a && (r = !0, fe(l, a));
    };
    !s && t.mixins.length && t.mixins.forEach(c), e.extends && c(e.extends), e.mixins && e.mixins.forEach(c);
  }
  return !i && !r ? (ee(e) && n.set(e, null), null) : (A(i) ? i.forEach((c) => l[c] = null) : fe(l, i), ee(e) && n.set(e, l), l);
}
function vs(e, t) {
  return !e || !as(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), U(e, t[0].toLowerCase() + t.slice(1)) || U(e, pt(t)) || U(e, t));
}
function kn(e) {
  const {
    type: t,
    vnode: s,
    proxy: n,
    withProxy: o,
    propsOptions: [i],
    slots: l,
    attrs: r,
    emit: c,
    render: p,
    renderCache: a,
    props: d,
    data: m,
    setupState: C,
    ctx: H,
    inheritAttrs: T
  } = e, ne = is(e);
  let B, J;
  try {
    if (s.shapeFlag & 4) {
      const x = o || n, O = x;
      B = Ve(
        p.call(
          O,
          x,
          a,
          d,
          C,
          m,
          H
        )
      ), J = r;
    } else {
      const x = t;
      B = Ve(
        x.length > 1 ? x(
          d,
          { attrs: r, slots: l, emit: c }
        ) : x(
          d,
          null
        )
      ), J = t.props ? r : Kl(r);
    }
  } catch (x) {
    jt.length = 0, bs(x, e, 1), B = ue(dt);
  }
  let G = B;
  if (J && T !== !1) {
    const x = Object.keys(J), { shapeFlag: O } = G;
    x.length && O & 7 && (i && x.some(en) && (J = Wl(
      J,
      i
    )), G = Ct(G, J, !1, !0));
  }
  return s.dirs && (G = Ct(G, null, !1, !0), G.dirs = G.dirs ? G.dirs.concat(s.dirs) : s.dirs), s.transition && dn(G, s.transition), B = G, is(ne), B;
}
const Kl = (e) => {
  let t;
  for (const s in e)
    (s === "class" || s === "style" || as(s)) && ((t || (t = {}))[s] = e[s]);
  return t;
}, Wl = (e, t) => {
  const s = {};
  for (const n in e)
    (!en(n) || !(n.slice(9) in t)) && (s[n] = e[n]);
  return s;
};
function zl(e, t, s) {
  const { props: n, children: o, component: i } = e, { props: l, children: r, patchFlag: c } = t, p = i.emitsOptions;
  if (t.dirs || t.transition)
    return !0;
  if (s && c >= 0) {
    if (c & 1024)
      return !0;
    if (c & 16)
      return n ? An(n, l, p) : !!l;
    if (c & 8) {
      const a = t.dynamicProps;
      for (let d = 0; d < a.length; d++) {
        const m = a[d];
        if (l[m] !== n[m] && !vs(p, m))
          return !0;
      }
    }
  } else
    return (o || r) && (!r || !r.$stable) ? !0 : n === l ? !1 : n ? l ? An(n, l, p) : !0 : !!l;
  return !1;
}
function An(e, t, s) {
  const n = Object.keys(t);
  if (n.length !== Object.keys(e).length)
    return !0;
  for (let o = 0; o < n.length; o++) {
    const i = n[o];
    if (t[i] !== e[i] && !vs(s, i))
      return !0;
  }
  return !1;
}
function ql({ vnode: e, parent: t }, s) {
  for (; t; ) {
    const n = t.subTree;
    if (n.suspense && n.suspense.activeBranch === e && (n.el = e.el), n === e)
      (e = t.vnode).el = s, t = t.parent;
    else
      break;
  }
}
const Qo = (e) => e.__isSuspense;
function Jl(e, t) {
  t && t.pendingBranch ? A(e) ? t.effects.push(...e) : t.effects.push(e) : il(e);
}
const le = Symbol.for("v-fgt"), ys = Symbol.for("v-txt"), dt = Symbol.for("v-cmt"), ks = Symbol.for("v-stc"), jt = [];
let we = null;
function V(e = !1) {
  jt.push(we = e ? null : []);
}
function Gl() {
  jt.pop(), we = jt[jt.length - 1] || null;
}
let Lt = 1;
function Pn(e, t = !1) {
  Lt += e, e < 0 && we && t && (we.hasOnce = !0);
}
function ei(e) {
  return e.dynamicChildren = Lt > 0 ? we || _t : null, Gl(), Lt > 0 && we && we.push(e), e;
}
function j(e, t, s, n, o, i) {
  return ei(
    g(
      e,
      t,
      s,
      n,
      o,
      i,
      !0
    )
  );
}
function Yl(e, t, s, n, o) {
  return ei(
    ue(
      e,
      t,
      s,
      n,
      o,
      !0
    )
  );
}
function ti(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function Ot(e, t) {
  return e.type === t.type && e.key === t.key;
}
const si = ({ key: e }) => e ?? null, es = ({
  ref: e,
  ref_key: t,
  ref_for: s
}) => (typeof e == "number" && (e = "" + e), e != null ? se(e) || ae(e) || R(e) ? { i: Ce, r: e, k: t, f: !!s } : e : null);
function g(e, t = null, s = null, n = 0, o = null, i = e === le ? 0 : 1, l = !1, r = !1) {
  const c = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && si(t),
    ref: t && es(t),
    scopeId: Oo,
    slotScopeIds: null,
    children: s,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetStart: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: i,
    patchFlag: n,
    dynamicProps: o,
    dynamicChildren: null,
    appContext: null,
    ctx: Ce
  };
  return r ? (hn(c, s), i & 128 && e.normalize(c)) : s && (c.shapeFlag |= se(s) ? 8 : 16), Lt > 0 && // avoid a block node from tracking itself
  !l && // has current parent block
  we && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (c.patchFlag > 0 || i & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  c.patchFlag !== 32 && we.push(c), c;
}
const ue = Xl;
function Xl(e, t = null, s = null, n = 0, o = null, i = !1) {
  if ((!e || e === yl) && (e = dt), ti(e)) {
    const r = Ct(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return s && hn(r, s), Lt > 0 && !i && we && (r.shapeFlag & 6 ? we[we.indexOf(e)] = r : we.push(r)), r.patchFlag = -2, r;
  }
  if (rr(e) && (e = e.__vccOpts), t) {
    t = Zl(t);
    let { class: r, style: c } = t;
    r && !se(r) && (t.class = ie(r)), ee(c) && (an(c) && !A(c) && (c = fe({}, c)), t.style = Te(c));
  }
  const l = se(e) ? 1 : Qo(e) ? 128 : cl(e) ? 64 : ee(e) ? 4 : R(e) ? 2 : 0;
  return g(
    e,
    t,
    s,
    n,
    o,
    l,
    i,
    !0
  );
}
function Zl(e) {
  return e ? an(e) || Lo(e) ? fe({}, e) : e : null;
}
function Ct(e, t, s = !1, n = !1) {
  const { props: o, ref: i, patchFlag: l, children: r, transition: c } = e, p = t ? Ql(o || {}, t) : o, a = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: p,
    key: p && si(p),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      s && i ? A(i) ? i.concat(es(t)) : [i, es(t)] : es(t)
    ) : i,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: r,
    target: e.target,
    targetStart: e.targetStart,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: t && e.type !== le ? l === -1 ? 16 : l | 16 : l,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: c,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && Ct(e.ssContent),
    ssFallback: e.ssFallback && Ct(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
  return c && n && dn(
    a,
    c.clone(a)
  ), a;
}
function $e(e = " ", t = 0) {
  return ue(ys, null, e, t);
}
function oe(e = "", t = !1) {
  return t ? (V(), Yl(dt, null, e)) : ue(dt, null, e);
}
function Ve(e) {
  return e == null || typeof e == "boolean" ? ue(dt) : A(e) ? ue(
    le,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : ti(e) ? Ge(e) : ue(ys, null, String(e));
}
function Ge(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : Ct(e);
}
function hn(e, t) {
  let s = 0;
  const { shapeFlag: n } = e;
  if (t == null)
    t = null;
  else if (A(t))
    s = 16;
  else if (typeof t == "object")
    if (n & 65) {
      const o = t.default;
      o && (o._c && (o._d = !1), hn(e, o()), o._c && (o._d = !0));
      return;
    } else {
      s = 32;
      const o = t._;
      !o && !Lo(t) ? t._ctx = Ce : o === 3 && Ce && (Ce.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else R(t) ? (t = { default: t, _ctx: Ce }, s = 32) : (t = String(t), n & 64 ? (s = 16, t = [$e(t)]) : s = 8);
  e.children = t, e.shapeFlag |= s;
}
function Ql(...e) {
  const t = {};
  for (let s = 0; s < e.length; s++) {
    const n = e[s];
    for (const o in n)
      if (o === "class")
        t.class !== n.class && (t.class = ie([t.class, n.class]));
      else if (o === "style")
        t.style = Te([t.style, n.style]);
      else if (as(o)) {
        const i = t[o], l = n[o];
        l && i !== l && !(A(i) && i.includes(l)) && (t[o] = i ? [].concat(i, l) : l);
      } else o !== "" && (t[o] = n[o]);
  }
  return t;
}
function Re(e, t, s, n = null) {
  He(e, t, 7, [
    s,
    n
  ]);
}
const er = jo();
let tr = 0;
function sr(e, t, s) {
  const n = e.type, o = (t ? t.appContext : e.appContext) || er, i = {
    uid: tr++,
    vnode: e,
    type: n,
    parent: t,
    appContext: o,
    root: null,
    // to be immediately set
    next: null,
    subTree: null,
    // will be set synchronously right after creation
    effect: null,
    update: null,
    // will be set synchronously right after creation
    job: null,
    scope: new Ti(
      !0
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: t ? t.provides : Object.create(o.provides),
    ids: t ? t.ids : ["", 0, 0],
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: Bo(n, o),
    emitsOptions: Zo(n, o),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: q,
    // inheritAttrs
    inheritAttrs: n.inheritAttrs,
    // state
    ctx: q,
    data: q,
    props: q,
    attrs: q,
    slots: q,
    refs: q,
    setupState: q,
    setupContext: null,
    // suspense related
    suspense: s,
    suspenseId: s ? s.pendingId : 0,
    asyncDep: null,
    asyncResolved: !1,
    // lifecycle hooks
    // not using enums here because it results in computed properties
    isMounted: !1,
    isUnmounted: !1,
    isDeactivated: !1,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null
  };
  return i.ctx = { _: i }, i.root = t ? t.root : i, i.emit = Bl.bind(null, i), e.ce && e.ce(i), i;
}
let me = null, cs, Js;
{
  const e = ps(), t = (s, n) => {
    let o;
    return (o = e[s]) || (o = e[s] = []), o.push(n), (i) => {
      o.length > 1 ? o.forEach((l) => l(i)) : o[0](i);
    };
  };
  cs = t(
    "__VUE_INSTANCE_SETTERS__",
    (s) => me = s
  ), Js = t(
    "__VUE_SSR_SETTERS__",
    (s) => Ut = s
  );
}
const Wt = (e) => {
  const t = me;
  return cs(e), e.scope.on(), () => {
    e.scope.off(), cs(t);
  };
}, Rn = () => {
  me && me.scope.off(), cs(null);
};
function ni(e) {
  return e.vnode.shapeFlag & 4;
}
let Ut = !1;
function nr(e, t = !1, s = !1) {
  t && Js(t);
  const { props: n, children: o } = e.vnode, i = ni(e);
  Ol(e, n, i, t), Pl(e, o, s);
  const l = i ? or(e, t) : void 0;
  return t && Js(!1), l;
}
function or(e, t) {
  const s = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, xl);
  const { setup: n } = s;
  if (n) {
    Qe();
    const o = e.setupContext = n.length > 1 ? lr(e) : null, i = Wt(e), l = Kt(
      n,
      e,
      0,
      [
        e.props,
        o
      ]
    ), r = Qn(l);
    if (et(), i(), (r || e.sp) && !Rt(e) && Mo(e), r) {
      if (l.then(Rn, Rn), t)
        return l.then((c) => {
          Fn(e, c);
        }).catch((c) => {
          bs(c, e, 0);
        });
      e.asyncDep = l;
    } else
      Fn(e, l);
  } else
    oi(e);
}
function Fn(e, t, s) {
  R(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : ee(t) && (e.setupState = Co(t)), oi(e);
}
function oi(e, t, s) {
  const n = e.type;
  e.render || (e.render = n.render || je);
  {
    const o = Wt(e);
    Qe();
    try {
      wl(e);
    } finally {
      et(), o();
    }
  }
}
const ir = {
  get(e, t) {
    return re(e, "get", ""), e[t];
  }
};
function lr(e) {
  const t = (s) => {
    e.exposed = s || {};
  };
  return {
    attrs: new Proxy(e.attrs, ir),
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function xs(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(Co(Ji(e.exposed)), {
    get(t, s) {
      if (s in t)
        return t[s];
      if (s in Ft)
        return Ft[s](e);
    },
    has(t, s) {
      return s in t || s in Ft;
    }
  })) : e.proxy;
}
function rr(e) {
  return R(e) && "__vccOpts" in e;
}
const Ie = (e, t) => Qi(e, t, Ut), cr = "3.5.13";
/**
* @vue/runtime-dom v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let Gs;
const Vn = typeof window < "u" && window.trustedTypes;
if (Vn)
  try {
    Gs = /* @__PURE__ */ Vn.createPolicy("vue", {
      createHTML: (e) => e
    });
  } catch {
  }
const ii = Gs ? (e) => Gs.createHTML(e) : (e) => e, ur = "http://www.w3.org/2000/svg", ar = "http://www.w3.org/1998/Math/MathML", Ue = typeof document < "u" ? document : null, jn = Ue && /* @__PURE__ */ Ue.createElement("template"), fr = {
  insert: (e, t, s) => {
    t.insertBefore(e, s || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, s, n) => {
    const o = t === "svg" ? Ue.createElementNS(ur, e) : t === "mathml" ? Ue.createElementNS(ar, e) : s ? Ue.createElement(e, { is: s }) : Ue.createElement(e);
    return e === "select" && n && n.multiple != null && o.setAttribute("multiple", n.multiple), o;
  },
  createText: (e) => Ue.createTextNode(e),
  createComment: (e) => Ue.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => Ue.querySelector(e),
  setScopeId(e, t) {
    e.setAttribute(t, "");
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(e, t, s, n, o, i) {
    const l = s ? s.previousSibling : t.lastChild;
    if (o && (o === i || o.nextSibling))
      for (; t.insertBefore(o.cloneNode(!0), s), !(o === i || !(o = o.nextSibling)); )
        ;
    else {
      jn.innerHTML = ii(
        n === "svg" ? `<svg>${e}</svg>` : n === "mathml" ? `<math>${e}</math>` : e
      );
      const r = jn.content;
      if (n === "svg" || n === "mathml") {
        const c = r.firstChild;
        for (; c.firstChild; )
          r.appendChild(c.firstChild);
        r.removeChild(c);
      }
      t.insertBefore(r, s);
    }
    return [
      // first
      l ? l.nextSibling : t.firstChild,
      // last
      s ? s.previousSibling : t.lastChild
    ];
  }
}, dr = Symbol("_vtc");
function pr(e, t, s) {
  const n = e[dr];
  n && (t = (t ? [t, ...n] : [...n]).join(" ")), t == null ? e.removeAttribute("class") : s ? e.setAttribute("class", t) : e.className = t;
}
const Dn = Symbol("_vod"), hr = Symbol("_vsh"), gr = Symbol(""), mr = /(^|;)\s*display\s*:/;
function br(e, t, s) {
  const n = e.style, o = se(s);
  let i = !1;
  if (s && !o) {
    if (t)
      if (se(t))
        for (const l of t.split(";")) {
          const r = l.slice(0, l.indexOf(":")).trim();
          s[r] == null && ts(n, r, "");
        }
      else
        for (const l in t)
          s[l] == null && ts(n, l, "");
    for (const l in s)
      l === "display" && (i = !0), ts(n, l, s[l]);
  } else if (o) {
    if (t !== s) {
      const l = n[gr];
      l && (s += ";" + l), n.cssText = s, i = mr.test(s);
    }
  } else t && e.removeAttribute("style");
  Dn in e && (e[Dn] = i ? n.display : "", e[hr] && (n.display = "none"));
}
const Hn = /\s*!important$/;
function ts(e, t, s) {
  if (A(s))
    s.forEach((n) => ts(e, t, n));
  else if (s == null && (s = ""), t.startsWith("--"))
    e.setProperty(t, s);
  else {
    const n = _r(e, t);
    Hn.test(s) ? e.setProperty(
      pt(n),
      s.replace(Hn, ""),
      "important"
    ) : e[n] = s;
  }
}
const Nn = ["Webkit", "Moz", "ms"], As = {};
function _r(e, t) {
  const s = As[t];
  if (s)
    return s;
  let n = Ze(t);
  if (n !== "filter" && n in e)
    return As[t] = n;
  n = so(n);
  for (let o = 0; o < Nn.length; o++) {
    const i = Nn[o] + n;
    if (i in e)
      return As[t] = i;
  }
  return t;
}
const Ln = "http://www.w3.org/1999/xlink";
function Un(e, t, s, n, o, i = Ei(t)) {
  n && t.startsWith("xlink:") ? s == null ? e.removeAttributeNS(Ln, t.slice(6, t.length)) : e.setAttributeNS(Ln, t, s) : s == null || i && !oo(s) ? e.removeAttribute(t) : e.setAttribute(
    t,
    i ? "" : De(s) ? String(s) : s
  );
}
function Bn(e, t, s, n, o) {
  if (t === "innerHTML" || t === "textContent") {
    s != null && (e[t] = t === "innerHTML" ? ii(s) : s);
    return;
  }
  const i = e.tagName;
  if (t === "value" && i !== "PROGRESS" && // custom elements may use _value internally
  !i.includes("-")) {
    const r = i === "OPTION" ? e.getAttribute("value") || "" : e.value, c = s == null ? (
      // #11647: value should be set as empty string for null and undefined,
      // but <input type="checkbox"> should be set as 'on'.
      e.type === "checkbox" ? "on" : ""
    ) : String(s);
    (r !== c || !("_value" in e)) && (e.value = c), s == null && e.removeAttribute(t), e._value = s;
    return;
  }
  let l = !1;
  if (s === "" || s == null) {
    const r = typeof e[t];
    r === "boolean" ? s = oo(s) : s == null && r === "string" ? (s = "", l = !0) : r === "number" && (s = 0, l = !0);
  }
  try {
    e[t] = s;
  } catch {
  }
  l && e.removeAttribute(o || t);
}
function ct(e, t, s, n) {
  e.addEventListener(t, s, n);
}
function vr(e, t, s, n) {
  e.removeEventListener(t, s, n);
}
const Kn = Symbol("_vei");
function yr(e, t, s, n, o = null) {
  const i = e[Kn] || (e[Kn] = {}), l = i[t];
  if (n && l)
    l.value = n;
  else {
    const [r, c] = xr(t);
    if (n) {
      const p = i[t] = Cr(
        n,
        o
      );
      ct(e, r, p, c);
    } else l && (vr(e, r, l, c), i[t] = void 0);
  }
}
const Wn = /(?:Once|Passive|Capture)$/;
function xr(e) {
  let t;
  if (Wn.test(e)) {
    t = {};
    let n;
    for (; n = e.match(Wn); )
      e = e.slice(0, e.length - n[0].length), t[n[0].toLowerCase()] = !0;
  }
  return [e[2] === ":" ? e.slice(3) : pt(e.slice(2)), t];
}
let Ps = 0;
const wr = /* @__PURE__ */ Promise.resolve(), Sr = () => Ps || (wr.then(() => Ps = 0), Ps = Date.now());
function Cr(e, t) {
  const s = (n) => {
    if (!n._vts)
      n._vts = Date.now();
    else if (n._vts <= s.attached)
      return;
    He(
      Er(n, s.value),
      t,
      5,
      [n]
    );
  };
  return s.value = e, s.attached = Sr(), s;
}
function Er(e, t) {
  if (A(t)) {
    const s = e.stopImmediatePropagation;
    return e.stopImmediatePropagation = () => {
      s.call(e), e._stopped = !0;
    }, t.map(
      (n) => (o) => !o._stopped && n && n(o)
    );
  } else
    return t;
}
const zn = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // lowercase letter
e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, $r = (e, t, s, n, o, i) => {
  const l = o === "svg";
  t === "class" ? pr(e, n, l) : t === "style" ? br(e, s, n) : as(t) ? en(t) || yr(e, t, s, n, i) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : Tr(e, t, n, l)) ? (Bn(e, t, n), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && Un(e, t, n, l, i, t !== "value")) : /* #11081 force set props for possible async custom element */ e._isVueCE && (/[A-Z]/.test(t) || !se(n)) ? Bn(e, Ze(t), n, i, t) : (t === "true-value" ? e._trueValue = n : t === "false-value" && (e._falseValue = n), Un(e, t, n, l));
};
function Tr(e, t, s, n) {
  if (n)
    return !!(t === "innerHTML" || t === "textContent" || t in e && zn(t) && R(s));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA")
    return !1;
  if (t === "width" || t === "height") {
    const o = e.tagName;
    if (o === "IMG" || o === "VIDEO" || o === "CANVAS" || o === "SOURCE")
      return !1;
  }
  return zn(t) && se(s) ? !1 : t in e;
}
const us = (e) => {
  const t = e.props["onUpdate:modelValue"] || !1;
  return A(t) ? (s) => Zt(t, s) : t;
};
function Ir(e) {
  e.target.composing = !0;
}
function qn(e) {
  const t = e.target;
  t.composing && (t.composing = !1, t.dispatchEvent(new Event("input")));
}
const St = Symbol("_assign"), Se = {
  created(e, { modifiers: { lazy: t, trim: s, number: n } }, o) {
    e[St] = us(o);
    const i = n || o.props && o.props.type === "number";
    ct(e, t ? "change" : "input", (l) => {
      if (l.target.composing) return;
      let r = e.value;
      s && (r = r.trim()), i && (r = Ds(r)), e[St](r);
    }), s && ct(e, "change", () => {
      e.value = e.value.trim();
    }), t || (ct(e, "compositionstart", Ir), ct(e, "compositionend", qn), ct(e, "change", qn));
  },
  // set value on mounted so it's after min/max for type="range"
  mounted(e, { value: t }) {
    e.value = t ?? "";
  },
  beforeUpdate(e, { value: t, oldValue: s, modifiers: { lazy: n, trim: o, number: i } }, l) {
    if (e[St] = us(l), e.composing) return;
    const r = (i || e.type === "number") && !/^0\d/.test(e.value) ? Ds(e.value) : e.value, c = t ?? "";
    r !== c && (document.activeElement === e && e.type !== "range" && (n && t === s || o && e.value.trim() === c) || (e.value = c));
  }
}, Ys = {
  // #4096 array checkboxes need to be deep traversed
  deep: !0,
  created(e, t, s) {
    e[St] = us(s), ct(e, "change", () => {
      const n = e._modelValue, o = Or(e), i = e.checked, l = e[St];
      if (A(n)) {
        const r = io(n, o), c = r !== -1;
        if (i && !c)
          l(n.concat(o));
        else if (!i && c) {
          const p = [...n];
          p.splice(r, 1), l(p);
        }
      } else if (fs(n)) {
        const r = new Set(n);
        i ? r.add(o) : r.delete(o), l(r);
      } else
        l(li(e, i));
    });
  },
  // set initial checked on mount to wait for true-value/false-value
  mounted: Jn,
  beforeUpdate(e, t, s) {
    e[St] = us(s), Jn(e, t, s);
  }
};
function Jn(e, { value: t, oldValue: s }, n) {
  e._modelValue = t;
  let o;
  if (A(t))
    o = io(t, n.props.value) > -1;
  else if (fs(t))
    o = t.has(n.props.value);
  else {
    if (t === s) return;
    o = hs(t, li(e, !0));
  }
  e.checked !== o && (e.checked = o);
}
function Or(e) {
  return "_value" in e ? e._value : e.value;
}
function li(e, t) {
  const s = t ? "_trueValue" : "_falseValue";
  return s in e ? e[s] : t;
}
const Mr = ["ctrl", "shift", "alt", "meta"], kr = {
  stop: (e) => e.stopPropagation(),
  prevent: (e) => e.preventDefault(),
  self: (e) => e.target !== e.currentTarget,
  ctrl: (e) => !e.ctrlKey,
  shift: (e) => !e.shiftKey,
  alt: (e) => !e.altKey,
  meta: (e) => !e.metaKey,
  left: (e) => "button" in e && e.button !== 0,
  middle: (e) => "button" in e && e.button !== 1,
  right: (e) => "button" in e && e.button !== 2,
  exact: (e, t) => Mr.some((s) => e[`${s}Key`] && !t.includes(s))
}, rt = (e, t) => {
  const s = e._withMods || (e._withMods = {}), n = t.join(".");
  return s[n] || (s[n] = (o, ...i) => {
    for (let l = 0; l < t.length; l++) {
      const r = kr[t[l]];
      if (r && r(o, t)) return;
    }
    return e(o, ...i);
  });
}, Ar = /* @__PURE__ */ fe({ patchProp: $r }, fr);
let Gn;
function Pr() {
  return Gn || (Gn = Fl(Ar));
}
const Rr = (...e) => {
  const t = Pr().createApp(...e), { mount: s } = t;
  return t.mount = (n) => {
    const o = Vr(n);
    if (!o) return;
    const i = t._component;
    !R(i) && !i.render && !i.template && (i.template = o.innerHTML), o.nodeType === 1 && (o.textContent = "");
    const l = s(o, !1, Fr(o));
    return o instanceof Element && (o.removeAttribute("v-cloak"), o.setAttribute("data-v-app", "")), l;
  }, t;
};
function Fr(e) {
  if (e instanceof SVGElement)
    return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement)
    return "mathml";
}
function Vr(e) {
  return se(e) ? document.querySelector(e) : e;
}
const Rs = /* @__PURE__ */ new WeakMap();
function jr(e, t) {
  const s = document.createElement("div");
  s.dataset.ideogram = t.widgetType, Object.assign(s.style, {
    width: "100%",
    height: "100%",
    minHeight: `${t.minHeight ?? 80}px`,
    overflow: "hidden",
    pointerEvents: "auto"
  });
  let n = t.defaultValue;
  const o = e.addDOMWidget(t.widgetName, t.widgetType, s, {
    getMinHeight: () => t.minHeight ?? 80,
    hideOnZoom: !1,
    serialize: t.serialize ?? !0,
    getValue: () => n,
    setValue: (l) => {
      n = l;
    }
  });
  o.serializeValue = () => n, Promise.resolve().then(() => {
    try {
      const l = Rr(t.component, { widget: o, node: e });
      l.mount(s), Rs.set(o, l);
    } catch (l) {
      console.error("[IdeogramStudio] failed to mount Vue widget", t.widgetType, l);
    }
  });
  const i = o.onRemove;
  return o.onRemove = () => {
    try {
      const l = Rs.get(o);
      l && (l.unmount(), Rs.delete(o));
    } catch (l) {
      console.error("[IdeogramStudio] error during widget unmount", l);
    }
    try {
      i?.call(o);
    } catch (l) {
      console.error("[IdeogramStudio] error in chained onRemove", l);
    }
  }, { widget: o };
}
const Yn = [
  "#3B82F6",
  "#F59E0B",
  "#10B981",
  "#EF4444",
  "#8B5CF6",
  "#EC4899",
  "#14B8A6",
  "#F97316",
  "#84CC16",
  "#06B6D4"
];
let Xn = 0;
function Dr() {
  const e = Yn[Xn % Yn.length];
  return Xn += 1, e;
}
const Fs = [
  { label: "1:1 · 1024×1024", w: 1024, h: 1024 },
  { label: "3:2 · 1248×832", w: 1248, h: 832 },
  { label: "2:3 · 832×1248", w: 832, h: 1248 },
  { label: "16:9 · 1344×768", w: 1344, h: 768 },
  { label: "9:16 · 768×1344", w: 768, h: 1344 },
  { label: "4:3 · 1152×896", w: 1152, h: 896 },
  { label: "3:4 · 896×1152", w: 896, h: 1152 },
  { label: "16:10 · 1280×800", w: 1280, h: 800 }
];
function Hr() {
  return { lineWidth: 3, fillAlpha: 0.18, labelSize: 16, showIndex: !0, showText: !0 };
}
function Nr() {
  return {
    enabled: !0,
    mode: "photo",
    aesthetics: "",
    lighting: "",
    medium: "photograph",
    photo: "",
    art_style: "",
    color_palette: []
  };
}
let Vs = 0;
function ri() {
  return Vs += 1, `el_${Vs}_${Vs * 2654435761 % 1e5}`;
}
function js(e, t = null) {
  return { id: ri(), type: e, bbox: t, desc: "", text: "", color_palette: [], boxColor: Dr(), linkId: null, enabled: !0 };
}
function ss() {
  return {
    high_level_description: "",
    width: 1024,
    height: 1024,
    style: Nr(),
    background: "",
    elements: [],
    overlay: Hr()
  };
}
const Lr = /^#[0-9A-F]{6}$/;
function ci(e) {
  let t = (e || "").trim().toUpperCase();
  return t.startsWith("#") || (t = "#" + t), t.length === 4 && (t = "#" + t.slice(1).split("").map((s) => s + s).join("")), Lr.test(t) ? t : null;
}
function Zn(e, t, s, n) {
  const o = [];
  for (const i of e || []) {
    const l = ci(i);
    if (!l) {
      i && i.trim() && n.push(`${s}: dropped invalid hex ${i}`);
      continue;
    }
    o.push(l);
  }
  return o.length > t && (n.push(`${s}: ${o.length} colors exceeds max ${t}; truncated`), o.length = t), o.length ? o : null;
}
function Ur(e) {
  const t = (l) => Math.max(0, Math.min(1e3, Math.round(l)));
  let [s, n, o, i] = e.map(t);
  return s > o && ([s, o] = [o, s]), n > i && ([n, i] = [i, n]), [s, n, o, i];
}
function Xs(e) {
  const t = [], s = {}, n = e.high_level_description.trim();
  if (n ? s.high_level_description = n : t.push("high_level_description is empty (strongly recommended)"), e.style.enabled) {
    const l = e.style, r = l.mode === "photo", c = {};
    for (const m of ["aesthetics", "lighting", "medium"]) {
      const C = l[m].trim();
      C ? c[m] = C : t.push(`style_description.${m} is required`);
    }
    if (r) {
      const m = l.photo.trim();
      m ? c.photo = m : t.push("style_description.photo is required in photo mode");
    } else {
      const m = l.art_style.trim();
      m ? c.art_style = m : t.push("style_description.art_style is required in art mode");
    }
    const p = Zn(l.color_palette, 16, "style_description.color_palette", t), a = {}, d = r ? ["aesthetics", "lighting", "photo", "medium", "color_palette"] : ["aesthetics", "lighting", "medium", "art_style", "color_palette"];
    for (const m of d) c[m] !== void 0 && (a[m] = c[m]);
    p && (a.color_palette = p), s.style_description = a;
  }
  const o = e.background.trim();
  o || t.push("compositional_deconstruction.background is required");
  const i = [];
  return e.elements.forEach((l, r) => {
    if (l.enabled === !1) return;
    const c = { type: l.type };
    if (l.bbox && (c.bbox = Ur(l.bbox)), l.type === "text") {
      const C = l.text.trim();
      C || t.push(`elements[${r}]: text element has no text to render`), c.text = C;
    }
    const p = l.desc.trim();
    p || t.push(`elements[${r}]: desc is empty`), c.desc = p;
    const a = Zn(l.color_palette, 5, `elements[${r}].color_palette`, t);
    a && (c.color_palette = a);
    const d = l.type === "text" ? ["type", "bbox", "text", "desc", "color_palette"] : ["type", "bbox", "desc", "color_palette"], m = {};
    for (const C of d) c[C] !== void 0 && (m[C] = c[C]);
    i.push(m);
  }), s.compositional_deconstruction = { background: o, elements: i }, { caption: s, warnings: t };
}
function Br(e) {
  const { caption: t, warnings: s } = Xs(e);
  return {
    json: JSON.stringify(t),
    // minified, matches separators=(",",":")
    pretty: JSON.stringify(t, null, 2),
    warnings: s
  };
}
const ui = Symbol("ideogram-studio");
function Kr() {
  const e = ms({
    state: ss(),
    selectedId: null,
    // history (snapshots of JSON state)
    _hist: [],
    _hi: -1,
    restoring: !1,
    get canUndo() {
      return e._hi > 0;
    },
    get canRedo() {
      return e._hi >= 0 && e._hi < e._hist.length - 1;
    },
    snapshot() {
      if (e.restoring) return;
      const t = JSON.stringify(e.state);
      e._hist[e._hi] !== t && (e._hist = e._hist.slice(0, e._hi + 1), e._hist.push(t), e._hist.length > 80 && e._hist.shift(), e._hi = e._hist.length - 1);
    },
    _restore(t) {
      e.restoring = !0;
      const s = JSON.parse(t);
      Object.assign(e.state, ss(), s), e.selectedId && !e.getElement(e.selectedId) && (e.selectedId = null), setTimeout(() => {
        e.restoring = !1;
      }, 0);
    },
    undo() {
      e.canUndo && (e._hi -= 1, e._restore(e._hist[e._hi]));
    },
    redo() {
      e.canRedo && (e._hi += 1, e._restore(e._hist[e._hi]));
    },
    resetHistory() {
      e._hist = [JSON.stringify(e.state)], e._hi = 0;
    },
    select(t) {
      e.selectedId = t;
    },
    addElement(t, s = null) {
      const n = js(t, s);
      return e.state.elements.push(n), e.selectedId = n.id, n;
    },
    removeElement(t) {
      const s = e.state.elements.findIndex((n) => n.id === t);
      s >= 0 && e.state.elements.splice(s, 1), e.selectedId === t && (e.selectedId = null);
    },
    duplicateElement(t) {
      const s = e.getElement(t);
      if (!s) return;
      const n = js(s.type, s.bbox ? [...s.bbox] : null);
      n.desc = s.desc, n.text = s.text, n.color_palette = [...s.color_palette], n.bbox && (n.bbox = n.bbox.map((o, i) => Math.max(0, Math.min(1e3, o + (i < 2, 20))))), e.state.elements.push(n), e.selectedId = n.id;
    },
    toggleEnabled(t) {
      const s = e.getElement(t);
      s && (s.enabled = s.enabled === !1);
    },
    duplicateLinked(t) {
      const s = e.getElement(t);
      if (!s) return;
      s.linkId || (s.linkId = ri());
      const n = js(s.type, s.bbox ? [...s.bbox] : null);
      n.desc = s.desc, n.text = s.text, n.color_palette = [...s.color_palette], n.boxColor = s.boxColor, n.linkId = s.linkId, n.bbox && (n.bbox = n.bbox.map((o, i) => Math.max(0, Math.min(1e3, o + (i < 2, 30))))), e.state.elements.push(n), e.selectedId = n.id;
    },
    unlink(t) {
      const s = e.getElement(t);
      s && (s.linkId = null);
    },
    linkGroupSize(t) {
      const s = e.getElement(t);
      return s?.linkId ? e.state.elements.filter((n) => n.linkId === s.linkId).length : 1;
    },
    setShared(t, s, n) {
      const o = e.getElement(t);
      if (!o) return;
      const i = o.linkId ? e.state.elements.filter((l) => l.linkId === o.linkId) : [o];
      for (const l of i) l[s] = n;
    },
    moveElement(t, s) {
      const n = e.state.elements.findIndex((l) => l.id === t), o = n + s;
      if (n < 0 || o < 0 || o >= e.state.elements.length) return;
      const i = e.state.elements;
      [i[n], i[o]] = [i[o], i[n]];
    },
    getElement(t) {
      return e.state.elements.find((s) => s.id === t);
    },
    load(t) {
      Object.assign(e.state, ss(), t);
    }
  });
  return e;
}
function Wr(e) {
  Do(ui, e);
}
function zt() {
  const e = Vt(ui);
  if (!e) throw new Error("StudioStore not provided");
  return e;
}
const zr = { class: "canvas-wrap" }, qr = { class: "seg" }, Jr = { class: "dims" }, Gr = ["data-box"], Yr = ["data-handle"], Xr = { class: "coordhint" }, Zr = /* @__PURE__ */ ht({
  __name: "BBoxCanvas",
  setup(e) {
    const t = zt(), s = ["nw", "n", "ne", "e", "se", "s", "sw", "w"], n = Ye("obj"), o = Ye(!0), i = Ye(null), l = Ye(null), r = Ye("drag on empty space to add a box · drag a box to move · drag a handle to resize"), c = Ie(() => t.state.elements.filter((x) => x.bbox)), p = Ie(() => ({ aspectRatio: `${t.state.width} / ${t.state.height}` }));
    function a(x, O) {
      const F = x.replace("#", ""), Y = parseInt(F.slice(0, 2), 16) || 0, D = parseInt(F.slice(2, 4), 16) || 0, K = parseInt(F.slice(4, 6), 16) || 0;
      return `rgba(${Y},${D},${K},${O})`;
    }
    function d(x) {
      const [O, F, Y, D] = x.bbox, K = x.boxColor || "#3b82f6";
      return {
        left: `${F / 10}%`,
        top: `${O / 10}%`,
        width: `${(D - F) / 10}%`,
        height: `${(Y - O) / 10}%`,
        borderColor: K,
        // outline-first: no fill by default so overlapping boxes stay readable;
        // a faint tint appears on hover/selection (see CSS using --c).
        "--c": K,
        "--fill": a(K, 0.16)
      };
    }
    function m(x) {
      return { background: a(x.boxColor || "#3b82f6", 0.88), color: "#fff" };
    }
    const C = (x) => Math.max(0, Math.min(1e3, Math.round(x)));
    function H(x) {
      const O = i.value.getBoundingClientRect();
      return {
        x: C((x.clientX - O.left) / O.width * 1e3),
        y: C((x.clientY - O.top) / O.height * 1e3)
      };
    }
    let T = null;
    function ne(x) {
      x.preventDefault(), x.stopPropagation();
      try {
        i.value.setPointerCapture(x.pointerId);
      } catch {
      }
      const O = x.target, F = O.dataset.handle, Y = O.closest("[data-box]")?.getAttribute("data-box") ?? void 0, D = H(x);
      if (F && t.selectedId) {
        const K = t.getElement(t.selectedId);
        if (K?.bbox) {
          T = { kind: "resize", el: K, handle: F, start: D, moved: !1 };
          return;
        }
      }
      if (Y) {
        const K = t.getElement(Y);
        if (t.select(Y), K?.bbox) {
          T = { kind: "move", el: K, start: D, startBbox: [...K.bbox], moved: !1 };
          return;
        }
      }
      l.value = [D.y, D.x, D.y, D.x], T = { kind: "draw", start: D, moved: !1 };
    }
    function B(x) {
      if (!T) return;
      x.preventDefault();
      const O = H(x);
      if ((Math.abs(O.x - T.start.x) > 2 || Math.abs(O.y - T.start.y) > 2) && (T.moved = !0), T.kind === "draw")
        l.value = [Math.min(T.start.y, O.y), Math.min(T.start.x, O.x), Math.max(T.start.y, O.y), Math.max(T.start.x, O.x)], r.value = G(l.value);
      else if (T.kind === "move" && T.el && T.startBbox) {
        const F = O.y - T.start.y, Y = O.x - T.start.x;
        let [D, K, Ne, tt] = T.startBbox;
        const ze = Ne - D, qe = tt - K;
        D = C(D + F), K = C(K + Y), D + ze > 1e3 && (D = 1e3 - ze), K + qe > 1e3 && (K = 1e3 - qe), T.el.bbox = [D, K, D + ze, K + qe], r.value = G(T.el.bbox);
      } else if (T.kind === "resize" && T.el?.bbox && T.handle) {
        let [F, Y, D, K] = T.el.bbox;
        T.handle.includes("n") && (F = Math.min(O.y, D - 2)), T.handle.includes("s") && (D = Math.max(O.y, F + 2)), T.handle.includes("w") && (Y = Math.min(O.x, K - 2)), T.handle.includes("e") && (K = Math.max(O.x, Y + 2)), T.el.bbox = [F, Y, D, K], r.value = G(T.el.bbox);
      }
    }
    function J(x) {
      if (T) {
        try {
          i.value.releasePointerCapture(x.pointerId);
        } catch {
        }
        if (T.kind === "draw") {
          const O = l.value;
          l.value = null, O && O[2] - O[0] >= 8 && O[3] - O[1] >= 8 ? t.addElement(n.value, O) : T.moved || t.select(null);
        }
        T = null;
      }
    }
    function G(x) {
      return `bbox [y${x[0]} x${x[1]} y${x[2]} x${x[3]}]  ·  ${x[3] - x[1]}×${x[2] - x[0]}`;
    }
    return (x, O) => (V(), j("div", zr, [
      g("div", {
        class: "toolbar",
        onPointerdown: O[3] || (O[3] = rt(() => {
        }, ["stop"]))
      }, [
        O[4] || (O[4] = g("span", { class: "lbl" }, "new box:", -1)),
        g("div", qr, [
          g("button", {
            class: ie({ on: n.value === "obj" }),
            title: "New boxes are objects",
            onClick: O[0] || (O[0] = (F) => n.value = "obj")
          }, "obj", 2),
          g("button", {
            class: ie({ on: n.value === "text" }),
            title: "New boxes are text",
            onClick: O[1] || (O[1] = (F) => n.value = "text")
          }, "text", 2)
        ]),
        g("span", Jr, z($(t).state.width) + "×" + z($(t).state.height), 1),
        g("button", {
          class: ie(["ghost", { on: o.value }]),
          title: "Toggle labels",
          onClick: O[2] || (O[2] = (F) => o.value = !o.value)
        }, "⌗ labels", 2)
      ], 32),
      g("div", {
        ref_key: "stage",
        ref: i,
        class: ie(["stage", { dragging: !!$(T) }]),
        onPointerdown: ne,
        onPointermove: B,
        onPointerup: J,
        onPointercancel: J,
        onLostpointercapture: J,
        style: Te(p.value)
      }, [
        O[5] || (O[5] = g("div", { class: "grid" }, null, -1)),
        (V(!0), j(le, null, ft(c.value, (F, Y) => (V(), j("div", {
          key: F.id,
          class: ie(["box", { sel: F.id === $(t).selectedId, muted: F.enabled === !1 }]),
          style: Te(d(F)),
          "data-box": F.id
        }, [
          o.value ? (V(), j("span", {
            key: 0,
            class: "tag",
            style: Te(m(F))
          }, z(F.linkId ? "🔗" : F.type === "text" ? "T" : "▣") + " " + z(Y + 1) + " · " + z(F.type === "text" ? F.text || "text" : F.desc || "obj"), 5)) : oe("", !0),
          F.id === $(t).selectedId ? (V(), j(le, { key: 1 }, ft(s, (D) => g("i", {
            key: D,
            class: ie(["h", "h-" + D]),
            "data-handle": D
          }, null, 10, Yr)), 64)) : oe("", !0)
        ], 14, Gr))), 128)),
        l.value ? (V(), j("div", {
          key: 0,
          class: "box draft",
          style: Te(d({ bbox: l.value, boxColor: "#9ca3af" }))
        }, null, 4)) : oe("", !0)
      ], 38),
      g("div", Xr, z(r.value), 1)
    ]));
  }
}), gt = (e, t) => {
  const s = e.__vccOpts || e;
  for (const [n, o] of t)
    s[n] = o;
  return s;
}, Qr = /* @__PURE__ */ gt(Zr, [["__scopeId", "data-v-237a165f"]]), ec = { class: "palette" }, tc = { class: "swatches" }, sc = ["title"], nc = ["value", "onInput"], oc = ["onClick"], ic = { class: "hint" }, lc = /* @__PURE__ */ ht({
  __name: "PaletteEditor",
  props: {
    modelValue: {},
    max: { default: 16 },
    label: { default: "colors" }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const s = e, n = t;
    function o() {
      n("update:modelValue", [...s.modelValue, "#888888"]);
    }
    function i(r) {
      const c = s.modelValue.slice();
      c.splice(r, 1), n("update:modelValue", c);
    }
    function l(r, c) {
      const p = ci(c) ?? s.modelValue[r], a = s.modelValue.slice();
      a[r] = p, n("update:modelValue", a);
    }
    return (r, c) => (V(), j("div", ec, [
      g("div", tc, [
        (V(!0), j(le, null, ft(r.modelValue, (p, a) => (V(), j("div", {
          key: a,
          class: "swatch-wrap"
        }, [
          g("label", {
            class: "swatch",
            style: Te({ background: p }),
            title: p
          }, [
            g("input", {
              type: "color",
              value: p,
              onInput: (d) => l(a, d.target.value)
            }, null, 40, nc)
          ], 12, sc),
          g("button", {
            class: "x",
            title: "Remove",
            onClick: (d) => i(a)
          }, "×", 8, oc)
        ]))), 128)),
        r.modelValue.length < r.max ? (V(), j("button", {
          key: 0,
          class: "add",
          title: "Add color",
          onClick: o
        }, "+")) : oe("", !0)
      ]),
      g("div", ic, z(r.modelValue.length) + "/" + z(r.max) + " " + z(r.label), 1)
    ]));
  }
}), ai = /* @__PURE__ */ gt(lc, [["__scopeId", "data-v-3d11bea8"]]), rc = { class: "style" }, cc = { class: "head" }, uc = { class: "en" }, ac = {
  key: 0,
  class: "seg"
}, fc = { class: "field" }, dc = { class: "field" }, pc = {
  key: 0,
  class: "field"
}, hc = { class: "field" }, gc = ["placeholder"], mc = {
  key: 1,
  class: "field"
}, bc = { class: "field" }, _c = /* @__PURE__ */ ht({
  __name: "StylePanel",
  setup(e) {
    const t = zt();
    return (s, n) => (V(), j("div", rc, [
      g("div", cc, [
        g("label", uc, [
          he(g("input", {
            type: "checkbox",
            "onUpdate:modelValue": n[0] || (n[0] = (o) => $(t).state.style.enabled = o)
          }, null, 512), [
            [Ys, $(t).state.style.enabled]
          ]),
          n[9] || (n[9] = $e(" style_description"))
        ]),
        $(t).state.style.enabled ? (V(), j("div", ac, [
          g("button", {
            class: ie({ on: $(t).state.style.mode === "photo" }),
            onClick: n[1] || (n[1] = (o) => $(t).state.style.mode = "photo")
          }, "photo", 2),
          g("button", {
            class: ie({ on: $(t).state.style.mode === "art" }),
            onClick: n[2] || (n[2] = (o) => $(t).state.style.mode = "art")
          }, "art", 2)
        ])) : oe("", !0)
      ]),
      $(t).state.style.enabled ? (V(), j(le, { key: 0 }, [
        g("label", fc, [
          n[10] || (n[10] = g("span", null, "aesthetics", -1)),
          he(g("input", {
            "onUpdate:modelValue": n[3] || (n[3] = (o) => $(t).state.style.aesthetics = o),
            placeholder: "moody, cinematic, desaturated"
          }, null, 512), [
            [Se, $(t).state.style.aesthetics]
          ])
        ]),
        g("label", dc, [
          n[11] || (n[11] = g("span", null, "lighting", -1)),
          he(g("input", {
            "onUpdate:modelValue": n[4] || (n[4] = (o) => $(t).state.style.lighting = o),
            placeholder: "golden hour, rim light, soft shadows"
          }, null, 512), [
            [Se, $(t).state.style.lighting]
          ])
        ]),
        $(t).state.style.mode === "photo" ? (V(), j("label", pc, [
          n[12] || (n[12] = g("span", null, "photo (camera/lens)", -1)),
          he(g("input", {
            "onUpdate:modelValue": n[5] || (n[5] = (o) => $(t).state.style.photo = o),
            placeholder: "35mm, f/1.4, shallow depth of field"
          }, null, 512), [
            [Se, $(t).state.style.photo]
          ])
        ])) : oe("", !0),
        g("label", hc, [
          n[13] || (n[13] = g("span", null, "medium", -1)),
          he(g("input", {
            "onUpdate:modelValue": n[6] || (n[6] = (o) => $(t).state.style.medium = o),
            placeholder: $(t).state.style.mode === "photo" ? "photograph" : "illustration / 3d_render / painting…",
            list: "media"
          }, null, 8, gc), [
            [Se, $(t).state.style.medium]
          ]),
          n[14] || (n[14] = g("datalist", { id: "media" }, [
            g("option", null, "photograph"),
            g("option", null, "illustration"),
            g("option", null, "3d_render"),
            g("option", null, "painting"),
            g("option", null, "graphic_design")
          ], -1))
        ]),
        $(t).state.style.mode === "art" ? (V(), j("label", mc, [
          n[15] || (n[15] = g("span", null, "art_style", -1)),
          he(g("input", {
            "onUpdate:modelValue": n[7] || (n[7] = (o) => $(t).state.style.art_style = o),
            placeholder: "flat vector illustration, bold outlines"
          }, null, 512), [
            [Se, $(t).state.style.art_style]
          ])
        ])) : oe("", !0),
        g("div", bc, [
          n[16] || (n[16] = g("span", null, "color_palette (max 16)", -1)),
          ue(ai, {
            modelValue: $(t).state.style.color_palette,
            "onUpdate:modelValue": n[8] || (n[8] = (o) => $(t).state.style.color_palette = o),
            max: 16,
            label: "image colors"
          }, null, 8, ["modelValue"])
        ])
      ], 64)) : oe("", !0)
    ]));
  }
}), vc = /* @__PURE__ */ gt(_c, [["__scopeId", "data-v-41f81c5e"]]), yc = { class: "ellist" }, xc = { class: "head" }, wc = { class: "adds" }, Sc = ["onClick"], Cc = ["title", "onClick"], Ec = { class: "idx" }, $c = ["title"], Tc = { class: "snip" }, Ic = ["title"], Oc = { class: "ops" }, Mc = ["onClick"], kc = ["onClick"], Ac = ["onClick"], Pc = ["onClick"], Rc = ["onClick"], Fc = {
  key: 0,
  class: "empty"
}, Vc = /* @__PURE__ */ ht({
  __name: "ElementList",
  setup(e) {
    const t = zt();
    return (s, n) => (V(), j("div", yc, [
      g("div", xc, [
        g("span", null, "Elements (" + z($(t).state.elements.length) + ")", 1),
        g("div", wc, [
          g("button", {
            class: "obj",
            title: "Add object",
            onClick: n[0] || (n[0] = (o) => $(t).addElement("obj"))
          }, "＋ obj"),
          g("button", {
            class: "text",
            title: "Add text",
            onClick: n[1] || (n[1] = (o) => $(t).addElement("text"))
          }, "＋ text")
        ])
      ]),
      g("ul", null, [
        (V(!0), j(le, null, ft($(t).state.elements, (o, i) => (V(), j("li", {
          key: o.id,
          class: ie({ sel: o.id === $(t).selectedId, muted: o.enabled === !1 }),
          onClick: (l) => $(t).select(o.id)
        }, [
          g("button", {
            class: "eye",
            title: o.enabled === !1 ? "Muted — click to enable" : "Mute (keep, exclude from output)",
            onClick: rt((l) => $(t).toggleEnabled(o.id), ["stop"])
          }, z(o.enabled === !1 ? "🚫" : "👁"), 9, Cc),
          g("span", {
            class: "dot",
            style: Te({ background: o.boxColor })
          }, null, 4),
          g("span", Ec, z(i + 1), 1),
          o.linkId ? (V(), j("span", {
            key: 0,
            class: "link",
            title: "Linked ×" + $(t).linkGroupSize(o.id)
          }, "🔗", 8, $c)) : oe("", !0),
          g("span", Tc, z(o.type === "text" ? "“" + (o.text || "…") + "”" : o.desc || "object…"), 1),
          g("span", {
            class: "bb",
            title: o.bbox ? "has bbox" : "no bbox (model auto-places)"
          }, z(o.bbox ? "▣" : "◌"), 9, Ic),
          g("span", Oc, [
            g("button", {
              title: "Move up",
              onClick: rt((l) => $(t).moveElement(o.id, -1), ["stop"])
            }, "↑", 8, Mc),
            g("button", {
              title: "Move down",
              onClick: rt((l) => $(t).moveElement(o.id, 1), ["stop"])
            }, "↓", 8, kc),
            g("button", {
              title: "Linked copy (shares prompt, own position)",
              onClick: rt((l) => $(t).duplicateLinked(o.id), ["stop"])
            }, "🔗", 8, Ac),
            g("button", {
              title: "Duplicate",
              onClick: rt((l) => $(t).duplicateElement(o.id), ["stop"])
            }, "⧉", 8, Pc),
            g("button", {
              title: "Delete",
              onClick: rt((l) => $(t).removeElement(o.id), ["stop"])
            }, "✕", 8, Rc)
          ])
        ], 10, Sc))), 128))
      ]),
      $(t).state.elements.length ? oe("", !0) : (V(), j("p", Fc, "No elements yet — draw a box on the canvas or use ＋ obj / ＋ text."))
    ]));
  }
}), jc = /* @__PURE__ */ gt(Vc, [["__scopeId", "data-v-e924e066"]]), Dc = {
  key: 0,
  class: "editor"
}, Hc = { class: "row type-row" }, Nc = ["title"], Lc = ["value"], Uc = { class: "lbl" }, Bc = { class: "seg" }, Kc = ["title"], Wc = ["title"], zc = ["checked"], qc = { class: "row link-row" }, Jc = {
  key: 1,
  class: "unlinked"
}, Gc = {
  key: 3,
  class: "hint"
}, Yc = {
  key: 0,
  class: "row bbox-row"
}, Xc = ["value", "onInput"], Zc = {
  key: 1,
  class: "field"
}, Qc = ["value"], eu = { class: "field" }, tu = ["value", "placeholder"], su = { class: "field" }, nu = {
  key: 1,
  class: "editor empty"
}, ou = /* @__PURE__ */ ht({
  __name: "ElementEditor",
  setup(e) {
    const t = zt(), s = Ie(() => t.getElement(t.selectedId)), n = Ie(() => t.state.elements.findIndex((p) => p.id === t.selectedId)), o = Ie(() => !!s.value?.linkId), i = Ie(() => s.value ? t.linkGroupSize(s.value.id) : 1);
    function l(p, a) {
      s.value && t.setShared(s.value.id, p, a);
    }
    function r(p) {
      s.value && (s.value.bbox = p.target.checked ? [300, 300, 700, 700] : null);
    }
    function c(p, a) {
      s.value?.bbox && (s.value.bbox[p] = Math.max(0, Math.min(1e3, Math.round(Number(a) || 0))));
    }
    return (p, a) => s.value ? (V(), j("div", Dc, [
      g("div", Hc, [
        g("label", {
          class: "color",
          title: "Box color" + (o.value ? " (shared with link group)" : "")
        }, [
          g("span", {
            class: "chip",
            style: Te({ background: s.value.boxColor })
          }, null, 4),
          g("input", {
            type: "color",
            value: s.value.boxColor,
            onInput: a[0] || (a[0] = (d) => l("boxColor", d.target.value))
          }, null, 40, Lc)
        ], 8, Nc),
        g("span", Uc, "#" + z(n.value + 1), 1),
        g("div", Bc, [
          g("button", {
            class: ie({ on: s.value.type === "obj" }),
            onClick: a[1] || (a[1] = (d) => l("type", "obj"))
          }, "object", 2),
          g("button", {
            class: ie({ on: s.value.type === "text" }),
            onClick: a[2] || (a[2] = (d) => l("type", "text"))
          }, "text", 2)
        ]),
        g("button", {
          class: ie(["mute", { off: s.value.enabled === !1 }]),
          title: s.value.enabled === !1 ? "Muted — excluded from output. Click to enable." : "Mute (keep but exclude from output)",
          onClick: a[3] || (a[3] = (d) => $(t).toggleEnabled(s.value.id))
        }, z(s.value.enabled === !1 ? "🚫 muted" : "👁 active"), 11, Kc),
        g("label", {
          class: "bbtoggle",
          title: s.value.bbox ? "Remove bbox (let model auto-place)" : "Add a default bbox"
        }, [
          g("input", {
            type: "checkbox",
            checked: !!s.value.bbox,
            onChange: r
          }, null, 40, zc),
          a[9] || (a[9] = $e(" bbox "))
        ], 8, Wc)
      ]),
      g("div", qc, [
        o.value ? (V(), j("span", {
          key: 0,
          class: "linkbadge",
          style: Te({ borderColor: s.value.boxColor })
        }, "🔗 linked ×" + z(i.value), 5)) : (V(), j("span", Jc, "not linked")),
        g("button", {
          class: "mini",
          title: "Make a linked copy (shares prompt, own position)",
          onClick: a[4] || (a[4] = (d) => $(t).duplicateLinked(s.value.id))
        }, "＋ linked copy"),
        o.value ? (V(), j("button", {
          key: 2,
          class: "mini",
          title: "Detach this box from its link group",
          onClick: a[5] || (a[5] = (d) => $(t).unlink(s.value.id))
        }, "unlink")) : oe("", !0),
        o.value ? (V(), j("span", Gc, "editing prompt/text/color updates all " + z(i.value) + "; bbox stays per-box", 1)) : oe("", !0)
      ]),
      s.value.bbox ? (V(), j("div", Yc, [
        (V(), j(le, null, ft(["y₀", "x₀", "y₁", "x₁"], (d, m) => g("label", { key: d }, [
          $e(z(d) + " ", 1),
          g("input", {
            type: "number",
            min: "0",
            max: "1000",
            value: s.value.bbox[m],
            onInput: (C) => c(m, C.target.value)
          }, null, 40, Xc)
        ])), 64))
      ])) : oe("", !0),
      s.value.type === "text" ? (V(), j("label", Zc, [
        a[10] || (a[10] = g("span", null, "Text to render", -1)),
        g("input", {
          value: s.value.text,
          type: "text",
          placeholder: "literal text the model should draw",
          onInput: a[6] || (a[6] = (d) => l("text", d.target.value))
        }, null, 40, Qc)
      ])) : oe("", !0),
      g("label", eu, [
        a[11] || (a[11] = g("span", null, "Description", -1)),
        g("textarea", {
          value: s.value.desc,
          rows: "2",
          placeholder: s.value.type === "text" ? "how the text looks (font, color, placement)" : "detailed description of this object",
          onInput: a[7] || (a[7] = (d) => l("desc", d.target.value))
        }, null, 40, tu)
      ]),
      g("div", su, [
        a[12] || (a[12] = g("span", null, "Per-element palette (max 5)", -1)),
        ue(ai, {
          modelValue: s.value.color_palette,
          max: 5,
          label: "element colors",
          "onUpdate:modelValue": a[8] || (a[8] = (d) => l("color_palette", d))
        }, null, 8, ["modelValue"])
      ])
    ])) : (V(), j("div", nu, "Select an element to edit it, or draw a box on the canvas."));
  }
}), iu = /* @__PURE__ */ gt(ou, [["__scopeId", "data-v-ca5140c7"]]), lu = { class: "preview" }, ru = { class: "head" }, cu = { class: "actions" }, uu = ["title"], au = {
  key: 0,
  class: "json"
}, fu = {
  key: 1,
  class: "warnlist"
}, du = /* @__PURE__ */ ht({
  __name: "JsonPreview",
  setup(e) {
    const t = zt(), s = Ye(!0), n = Ye(!1), o = Ie(() => Br(t.state)), i = Ie(() => o.value.pretty), l = Ie(() => o.value.warnings);
    async function r() {
      try {
        await navigator.clipboard.writeText(o.value.json), n.value = !0, setTimeout(() => n.value = !1, 1200);
      } catch {
      }
    }
    return (c, p) => (V(), j("div", lu, [
      g("div", ru, [
        p[1] || (p[1] = g("span", null, "JSON caption", -1)),
        g("div", cu, [
          g("span", {
            class: ie(["warns", { ok: !l.value.length }]),
            title: l.value.join(`
`)
          }, z(l.value.length ? `⚠ ${l.value.length}` : "✓ valid"), 11, uu),
          g("button", { onClick: r }, z(n.value ? "copied ✓" : "copy"), 1),
          g("button", {
            onClick: p[0] || (p[0] = (a) => s.value = !s.value)
          }, z(s.value ? "hide" : "show"), 1)
        ])
      ]),
      s.value ? (V(), j("pre", au, z(i.value), 1)) : oe("", !0),
      s.value && l.value.length ? (V(), j("ul", fu, [
        (V(!0), j(le, null, ft(l.value, (a, d) => (V(), j("li", { key: d }, z(a), 1))), 128))
      ])) : oe("", !0)
    ]));
  }
}), pu = /* @__PURE__ */ gt(du, [["__scopeId", "data-v-d02f898f"]]), hu = { class: "studio" }, gu = { class: "topbar" }, mu = { class: "tools" }, bu = ["disabled"], _u = ["disabled"], vu = ["value"], yu = ["value"], xu = {
  key: 0,
  value: "custom"
}, wu = {
  key: 0,
  class: "advanced"
}, Su = { class: "ck" }, Cu = { class: "ck" }, Eu = { class: "hld" }, $u = { class: "main" }, Tu = { class: "left" }, Iu = { class: "bg" }, Ou = { class: "right" }, Mu = /* @__PURE__ */ ht({
  __name: "IdeogramStudio",
  props: {
    widget: {},
    node: {}
  },
  setup(e) {
    const t = e, s = Kr();
    Wr(s);
    const n = Ye(!1), o = Ie(() => {
      const a = Fs.find((d) => d.w === s.state.width && d.h === s.state.height);
      return a ? a.label : "custom";
    });
    function i(a) {
      const d = Fs.find((m) => m.label === a);
      d && (s.state.width = d.w, s.state.height = d.h);
    }
    function l() {
      return JSON.parse(JSON.stringify(s.state));
    }
    function r() {
      s.load(ss()), s.select(null), s.resetHistory();
    }
    let c;
    function p() {
      clearTimeout(c), c = setTimeout(() => s.snapshot(), 350);
    }
    return Po(() => {
      const a = t.widget?.value;
      a && typeof a == "object" && a.studio && s.load(a.studio), s.resetHistory(), t.widget.serializeValue = async () => {
        const { caption: d } = Xs(s.state);
        return { caption: d, studio: l() };
      }, Qt(
        () => s.state,
        () => {
          const { caption: d } = Xs(s.state);
          t.widget.value = { caption: d, studio: l() }, s.restoring || p();
        },
        { deep: !0, immediate: !0 }
      );
    }), (a, d) => (V(), j("div", hu, [
      g("div", gu, [
        d[13] || (d[13] = g("div", { class: "title" }, "🎨 Ideogram Studio", -1)),
        g("div", mu, [
          g("button", {
            class: "ic",
            disabled: !$(s).canUndo,
            title: "Undo",
            onClick: d[0] || (d[0] = (m) => $(s).undo())
          }, "↶", 8, bu),
          g("button", {
            class: "ic",
            disabled: !$(s).canRedo,
            title: "Redo",
            onClick: d[1] || (d[1] = (m) => $(s).redo())
          }, "↷", 8, _u),
          g("select", {
            class: "fmt",
            value: o.value,
            onChange: d[2] || (d[2] = (m) => i(m.target.value)),
            title: "Output format / resolution"
          }, [
            (V(!0), j(le, null, ft($(Fs), (m) => (V(), j("option", {
              key: m.label,
              value: m.label
            }, z(m.label), 9, yu))), 128)),
            o.value === "custom" ? (V(), j("option", xu, "custom " + z($(s).state.width) + "×" + z($(s).state.height), 1)) : oe("", !0)
          ], 40, vu),
          g("button", {
            class: ie(["ic", { on: n.value }]),
            title: "Advanced overlay settings",
            onClick: d[3] || (d[3] = (m) => n.value = !n.value)
          }, "⚙", 2),
          g("button", {
            class: "reset",
            title: "Clear everything",
            onClick: r
          }, "reset")
        ])
      ]),
      n.value ? (V(), j("div", wu, [
        g("label", null, [
          d[14] || (d[14] = $e("W ")),
          he(g("input", {
            type: "number",
            min: "16",
            max: "8192",
            step: "8",
            "onUpdate:modelValue": d[4] || (d[4] = (m) => $(s).state.width = m)
          }, null, 512), [
            [
              Se,
              $(s).state.width,
              void 0,
              { number: !0 }
            ]
          ])
        ]),
        g("label", null, [
          d[15] || (d[15] = $e("H ")),
          he(g("input", {
            type: "number",
            min: "16",
            max: "8192",
            step: "8",
            "onUpdate:modelValue": d[5] || (d[5] = (m) => $(s).state.height = m)
          }, null, 512), [
            [
              Se,
              $(s).state.height,
              void 0,
              { number: !0 }
            ]
          ])
        ]),
        g("label", null, [
          d[16] || (d[16] = $e("line ")),
          he(g("input", {
            type: "number",
            min: "1",
            max: "40",
            "onUpdate:modelValue": d[6] || (d[6] = (m) => $(s).state.overlay.lineWidth = m)
          }, null, 512), [
            [
              Se,
              $(s).state.overlay.lineWidth,
              void 0,
              { number: !0 }
            ]
          ])
        ]),
        g("label", null, [
          d[17] || (d[17] = $e("fill ")),
          he(g("input", {
            type: "range",
            min: "0",
            max: "1",
            step: "0.02",
            "onUpdate:modelValue": d[7] || (d[7] = (m) => $(s).state.overlay.fillAlpha = m)
          }, null, 512), [
            [
              Se,
              $(s).state.overlay.fillAlpha,
              void 0,
              { number: !0 }
            ]
          ])
        ]),
        g("label", null, [
          d[18] || (d[18] = $e("label ")),
          he(g("input", {
            type: "number",
            min: "6",
            max: "96",
            "onUpdate:modelValue": d[8] || (d[8] = (m) => $(s).state.overlay.labelSize = m)
          }, null, 512), [
            [
              Se,
              $(s).state.overlay.labelSize,
              void 0,
              { number: !0 }
            ]
          ])
        ]),
        g("label", Su, [
          he(g("input", {
            type: "checkbox",
            "onUpdate:modelValue": d[9] || (d[9] = (m) => $(s).state.overlay.showIndex = m)
          }, null, 512), [
            [Ys, $(s).state.overlay.showIndex]
          ]),
          d[19] || (d[19] = $e(" idx"))
        ]),
        g("label", Cu, [
          he(g("input", {
            type: "checkbox",
            "onUpdate:modelValue": d[10] || (d[10] = (m) => $(s).state.overlay.showText = m)
          }, null, 512), [
            [Ys, $(s).state.overlay.showText]
          ]),
          d[20] || (d[20] = $e(" text"))
        ])
      ])) : oe("", !0),
      g("label", Eu, [
        d[21] || (d[21] = g("span", null, "high_level_description", -1)),
        he(g("textarea", {
          "onUpdate:modelValue": d[11] || (d[11] = (m) => $(s).state.high_level_description = m),
          rows: "2",
          placeholder: "One or two sentences summarizing the whole image (strongly recommended)."
        }, null, 512), [
          [Se, $(s).state.high_level_description]
        ])
      ]),
      g("div", $u, [
        g("div", Tu, [
          ue(Qr),
          g("label", Iu, [
            d[22] || (d[22] = g("span", null, "background", -1)),
            he(g("textarea", {
              "onUpdate:modelValue": d[12] || (d[12] = (m) => $(s).state.background = m),
              rows: "2",
              placeholder: "Describe the background / environment (required)."
            }, null, 512), [
              [Se, $(s).state.background]
            ])
          ])
        ]),
        g("div", Ou, [
          ue(vc),
          d[23] || (d[23] = g("hr", null, null, -1)),
          ue(jc)
        ])
      ]),
      ue(iu),
      ue(pu)
    ]));
  }
}), ku = /* @__PURE__ */ gt(Mu, [["__scopeId", "data-v-10629887"]]), fi = "[data-ideogram]";
function di(e) {
  const t = e.target;
  return !!(t && typeof t.closest == "function" && t.closest(fi));
}
function Au(e) {
  const t = e.closest(fi);
  if (!t) return null;
  let s = e;
  for (; s && s !== t.parentElement; ) {
    if (s instanceof HTMLElement) {
      if (s.tagName === "TEXTAREA") return s;
      const n = getComputedStyle(s), o = (n.overflowY === "auto" || n.overflowY === "scroll") && s.scrollHeight > s.clientHeight, i = (n.overflowX === "auto" || n.overflowX === "scroll") && s.scrollWidth > s.clientWidth;
      if (o || i) return s;
    }
    s = s.parentElement;
  }
  return null;
}
document.addEventListener(
  "wheel",
  (e) => {
    if (!di(e)) return;
    const t = e.target;
    if (!t) return;
    const s = Au(t);
    if (s) {
      if (s.tagName === "TEXTAREA") {
        e.stopPropagation(), e.stopImmediatePropagation();
        return;
      }
      e.preventDefault(), e.stopPropagation(), e.stopImmediatePropagation(), s.scrollTop += e.deltaY, s.scrollLeft += e.deltaX;
    }
  },
  { capture: !0, passive: !1 }
);
function Pu() {
  const e = Zs.canvas;
  if (!e) return !1;
  const t = e._mousewheel_callback, s = e.canvas;
  if (!t || !s || typeof s.addEventListener != "function") return !1;
  try {
    s.removeEventListener("wheel", t);
  } catch {
  }
  const n = (o) => {
    di(o) || t.call(e, o);
  };
  return e._mousewheel_callback = n, s.addEventListener("wheel", n, { passive: !1 }), !0;
}
Zs.registerExtension({
  name: "nynxz.ideogram-studio.scrollFix",
  async setup() {
    for (let e = 0; e < 8; e++) {
      if (Pu()) return;
      await new Promise((t) => setTimeout(t, 250));
    }
    console.warn("[IdeogramStudio] could not patch canvas wheel; relying on document capture listener");
  }
});
console.log("[IdeogramStudio] main.js loaded — registering extension");
Zs.registerExtension({
  name: "nynxz.ideogram-studio",
  getCustomWidgets() {
    return {
      IDEOGRAM_STUDIO(e) {
        return jr(e, {
          widgetName: "studio",
          widgetType: "IDEOGRAM_STUDIO",
          component: ku,
          minHeight: 680,
          defaultValue: null
        });
      }
    };
  },
  nodeCreated(e) {
    const t = e;
    if (t.constructor?.comfyClass !== "IdeogramStudio") return;
    const [s, n] = t.size;
    t.setSize([Math.max(s, 560), Math.max(n, 760)]);
  }
});
