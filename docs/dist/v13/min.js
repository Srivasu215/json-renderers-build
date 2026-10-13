const F = {
  version: "v13.1.0",
  description: "build table from store data and render to DOM uses json-to-spec, json-to-dom under the hood"
}, x = (o) => {
  const t = o;
  if (typeof globalThis > "u" || !t) return;
  globalThis.ks ?? (globalThis.ks = {});
  const e = typeof t == "function" ? t : t.render, r = typeof t == "object" ? t.getSpec : void 0;
  globalThis.ks.jsonRenderersBuild = {
    meta: F,
    renderToDom: e,
    render: e,
    ...r ? { getSpec: r } : {},
    ...typeof t == "object" ? t : {}
  };
}, h = ["table", "select", "selectOptionsOnly", "dataList", "datalist", "tableFromSpec"], j = ({ inConfig: o } = {}) => {
  const t = o;
  if (!t || typeof t != "object")
    throw console.error("Config must be an object"), new TypeError("Config must be an object");
  if (typeof t.type != "string" || !h.includes(t.type))
    throw console.error(`type must be one of: ${h.join(", ")}`), new Error(`type must be one of: ${h.join(", ")}`);
  if (!Array.isArray(t.data))
    throw console.error("data must be an Array"), new TypeError("data must be an Array");
  if (!Array.isArray(t.columns))
    throw console.error("columns must be an array"), new TypeError("columns must be an array");
  if (t.showLog !== void 0 && typeof t.showLog != "boolean")
    throw console.error("showLog must be a boolean"), new TypeError("showLog must be a boolean");
  return !0;
}, O = (o) => typeof o == "object" && o !== null && !Array.isArray(o), L = (o, t) => {
  if (!O(o)) return;
  let e = {};
  for (const [r, l] of Object.entries(o))
    e[r] = f(l, t);
  return e;
}, R = (o, t) => {
  const e = structuredClone(o);
  return Array.isArray(e) ? e.map((l) => f(l, t)) : void 0;
}, w = (o, t) => o.replace(/\$\{(\w+)\}/g, (e, r) => t[r] !== void 0 ? t[r] : e), g = (o, t) => w(o, t), f = (o, t) => {
  const e = structuredClone(o);
  return typeof e == "string" ? w(e, t) : (e === null || typeof e != "object" || ("textContent" in e && (e.textContent = g(e == null ? void 0 : e.textContent, t)), "attributes" in e && (e.attributes = L(e == null ? void 0 : e.attributes, t)), "children" in e && (e.children = R(e == null ? void 0 : e.children, t))), e);
}, i = (o, t) => {
  const e = o, r = t;
  return e.map((l) => f(r, l));
}, N = (o, t, e) => {
  const r = e, l = t;
  let s = [];
  return r.map((a) => {
    let c = structuredClone(o);
    c.textContent = l[a.columnName], s.push(c);
  }), s;
}, $ = (o, t, e) => {
  o.forEach((r, l) => {
    const s = t == null ? void 0 : t.data[l], a = N(e, s, t == null ? void 0 : t.columns);
    r.children = a;
  });
}, B = (o, t) => {
  const e = structuredClone(t);
  e.attributes.width = "50px", o.unshift(e);
}, A = (o, t) => {
  const e = structuredClone(t);
  e.textContent = "#", o.unshift(e);
}, E = (o, t) => {
  o.forEach((e, r) => {
    const l = structuredClone(t);
    l.textContent = r + 1, e.children.unshift(l);
  });
}, G = (o, t) => {
  const e = structuredClone(t);
  delete e.children, o.unshift(e);
}, D = (o, t) => {
  B(o == null ? void 0 : o.children[0].children, t == null ? void 0 : t.buildColGroup), A(o == null ? void 0 : o.children[1].children[0].children, t == null ? void 0 : t.buildHeader), E(o == null ? void 0 : o.children[2].children, t == null ? void 0 : t.buildBodyCell), G(o == null ? void 0 : o.children[3].children[0].children, t == null ? void 0 : t.buildFooter);
}, H = (o, t) => {
  const e = structuredClone(t);
  e.attributes.width = "100px", o.push(e);
}, I = (o, t) => {
  const e = structuredClone(t);
  e.textContent = "options", o.push(e);
}, V = (o, t) => {
  o.forEach((e, r) => {
    const l = structuredClone(t);
    l.textContent = "show", e.children.push(l);
  });
}, K = (o, t) => {
  const e = structuredClone(t);
  e.textContent = "save", o.push(e);
}, v = (o, t) => {
  H(o == null ? void 0 : o.children[0].children, t == null ? void 0 : t.buildColGroup), I(o == null ? void 0 : o.children[1].children[0].children, t == null ? void 0 : t.buildHeader), V(o == null ? void 0 : o.children[2].children, t == null ? void 0 : t.button), K(o == null ? void 0 : o.children[3].children[0].children, t == null ? void 0 : t.button);
}, b = (o, t) => {
  var e;
  if (((e = o == null ? void 0 : o.attributes) == null ? void 0 : e["data-role"]) === t) return o;
  for (const r of (o == null ? void 0 : o.children) ?? []) {
    const l = b(r, t);
    if (l) return l;
  }
  return null;
}, k = (o, t) => {
  const e = o[t.fileName], r = t.dataRole ? b(e, t.dataRole) : e;
  return (t.filePath ?? []).reduce((l, s) => l[s], r);
}, J = {
  tagName: "tr",
  attributes: {
    class: "align-middle"
  },
  children: []
}, M = {
  tagName: "col",
  attributes: {
    width: "${width}"
  }
}, _ = {
  tagName: "th",
  textContent: "${columnName}",
  attributes: {
    class: "py-3 px-3 fw-semibold text-uppercase small"
  }
}, Y = {
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
}, q = {
  tagName: "td",
  textContent: "${rowValue}",
  attributes: {
    class: "py-3 px-3 text-secondary"
  }
}, z = {
  tagName: "button",
  textContent: "${columnName}",
  attributes: {
    class: "btn btn-primary btn-sm"
  }
}, Q = {
  tagName: "option",
  textContent: "${rowValue}",
  attributes: {
    value: "${rowValue}"
  }
}, U = {
  tagName: "select",
  attributes: {
    id: "LedgerName"
  },
  children: []
}, W = {
  tagName: "datalist",
  attributes: {
    "data-name": "${columnName}"
  },
  children: []
}, n = {
  buildBodyTr: J,
  buildColGroup: M,
  buildHeader: _,
  buildFooter: Y,
  buildBodyCell: q,
  button: z,
  buildOption: Q,
  buildSelect: U,
  buildDataList: W
}, X = "table", Z = {
  class: "table table-hover table-striped align-middle border mb-0"
}, S = [
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
  tagName: X,
  attributes: Z,
  children: S
}, T = [
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
], tt = [
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
], d = { data: {}, base: u, spec: n }, ot = { fromCollection: i, tableBody: N, buildBody: $ }, et = (o, t) => {
  const e = o.dataRole ? b(d[o.fileName], o.dataRole) : d[o.fileName], r = [...o.filePath ?? []], l = r.pop(), s = r.reduce((a, c) => a[c], e);
  s[l] = t;
}, y = (o) => {
  o.forEach((t) => {
    const e = k(d, t.sourcePath);
    if (e) {
      const r = ot[t.func](e, n[t.templateKey]);
      et(t.destinationPath, r);
    } else
      console.log("   !instruction : ", t), console.log("   !source : ", e);
  });
}, rt = (o) => (d.data = o, y(tt), y(T), $(b(u, "table-body").children, o, n.buildBodyCell), D(u, n), v(u, n), u), C = ({
  inData: o,
  inColumns: t,
  footer: e = [],
  options: r
} = {}) => rt({
  columns: t,
  data: o
}), lt = ({ inData: o = [] } = {}) => {
  const t = (o ?? []).map(
    (r) => typeof r == "object" && r !== null ? r : { rowValue: r }
  ), e = structuredClone(n.buildSelect);
  return e.children = i(t, n.buildOption), e;
}, st = ({ inData: o = [] } = {}) => {
  const t = (o ?? []).map(
    (e) => typeof e == "object" && e !== null ? e : { rowValue: e }
  );
  return i(t, n.buildOption);
}, p = ({ inData: o = [] } = {}) => {
  const t = (o ?? []).map(
    (r) => typeof r == "object" && r !== null ? r : { rowValue: r }
  ), e = structuredClone(n.buildDataList);
  return e.children = i(t, n.buildOption), e;
}, nt = {
  table: C,
  tableFromSpec: C,
  select: lt,
  selectOptionsOnly: st,
  dataList: p,
  datalist: p
}, P = ({
  type: o = "table",
  data: t = [],
  columns: e = [],
  options: r,
  showLog: l = !1
} = {}) => {
  const m = {
    type: o,
    data: t,
    columns: e,
    options: r,
    showLog: l
  };
  return j({ inConfig: m }), m;
}, at = ({
  type: o = "table",
  data: t,
  columns: e,
  options: r,
  showLog: l = !1
} = {}) => {
  const s = P({
    type: o,
    data: t,
    columns: e,
    options: r,
    showLog: l
  }), a = nt[s.type];
  if (!a)
    throw new Error(`Renderer for type "${s.type}" not found.`);
  const c = a({
    inColumns: s.columns,
    inData: s.data,
    options: s.options
  });
  return s.showLog && console.log("json-renderers-build output:", c), c;
};
x({ render: at, getSpec: P });
export {
  at as default,
  P as getSpec,
  at as render
};
