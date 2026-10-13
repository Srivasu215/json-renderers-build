const O = {
  version: "v11.0.0",
  description: "build table from store data and render to DOM uses json-to-spec, json-to-dom under the hood"
}, I = (e) => {
  const t = e;
  if (typeof globalThis > "u" || !t) return;
  globalThis.ks ?? (globalThis.ks = {});
  const o = typeof t == "function" ? t : t.render, n = typeof t == "object" ? t.getSpec : void 0;
  globalThis.ks.jsonRenderersBuild = {
    meta: O,
    renderToDom: o,
    render: o,
    ...n ? { getSpec: n } : {},
    ...typeof t == "object" ? t : {}
  };
}, y = ["table", "select", "selectOptionsOnly", "tableFromSpec"], k = ({ inConfig: e } = {}) => {
  const t = e;
  if (!t || typeof t != "object")
    throw console.error("Config must be an object"), new TypeError("Config must be an object");
  if (typeof t.type != "string" || !y.includes(t.type))
    throw console.error(`type must be one of: ${y.join(", ")}`), new Error(`type must be one of: ${y.join(", ")}`);
  if (!Array.isArray(t.data))
    throw console.error("data must be an Array"), new TypeError("data must be an Array");
  if (!Array.isArray(t.columns))
    throw console.error("columns must be an array"), new TypeError("columns must be an array");
  if (t.showLog !== void 0 && typeof t.showLog != "boolean")
    throw console.error("showLog must be a boolean"), new TypeError("showLog must be a boolean");
  return !0;
}, v = "table", P = {
  class: "table table-hover table-striped mb-0"
}, R = [], U = {
  tagName: v,
  attributes: P,
  children: R
}, J = "thead", W = [], K = {
  tagName: J,
  children: W
}, V = "tr", H = [], L = {
  tagName: V,
  children: H
}, G = "th", D = {
  value: ""
}, M = "", q = {
  tagName: G,
  attributes: D,
  textContent: M
}, _ = ({ inColumn: e } = {}) => {
  const t = structuredClone(q);
  return t.attributes.value = e, t.textContent = e, t;
}, Y = ({ inColumns: e = [] } = {}) => {
  const t = structuredClone(L), o = e.map((n) => _({ inColumn: n }));
  return t.children = o, t;
}, z = ({ inColumns: e = [] } = {}) => {
  const t = structuredClone(K), o = [
    Y({ inColumns: e })
  ];
  return t.children = o, t;
}, Q = "tbody", X = [], Z = {
  tagName: Q,
  children: X
}, T = "tr", tt = [], et = {
  tagName: T,
  children: tt
}, ot = "td", nt = {
  value: ""
}, rt = "", st = {
  tagName: ot,
  attributes: nt,
  textContent: rt
}, ct = ({ inValue: e } = {}) => {
  const t = structuredClone(st);
  return t.attributes.value = e, t.textContent = e, t;
}, lt = ({ inRow: e, inColumns: t = [] } = {}) => {
  const o = structuredClone(et), n = t.map((r) => {
    const s = Array.isArray(e) ? e[r] : e == null ? void 0 : e[r];
    return ct({ inValue: s });
  });
  return o.children = n, o;
}, at = ({ inData: e = [], inColumns: t = [] } = {}) => {
  const o = structuredClone(Z), n = e.map((r) => lt({
    inRow: r,
    inColumns: t
  }));
  return o.children = n, o;
}, ut = "tfoot", it = {
  class: "table-light"
}, dt = [], bt = {
  tagName: ut,
  attributes: it,
  children: dt
}, mt = "tr", ht = {
  class: "align-middle"
}, ft = [], pt = {
  tagName: mt,
  attributes: ht,
  children: ft
}, yt = "td", $t = {
  class: "align-middle py-2"
}, Ct = [], Nt = {
  tagName: yt,
  attributes: $t,
  children: Ct
}, gt = "input", wt = {
  type: "text",
  name: "",
  placeholder: "",
  class: "form-control form-control-sm"
}, xt = {
  tagName: gt,
  attributes: wt
}, At = ({ inColumn: e } = {}) => {
  const t = structuredClone(Nt), o = structuredClone(xt);
  return o.attributes.name = e, o.attributes.placeholder = e, t.children.push(o), t;
}, Bt = ({ inColumns: e = [] } = {}) => {
  const t = structuredClone(pt);
  return t.children = e.map((o) => At({ inColumn: o })), t;
}, Ft = ({ inColumns: e = [] } = {}) => Bt({ inColumns: e }), Et = "tr", St = {
  class: "align-middle"
}, jt = [], Ot = {
  tagName: Et,
  attributes: St,
  children: jt
}, It = "td", kt = {
  class: "align-middle py-2"
}, vt = [], Pt = {
  tagName: It,
  attributes: kt,
  children: vt
}, Rt = "input", Ut = {
  type: "text",
  name: "",
  placeholder: "",
  class: "form-control form-control-sm"
}, Jt = {
  tagName: Rt,
  attributes: Ut
}, Wt = "button", Kt = {
  type: "button",
  class: "btn btn-primary btn-sm ms-2"
}, Vt = "Save", Ht = {
  tagName: Wt,
  attributes: Kt,
  textContent: Vt
}, Lt = ({ inColumn: e, inSave: t = !1 } = {}) => {
  const o = structuredClone(Pt), n = structuredClone(Jt);
  return n.attributes.name = e, n.attributes.placeholder = e, o.children.push(n), t && o.children.push(structuredClone(Ht)), o;
}, Gt = ({ inColumns: e = [] } = {}) => {
  const t = structuredClone(Ot);
  return t.children = e.map((o, n) => Lt({
    inColumn: o,
    inSave: n === e.length - 1
  })), t;
}, Dt = ({ inColumns: e = [] } = {}) => Gt({ inColumns: e }), Mt = "tr", qt = {
  class: "fw-semibold align-middle"
}, _t = [], Yt = {
  tagName: Mt,
  attributes: qt,
  children: _t
}, zt = "td", Qt = {
  class: "align-middle py-2"
}, Xt = "", Zt = {
  tagName: zt,
  attributes: Qt,
  textContent: Xt
}, Tt = (e, t) => Array.isArray(e) ? e[t] : e == null ? void 0 : e[t], te = ({ inColumn: e, inIndex: t, inData: o = [] } = {}) => {
  const n = structuredClone(Zt), r = o.map((s) => Tt(s, e)).filter((s) => s != null && String(s).trim() !== "").map(Number).filter(Number.isFinite);
  return n.textContent = r.length ? String(r.reduce((s, c) => s + c, 0)) : t === 0 ? "Total" : "", n;
}, ee = ({ inColumns: e = [], inData: t = [] } = {}) => {
  const o = structuredClone(Yt);
  return o.children = e.map(
    (n, r) => te({ inColumn: n, inIndex: r, inData: t })
  ), o;
}, oe = ({ inColumns: e = [], inData: t = [] } = {}) => ee({ inColumns: e, inData: t }), ne = "tr", re = {
  class: "align-middle"
}, se = [], ce = {
  tagName: ne,
  attributes: re,
  children: se
}, le = "td", ae = {
  class: "align-middle py-2"
}, ue = {
  tagName: le,
  attributes: ae
}, ie = () => structuredClone(ue), de = ({ inColumns: e = [] } = {}) => {
  const t = structuredClone(ce);
  return t.children = e.map(() => ie()), t;
}, be = ({ inColumns: e = [] } = {}) => de({ inColumns: e }), N = {
  inputs: Ft,
  inputsWithSave: Dt,
  totals: oe,
  empty: be
}, me = ({ inFooter: e = [], inColumns: t = [], inData: o = [] } = {}) => {
  const n = structuredClone(bt);
  return n.children = e.map((r) => {
    if (!Object.hasOwn(N, r))
      throw new Error(`Unknown footer "${r}".`);
    return N[r]({ inColumns: t, inData: o });
  }), n;
}, he = ({
  inColumns: e = [],
  inData: t = [],
  inFooter: o = []
} = {}) => {
  const n = structuredClone(U), r = [
    z({ inColumns: e }),
    at({ inData: t, inColumns: e })
  ];
  if (!Array.isArray(o))
    throw new TypeError("The footer property must be an array of footer names.");
  return o.length > 0 && r.push(me({
    inFooter: o,
    inColumns: e,
    inData: t
  })), n.children = r, n;
}, fe = (e) => {
  const [t, o] = e.children;
  t.children[0].children.unshift({
    tagName: "th",
    textContent: "#"
  }), o.children.forEach((n, r) => {
    n.children.unshift({
      tagName: "td",
      textContent: String(r + 1)
    });
  });
}, pe = (e) => e === !0 ? [{ label: "Apply", type: "button" }] : Array.isArray(e) ? e : [], ye = (e, t) => {
  const o = pe(t);
  if (o.length === 0) return;
  const [n, r] = e.children;
  n.children[0].children.push({
    tagName: "th",
    textContent: "Actions"
  }), r.children.forEach((s) => {
    s.children.push({
      tagName: "td",
      children: o.map((c) => ({
        tagName: "button",
        attributes: { type: c.type || "button" },
        textContent: c.label
      }))
    });
  });
}, $e = (e, t = {}) => (t.showSerial && fe(e), t.showOptions && ye(e, t.showOptions), e), Ce = {
  type: "table",
  data: [
    {
      itemName: "0.09/30mm",
      baseUnit: "kgs"
    }
  ],
  columns: [
    "itemName",
    "baseUnit"
  ],
  options: {}
}, Ne = {
  type: "table",
  data: [
    {
      itemName: "0.09/30mm",
      baseUnit: "kgs"
    }
  ],
  columns: [
    "itemName",
    "baseUnit"
  ],
  options: {
    showSerial: !0
  }
}, ge = {
  type: "table",
  data: [
    {
      itemName: "0.09/30mm",
      baseUnit: "kgs"
    }
  ],
  columns: [
    "itemName",
    "baseUnit"
  ],
  options: {
    showOptions: !0
  }
}, we = {
  type: "table",
  data: [
    {
      itemName: "0.09/30mm",
      baseUnit: "kgs"
    }
  ],
  columns: [
    "itemName",
    "baseUnit"
  ],
  options: {
    showOptions: [
      {
        label: "Show",
        type: "button"
      },
      {
        label: "Edit",
        type: "button"
      }
    ]
  }
}, xe = {
  type: "table",
  data: [
    {
      itemName: "0.09/30mm",
      baseUnit: "kgs"
    }
  ],
  columns: [
    "itemName",
    "baseUnit"
  ],
  options: {
    showSerial: !0,
    showOptions: [
      {
        label: "Show",
        type: "button"
      }
    ]
  }
}, Ae = {
  type: "table",
  data: [
    {
      itemName: "0.09/30mm",
      baseUnit: "kgs"
    }
  ],
  columns: [
    "itemName",
    "baseUnit"
  ],
  footer: [
    "inputs"
  ],
  options: {}
}, Be = {
  type: "table",
  data: [
    {
      itemName: "0.09/30mm",
      baseUnit: "kgs"
    }
  ],
  columns: [
    "itemName",
    "baseUnit"
  ],
  footer: [
    "inputsWithSave"
  ],
  options: {}
}, Fe = {
  type: "table",
  data: [
    {
      itemName: "0.09/30mm",
      baseUnit: "2"
    },
    {
      itemName: "0.11-25",
      baseUnit: "3"
    }
  ],
  columns: [
    "itemName",
    "baseUnit"
  ],
  footer: [
    "totals"
  ],
  options: {}
}, Ee = {
  type: "table",
  data: [
    {
      itemName: "0.09/30mm",
      baseUnit: "2"
    }
  ],
  columns: [
    "itemName",
    "baseUnit"
  ],
  footer: [
    "inputs",
    "totals",
    "inputsWithSave",
    "empty"
  ],
  options: {}
}, Se = {
  type: "tableHead",
  data: [],
  columns: [
    "itemName",
    "baseUnit"
  ],
  options: {}
}, je = {
  type: "tableBody",
  data: [
    {
      itemName: "0.09/30mm",
      baseUnit: "kgs"
    }
  ],
  columns: [
    "itemName",
    "baseUnit"
  ],
  options: {}
}, Oe = {
  table: Ce,
  tableWithSerial: Ne,
  tableWithDefaultAction: ge,
  tableWithCustomActions: we,
  tableWithSerialAndActions: xe,
  tableWithFooter: Ae,
  tableWithFooterSave: Be,
  tableWithTotals: Fe,
  tableWithMultipleFooters: Ee,
  tableHead: Se,
  tableBody: je
}, w = ({
  type: e = "table",
  inData: t,
  inColumns: o,
  footer: n = [],
  options: r = {}
} = {}) => {
  if (e === "table") {
    const s = he({
      inColumns: o,
      inData: t,
      inFooter: n
    });
    return $e(s, r);
  }
  throw new Error(`Unknown table renderer type "${e}".`);
};
w.requests = Oe;
const x = ({ inItems: e, inRecipe: t, inExecute: o }) => {
  const n = e, r = t, s = o;
  return n.map((c) => $({
    inSource: c,
    inRecipe: r,
    inExecute: s
  })).flat(1 / 0).filter(Boolean);
}, Ie = ({ inSource: e, inRecipe: t, inExecute: o }) => {
  const n = e, r = t, s = o;
  let c = n;
  typeof s == "function" && (c = s({
    inSource: n,
    inRecipe: r
  }));
  for (const [l, i] of Object.entries(c))
    Array.isArray(i) && r && l in r && (c[l] = x({
      inItems: i,
      inRecipe: r[l],
      inExecute: s
    }));
  return c;
}, $ = ({ inSource: e, inRecipe: t, inExecute: o }) => {
  const n = e, r = t, s = o;
  return Array.isArray(n) ? x({
    inItems: n,
    inRecipe: r,
    inExecute: s
  }) : typeof n == "object" && n !== null ? Ie({
    inSource: n,
    inRecipe: r,
    inExecute: s
  }) : n;
}, ke = ({ inKey: e, inDirective: t }) => {
  const o = e, n = t;
  return (n == null ? void 0 : n.alterKey) || o;
}, ve = ({ inValue: e, inDirective: t, inExecute: o }) => {
  const n = e, r = t, s = o;
  return r && "transform" in r ? $({
    inSource: n,
    inRecipe: r,
    inExecute: s
  }) : n;
}, Pe = ({ inValue: e, inDirective: t }) => {
  const o = e, n = t;
  return (n == null ? void 0 : n.valueType) === "array" && !Array.isArray(o) ? [o] : o;
}, Re = ({ inValue: e, inDirective: t }) => {
  const o = e, n = t;
  return n != null && n.valueKey && o && typeof o == "object" ? o[n.valueKey] : o;
}, Ue = ({ inSource: e, inTransform: t, inExecute: o }) => {
  const n = e, r = t, s = o, c = {};
  for (const [l, i] of Object.entries(n)) {
    if (!(l in r))
      continue;
    const u = r[l], h = ke({ inKey: l, inDirective: u });
    let d = i;
    d = ve({
      inValue: d,
      inDirective: u,
      inExecute: s
    }), d = Pe({ inValue: d, inDirective: u }), d = Re({ inValue: d, inDirective: u }), c[h] = d;
  }
  return c;
};
function A(e, t) {
  for (const o in e)
    typeof e[o] == "object" && e[o] !== null ? A(e[o], t) : typeof e[o] == "string" && e[o] === "${}" && (e[o] = t);
  return e;
}
const Je = ({ inSource: e, inOperation: t, inExecute: o }) => {
  const n = e, r = t;
  for (const [s, c] of Object.entries(r))
    if ("operationType" in c && c.operationType === "loopArray" && s in n) {
      const l = n[s].map((i) => {
        const u = structuredClone(c == null ? void 0 : c.template);
        return A(u, i), u;
      });
      n[s] = l;
    }
  return n;
}, We = ({ inSource: e, inTemplate: t }) => {
  const o = e;
  let n = [];
  for (const [r, s] of Object.entries(o)) {
    const c = structuredClone(t);
    c.textContent = s, n.push(c);
  }
  return n;
}, Ke = ({ inSource: e, inBuild: t, inExecute: o }) => {
  const n = structuredClone(e), r = structuredClone(t);
  for (const [s, c] of Object.entries(r)) {
    const l = We({
      inSource: n[s],
      inTemplate: c
    });
    n[s] = l;
  }
  return n;
}, Ve = ({ inSource: e, inTemplate: t }) => e.map((n) => {
  const r = structuredClone(t == null ? void 0 : t.row), s = He({
    inSource: n,
    inTemplate: t == null ? void 0 : t.cell
  });
  return r.children = s, r;
}), He = ({ inSource: e, inTemplate: t }) => {
  const o = e;
  let n = [];
  for (const [r, s] of Object.entries(o)) {
    const c = structuredClone(t);
    c.textContent = s, n.push(c);
  }
  return n;
}, Le = ({ inSource: e, inBuild: t, inExecute: o }) => {
  const n = structuredClone(e), r = structuredClone(t);
  for (const [s, c] of Object.entries(r)) {
    const l = Ve({
      inSource: n[s],
      inTemplate: c
    });
    n[s] = l;
  }
  return n;
}, Ge = ({ inSource: e, inTemplate: t }) => e.map((r) => {
  const s = structuredClone(t);
  return s.textContent = r == null ? void 0 : r.columnName, s;
}), De = ({ inSource: e, inBuild: t, inExecute: o }) => {
  const n = structuredClone(e), r = structuredClone(t);
  for (const [s, c] of Object.entries(r)) {
    const l = Ge({
      inSource: n[s],
      inTemplate: c == null ? void 0 : c.cell
    });
    n[s] = c == null ? void 0 : c.row, n[s].children = l;
  }
  return n;
}, Me = ({ inSource: e, inTemplate: t }) => e.map((n) => {
  const r = structuredClone(t == null ? void 0 : t.row), s = qe({
    inSource: n,
    inTemplate: t == null ? void 0 : t.cell
  });
  return r.children = s, r;
}), qe = ({ inSource: e, inTemplate: t }) => {
  const o = e;
  let n = [];
  for (const [r, s] of Object.entries(o)) {
    const c = structuredClone(t);
    c.textContent = s, n.push(c);
  }
  return n;
}, _e = ({ inSource: e, inBuild: t, inExecute: o }) => {
  const n = structuredClone(e), r = structuredClone(t);
  for (const [s, c] of Object.entries(r)) {
    const l = Me({
      inSource: n[s],
      inTemplate: c
    });
    n[s] = c == null ? void 0 : c.body, n[s].children = l;
  }
  return n;
}, Ye = ({ inSource: e, inTemplate: t }) => e.map((n) => {
  const r = structuredClone(t == null ? void 0 : t.row), s = ze({
    inSource: n,
    inTemplate: t == null ? void 0 : t.cell
  });
  return r.children = s, r;
}), ze = ({ inSource: e, inTemplate: t }) => {
  const o = e;
  let n = [];
  for (const [r, s] of Object.entries(o)) {
    const c = structuredClone(t);
    c.textContent = s, n.push(c);
  }
  return n;
}, Qe = ({ inSource: e, inBuild: t, inExecute: o }) => {
  const n = structuredClone(e), r = structuredClone(t);
  for (const [s, c] of Object.entries(r)) {
    const l = Ye({
      inSource: n[s],
      inTemplate: c
    });
    n[s] = c == null ? void 0 : c.body, n[s].children = l;
  }
  return n;
}, Xe = ({ inSource: e, inTransform: t, inExecute: o }) => {
  const n = t, r = {};
  for (let [s, c] of Object.entries(n))
    console.log("aaaaaaaaa : ", s);
  return r;
}, a = ({ inSource: e, inRecipe: t }) => {
  let o = e;
  const n = t;
  return n && typeof n == "object" && "transform" in n && (o = Ue({
    inSource: o,
    inTransform: n.transform,
    inExecute: a
  })), n && typeof n == "object" && "operation" in n && (o = Je({
    inSource: o,
    inOperation: n.operation,
    inExecute: a
  })), n && typeof n == "object" && "build" in n && (o = Ke({
    inSource: o,
    inBuild: n == null ? void 0 : n.build,
    inExecute: a
  })), n && typeof n == "object" && "buildCollection" in n && (o = Le({
    inSource: o,
    inBuild: n == null ? void 0 : n.buildCollection,
    inExecute: a
  })), n && typeof n == "object" && "buildArray" in n && (o = De({
    inSource: o,
    inBuild: n == null ? void 0 : n.buildArray,
    inExecute: a
  })), n && typeof n == "object" && "buildBody" in n && (o = _e({
    inSource: o,
    inBuild: n == null ? void 0 : n.buildBody,
    inExecute: a
  })), n && typeof n == "object" && "objectToArray" in n && (o = Qe({
    inSource: o,
    inBuild: n == null ? void 0 : n.objectToArray,
    inExecute: a
  })), n && typeof n == "object" && "spec" in n && (o = Xe({
    inSource: o,
    inTransform: n == null ? void 0 : n.spec,
    inExecute: a
  })), o;
}, Ze = (e, t) => $({
  inSource: e,
  inRecipe: t,
  inExecute: a
}), Te = {
  children: ""
}, to = {
  children: {
    operationType: "loopArray",
    template: {
      tagName: "option",
      attributes: {
        value: "${}"
      },
      textContent: "${}"
    }
  }
}, eo = {
  transform: Te,
  operation: to
}, B = ({
  inData: e
}) => {
  let o = Ze({
    children: e
  }, eo);
  return o == null ? void 0 : o.children;
}, oo = "select", no = {
  id: "LedgerName"
}, ro = [], so = {
  tagName: oo,
  attributes: no,
  children: ro
}, co = ({
  inData: e
}) => {
  let o = B({
    inData: e
  });
  const n = structuredClone(so);
  return n.children = o, n;
}, lo = (e) => typeof e == "object" && e !== null && !Array.isArray(e), ao = (e, t) => {
  if (!lo(e)) return;
  let o = {};
  for (const [n, r] of Object.entries(e))
    o[n] = C(r, t);
  return o;
}, uo = (e, t) => {
  const o = structuredClone(e);
  return Array.isArray(o) ? o.map((r) => C(r, t)) : void 0;
}, F = (e, t) => e.replace(/\$\{(\w+)\}/g, (o, n) => t[n] !== void 0 ? t[n] : o), io = (e, t) => F(e, t), C = (e, t) => {
  const o = structuredClone(e);
  return typeof o == "string" ? F(o, t) : (o === null || typeof o != "object" || ("textContent" in o && (o.textContent = io(o == null ? void 0 : o.textContent, t)), "attributes" in o && (o.attributes = ao(o == null ? void 0 : o.attributes, t)), "children" in o && (o.children = uo(o == null ? void 0 : o.children, t))), o);
}, bo = (e, t) => {
  const o = e, n = t;
  return o.map((r) => C(n, r));
}, E = (e, t, o) => {
  const n = o, r = t;
  let s = [];
  return n.map((c) => {
    let l = structuredClone(e);
    l.textContent = r[c.columnName], s.push(l);
  }), s;
}, S = (e, t, o) => {
  e.forEach((n, r) => {
    const s = t == null ? void 0 : t.data[r], c = E(o, s, t == null ? void 0 : t.columns);
    n.children = c;
  });
}, mo = (e, t) => {
  const o = structuredClone(t);
  o.attributes.width = "50px", e.unshift(o);
}, ho = (e, t) => {
  const o = structuredClone(t);
  o.textContent = "#", e.unshift(o);
}, fo = (e, t) => {
  e.forEach((o, n) => {
    const r = structuredClone(t);
    r.textContent = n + 1, o.children.unshift(r);
  });
}, po = (e, t) => {
  const o = structuredClone(t);
  delete o.children, e.unshift(o);
}, yo = (e, t) => {
  mo(e == null ? void 0 : e.children[0].children, t == null ? void 0 : t.buildColGroup), ho(e == null ? void 0 : e.children[1].children[0].children, t == null ? void 0 : t.buildHeader), fo(e == null ? void 0 : e.children[2].children, t == null ? void 0 : t.buildBodyCell), po(e == null ? void 0 : e.children[3].children[0].children, t == null ? void 0 : t.buildFooter);
}, $o = (e, t) => {
  const o = structuredClone(t);
  o.attributes.width = "100px", e.push(o);
}, Co = (e, t) => {
  const o = structuredClone(t);
  o.textContent = "options", e.push(o);
}, No = (e, t) => {
  e.forEach((o, n) => {
    const r = structuredClone(t);
    r.textContent = "show", o.children.push(r);
  });
}, go = (e, t) => {
  const o = structuredClone(t);
  o.textContent = "save", e.push(o);
}, wo = (e, t) => {
  $o(e == null ? void 0 : e.children[0].children, t == null ? void 0 : t.buildColGroup), Co(e == null ? void 0 : e.children[1].children[0].children, t == null ? void 0 : t.buildHeader), No(e == null ? void 0 : e.children[2].children, t == null ? void 0 : t.button), go(e == null ? void 0 : e.children[3].children[0].children, t == null ? void 0 : t.button);
}, p = (e, t) => {
  var o;
  if (((o = e == null ? void 0 : e.attributes) == null ? void 0 : o["data-role"]) === t) return e;
  for (const n of (e == null ? void 0 : e.children) ?? []) {
    const r = p(n, t);
    if (r) return r;
  }
  return null;
}, xo = (e, t) => {
  const o = e[t.fileName], n = t.dataRole ? p(o, t.dataRole) : o;
  return (t.filePath ?? []).reduce((r, s) => r[s], n);
}, Ao = {
  tagName: "tr",
  attributes: {
    class: "align-middle"
  },
  children: []
}, Bo = {
  tagName: "col",
  attributes: {
    width: "${width}"
  }
}, Fo = {
  tagName: "th",
  textContent: "${columnName}",
  attributes: {
    class: "py-3 px-3 fw-semibold text-uppercase small"
  }
}, Eo = {
  tagName: "td",
  children: [
    {
      tagName: "input",
      attributes: {
        type: "text",
        placeholder: "enter ${columnName}",
        name: "${columnName}",
        class: "form-control"
      }
    }
  ]
}, So = {
  tagName: "td",
  textContent: "${rowValue}",
  attributes: {
    class: "py-3 px-3 text-secondary"
  }
}, jo = {
  tagName: "button",
  textContent: "${columnName}",
  attributes: {
    class: "btn btn-primary btn-sm"
  }
}, Oo = {
  tagName: "option",
  textContent: "${rowValue}",
  attributes: {
    value: "${rowValue}"
  }
}, Io = {
  tagName: "select",
  attributes: {
    "data-name": "${columnName}"
  },
  children: []
}, ko = {
  tagName: "datalist",
  attributes: {
    "data-name": "${columnName}"
  },
  children: []
}, m = {
  buildBodyTr: Ao,
  buildColGroup: Bo,
  buildHeader: Fo,
  buildFooter: Eo,
  buildBodyCell: So,
  button: jo,
  buildOption: Oo,
  buildSelect: Io,
  buildDataList: ko
}, vo = "table", Po = {
  class: "table table-hover table-striped align-middle border mb-0"
}, Ro = [
  {
    tagName: "colgroup",
    attributes: {
      "data-role": "table-colgroup"
    },
    children: []
  },
  {
    tagName: "thead",
    attributes: {
      class: "table-dark",
      "data-role": "table-header"
    },
    children: [
      {
        tagName: "tr",
        attributes: {
          "data-role": "table-header-row"
        },
        children: []
      }
    ]
  },
  {
    tagName: "tbody",
    attributes: {
      "data-role": "table-body"
    },
    children: []
  },
  {
    tagName: "tfoot",
    attributes: {
      "data-role": "table-footer"
    },
    children: [
      {
        tagName: "tr",
        attributes: {
          "data-role": "table-footer-row"
        },
        children: []
      }
    ]
  }
], b = {
  tagName: vo,
  attributes: Po,
  children: Ro
}, Uo = [
  {
    destinationPath: {
      fileName: "base",
      dataRole: "table-colgroup",
      filePath: [
        "children"
      ]
    },
    sourcePath: {
      fileName: "data",
      filePath: [
        "colGroup"
      ]
    },
    templateKey: "buildColGroup",
    func: "fromCollection"
  },
  {
    destinationPath: {
      fileName: "base",
      dataRole: "table-header-row",
      filePath: [
        "children"
      ]
    },
    sourcePath: {
      fileName: "data",
      filePath: [
        "columns"
      ]
    },
    templateKey: "buildHeader",
    func: "fromCollection"
  },
  {
    destinationPath: {
      fileName: "base",
      dataRole: "table-footer-row",
      filePath: [
        "children"
      ]
    },
    sourcePath: {
      fileName: "data",
      filePath: [
        "columns"
      ]
    },
    templateKey: "buildFooter",
    func: "fromCollection"
  }
], Jo = [
  {
    destinationPath: {
      fileName: "base",
      dataRole: "table-body",
      filePath: [
        "children"
      ]
    },
    sourcePath: {
      fileName: "data",
      filePath: [
        "data"
      ]
    },
    templateKey: "buildBodyTr",
    func: "fromCollection"
  }
], f = { data: {}, base: b, spec: m }, Wo = { fromCollection: bo, tableBody: E, buildBody: S }, Ko = (e, t) => {
  const o = e.dataRole ? p(f[e.fileName], e.dataRole) : f[e.fileName], n = [...e.filePath ?? []], r = n.pop(), s = n.reduce((c, l) => c[l], o);
  s[r] = t;
}, g = (e) => {
  e.forEach((t) => {
    const o = xo(f, t.sourcePath);
    if (o) {
      const n = Wo[t.func](o, m[t.templateKey]);
      Ko(t.destinationPath, n);
    } else
      console.log("   !instruction : ", t), console.log("   !source : ", o);
  });
}, Vo = (e) => (f.data = e, g(Jo), g(Uo), S(p(b, "table-body").children, e, m.buildBodyCell), yo(b, m), wo(b, m), b), Ho = ({
  inData: e,
  inColumns: t,
  footer: o = [],
  options: n
} = {}) => (console.log("   2222222 : ", e, t), Vo({
  columns: t,
  data: e
})), Lo = {
  table: w,
  select: co,
  selectOptionsOnly: B,
  tableFromSpec: Ho
}, j = ({
  type: e = "table",
  data: t,
  columns: o,
  options: n,
  showLog: r = !1
} = {}) => {
  const h = {
    type: e,
    data: t,
    columns: o,
    options: n,
    showLog: r
  };
  return k({ inConfig: h }), h;
}, Go = ({
  type: e = "table",
  data: t,
  columns: o,
  options: n,
  showLog: r = !1
} = {}) => {
  const s = j({
    type: e,
    data: t,
    columns: o,
    options: n,
    showLog: r
  }), c = Lo[s.type];
  if (!c)
    throw new Error(`Renderer for type "${s.type}" not found.`);
  const l = c({
    inColumns: s.columns,
    inData: s.data,
    options: s.options
  });
  return s.showLog && console.log("json-renderers-build output:", l), l;
};
I({ render: Go, getSpec: j });
export {
  Go as default,
  j as getSpec,
  k as guardFunc,
  Go as render,
  co as renderSelect,
  B as renderSelectOptions,
  w as renderTable,
  Ho as tableFromSpec
};
