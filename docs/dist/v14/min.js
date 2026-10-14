const j = {
  version: "v14.0.0",
  description: "build table from store data and render to DOM uses json-to-spec, json-to-dom under the hood"
}, x = (o) => {
  const t = o;
  if (typeof globalThis > "u" || !t) return;
  globalThis.ks ?? (globalThis.ks = {});
  const e = typeof t == "function" ? t : t.render, r = typeof t == "object" ? t.getSpec : void 0;
  globalThis.ks.jsonRenderersBuild = {
    meta: j,
    renderToDom: e,
    render: e,
    ...r ? { getSpec: r } : {},
    ...typeof t == "object" ? t : {}
  };
}, f = ["table", "select", "selectOptionsOnly", "dataList", "datalist", "tableFromSpec"], g = ({ inConfig: o } = {}) => {
  const t = o;
  if (!t || typeof t != "object")
    throw console.error("Config must be an object"), new TypeError("Config must be an object");
  if (typeof t.type != "string" || !f.includes(t.type))
    throw console.error(`type must be one of: ${f.join(", ")}`), new Error(`type must be one of: ${f.join(", ")}`);
  if (!Array.isArray(t.data))
    throw console.error("data must be an Array"), new TypeError("data must be an Array");
  if (!Array.isArray(t.columns))
    throw console.error("columns must be an array"), new TypeError("columns must be an array");
  if (t.showLog !== void 0 && typeof t.showLog != "boolean")
    throw console.error("showLog must be a boolean"), new TypeError("showLog must be a boolean");
  return !0;
}, L = "table", O = [], R = [], B = {}, A = !1, u = {
  type: L,
  data: O,
  columns: R,
  options: B,
  showLog: A
}, m = ({
  type: o = u.type,
  data: t = u.data,
  columns: e = u.columns,
  options: r = u.options,
  showLog: l = u.showLog
} = {}) => {
  const p = {
    type: o,
    data: t,
    columns: e,
    options: r,
    showLog: l
  };
  return g({ inConfig: p }), p;
};
Object.assign(m, u);
const E = (o) => typeof o == "object" && o !== null && !Array.isArray(o), G = (o, t) => {
  if (!E(o)) return;
  let e = {};
  for (const [r, l] of Object.entries(o))
    e[r] = y(l, t);
  return e;
}, D = (o, t) => {
  const e = structuredClone(o);
  return Array.isArray(e) ? e.map((l) => y(l, t)) : void 0;
}, $ = (o, t) => o.replace(/\$\{(\w+)\}/g, (e, r) => t[r] !== void 0 ? t[r] : e), H = (o, t) => $(o, t), y = (o, t) => {
  const e = structuredClone(o);
  return typeof e == "string" ? $(e, t) : (e === null || typeof e != "object" || ("textContent" in e && (e.textContent = H(e == null ? void 0 : e.textContent, t)), "attributes" in e && (e.attributes = G(e == null ? void 0 : e.attributes, t)), "children" in e && (e.children = D(e == null ? void 0 : e.children, t))), e);
}, b = (o, t) => {
  const e = o, r = t;
  return e.map((l) => y(r, l));
}, P = (o, t, e) => {
  const r = e, l = t;
  let s = [];
  return r.map((a) => {
    let c = structuredClone(o);
    c.textContent = l[a.columnName], s.push(c);
  }), s;
}, F = (o, t, e) => {
  o.forEach((r, l) => {
    const s = t == null ? void 0 : t.data[l], a = P(e, s, t == null ? void 0 : t.columns);
    r.children = a;
  });
}, I = (o, t) => {
  const e = structuredClone(t);
  e.attributes.width = "50px", o.unshift(e);
}, V = (o, t) => {
  const e = structuredClone(t);
  e.textContent = "#", o.unshift(e);
}, K = (o, t) => {
  o.forEach((e, r) => {
    const l = structuredClone(t);
    l.textContent = r + 1, e.children.unshift(l);
  });
}, v = (o, t) => {
  const e = structuredClone(t);
  delete e.children, o.unshift(e);
}, k = (o, t) => {
  I(o == null ? void 0 : o.children[0].children, t == null ? void 0 : t.buildColGroup), V(o == null ? void 0 : o.children[1].children[0].children, t == null ? void 0 : t.buildHeader), K(o == null ? void 0 : o.children[2].children, t == null ? void 0 : t.buildBodyCell), v(o == null ? void 0 : o.children[3].children[0].children, t == null ? void 0 : t.buildFooter);
}, J = (o, t) => {
  const e = structuredClone(t);
  e.attributes.width = "100px", o.push(e);
}, M = (o, t) => {
  const e = structuredClone(t);
  e.textContent = "options", o.push(e);
}, _ = (o, t) => {
  o.forEach((e, r) => {
    const l = structuredClone(t);
    l.textContent = "show", e.children.push(l);
  });
}, Y = (o, t) => {
  const e = structuredClone(t);
  e.textContent = "save", o.push(e);
}, q = (o, t) => {
  J(o == null ? void 0 : o.children[0].children, t == null ? void 0 : t.buildColGroup), M(o == null ? void 0 : o.children[1].children[0].children, t == null ? void 0 : t.buildHeader), _(o == null ? void 0 : o.children[2].children, t == null ? void 0 : t.button), Y(o == null ? void 0 : o.children[3].children[0].children, t == null ? void 0 : t.button);
}, h = (o, t) => {
  var e;
  if (((e = o == null ? void 0 : o.attributes) == null ? void 0 : e["data-role"]) === t) return o;
  for (const r of (o == null ? void 0 : o.children) ?? []) {
    const l = h(r, t);
    if (l) return l;
  }
  return null;
}, z = (o, t) => {
  const e = o[t.fileName], r = t.dataRole ? h(e, t.dataRole) : e;
  return (t.filePath ?? []).reduce((l, s) => l[s], r);
}, Q = {
  tagName: "tr",
  attributes: {
    class: "align-middle"
  },
  children: []
}, U = {
  tagName: "col",
  attributes: {
    width: "${width}"
  }
}, W = {
  tagName: "th",
  textContent: "${columnName}",
  attributes: {
    class: "py-3 px-3 fw-semibold text-uppercase small"
  }
}, X = {
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
}, Z = {
  tagName: "td",
  textContent: "${rowValue}",
  attributes: {
    class: "py-3 px-3 text-secondary"
  }
}, S = {
  tagName: "button",
  textContent: "${columnName}",
  attributes: {
    class: "btn btn-primary btn-sm"
  }
}, T = {
  tagName: "option",
  textContent: "${rowValue}",
  attributes: {
    value: "${rowValue}"
  }
}, tt = {
  tagName: "select",
  attributes: {
    id: "LedgerName"
  },
  children: []
}, ot = {
  tagName: "datalist",
  attributes: {
    "data-name": "${columnName}"
  },
  children: []
}, n = {
  buildBodyTr: Q,
  buildColGroup: U,
  buildHeader: W,
  buildFooter: X,
  buildBodyCell: Z,
  button: S,
  buildOption: T,
  buildSelect: tt,
  buildDataList: ot
}, et = "table", rt = {
  class: "table table-hover table-striped align-middle border mb-0"
}, lt = [
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
], d = {
  tagName: et,
  attributes: rt,
  children: lt
}, st = [
  {
    narration: "Build the column widths for the table using the configured columns.",
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
        "columns"
      ]
    },
    templateKey: "buildColGroup",
    func: "fromCollection"
  },
  {
    narration: "Build the table header row from the column metadata.",
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
    narration: "Build the table footer row from the column metadata.",
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
], nt = [
  {
    narration: "Create one table row for each record and place it into the table body container.",
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
], i = { data: {}, base: d, spec: n }, at = { fromCollection: b, tableBody: P, buildBody: F }, ct = (o, t) => {
  const e = o.dataRole ? h(i[o.fileName], o.dataRole) : i[o.fileName], r = [...o.filePath ?? []], l = r.pop(), s = r.reduce((a, c) => a[c], e);
  s[l] = t;
}, C = (o) => {
  o.forEach((t) => {
    const e = z(i, t.sourcePath);
    if (e) {
      const r = at[t.func](e, n[t.templateKey]);
      ct(t.destinationPath, r);
    } else
      console.log("   !instruction : ", t), console.log("   !source : ", e);
  });
}, ut = (o) => (i.data = o, C(nt), C(st), F(h(d, "table-body").children, o, n.buildBodyCell), k(d, n), q(d, n), d), w = ({
  inData: o,
  inColumns: t,
  footer: e = [],
  options: r
} = {}) => ut({
  columns: t,
  data: o
}), dt = ({ inData: o = [] } = {}) => {
  const t = (o ?? []).map(
    (r) => typeof r == "object" && r !== null ? r : { rowValue: r }
  ), e = structuredClone(n.buildSelect);
  return e.children = b(t, n.buildOption), e;
}, it = ({ inData: o = [] } = {}) => {
  const t = (o ?? []).map(
    (e) => typeof e == "object" && e !== null ? e : { rowValue: e }
  );
  return b(t, n.buildOption);
}, N = ({ inData: o = [] } = {}) => {
  const t = (o ?? []).map(
    (r) => typeof r == "object" && r !== null ? r : { rowValue: r }
  ), e = structuredClone(n.buildDataList);
  return e.children = b(t, n.buildOption), e;
}, bt = {
  table: w,
  tableFromSpec: w,
  select: dt,
  selectOptionsOnly: it,
  dataList: N,
  datalist: N
}, ht = ({
  type: o = "table",
  data: t,
  columns: e,
  options: r,
  showLog: l = !1
} = {}) => {
  const s = m({
    type: o,
    data: t,
    columns: e,
    options: r,
    showLog: l
  }), a = bt[s.type];
  if (!a)
    throw new Error(`Renderer for type "${s.type}" not found.`);
  const c = a({
    inColumns: s.columns,
    inData: s.data,
    options: s.options
  });
  return s.showLog && console.log("json-renderers-build output:", c), c;
};
x({ render: ht, getSpec: m });
export {
  ht as default,
  m as getSpec,
  ht as render
};
