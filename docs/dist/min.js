const B = {
  version: "1.21.0",
  name: "json-renderers-build"
}, K = (r) => {
  const e = r;
  if (typeof globalThis > "u" || !e) return;
  globalThis.ks ?? (globalThis.ks = {});
  const t = typeof e == "function" ? e : e.render, o = typeof e == "object" ? e.getSpec : void 0;
  globalThis.ks.jsonRenderersBuild = {
    meta: B,
    renderToDom: t,
    render: t,
    ...o ? { getSpec: o } : {},
    ...typeof e == "object" ? e : {}
  };
}, N = ["table", "tableFromSpec", "select", "selectOptionsOnly", "dataList", "datalist", "searchInput", "search", "form"], V = ["table", "tableFromSpec"], T = ["text", "email", "number", "tel", "url", "password", "search", "date", "datetime-local", "time", "month", "week", "color", "textarea", "select", "checkbox"], E = ({ inConfig: r } = {}) => {
  const e = r;
  if (!e || typeof e != "object")
    throw console.error("Config must be an object"), new TypeError("Config must be an object");
  if (typeof e.type != "string" || !N.includes(e.type))
    throw console.error(`type must be one of: ${N.join(", ")}`), new Error(`type must be one of: ${N.join(", ")}`);
  if (e.showLog !== void 0 && typeof e.showLog != "boolean")
    throw console.error("showLog must be a boolean"), new TypeError("showLog must be a boolean");
  if (!Array.isArray(e.data))
    throw console.error("data must be an Array"), new TypeError("data must be an Array");
  if (V.includes(e.type)) {
    if (!Array.isArray(e.columns))
      throw console.error("columns must be an array for table rendering"), new TypeError("columns must be an array for table rendering");
    for (let t = 0; t < e.columns.length; t++) {
      const o = e.columns[t];
      if (!o || typeof o != "object")
        throw console.error(`columns[${t}] must be an object`), new TypeError(`columns[${t}] must be an object`);
      if (typeof o.columnName != "string" || !o.columnName.trim())
        throw console.error(`columns[${t}].columnName must be a non-empty string`), new TypeError(`columns[${t}].columnName must be a non-empty string`);
    }
    for (let t = 0; t < e.data.length; t++) {
      const o = e.data[t];
      if (!o || typeof o != "object")
        throw console.error(`data[${t}] must be an object`), new TypeError(`data[${t}] must be an object`);
    }
    if (e.columns.length > 0 && e.data.length > 0) {
      const t = e.columns.map((a) => a.columnName), o = Object.keys(e.data[0]);
      if (!t.some((a) => o.includes(a))) {
        const a = `Data alignment error: None of the columns [${t.join(", ")}] match any keys in data rows [${o.join(", ")}]`;
        throw console.error(a), new Error(a);
      }
    }
  }
  if (e.type === "form") {
    if (!Array.isArray(e.columns))
      throw new TypeError("columns must be an array for form rendering");
    e.columns.forEach((t, o) => {
      if (!t || typeof t != "object" || Array.isArray(t))
        throw new TypeError(`columns[${o}] must be an object`);
      if (typeof t.columnName != "string" || !t.columnName.trim())
        throw new TypeError(`columns[${o}].columnName must be a non-empty string`);
      if (t.type !== void 0 && !T.includes(t.type))
        throw new TypeError(`columns[${o}].type must be one of: ${T.join(", ")}`);
      if (t.options !== void 0 && !Array.isArray(t.options))
        throw new TypeError(`columns[${o}].options must be an array`);
    });
    for (let t = 0; t < e.data.length; t++) {
      const o = e.data[t];
      if (!o || typeof o != "object" || Array.isArray(o))
        throw new TypeError(`data[${t}] must be an object for form rendering`);
    }
  }
  return !0;
}, _ = "table", H = [], G = [], M = {}, Y = !1, h = {
  type: _,
  columns: H,
  data: G,
  options: M,
  showLog: Y
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
], O = {
  columns: q,
  data: J
}, m = {
  ...h,
  ...O
}, C = ({
  type: r = m.type,
  data: e = m.data,
  columns: t = m.columns,
  options: o = m.options,
  showLog: n = m.showLog
} = {}) => {
  const s = {
    type: r,
    data: e,
    columns: t,
    options: o,
    showLog: n
  };
  return E({ inConfig: s }), s;
};
Object.assign(C, m);
C.toJSON = () => structuredClone(m);
const z = (r) => typeof r == "object" && r !== null && !Array.isArray(r), Q = (r, e) => {
  if (!z(r)) return;
  let t = {};
  for (const [o, n] of Object.entries(r))
    t[o] = y(e, n);
  return t;
}, U = (r, e) => {
  const t = structuredClone(r);
  return Array.isArray(t) ? t.map((n) => y(e, n)) : void 0;
}, F = (r, e, t) => {
  if (r === "${agg:count}" && "rowData" in e) {
    if (Array.isArray(e == null ? void 0 : e.rowData))
      return e == null ? void 0 : e.rowData.length;
  } else
    return r === "${rowValue}" && "rowData" in e ? e == null ? void 0 : e.rowData : r.replace(/\$\{(\w+)\}/g, (o, n) => e[n] !== void 0 ? e[n] : o);
}, W = (r, e) => F(r, e), X = (r, e, t) => {
  if (e == null)
    throw new TypeError("inTemplate is required");
  if (typeof e != "object" && typeof e != "string")
    throw new TypeError("inTemplate must be an object or string");
  if (!r || typeof r != "object" || Array.isArray(r))
    throw new TypeError("inElement must be an object");
  return !0;
}, y = (r, e, t) => {
  const o = r, n = e;
  X(o, n);
  const a = structuredClone(n);
  return typeof a == "string" ? F(a, o) : (a === null || typeof a != "object" || ("textContent" in a && (a.textContent = W(a == null ? void 0 : a.textContent, o)), "attributes" in a && (a.attributes = Q(a == null ? void 0 : a.attributes, o)), "children" in a && (a.children = U(a == null ? void 0 : a.children, o))), a);
}, Z = (r, e) => {
  if (!Array.isArray(r))
    throw new TypeError("inSource must be an Array");
  if (r.length === 0)
    throw new Error("inSource cannot be empty");
  for (let t = 0; t < r.length; t++)
    if (!r[t] || typeof r[t] != "object")
      throw new TypeError(`inSource[${t}] must be an object`);
  if (!e || typeof e != "object" && typeof e != "string")
    throw new TypeError("inTemplate must be an object or string");
  return !0;
}, g = (r, e) => {
  const t = r, o = e;
  return Z(t, o), t.map((n) => y(n, o));
}, tt = (r, e) => r.map((o) => ({
  ...o,
  rowData: e[o.columnName]
})), et = (r, e, t) => {
  var n, a, c, l, u, i;
  if (!Array.isArray(r))
    throw new TypeError("inColumns must be an Array");
  if (r.length === 0)
    throw new Error("inColumns cannot be empty");
  for (let s = 0; s < r.length; s++) {
    const d = r[s];
    if (!d || typeof d != "object")
      throw new TypeError(`inColumns[${s}] must be an object`);
    if (typeof d.columnName != "string" || !d.columnName.trim())
      throw new TypeError(`inColumns[${s}].columnName must be a non-empty string`);
  }
  if (!Array.isArray(e))
    throw new TypeError("inData must be an Array");
  for (let s = 0; s < e.length; s++) {
    const d = e[s];
    if (!d || typeof d != "object")
      throw new TypeError(`inData[${s}] must be an object`);
  }
  if (!t || typeof t != "object" || Array.isArray(t))
    throw new TypeError("inSpec must be an object");
  const o = ((c = (a = (n = r[0]) == null ? void 0 : n.template) == null ? void 0 : a.body) == null ? void 0 : c.tr) || "buildBodyTr";
  if (!(o in t))
    throw new Error(`Row template "${o}" not found in inSpec`);
  for (let s = 0; s < r.length; s++) {
    const d = r[s], b = ((u = (l = d.template) == null ? void 0 : l.body) == null ? void 0 : u.cell) || ((i = d.template) == null ? void 0 : i.bodyCell) || "buildBodyCell";
    if (!(b in t))
      throw new Error(`Cell template "${b}" for column "${d.columnName}" not found in inSpec`);
  }
  return !0;
}, rt = (r, e) => r.map((o) => {
  var l, u, i;
  const n = ((u = (l = o.template) == null ? void 0 : l.body) == null ? void 0 : u.cell) || ((i = o.template) == null ? void 0 : i.bodyCell) || "buildBodyCell", a = e[n];
  return y(o, a);
}), ot = (r, e, t) => {
  var i, s, d;
  et(r, e, t);
  const o = r, n = e, a = t, c = ((d = (s = (i = o[0]) == null ? void 0 : i.template) == null ? void 0 : s.body) == null ? void 0 : d.tr) || "buildBodyTr", l = a[c];
  return n.map((b) => {
    const A = y(b, l), k = tt(o, b), v = rt(k, a);
    return A.children = v, A;
  });
}, $ = (r, e) => {
  var t;
  if (((t = r == null ? void 0 : r.attributes) == null ? void 0 : t["data-role"]) === e) return r;
  for (const o of (r == null ? void 0 : r.children) ?? []) {
    const n = $(o, e);
    if (n) return n;
  }
  return null;
}, at = (r, e) => {
  const t = r[e.fileName], o = e.dataRole ? $(t, e.dataRole) : t;
  return (e.filePath ?? []).reduce((n, a) => n[a], o);
}, nt = {
  tagName: "tr",
  attributes: {
    class: "align-middle"
  },
  children: []
}, st = {
  tagName: "col",
  attributes: {
    width: "${width}"
  }
}, ct = {
  tagName: "th",
  textContent: "${columnName}",
  attributes: {
    class: "py-3 px-3 fw-semibold text-uppercase small"
  }
}, lt = {
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
}, it = {
  tagName: "td",
  textContent: "${rowValue}",
  attributes: {
    class: "py-3 px-3 text-secondary"
  }
}, ut = {
  tagName: "button",
  textContent: "${columnName}",
  attributes: {
    class: "btn btn-primary btn-sm"
  }
}, dt = {
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
}, bt = {
  tagName: "option",
  textContent: "${rowValue}",
  attributes: {
    value: "${rowValue}"
  }
}, mt = {
  tagName: "select",
  attributes: {
    id: "LedgerName"
  },
  children: []
}, ft = {
  tagName: "datalist",
  attributes: {
    "data-name": "${columnName}"
  },
  children: []
}, j = {
  buildBodyTr: nt,
  buildColGroup: st,
  buildHeader: ct,
  buildFooter: lt,
  buildBodyCell: it,
  button: ut,
  buttonCell: dt,
  buildOption: bt,
  buildSelect: mt,
  buildDataList: ft
}, ht = "table", pt = {
  class: "table table-hover table-striped align-middle border mb-0"
}, yt = [
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
  tagName: ht,
  attributes: pt,
  children: yt
}, wt = [
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
], gt = [
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
], w = (r) => Array.isArray(r) ? r : [r], S = {
  set: (r, e, t) => {
    r[e] = t;
  },
  push: (r, e, t) => {
    r[e].push(...w(t));
  },
  unshift: (r, e, t) => {
    r[e].unshift(...w(t));
  },
  pushToRows: (r, e, t) => {
    r[e].forEach((o) => {
      o.children.push(...structuredClone(w(t)));
    });
  },
  unshiftToRows: (r, e, t) => {
    r[e].forEach((o) => {
      o.children.unshift(...structuredClone(w(t)));
    });
  },
  unshiftSerialToRows: (r, e, t) => {
    r[e].forEach((o, n) => {
      const a = structuredClone(t);
      a.textContent = n + 1, o.children.unshift(a);
    });
  }
}, I = (r, e, t) => {
  const o = e.dataRole ? $(r[e.fileName], e.dataRole) : r[e.fileName], n = [...e.filePath ?? []], a = n.pop(), c = n.reduce((u, i) => u[i], o);
  (S[e.action] || S.set)(c, a, t);
}, p = { data: {}, base: P, spec: j }, R = {
  fromCollection: g,
  twoDimensional: ot
}, Nt = (r) => {
  r.forEach((e) => {
    const t = at(p, e.sourcePath);
    if (t) {
      const o = R[e.func](t, j[e.templateKey]);
      I(p, e.destinationPath, o);
    } else
      console.log("   !instruction : ", e), console.log("   !source : ", t);
  });
}, Ct = (r) => {
  r.forEach((e) => {
    const t = R[e.func](
      p.data.columns,
      p.data.data,
      j
    );
    I(p, e.destinationPath, t);
  });
}, $t = (r) => (p.data = r, Nt(wt), Ct(gt), P), x = ({
  inData: r,
  inColumns: e,
  footer: t = [],
  options: o
} = {}) => $t({
  columns: e,
  data: r
}), jt = {
  tagName: "option",
  textContent: "${rowValue}",
  attributes: {
    value: "${rowValue}"
  }
}, At = {
  tagName: "select",
  attributes: {
    id: "LedgerName"
  },
  children: []
}, Tt = {
  tagName: "datalist",
  attributes: {
    "data-name": "${columnName}"
  },
  children: []
}, St = {
  tagName: "div",
  attributes: {
    class: "d-flex align-items-center gap-2"
  },
  children: [
    {
      tagName: "label",
      textContent: "Search:",
      attributes: {
        class: "form-label mb-0 text-nowrap fw-semibold",
        for: "searchInputId"
      }
    },
    {
      tagName: "input",
      attributes: {
        type: "search",
        placeholder: "Search...",
        class: "form-control",
        id: "searchInputId"
      }
    }
  ]
}, f = {
  buildOption: jt,
  buildSelect: At,
  buildDataList: Tt,
  buildSearchInput: St
}, xt = ({ inData: r = [] } = {}) => {
  const e = (r ?? []).map(
    (o) => typeof o == "object" && o !== null ? o : { rowValue: o }
  ), t = structuredClone(f.buildSelect);
  return t.children = g(e, f.buildOption), t;
}, Lt = ({ inData: r = [], inColumns: e = [] } = {}) => e.map((o) => {
  const n = structuredClone(f.buildOption);
  n.textContent = n.textContent.replace("rowValue", o.columnName), n.attributes.value = n.attributes.value.replace("rowValue", o.columnName);
  const a = g(r, n);
  return console.log("createdArray : ", a[0], n), a;
}), L = ({ inData: r = [] } = {}) => {
  const e = (r ?? []).map(
    (o) => typeof o == "object" && o !== null ? o : { rowValue: o }
  ), t = structuredClone(f.buildDataList);
  return t.children = g(e, f.buildOption), t;
}, D = ({ inOptions: r = {}, options: e = {} } = {}) => {
  const t = r && Object.keys(r).length > 0 ? r : e;
  if ((t == null ? void 0 : t.label) === !1) {
    const c = structuredClone(f.buildSearchInput.children[1]);
    return t != null && t.placeholder && (c.attributes.placeholder = t.placeholder), t != null && t.class && (c.attributes.class = t.class), t != null && t.id && (c.attributes.id = t.id), t != null && t.name && (c.attributes.name = t.name), t != null && t.type && (c.attributes.type = t.type), c;
  }
  const o = structuredClone(f.buildSearchInput), n = o.children[0], a = o.children[1];
  return t != null && t.label && (n.textContent = t.label), t != null && t.id && (n.attributes.for = t.id, a.attributes.id = t.id), t != null && t.placeholder && (a.attributes.placeholder = t.placeholder), t != null && t.class && (a.attributes.class = t.class), t != null && t.name && (a.attributes.name = t.name), t != null && t.type && (a.attributes.type = t.type), t != null && t.wrapperClass && (o.attributes.class = t.wrapperClass), t != null && t.labelClass && (n.attributes.class = t.labelClass), o;
}, Dt = /* @__PURE__ */ new Set([
  "text",
  "email",
  "number",
  "tel",
  "url",
  "password",
  "search",
  "date",
  "datetime-local",
  "time",
  "month",
  "week",
  "color"
]), Et = (r) => r.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "field", Ft = (r, e) => {
  const t = r && typeof r == "object" ? r.value : r, o = r && typeof r == "object" ? r.label ?? t : r, n = e != null && String(t) === String(e);
  return {
    tagName: "option",
    textContent: String(o ?? ""),
    attributes: { value: String(t ?? ""), ...n ? { selected: !0 } : {} }
  };
}, Pt = ({ column: r, row: e, index: t } = {}) => {
  const o = r.columnName, n = r.type ?? "text", a = r.label ?? r.title ?? o, c = r.id ?? `form-${t}-${Et(o)}`, l = e[o], u = {
    id: c,
    name: o,
    ...r.placeholder ? { placeholder: r.placeholder } : {},
    ...r.required ? { required: !0 } : {},
    ...r.disabled ? { disabled: !0 } : {},
    ...r.readOnly ? { readonly: !0 } : {}
  };
  if (n === "checkbox")
    return {
      tagName: "div",
      attributes: { class: "form-check mb-3" },
      children: [
        {
          tagName: "input",
          attributes: { ...u, type: "checkbox", value: r.value ?? "true", class: "form-check-input" },
          properties: { checked: !!(l ?? r.checked ?? !1) }
        },
        {
          tagName: "label",
          textContent: a,
          attributes: { class: "form-check-label", for: c }
        }
      ]
    };
  let i;
  if (n === "textarea")
    i = {
      tagName: "textarea",
      textContent: l == null ? "" : String(l),
      attributes: { ...u, rows: r.rows ?? 3, class: "form-control" }
    };
  else if (n === "select")
    i = {
      tagName: "select",
      attributes: { ...u, class: "form-select" },
      children: (r.options ?? []).map((s) => Ft(s, l))
    };
  else {
    const s = Dt.has(n) ? n : "text";
    i = {
      tagName: "input",
      attributes: { ...u, type: s, class: "form-control" },
      ...l == null ? {} : { properties: { value: String(l) } }
    };
  }
  return {
    tagName: "div",
    attributes: { class: "mb-3" },
    children: [
      {
        tagName: "label",
        textContent: a,
        attributes: { class: "form-label", for: c }
      },
      i
    ]
  };
}, It = ({ inColumns: r = [], inData: e = [], options: t = {} } = {}) => {
  const o = Array.isArray(r) ? r : [], a = (Array.isArray(e) ? e : [])[0] ?? {}, c = t && typeof t == "object" ? t : {}, l = {
    tagName: "form",
    attributes: {
      class: c.className ?? "vstack gap-1",
      ...c.formId ? { id: c.formId } : {},
      ...c.ariaLabel ? { "aria-label": c.ariaLabel } : {}
    },
    children: o.map((u, i) => Pt({ column: u, row: a, index: i }))
  };
  return c.showSubmit !== !1 && l.children.push({
    tagName: "button",
    textContent: c.submitLabel ?? "Save",
    attributes: { type: "submit", class: "btn btn-primary align-self-start" }
  }), l;
}, Rt = {
  table: x,
  tableFromSpec: x,
  select: xt,
  selectOptionsOnly: Lt,
  dataList: L,
  datalist: L,
  searchInput: D,
  search: D,
  form: It
}, kt = ({
  type: r = h.type,
  data: e = h.data,
  columns: t = h.columns,
  options: o = h.options,
  showLog: n = h.showLog
} = {}) => {
  const s = {
    type: r,
    data: e,
    columns: t,
    options: o,
    showLog: n
  };
  E({ inConfig: s });
  const d = Rt[s.type];
  if (!d)
    throw new Error(`Renderer for type "${s.type}" not found.`);
  const b = d({
    inColumns: s.columns,
    inData: s.data,
    inOptions: s.options,
    options: s.options
  });
  return s.showLog && console.log("json-renderers-build output:", b), b;
};
K({ render: kt, getSpec: C, spec: m });
export {
  kt as default,
  C as getSpec,
  kt as render,
  m as spec
};
