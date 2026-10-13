const x = {
  version: "v13.0.0",
  description: "build table from store data and render to DOM uses json-to-spec, json-to-dom under the hood"
}, j = (e) => {
  const t = e;
  if (typeof globalThis > "u" || !t) return;
  globalThis.ks ?? (globalThis.ks = {});
  const o = typeof t == "function" ? t : t.render, r = typeof t == "object" ? t.getSpec : void 0;
  globalThis.ks.jsonRenderersBuild = {
    meta: x,
    renderToDom: o,
    render: o,
    ...r ? { getSpec: r } : {},
    ...typeof t == "object" ? t : {}
  };
}, b = ["table", "select", "selectOptionsOnly", "dataList", "datalist", "tableFromSpec"], L = ({ inConfig: e } = {}) => {
  const t = e;
  if (!t || typeof t != "object")
    throw console.error("Config must be an object"), new TypeError("Config must be an object");
  if (typeof t.type != "string" || !b.includes(t.type))
    throw console.error(`type must be one of: ${b.join(", ")}`), new Error(`type must be one of: ${b.join(", ")}`);
  if (!Array.isArray(t.data))
    throw console.error("data must be an Array"), new TypeError("data must be an Array");
  if (!Array.isArray(t.columns))
    throw console.error("columns must be an array"), new TypeError("columns must be an array");
  if (t.showLog !== void 0 && typeof t.showLog != "boolean")
    throw console.error("showLog must be a boolean"), new TypeError("showLog must be a boolean");
  return !0;
}, O = (e) => typeof e == "object" && e !== null && !Array.isArray(e), R = (e, t) => {
  if (!O(e)) return;
  let o = {};
  for (const [r, l] of Object.entries(e))
    o[r] = h(l, t);
  return o;
}, g = (e, t) => {
  const o = structuredClone(e);
  return Array.isArray(o) ? o.map((l) => h(l, t)) : void 0;
}, w = (e, t) => e.replace(/\$\{(\w+)\}/g, (o, r) => t[r] !== void 0 ? t[r] : o), B = (e, t) => w(e, t), h = (e, t) => {
  const o = structuredClone(e);
  return typeof o == "string" ? w(o, t) : (o === null || typeof o != "object" || ("textContent" in o && (o.textContent = B(o == null ? void 0 : o.textContent, t)), "attributes" in o && (o.attributes = R(o == null ? void 0 : o.attributes, t)), "children" in o && (o.children = g(o == null ? void 0 : o.children, t))), o);
}, N = (e, t) => {
  const o = e, r = t;
  return o.map((l) => h(r, l));
}, $ = (e, t, o) => {
  const r = o, l = t;
  let s = [];
  return r.map((n) => {
    let a = structuredClone(e);
    a.textContent = l[n.columnName], s.push(a);
  }), s;
}, P = (e, t, o) => {
  e.forEach((r, l) => {
    const s = t == null ? void 0 : t.data[l], n = $(o, s, t == null ? void 0 : t.columns);
    r.children = n;
  });
}, A = (e, t) => {
  const o = structuredClone(t);
  o.attributes.width = "50px", e.unshift(o);
}, E = (e, t) => {
  const o = structuredClone(t);
  o.textContent = "#", e.unshift(o);
}, G = (e, t) => {
  e.forEach((o, r) => {
    const l = structuredClone(t);
    l.textContent = r + 1, o.children.unshift(l);
  });
}, H = (e, t) => {
  const o = structuredClone(t);
  delete o.children, e.unshift(o);
}, I = (e, t) => {
  A(e == null ? void 0 : e.children[0].children, t == null ? void 0 : t.buildColGroup), E(e == null ? void 0 : e.children[1].children[0].children, t == null ? void 0 : t.buildHeader), G(e == null ? void 0 : e.children[2].children, t == null ? void 0 : t.buildBodyCell), H(e == null ? void 0 : e.children[3].children[0].children, t == null ? void 0 : t.buildFooter);
}, K = (e, t) => {
  const o = structuredClone(t);
  o.attributes.width = "100px", e.push(o);
}, v = (e, t) => {
  const o = structuredClone(t);
  o.textContent = "options", e.push(o);
}, D = (e, t) => {
  e.forEach((o, r) => {
    const l = structuredClone(t);
    l.textContent = "show", o.children.push(l);
  });
}, V = (e, t) => {
  const o = structuredClone(t);
  o.textContent = "save", e.push(o);
}, k = (e, t) => {
  K(e == null ? void 0 : e.children[0].children, t == null ? void 0 : t.buildColGroup), v(e == null ? void 0 : e.children[1].children[0].children, t == null ? void 0 : t.buildHeader), D(e == null ? void 0 : e.children[2].children, t == null ? void 0 : t.button), V(e == null ? void 0 : e.children[3].children[0].children, t == null ? void 0 : t.button);
}, i = (e, t) => {
  var o;
  if (((o = e == null ? void 0 : e.attributes) == null ? void 0 : o["data-role"]) === t) return e;
  for (const r of (e == null ? void 0 : e.children) ?? []) {
    const l = i(r, t);
    if (l) return l;
  }
  return null;
}, J = (e, t) => {
  const o = e[t.fileName], r = t.dataRole ? i(o, t.dataRole) : o;
  return (t.filePath ?? []).reduce((l, s) => l[s], r);
}, M = {
  tagName: "tr",
  attributes: {
    class: "align-middle"
  },
  children: []
}, _ = {
  tagName: "col",
  attributes: {
    width: "${width}"
  }
}, Y = {
  tagName: "th",
  textContent: "${columnName}",
  attributes: {
    class: "py-3 px-3 fw-semibold text-uppercase small"
  }
}, q = {
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
}, z = {
  tagName: "td",
  textContent: "${rowValue}",
  attributes: {
    class: "py-3 px-3 text-secondary"
  }
}, Q = {
  tagName: "button",
  textContent: "${columnName}",
  attributes: {
    class: "btn btn-primary btn-sm"
  }
}, U = {
  tagName: "option",
  textContent: "${rowValue}",
  attributes: {
    value: "${rowValue}"
  }
}, W = {
  tagName: "select",
  attributes: {
    id: "LedgerName"
  },
  children: []
}, X = {
  tagName: "datalist",
  attributes: {
    "data-name": "${columnName}"
  },
  children: []
}, c = {
  buildBodyTr: M,
  buildColGroup: _,
  buildHeader: Y,
  buildFooter: q,
  buildBodyCell: z,
  button: Q,
  buildOption: U,
  buildSelect: W,
  buildDataList: X
}, Z = "table", S = {
  class: "table table-hover table-striped align-middle border mb-0"
}, T = [
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
], u = {
  tagName: Z,
  attributes: S,
  children: T
}, tt = [
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
], et = [
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
], d = { data: {}, base: u, spec: c }, ot = { fromCollection: N, tableBody: $, buildBody: P }, rt = (e, t) => {
  const o = e.dataRole ? i(d[e.fileName], e.dataRole) : d[e.fileName], r = [...e.filePath ?? []], l = r.pop(), s = r.reduce((n, a) => n[a], o);
  s[l] = t;
}, y = (e) => {
  e.forEach((t) => {
    const o = J(d, t.sourcePath);
    if (o) {
      const r = ot[t.func](o, c[t.templateKey]);
      rt(t.destinationPath, r);
    } else
      console.log("   !instruction : ", t), console.log("   !source : ", o);
  });
}, lt = (e) => (d.data = e, y(et), y(tt), P(i(u, "table-body").children, e, c.buildBodyCell), I(u, c), k(u, c), u), C = ({
  inData: e,
  inColumns: t,
  footer: o = [],
  options: r
} = {}) => lt({
  columns: t,
  data: e
}), f = ({ inData: e = [] } = {}) => {
  const t = (e ?? []).map(
    (o) => typeof o == "object" && o !== null ? o : { rowValue: o }
  );
  return N(t, c.buildOption);
}, st = ({ inData: e = [] } = {}) => {
  const t = structuredClone(c.buildSelect);
  return t.children = f({ inData: e }), t;
}, p = ({ inData: e = [] } = {}) => {
  const t = structuredClone(c.buildDataList);
  return t.children = f({ inData: e }), t;
}, nt = {
  table: C,
  tableFromSpec: C,
  select: st,
  selectOptionsOnly: f,
  dataList: p,
  datalist: p
}, F = ({
  type: e = "table",
  data: t = [],
  columns: o = [],
  options: r,
  showLog: l = !1
} = {}) => {
  const m = {
    type: e,
    data: t,
    columns: o,
    options: r,
    showLog: l
  };
  return L({ inConfig: m }), m;
}, at = ({
  type: e = "table",
  data: t,
  columns: o,
  options: r,
  showLog: l = !1
} = {}) => {
  const s = F({
    type: e,
    data: t,
    columns: o,
    options: r,
    showLog: l
  }), n = nt[s.type];
  if (!n)
    throw new Error(`Renderer for type "${s.type}" not found.`);
  const a = n({
    inColumns: s.columns,
    inData: s.data,
    options: s.options
  });
  return s.showLog && console.log("json-renderers-build output:", a), a;
};
j({ render: at, getSpec: F });
export {
  at as default,
  F as getSpec,
  at as render
};
