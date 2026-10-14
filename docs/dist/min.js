const B = {
  version: "1.15.0",
  name: "json-renderers-build"
}, E = (e) => {
  const t = e;
  if (typeof globalThis > "u" || !t) return;
  globalThis.ks ?? (globalThis.ks = {});
  const o = typeof t == "function" ? t : t.render, n = typeof t == "object" ? t.getSpec : void 0;
  globalThis.ks.jsonRenderersBuild = {
    meta: B,
    renderToDom: o,
    render: o,
    ...n ? { getSpec: n } : {},
    ...typeof t == "object" ? t : {}
  };
}, y = ["table", "tableFromSpec", "select", "selectOptionsOnly", "dataList", "datalist"], A = ["table", "tableFromSpec"], F = ({ inConfig: e } = {}) => {
  const t = e;
  if (!t || typeof t != "object")
    throw console.error("Config must be an object"), new TypeError("Config must be an object");
  if (typeof t.type != "string" || !y.includes(t.type))
    throw console.error(`type must be one of: ${y.join(", ")}`), new Error(`type must be one of: ${y.join(", ")}`);
  if (t.showLog !== void 0 && typeof t.showLog != "boolean")
    throw console.error("showLog must be a boolean"), new TypeError("showLog must be a boolean");
  if (!Array.isArray(t.data))
    throw console.error("data must be an Array"), new TypeError("data must be an Array");
  if (A.includes(t.type)) {
    if (!Array.isArray(t.columns))
      throw console.error("columns must be an array for table rendering"), new TypeError("columns must be an array for table rendering");
    for (let o = 0; o < t.columns.length; o++) {
      const n = t.columns[o];
      if (!n || typeof n != "object")
        throw console.error(`columns[${o}] must be an object`), new TypeError(`columns[${o}] must be an object`);
      if (typeof n.columnName != "string" || !n.columnName.trim())
        throw console.error(`columns[${o}].columnName must be a non-empty string`), new TypeError(`columns[${o}].columnName must be a non-empty string`);
    }
    for (let o = 0; o < t.data.length; o++) {
      const n = t.data[o];
      if (!n || typeof n != "object")
        throw console.error(`data[${o}] must be an object`), new TypeError(`data[${o}] must be an object`);
    }
    if (t.columns.length > 0 && t.data.length > 0) {
      const o = t.columns.map((r) => r.columnName), n = Object.keys(t.data[0]);
      if (!o.some((r) => n.includes(r))) {
        const r = `Data alignment error: None of the columns [${o.join(", ")}] match any keys in data rows [${n.join(", ")}]`;
        throw console.error(r), new Error(r);
      }
    }
  }
  return !0;
}, D = "table", G = [], K = [], H = {}, I = !1, i = {
  type: D,
  columns: G,
  data: K,
  options: H,
  showLog: I
}, V = [
  {
    columnName: "Name",
    width: "150px"
  },
  {
    columnName: "Designation",
    width: "100px"
  }
], k = [
  {
    Name: "Keshav",
    Designation: "Founder"
  }
], v = {
  columns: V,
  data: k
}, c = {
  ...i,
  ...v
}, p = ({
  type: e = c.type,
  data: t = c.data,
  columns: o = c.columns,
  options: n = c.options,
  showLog: l = c.showLog
} = {}) => {
  const s = {
    type: e,
    data: t,
    columns: o,
    options: n,
    showLog: l
  };
  return F({ inConfig: s }), s;
};
Object.assign(p, c);
p.toJSON = () => structuredClone(c);
const M = (e) => typeof e == "object" && e !== null && !Array.isArray(e), _ = (e, t) => {
  if (!M(e)) return;
  let o = {};
  for (const [n, l] of Object.entries(e))
    o[n] = w(l, t);
  return o;
}, J = (e, t) => {
  const o = structuredClone(e);
  return Array.isArray(o) ? o.map((l) => w(l, t)) : void 0;
}, L = (e, t) => e.replace(/\$\{(\w+)\}/g, (o, n) => t[n] !== void 0 ? t[n] : o), Y = (e, t) => L(e, t), w = (e, t) => {
  const o = structuredClone(e);
  return typeof o == "string" ? L(o, t) : (o === null || typeof o != "object" || ("textContent" in o && (o.textContent = Y(o == null ? void 0 : o.textContent, t)), "attributes" in o && (o.attributes = _(o == null ? void 0 : o.attributes, t)), "children" in o && (o.children = J(o == null ? void 0 : o.children, t))), o);
}, m = (e, t) => {
  const o = e, n = t;
  return o.map((l) => w(n, l));
}, P = (e, t, o) => {
  const n = o, l = t;
  let r = [];
  return n.map((u) => {
    let d = structuredClone(e);
    d.textContent = l[u.columnName], r.push(d);
  }), r;
}, x = (e, t, o) => {
  e.forEach((n, l) => {
    const r = t == null ? void 0 : t.data[l], u = P(o, r, t == null ? void 0 : t.columns);
    n.children = u;
  });
}, q = (e, t) => {
  const o = structuredClone(t);
  o.attributes.width = "50px", e.unshift(o);
}, z = (e, t) => {
  const o = structuredClone(t);
  o.textContent = "#", e.unshift(o);
}, Q = (e, t) => {
  e.forEach((o, n) => {
    const l = structuredClone(t);
    l.textContent = n + 1, o.children.unshift(l);
  });
}, U = (e, t) => {
  const o = structuredClone(t);
  delete o.children, e.unshift(o);
}, W = (e, t) => {
  q(e == null ? void 0 : e.children[0].children, t == null ? void 0 : t.buildColGroup), z(e == null ? void 0 : e.children[1].children[0].children, t == null ? void 0 : t.buildHeader), Q(e == null ? void 0 : e.children[2].children, t == null ? void 0 : t.buildBodyCell), U(e == null ? void 0 : e.children[3].children[0].children, t == null ? void 0 : t.buildFooter);
}, X = (e, t) => {
  const o = structuredClone(t);
  o.attributes.width = "100px", e.push(o);
}, Z = (e, t) => {
  const o = structuredClone(t);
  o.textContent = "options", e.push(o);
}, S = (e, t) => {
  e.forEach((o, n) => {
    const l = structuredClone(t);
    l.textContent = "show", o.children.push(l);
  });
}, T = (e, t) => {
  const o = structuredClone(t);
  o.textContent = "save", e.push(o);
}, tt = (e, t) => {
  X(e == null ? void 0 : e.children[0].children, t == null ? void 0 : t.buildColGroup), Z(e == null ? void 0 : e.children[1].children[0].children, t == null ? void 0 : t.buildHeader), S(e == null ? void 0 : e.children[2].children, t == null ? void 0 : t.button), T(e == null ? void 0 : e.children[3].children[0].children, t == null ? void 0 : t.button);
}, f = (e, t) => {
  var o;
  if (((o = e == null ? void 0 : e.attributes) == null ? void 0 : o["data-role"]) === t) return e;
  for (const n of (e == null ? void 0 : e.children) ?? []) {
    const l = f(n, t);
    if (l) return l;
  }
  return null;
}, ot = (e, t) => {
  const o = e[t.fileName], n = t.dataRole ? f(o, t.dataRole) : o;
  return (t.filePath ?? []).reduce((l, r) => l[r], n);
}, et = {
  tagName: "tr",
  attributes: {
    class: "align-middle"
  },
  children: []
}, nt = {
  tagName: "col",
  attributes: {
    width: "${width}"
  }
}, lt = {
  tagName: "th",
  textContent: "${columnName}",
  attributes: {
    class: "py-3 px-3 fw-semibold text-uppercase small"
  }
}, rt = {
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
}, st = {
  tagName: "td",
  textContent: "${rowValue}",
  attributes: {
    class: "py-3 px-3 text-secondary"
  }
}, at = {
  tagName: "button",
  textContent: "${columnName}",
  attributes: {
    class: "btn btn-primary btn-sm"
  }
}, ct = {
  tagName: "option",
  textContent: "${rowValue}",
  attributes: {
    value: "${rowValue}"
  }
}, ut = {
  tagName: "select",
  attributes: {
    id: "LedgerName"
  },
  children: []
}, dt = {
  tagName: "datalist",
  attributes: {
    "data-name": "${columnName}"
  },
  children: []
}, a = {
  buildBodyTr: et,
  buildColGroup: nt,
  buildHeader: lt,
  buildFooter: rt,
  buildBodyCell: st,
  button: at,
  buildOption: ct,
  buildSelect: ut,
  buildDataList: dt
}, it = "table", bt = {
  class: "table table-hover table-striped align-middle border mb-0"
}, ht = [
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
  tagName: it,
  attributes: bt,
  children: ht
}, mt = [
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
], ft = [
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
], h = { data: {}, base: b, spec: a }, yt = { fromCollection: m, tableBody: P, buildBody: x }, pt = (e, t) => {
  const o = e.dataRole ? f(h[e.fileName], e.dataRole) : h[e.fileName], n = [...e.filePath ?? []], l = n.pop(), r = n.reduce((u, d) => u[d], o);
  r[l] = t;
}, g = (e) => {
  e.forEach((t) => {
    const o = ot(h, t.sourcePath);
    if (o) {
      const n = yt[t.func](o, a[t.templateKey]);
      pt(t.destinationPath, n);
    } else
      console.log("   !instruction : ", t), console.log("   !source : ", o);
  });
}, wt = (e) => (h.data = e, g(ft), g(mt), x(f(b, "table-body").children, e, a.buildBodyCell), W(b, a), tt(b, a), b), $ = ({
  inData: e,
  inColumns: t,
  footer: o = [],
  options: n
} = {}) => wt({
  columns: t,
  data: e
}), Ct = ({ inData: e = [] } = {}) => {
  const t = (e ?? []).map(
    (n) => typeof n == "object" && n !== null ? n : { rowValue: n }
  ), o = structuredClone(a.buildSelect);
  return o.children = m(t, a.buildOption), o;
}, Nt = ({ inData: e = [] } = {}) => {
  const t = (e ?? []).map(
    (o) => typeof o == "object" && o !== null ? o : { rowValue: o }
  );
  return m(t, a.buildOption);
}, j = ({ inData: e = [] } = {}) => {
  const t = (e ?? []).map(
    (n) => typeof n == "object" && n !== null ? n : { rowValue: n }
  ), o = structuredClone(a.buildDataList);
  return o.children = m(t, a.buildOption), o;
}, gt = {
  table: $,
  tableFromSpec: $,
  select: Ct,
  selectOptionsOnly: Nt,
  dataList: j,
  datalist: j
}, $t = ({
  type: e = i.type,
  data: t = i.data,
  columns: o = i.columns,
  options: n = i.options,
  showLog: l = i.showLog
} = {}) => {
  const s = {
    type: e,
    data: t,
    columns: o,
    options: n,
    showLog: l
  };
  F({ inConfig: s });
  const C = gt[s.type];
  if (!C)
    throw new Error(`Renderer for type "${s.type}" not found.`);
  const N = C({
    inColumns: s.columns,
    inData: s.data,
    options: s.options
  });
  return s.showLog && console.log("json-renderers-build output:", N), N;
};
E({ render: $t, getSpec: p, spec: c });
export {
  $t as default,
  p as getSpec,
  $t as render,
  c as spec
};
