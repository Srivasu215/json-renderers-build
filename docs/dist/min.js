const B = {
  version: "1.15.0",
  name: "json-renderers-build"
}, K = (e) => {
  const t = e;
  if (typeof globalThis > "u" || !t) return;
  globalThis.ks ?? (globalThis.ks = {});
  const o = typeof t == "function" ? t : t.render, r = typeof t == "object" ? t.getSpec : void 0;
  globalThis.ks.jsonRenderersBuild = {
    meta: B,
    renderToDom: o,
    render: o,
    ...r ? { getSpec: r } : {},
    ...typeof t == "object" ? t : {}
  };
}, N = ["table", "tableFromSpec", "select", "selectOptionsOnly", "dataList", "datalist"], V = ["table", "tableFromSpec"], O = ({ inConfig: e } = {}) => {
  const t = e;
  if (!t || typeof t != "object")
    throw console.error("Config must be an object"), new TypeError("Config must be an object");
  if (typeof t.type != "string" || !N.includes(t.type))
    throw console.error(`type must be one of: ${N.join(", ")}`), new Error(`type must be one of: ${N.join(", ")}`);
  if (t.showLog !== void 0 && typeof t.showLog != "boolean")
    throw console.error("showLog must be a boolean"), new TypeError("showLog must be a boolean");
  if (!Array.isArray(t.data))
    throw console.error("data must be an Array"), new TypeError("data must be an Array");
  if (V.includes(t.type)) {
    if (!Array.isArray(t.columns))
      throw console.error("columns must be an array for table rendering"), new TypeError("columns must be an array for table rendering");
    for (let o = 0; o < t.columns.length; o++) {
      const r = t.columns[o];
      if (!r || typeof r != "object")
        throw console.error(`columns[${o}] must be an object`), new TypeError(`columns[${o}] must be an object`);
      if (typeof r.columnName != "string" || !r.columnName.trim())
        throw console.error(`columns[${o}].columnName must be a non-empty string`), new TypeError(`columns[${o}].columnName must be a non-empty string`);
    }
    for (let o = 0; o < t.data.length; o++) {
      const r = t.data[o];
      if (!r || typeof r != "object")
        throw console.error(`data[${o}] must be an object`), new TypeError(`data[${o}] must be an object`);
    }
    if (t.columns.length > 0 && t.data.length > 0) {
      const o = t.columns.map((n) => n.columnName), r = Object.keys(t.data[0]);
      if (!o.some((n) => r.includes(n))) {
        const n = `Data alignment error: None of the columns [${o.join(", ")}] match any keys in data rows [${r.join(", ")}]`;
        throw console.error(n), new Error(n);
      }
    }
  }
  return !0;
}, I = "table", k = [], H = [], G = {}, v = !1, f = {
  type: I,
  columns: k,
  data: H,
  options: G,
  showLog: v
}, M = [
  {
    columnName: "Name",
    width: "150px"
  },
  {
    columnName: "Designation",
    width: "100px"
  }
], _ = [
  {
    Name: "Keshav",
    Designation: "Founder"
  }
], J = {
  columns: M,
  data: _
}, m = {
  ...f,
  ...J
}, $ = ({
  type: e = m.type,
  data: t = m.data,
  columns: o = m.columns,
  options: r = m.options,
  showLog: a = m.showLog
} = {}) => {
  const s = {
    type: e,
    data: t,
    columns: o,
    options: r,
    showLog: a
  };
  return O({ inConfig: s }), s;
};
Object.assign($, m);
$.toJSON = () => structuredClone(m);
const Y = (e) => typeof e == "object" && e !== null && !Array.isArray(e), q = (e, t) => {
  if (!Y(e)) return;
  let o = {};
  for (const [r, a] of Object.entries(e))
    o[r] = y(a, t);
  return o;
}, z = (e, t) => {
  const o = structuredClone(e);
  return Array.isArray(o) ? o.map((a) => y(t, a)) : void 0;
}, F = (e, t, o) => {
  if (e === "${agg:count}" && "rowData" in t) {
    if (Array.isArray(t == null ? void 0 : t.rowData))
      return t == null ? void 0 : t.rowData.length;
  } else
    return e === "${rowValue}" && "rowData" in t ? t == null ? void 0 : t.rowData : e.replace(/\$\{(\w+)\}/g, (r, a) => t[a] !== void 0 ? t[a] : r);
}, Q = (e, t) => F(e, t), U = (e, t, o) => {
  if (e == null)
    throw new TypeError("inTemplate is required");
  if (typeof e != "object" && typeof e != "string")
    throw new TypeError("inTemplate must be an object or string");
  if (!t || typeof t != "object" || Array.isArray(t))
    throw new TypeError("inElement must be an object");
  return !0;
}, y = (e, t, o) => {
  const r = e, a = t;
  U(r, a);
  const n = structuredClone(a);
  return typeof n == "string" ? F(n, r) : (n === null || typeof n != "object" || ("textContent" in n && (n.textContent = Q(n == null ? void 0 : n.textContent, r)), "attributes" in n && (n.attributes = q(n == null ? void 0 : n.attributes, r)), "children" in n && (n.children = z(n == null ? void 0 : n.children, r))), n);
}, W = (e, t) => {
  if (!Array.isArray(e))
    throw new TypeError("inSource must be an Array");
  if (e.length === 0)
    throw new Error("inSource cannot be empty");
  for (let o = 0; o < e.length; o++)
    if (!e[o] || typeof e[o] != "object")
      throw new TypeError(`inSource[${o}] must be an object`);
  if (!t || typeof t != "object" && typeof t != "string")
    throw new TypeError("inTemplate must be an object or string");
  return !0;
}, g = (e, t) => {
  const o = e, r = t;
  return W(o, r), o.map((a) => y(a, r));
}, X = (e, t) => e.map((r) => ({
  ...r,
  rowData: t[r.columnName]
})), Z = (e, t, o) => {
  var a, n, d, u, i, l;
  if (!Array.isArray(e))
    throw new TypeError("inColumns must be an Array");
  if (e.length === 0)
    throw new Error("inColumns cannot be empty");
  for (let s = 0; s < e.length; s++) {
    const c = e[s];
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
  if (!o || typeof o != "object" || Array.isArray(o))
    throw new TypeError("inSpec must be an object");
  const r = ((d = (n = (a = e[0]) == null ? void 0 : a.template) == null ? void 0 : n.body) == null ? void 0 : d.tr) || "buildBodyTr";
  if (!(r in o))
    throw new Error(`Row template "${r}" not found in inSpec`);
  for (let s = 0; s < e.length; s++) {
    const c = e[s], b = ((i = (u = c.template) == null ? void 0 : u.body) == null ? void 0 : i.cell) || ((l = c.template) == null ? void 0 : l.bodyCell) || "buildBodyCell";
    if (!(b in o))
      throw new Error(`Cell template "${b}" for column "${c.columnName}" not found in inSpec`);
  }
  return !0;
}, tt = (e, t) => e.map((r) => {
  var u, i, l;
  const a = ((i = (u = r.template) == null ? void 0 : u.body) == null ? void 0 : i.cell) || ((l = r.template) == null ? void 0 : l.bodyCell) || "buildBodyCell", n = t[a];
  return y(r, n);
}), et = (e, t, o) => {
  var l, s, c;
  Z(e, t, o);
  const r = e, a = t, n = o, d = ((c = (s = (l = r[0]) == null ? void 0 : l.template) == null ? void 0 : s.body) == null ? void 0 : c.tr) || "buildBodyTr", u = n[d];
  return a.map((b) => {
    const A = y(b, u), E = X(r, b), R = tt(E, n);
    return A.children = R, A;
  });
}, C = (e, t) => {
  var o;
  if (((o = e == null ? void 0 : e.attributes) == null ? void 0 : o["data-role"]) === t) return e;
  for (const r of (e == null ? void 0 : e.children) ?? []) {
    const a = C(r, t);
    if (a) return a;
  }
  return null;
}, ot = (e, t) => {
  const o = e[t.fileName], r = t.dataRole ? C(o, t.dataRole) : o;
  return (t.filePath ?? []).reduce((a, n) => a[n], r);
}, rt = {
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
}, at = {
  tagName: "th",
  textContent: "${columnName}",
  attributes: {
    class: "py-3 px-3 fw-semibold text-uppercase small"
  }
}, st = {
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
}, ct = {
  tagName: "td",
  textContent: "${rowValue}",
  attributes: {
    class: "py-3 px-3 text-secondary"
  }
}, lt = {
  tagName: "button",
  textContent: "${columnName}",
  attributes: {
    class: "btn btn-primary btn-sm"
  }
}, ut = {
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
}, it = {
  tagName: "option",
  textContent: "${rowValue}",
  attributes: {
    value: "${rowValue}"
  }
}, dt = {
  tagName: "select",
  attributes: {
    id: "LedgerName"
  },
  children: []
}, bt = {
  tagName: "datalist",
  attributes: {
    "data-name": "${columnName}"
  },
  children: []
}, j = {
  buildBodyTr: rt,
  buildColGroup: nt,
  buildHeader: at,
  buildFooter: st,
  buildBodyCell: ct,
  button: lt,
  buttonCell: ut,
  buildOption: it,
  buildSelect: dt,
  buildDataList: bt
}, mt = "table", ft = {
  class: "table table-hover table-striped align-middle border mb-0"
}, pt = [
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
], P = {
  tagName: mt,
  attributes: ft,
  children: pt
}, ht = [
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
], yt = [
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
], w = (e) => Array.isArray(e) ? e : [e], T = {
  set: (e, t, o) => {
    e[t] = o;
  },
  push: (e, t, o) => {
    e[t].push(...w(o));
  },
  unshift: (e, t, o) => {
    e[t].unshift(...w(o));
  },
  pushToRows: (e, t, o) => {
    e[t].forEach((r) => {
      r.children.push(...structuredClone(w(o)));
    });
  },
  unshiftToRows: (e, t, o) => {
    e[t].forEach((r) => {
      r.children.unshift(...structuredClone(w(o)));
    });
  },
  unshiftSerialToRows: (e, t, o) => {
    e[t].forEach((r, a) => {
      const n = structuredClone(o);
      n.textContent = a + 1, r.children.unshift(n);
    });
  }
}, S = (e, t, o) => {
  const r = t.dataRole ? C(e[t.fileName], t.dataRole) : e[t.fileName], a = [...t.filePath ?? []], n = a.pop(), d = a.reduce((i, l) => i[l], r);
  (T[t.action] || T.set)(d, n, o);
}, p = { data: {}, base: P, spec: j }, x = {
  fromCollection: g,
  twoDimensional: et
}, wt = (e) => {
  e.forEach((t) => {
    const o = ot(p, t.sourcePath);
    if (o) {
      const r = x[t.func](o, j[t.templateKey]);
      S(p, t.destinationPath, r);
    } else
      console.log("   !instruction : ", t), console.log("   !source : ", o);
  });
}, gt = (e) => {
  e.forEach((t) => {
    const o = x[t.func](
      p.data.columns,
      p.data.data,
      j
    );
    S(p, t.destinationPath, o);
  });
}, Nt = (e) => (p.data = e, wt(ht), gt(yt), P), L = ({
  inData: e,
  inColumns: t,
  footer: o = [],
  options: r
} = {}) => Nt({
  columns: t,
  data: e
}), $t = {
  tagName: "option",
  textContent: "${rowValue}",
  attributes: {
    value: "${rowValue}"
  }
}, Ct = {
  tagName: "select",
  attributes: {
    id: "LedgerName"
  },
  children: []
}, jt = {
  tagName: "datalist",
  attributes: {
    "data-name": "${columnName}"
  },
  children: []
}, h = {
  buildOption: $t,
  buildSelect: Ct,
  buildDataList: jt
}, At = ({ inData: e = [] } = {}) => {
  const t = (e ?? []).map(
    (r) => typeof r == "object" && r !== null ? r : { rowValue: r }
  ), o = structuredClone(h.buildSelect);
  return o.children = g(t, h.buildOption), o;
}, Tt = ({ inData: e = [] } = {}) => {
  const t = (e ?? []).map(
    (o) => typeof o == "object" && o !== null ? o : { rowValue: o }
  );
  return g(t, h.buildOption);
}, D = ({ inData: e = [] } = {}) => {
  const t = (e ?? []).map(
    (r) => typeof r == "object" && r !== null ? r : { rowValue: r }
  ), o = structuredClone(h.buildDataList);
  return o.children = g(t, h.buildOption), o;
}, Lt = {
  table: L,
  tableFromSpec: L,
  select: At,
  selectOptionsOnly: Tt,
  dataList: D,
  datalist: D
}, Dt = ({
  type: e = f.type,
  data: t = f.data,
  columns: o = f.columns,
  options: r = f.options,
  showLog: a = f.showLog
} = {}) => {
  const s = {
    type: e,
    data: t,
    columns: o,
    options: r,
    showLog: a
  };
  O({ inConfig: s });
  const c = Lt[s.type];
  if (!c)
    throw new Error(`Renderer for type "${s.type}" not found.`);
  const b = c({
    inColumns: s.columns,
    inData: s.data,
    options: s.options
  });
  return s.showLog && console.log("json-renderers-build output:", b), b;
};
K({ render: Dt, getSpec: $, spec: m });
export {
  Dt as default,
  $ as getSpec,
  Dt as render,
  m as spec
};
