const A = {
  version: "1.15.0",
  name: "json-renderers-build"
}, D = (e) => {
  const t = e;
  if (typeof globalThis > "u" || !t) return;
  globalThis.ks ?? (globalThis.ks = {});
  const o = typeof t == "function" ? t : t.render, a = typeof t == "object" ? t.getSpec : void 0;
  globalThis.ks.jsonRenderersBuild = {
    meta: A,
    renderToDom: o,
    render: o,
    ...a ? { getSpec: a } : {},
    ...typeof t == "object" ? t : {}
  };
}, g = ["table", "tableFromSpec", "select", "selectOptionsOnly", "dataList", "datalist"], B = ["table", "tableFromSpec"], F = ({ inConfig: e } = {}) => {
  const t = e;
  if (!t || typeof t != "object")
    throw console.error("Config must be an object"), new TypeError("Config must be an object");
  if (typeof t.type != "string" || !g.includes(t.type))
    throw console.error(`type must be one of: ${g.join(", ")}`), new Error(`type must be one of: ${g.join(", ")}`);
  if (t.showLog !== void 0 && typeof t.showLog != "boolean")
    throw console.error("showLog must be a boolean"), new TypeError("showLog must be a boolean");
  if (!Array.isArray(t.data))
    throw console.error("data must be an Array"), new TypeError("data must be an Array");
  if (B.includes(t.type)) {
    if (!Array.isArray(t.columns))
      throw console.error("columns must be an array for table rendering"), new TypeError("columns must be an array for table rendering");
    for (let o = 0; o < t.columns.length; o++) {
      const a = t.columns[o];
      if (!a || typeof a != "object")
        throw console.error(`columns[${o}] must be an object`), new TypeError(`columns[${o}] must be an object`);
      if (typeof a.columnName != "string" || !a.columnName.trim())
        throw console.error(`columns[${o}].columnName must be a non-empty string`), new TypeError(`columns[${o}].columnName must be a non-empty string`);
    }
    for (let o = 0; o < t.data.length; o++) {
      const a = t.data[o];
      if (!a || typeof a != "object")
        throw console.error(`data[${o}] must be an object`), new TypeError(`data[${o}] must be an object`);
    }
    if (t.columns.length > 0 && t.data.length > 0) {
      const o = t.columns.map((n) => n.columnName), a = Object.keys(t.data[0]);
      if (!o.some((n) => a.includes(n))) {
        const n = `Data alignment error: None of the columns [${o.join(", ")}] match any keys in data rows [${a.join(", ")}]`;
        throw console.error(n), new Error(n);
      }
    }
  }
  return !0;
}, K = "table", V = [], I = [], k = {}, H = !1, d = {
  type: K,
  columns: V,
  data: I,
  options: k,
  showLog: H
}, G = [
  {
    columnName: "Name",
    width: "150px"
  },
  {
    columnName: "Designation",
    width: "100px"
  }
], M = [
  {
    Name: "Keshav",
    Designation: "Founder"
  }
], _ = {
  columns: G,
  data: M
}, l = {
  ...d,
  ..._
}, C = ({
  type: e = l.type,
  data: t = l.data,
  columns: o = l.columns,
  options: a = l.options,
  showLog: r = l.showLog
} = {}) => {
  const c = {
    type: e,
    data: t,
    columns: o,
    options: a,
    showLog: r
  };
  return F({ inConfig: c }), c;
};
Object.assign(C, l);
C.toJSON = () => structuredClone(l);
const v = (e) => typeof e == "object" && e !== null && !Array.isArray(e), J = (e, t) => {
  if (!v(e)) return;
  let o = {};
  for (const [a, r] of Object.entries(e))
    o[a] = h(r, t);
  return o;
}, Y = (e, t) => {
  const o = structuredClone(e);
  return Array.isArray(o) ? o.map((r) => h(r, t)) : void 0;
}, R = (e, t) => {
  if (e === "${agg:count}" && "rowData" in t) {
    if (Array.isArray(t == null ? void 0 : t.rowData))
      return t == null ? void 0 : t.rowData.length;
  } else
    return e === "${rowValue}" && "rowData" in t ? t == null ? void 0 : t.rowData : e.replace(/\$\{(\w+)\}/g, (o, a) => t[a] !== void 0 ? t[a] : o);
}, E = (e, t) => R(e, t), h = (e, t) => {
  const o = structuredClone(e);
  return typeof o == "string" ? R(o, t) : (o === null || typeof o != "object" || ("textContent" in o && (o.textContent = E(o == null ? void 0 : o.textContent, t)), "attributes" in o && (o.attributes = J(o == null ? void 0 : o.attributes, t)), "children" in o && (o.children = Y(o == null ? void 0 : o.children, t))), o);
}, p = (e, t) => {
  const o = e, a = t;
  return o.map((r) => h(a, r));
}, T = (e, t, o) => {
  const a = o, r = t;
  let n = [];
  return a.forEach((s) => {
    var i;
    const b = e[(i = s == null ? void 0 : s.template) == null ? void 0 : i.bodyCell];
    if (b) {
      s.rowData = r[s.columnName];
      const f = h(b, s);
      n.push(f);
    }
  }), n;
}, x = (e, t, o) => {
  e.forEach((a, r) => {
    const n = t == null ? void 0 : t.data[r], s = T(o, n, t == null ? void 0 : t.columns);
    a.children = s;
  });
}, y = (e, t) => {
  var o;
  if (((o = e == null ? void 0 : e.attributes) == null ? void 0 : o["data-role"]) === t) return e;
  for (const a of (e == null ? void 0 : e.children) ?? []) {
    const r = y(a, t);
    if (r) return r;
  }
  return null;
}, q = (e, t) => {
  const o = e[t.fileName], a = t.dataRole ? y(o, t.dataRole) : o;
  return (t.filePath ?? []).reduce((r, n) => r[n], a);
}, z = {
  tagName: "tr",
  attributes: {
    class: "align-middle"
  },
  children: []
}, Q = {
  tagName: "col",
  attributes: {
    width: "${width}"
  }
}, U = {
  tagName: "th",
  textContent: "${columnName}",
  attributes: {
    class: "py-3 px-3 fw-semibold text-uppercase small"
  }
}, W = {
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
}, X = {
  tagName: "td",
  textContent: "${rowValue}",
  attributes: {
    class: "py-3 px-3 text-secondary"
  }
}, Z = {
  tagName: "button",
  textContent: "${columnName}",
  attributes: {
    class: "btn btn-primary btn-sm"
  }
}, tt = {
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
}, ot = {
  tagName: "option",
  textContent: "${rowValue}",
  attributes: {
    value: "${rowValue}"
  }
}, et = {
  tagName: "select",
  attributes: {
    id: "LedgerName"
  },
  children: []
}, at = {
  tagName: "datalist",
  attributes: {
    "data-name": "${columnName}"
  },
  children: []
}, u = {
  buildBodyTr: z,
  buildColGroup: Q,
  buildHeader: U,
  buildFooter: W,
  buildBodyCell: X,
  button: Z,
  buttonCell: tt,
  buildOption: ot,
  buildSelect: et,
  buildDataList: at
}, rt = "table", nt = {
  class: "table table-hover table-striped align-middle border mb-0"
}, st = [
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
], w = {
  tagName: rt,
  attributes: nt,
  children: st
}, ct = [
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
], lt = [
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
], m = (e) => Array.isArray(e) ? e : [e], L = {
  set: (e, t, o) => {
    e[t] = o;
  },
  push: (e, t, o) => {
    e[t].push(...m(o));
  },
  unshift: (e, t, o) => {
    e[t].unshift(...m(o));
  },
  pushToRows: (e, t, o) => {
    e[t].forEach((a) => {
      a.children.push(...structuredClone(m(o)));
    });
  },
  unshiftToRows: (e, t, o) => {
    e[t].forEach((a) => {
      a.children.unshift(...structuredClone(m(o)));
    });
  },
  unshiftSerialToRows: (e, t, o) => {
    e[t].forEach((a, r) => {
      const n = structuredClone(o);
      n.textContent = r + 1, a.children.unshift(n);
    });
  }
}, ut = (e, t, o) => {
  const a = t.dataRole ? y(e[t.fileName], t.dataRole) : e[t.fileName], r = [...t.filePath ?? []], n = r.pop(), s = r.reduce((i, f) => i[f], a);
  (L[t.action] || L.set)(s, n, o);
}, N = { data: {}, base: w, spec: u }, it = {
  fromCollection: p,
  tableBody: T,
  buildBody: x,
  applyTemplate: (e, t) => h(t, e)
}, P = (e) => {
  e.forEach((t) => {
    const o = q(N, t.sourcePath);
    if (o) {
      const a = it[t.func](o, u[t.templateKey]);
      ut(N, t.destinationPath, a);
    } else
      console.log("   !instruction : ", t), console.log("   !source : ", o);
  });
}, dt = (e) => (N.data = e, P(lt), P(ct), x(y(w, "table-body").children, e, u), w), O = ({
  inData: e,
  inColumns: t,
  footer: o = [],
  options: a
} = {}) => dt({
  columns: t,
  data: e
}), bt = ({ inData: e = [] } = {}) => {
  const t = (e ?? []).map(
    (a) => typeof a == "object" && a !== null ? a : { rowValue: a }
  ), o = structuredClone(u.buildSelect);
  return o.children = p(t, u.buildOption), o;
}, ft = ({ inData: e = [] } = {}) => {
  const t = (e ?? []).map(
    (o) => typeof o == "object" && o !== null ? o : { rowValue: o }
  );
  return p(t, u.buildOption);
}, S = ({ inData: e = [] } = {}) => {
  const t = (e ?? []).map(
    (a) => typeof a == "object" && a !== null ? a : { rowValue: a }
  ), o = structuredClone(u.buildDataList);
  return o.children = p(t, u.buildOption), o;
}, ht = {
  table: O,
  tableFromSpec: O,
  select: bt,
  selectOptionsOnly: ft,
  dataList: S,
  datalist: S
}, mt = ({
  type: e = d.type,
  data: t = d.data,
  columns: o = d.columns,
  options: a = d.options,
  showLog: r = d.showLog
} = {}) => {
  const c = {
    type: e,
    data: t,
    columns: o,
    options: a,
    showLog: r
  };
  F({ inConfig: c });
  const $ = ht[c.type];
  if (!$)
    throw new Error(`Renderer for type "${c.type}" not found.`);
  const j = $({
    inColumns: c.columns,
    inData: c.data,
    options: c.options
  });
  return c.showLog && console.log("json-renderers-build output:", j), j;
};
D({ render: mt, getSpec: C, spec: l });
export {
  mt as default,
  C as getSpec,
  mt as render,
  l as spec
};
