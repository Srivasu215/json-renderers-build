const I = {
  version: "1.15.0",
  name: "json-renderers-build"
}, k = (o) => {
  const t = o;
  if (typeof globalThis > "u" || !t) return;
  globalThis.ks ?? (globalThis.ks = {});
  const e = typeof t == "function" ? t : t.render, r = typeof t == "object" ? t.getSpec : void 0;
  globalThis.ks.jsonRenderersBuild = {
    meta: I,
    renderToDom: e,
    render: e,
    ...r ? { getSpec: r } : {},
    ...typeof t == "object" ? t : {}
  };
}, g = ["table", "tableFromSpec", "select", "selectOptionsOnly", "dataList", "datalist"], E = ["table", "tableFromSpec"], F = ({ inConfig: o } = {}) => {
  const t = o;
  if (!t || typeof t != "object")
    throw console.error("Config must be an object"), new TypeError("Config must be an object");
  if (typeof t.type != "string" || !g.includes(t.type))
    throw console.error(`type must be one of: ${g.join(", ")}`), new Error(`type must be one of: ${g.join(", ")}`);
  if (t.showLog !== void 0 && typeof t.showLog != "boolean")
    throw console.error("showLog must be a boolean"), new TypeError("showLog must be a boolean");
  if (!Array.isArray(t.data))
    throw console.error("data must be an Array"), new TypeError("data must be an Array");
  if (E.includes(t.type)) {
    if (!Array.isArray(t.columns))
      throw console.error("columns must be an array for table rendering"), new TypeError("columns must be an array for table rendering");
    for (let e = 0; e < t.columns.length; e++) {
      const r = t.columns[e];
      if (!r || typeof r != "object")
        throw console.error(`columns[${e}] must be an object`), new TypeError(`columns[${e}] must be an object`);
      if (typeof r.columnName != "string" || !r.columnName.trim())
        throw console.error(`columns[${e}].columnName must be a non-empty string`), new TypeError(`columns[${e}].columnName must be a non-empty string`);
    }
    for (let e = 0; e < t.data.length; e++) {
      const r = t.data[e];
      if (!r || typeof r != "object")
        throw console.error(`data[${e}] must be an object`), new TypeError(`data[${e}] must be an object`);
    }
    if (t.columns.length > 0 && t.data.length > 0) {
      const e = t.columns.map((n) => n.columnName), r = Object.keys(t.data[0]);
      if (!e.some((n) => r.includes(n))) {
        const n = `Data alignment error: None of the columns [${e.join(", ")}] match any keys in data rows [${r.join(", ")}]`;
        throw console.error(n), new Error(n);
      }
    }
  }
  return !0;
}, H = "table", v = [], G = [], M = {}, _ = !1, y = {
  type: H,
  columns: v,
  data: G,
  options: M,
  showLog: _
}, q = [
  {
    columnName: "Name",
    width: "150px"
  },
  {
    columnName: "Designation",
    width: "100px"
  }
], J = [
  {
    Name: "Keshav",
    Designation: "Founder"
  }
], Y = {
  columns: q,
  data: J
}, f = {
  ...y,
  ...Y
}, $ = ({
  type: o = f.type,
  data: t = f.data,
  columns: e = f.columns,
  options: r = f.options,
  showLog: a = f.showLog
} = {}) => {
  const s = {
    type: o,
    data: t,
    columns: e,
    options: r,
    showLog: a
  };
  return F({ inConfig: s }), s;
};
Object.assign($, f);
$.toJSON = () => structuredClone(f);
const z = (o) => typeof o == "object" && o !== null && !Array.isArray(o), Q = (o, t) => {
  if (!z(o)) return;
  console.log("forAttributes : ", o, t);
  let e = {};
  for (const [r, a] of Object.entries(o))
    e[r] = m(t, a);
  return e;
}, U = (o, t) => {
  const e = structuredClone(o);
  return Array.isArray(e) ? e.map((a) => m(t, a)) : void 0;
}, x = (o, t, e) => {
  if (console.log("commonReplace : ", o, t), o === "${agg:count}" && "rowData" in t) {
    if (Array.isArray(t == null ? void 0 : t.rowData))
      return t == null ? void 0 : t.rowData.length;
  } else
    return o === "${rowValue}" && "rowData" in t ? t == null ? void 0 : t.rowData : o.replace(/\$\{(\w+)\}/g, (r, a) => t[a] !== void 0 ? t[a] : r);
}, W = (o, t) => x(o, t), X = (o, t, e) => {
  if (t == null)
    throw new TypeError("inTemplate is required");
  if (typeof t != "object" && typeof t != "string")
    throw new TypeError("inTemplate must be an object or string");
  if (!o || typeof o != "object" || Array.isArray(o))
    throw new TypeError("inElement must be an object");
  return !0;
}, m = (o, t, e) => {
  const r = o, a = t;
  X(r, a);
  const n = structuredClone(a);
  return typeof n == "string" ? x(n, r) : (n === null || typeof n != "object" || ("textContent" in n && (n.textContent = W(n == null ? void 0 : n.textContent, r)), "attributes" in n && (n.attributes = Q(n == null ? void 0 : n.attributes, r)), "children" in n && (n.children = U(n == null ? void 0 : n.children, r))), n);
}, Z = (o, t) => {
  if (!Array.isArray(o))
    throw new TypeError("inSource must be an Array");
  if (o.length === 0)
    throw new Error("inSource cannot be empty");
  for (let e = 0; e < o.length; e++)
    if (!o[e] || typeof o[e] != "object")
      throw new TypeError(`inSource[${e}] must be an object`);
  if (!t || typeof t != "object" && typeof t != "string")
    throw new TypeError("inTemplate must be an object or string");
  return !0;
}, tt = (o, t) => {
  const e = o, r = t;
  return Z(e, r), e.map((a) => m(a, r));
}, ot = (o, t) => o.map((r) => ({
  ...r,
  rowData: t[r.columnName]
})), et = (o, t, e) => {
  var a, n, d, u, i, l;
  if (!Array.isArray(o))
    throw new TypeError("inColumns must be an Array");
  if (o.length === 0)
    throw new Error("inColumns cannot be empty");
  for (let s = 0; s < o.length; s++) {
    const c = o[s];
    if (!c || typeof c != "object")
      throw new TypeError(`inColumns[${s}] must be an object`);
    if (typeof c.columnName != "string" || !c.columnName.trim())
      throw new TypeError(`inColumns[${s}].columnName must be a non-empty string`);
  }
  if (!Array.isArray(t))
    throw new TypeError("inData must be an Array");
  for (let s = 0; s < t.length; s++) {
    const c = t[s];
    if (!c || typeof c != "object")
      throw new TypeError(`inData[${s}] must be an object`);
  }
  if (!e || typeof e != "object" || Array.isArray(e))
    throw new TypeError("inSpec must be an object");
  const r = ((d = (n = (a = o[0]) == null ? void 0 : a.template) == null ? void 0 : n.body) == null ? void 0 : d.tr) || "buildBodyTr";
  if (!(r in e))
    throw new Error(`Row template "${r}" not found in inSpec`);
  for (let s = 0; s < o.length; s++) {
    const c = o[s], b = ((i = (u = c.template) == null ? void 0 : u.body) == null ? void 0 : i.cell) || ((l = c.template) == null ? void 0 : l.bodyCell) || "buildBodyCell";
    if (!(b in e))
      throw new Error(`Cell template "${b}" for column "${c.columnName}" not found in inSpec`);
  }
  return !0;
}, rt = (o, t) => o.map((r) => {
  var u, i, l;
  const a = ((i = (u = r.template) == null ? void 0 : u.body) == null ? void 0 : i.cell) || ((l = r.template) == null ? void 0 : l.bodyCell) || "buildBodyCell", n = t[a];
  return m(r, n);
}), nt = (o, t, e) => {
  var l, s, c;
  et(o, t, e);
  const r = o, a = t, n = e, d = ((c = (s = (l = r[0]) == null ? void 0 : l.template) == null ? void 0 : s.body) == null ? void 0 : c.tr) || "buildBodyTr", u = n[d];
  return a.map((b) => {
    const D = m(b, u), V = ot(r, b), K = rt(V, n);
    return D.children = K, D;
  });
}, at = (o) => typeof o == "object" && o !== null && !Array.isArray(o), st = (o, t) => {
  if (!at(o)) return;
  let e = {};
  for (const [r, a] of Object.entries(o))
    e[r] = N(t, a);
  return e;
}, ct = (o, t) => {
  const e = structuredClone(o);
  return Array.isArray(e) ? e.map((a) => N(t, a)) : void 0;
}, P = (o, t, e) => {
  if (o === "${agg:count}" && "rowData" in t) {
    if (Array.isArray(t == null ? void 0 : t.rowData))
      return t == null ? void 0 : t.rowData.length;
  } else
    return o === "${rowValue}" && "rowData" in t ? t == null ? void 0 : t.rowData : o.replace(/\$\{(\w+)\}/g, (r, a) => t[a] !== void 0 ? t[a] : r);
}, lt = (o, t) => P(o, t), ut = (o, t, e) => {
  if (t == null)
    throw new TypeError("inTemplate is required");
  if (typeof t != "object" && typeof t != "string")
    throw new TypeError("inTemplate must be an object or string");
  if (!o || typeof o != "object" || Array.isArray(o))
    throw new TypeError("inElement must be an object");
  return !0;
}, N = (o, t, e) => {
  const r = o, a = t;
  ut(r, a);
  const n = structuredClone(a);
  return typeof n == "string" ? P(n, r) : (n === null || typeof n != "object" || ("textContent" in n && (n.textContent = lt(n == null ? void 0 : n.textContent, r)), "attributes" in n && (n.attributes = st(n == null ? void 0 : n.attributes, r)), "children" in n && (n.children = ct(n == null ? void 0 : n.children, r))), n);
}, it = (o, t) => {
  if (!Array.isArray(o))
    throw new TypeError("inSource must be an Array");
  if (o.length === 0)
    throw new Error("inSource cannot be empty");
  for (let e = 0; e < o.length; e++)
    if (!o[e] || typeof o[e] != "object")
      throw new TypeError(`inSource[${e}] must be an object`);
  if (!t || typeof t != "object" && typeof t != "string")
    throw new TypeError("inTemplate must be an object or string");
  return !0;
}, j = (o, t) => {
  const e = o, r = t;
  return it(e, r), e.map((a) => N(a, r));
}, C = (o, t) => {
  var e;
  if (((e = o == null ? void 0 : o.attributes) == null ? void 0 : e["data-role"]) === t) return o;
  for (const r of (o == null ? void 0 : o.children) ?? []) {
    const a = C(r, t);
    if (a) return a;
  }
  return null;
}, dt = (o, t) => {
  const e = o[t.fileName], r = t.dataRole ? C(e, t.dataRole) : e;
  return (t.filePath ?? []).reduce((a, n) => a[n], r);
}, bt = {
  tagName: "tr",
  attributes: {
    class: "align-middle"
  },
  children: []
}, ft = {
  tagName: "col",
  attributes: {
    width: "${width}"
  }
}, yt = {
  tagName: "th",
  textContent: "${columnName}",
  attributes: {
    class: "py-3 px-3 fw-semibold text-uppercase small"
  }
}, pt = {
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
}, ht = {
  tagName: "td",
  textContent: "${rowValue}",
  attributes: {
    class: "py-3 px-3 text-secondary"
  }
}, mt = {
  tagName: "button",
  textContent: "${columnName}",
  attributes: {
    class: "btn btn-primary btn-sm"
  }
}, wt = {
  tagName: "td",
  attributes: {
    class: "py-2 px-3 text-center"
  },
  children: [
    {
      tagName: "button",
      textContent: "${agg:count}",
      attributes: {
        class: "btn btn-primary btn-sm"
      }
    }
  ]
}, gt = {
  tagName: "option",
  textContent: "${rowValue}",
  attributes: {
    value: "${rowValue}"
  }
}, $t = {
  tagName: "select",
  attributes: {
    id: "LedgerName"
  },
  children: []
}, Nt = {
  tagName: "datalist",
  attributes: {
    "data-name": "${columnName}"
  },
  children: []
}, A = {
  buildBodyTr: bt,
  buildColGroup: ft,
  buildHeader: yt,
  buildFooter: pt,
  buildBodyCell: ht,
  button: mt,
  buttonCell: wt,
  buildOption: gt,
  buildSelect: $t,
  buildDataList: Nt
}, jt = "table", Ct = {
  class: "table table-hover table-striped align-middle border mb-0"
}, At = [
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
], R = {
  tagName: jt,
  attributes: Ct,
  children: At
}, Dt = [
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
    narration: "Build the header row for the table using the configured columns.",
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
  }
], Lt = [
  {
    narration: "Build the table body rows for the table using the configured columns and data.",
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
        "columns"
      ]
    },
    func: "twoDimensional"
  }
], w = (o) => Array.isArray(o) ? o : [o], L = {
  set: (o, t, e) => {
    o[t] = e;
  },
  push: (o, t, e) => {
    o[t].push(...w(e));
  },
  unshift: (o, t, e) => {
    o[t].unshift(...w(e));
  },
  pushToRows: (o, t, e) => {
    o[t].forEach((r) => {
      r.children.push(...structuredClone(w(e)));
    });
  },
  unshiftToRows: (o, t, e) => {
    o[t].forEach((r) => {
      r.children.unshift(...structuredClone(w(e)));
    });
  },
  unshiftSerialToRows: (o, t, e) => {
    o[t].forEach((r, a) => {
      const n = structuredClone(e);
      n.textContent = a + 1, r.children.unshift(n);
    });
  }
}, S = (o, t, e) => {
  const r = t.dataRole ? C(o[t.fileName], t.dataRole) : o[t.fileName], a = [...t.filePath ?? []], n = a.pop(), d = a.reduce((i, l) => i[l], r);
  (L[t.action] || L.set)(d, n, e);
}, p = { data: {}, base: R, spec: A }, B = {
  fromCollection: tt,
  twoDimensional: nt
}, Tt = (o) => {
  o.forEach((t) => {
    const e = dt(p, t.sourcePath);
    if (e) {
      const r = B[t.func](e, A[t.templateKey]);
      S(p, t.destinationPath, r);
    } else
      console.log("   !instruction : ", t), console.log("   !source : ", e);
  });
}, Ot = (o) => {
  o.forEach((t) => {
    const e = B[t.func](
      p.data.columns,
      p.data.data,
      A
    );
    S(p, t.destinationPath, e);
  });
}, Ft = (o) => (p.data = o, Tt(Dt), Ot(Lt), R), T = ({
  inData: o,
  inColumns: t,
  footer: e = [],
  options: r
} = {}) => Ft({
  columns: t,
  data: o
}), xt = {
  tagName: "option",
  textContent: "${rowValue}",
  attributes: {
    value: "${rowValue}"
  }
}, Pt = {
  tagName: "select",
  attributes: {
    id: "LedgerName"
  },
  children: []
}, Rt = {
  tagName: "datalist",
  attributes: {
    "data-name": "${columnName}"
  },
  children: []
}, h = {
  buildOption: xt,
  buildSelect: Pt,
  buildDataList: Rt
}, St = ({ inData: o = [] } = {}) => {
  const t = (o ?? []).map(
    (r) => typeof r == "object" && r !== null ? r : { rowValue: r }
  ), e = structuredClone(h.buildSelect);
  return e.children = j(t, h.buildOption), e;
}, Bt = ({ inData: o = [], inColumns: t = [] } = {}) => t.map((r) => {
  const a = structuredClone(h.buildOption);
  a.textContent = a.textContent.replace("rowValue", r.columnName), a.attributes.value = a.attributes.value.replace("rowValue", r.columnName);
  const n = j(o, a);
  return console.log("createdArray : ", n[0], a), n;
}), O = ({ inData: o = [] } = {}) => {
  const t = (o ?? []).map(
    (r) => typeof r == "object" && r !== null ? r : { rowValue: r }
  ), e = structuredClone(h.buildDataList);
  return e.children = j(t, h.buildOption), e;
}, Vt = {
  table: T,
  tableFromSpec: T,
  select: St,
  selectOptionsOnly: Bt,
  dataList: O,
  datalist: O
}, Kt = ({
  type: o = y.type,
  data: t = y.data,
  columns: e = y.columns,
  options: r = y.options,
  showLog: a = y.showLog
} = {}) => {
  const s = {
    type: o,
    data: t,
    columns: e,
    options: r,
    showLog: a
  };
  F({ inConfig: s });
  const c = Vt[s.type];
  if (!c)
    throw new Error(`Renderer for type "${s.type}" not found.`);
  const b = c({
    inColumns: s.columns,
    inData: s.data,
    options: s.options
  });
  return s.showLog && console.log("json-renderers-build output:", b), b;
};
k({ render: Kt, getSpec: $, spec: f });
export {
  Kt as default,
  $ as getSpec,
  Kt as render,
  f as spec
};
