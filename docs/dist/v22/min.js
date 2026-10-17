const O = {
  version: "1.22.0",
  name: "json-renderers-build"
}, tt = (r) => {
  const t = r;
  if (typeof globalThis > "u" || !t) return;
  globalThis.ks ?? (globalThis.ks = {});
  const e = typeof t == "function" ? t : t.render, n = typeof t == "object" ? t.getSpec : void 0;
  globalThis.ks.jsonRenderersBuild = {
    meta: O,
    renderToDom: e,
    render: e,
    ...n ? { getSpec: n } : {},
    ...typeof t == "object" ? t : {}
  };
}, I = ["table", "tableFromSpec", "select", "selectOptionsOnly", "dataList", "datalist", "searchInput", "search", "inputRow", "form"], et = ["table", "tableFromSpec"], K = ["text", "email", "number", "tel", "url", "password", "search", "date", "datetime-local", "time", "month", "week", "color", "textarea", "select", "checkbox"], M = ({ inConfig: r } = {}) => {
  const t = r;
  if (!t || typeof t != "object")
    throw console.error("Config must be an object"), new TypeError("Config must be an object");
  if (typeof t.type != "string" || !I.includes(t.type))
    throw console.error(`type must be one of: ${I.join(", ")}`), new Error(`type must be one of: ${I.join(", ")}`);
  if (t.showLog !== void 0 && typeof t.showLog != "boolean")
    throw console.error("showLog must be a boolean"), new TypeError("showLog must be a boolean");
  if (!Array.isArray(t.data))
    throw console.error("data must be an Array"), new TypeError("data must be an Array");
  if (et.includes(t.type)) {
    if (!Array.isArray(t.columns))
      throw console.error("columns must be an array for table rendering"), new TypeError("columns must be an array for table rendering");
    for (let e = 0; e < t.columns.length; e++) {
      const n = t.columns[e];
      if (!n || typeof n != "object")
        throw console.error(`columns[${e}] must be an object`), new TypeError(`columns[${e}] must be an object`);
      if (typeof n.columnName != "string" || !n.columnName.trim())
        throw console.error(`columns[${e}].columnName must be a non-empty string`), new TypeError(`columns[${e}].columnName must be a non-empty string`);
    }
    for (let e = 0; e < t.data.length; e++) {
      const n = t.data[e];
      if (!n || typeof n != "object")
        throw console.error(`data[${e}] must be an object`), new TypeError(`data[${e}] must be an object`);
    }
    if (t.columns.length > 0 && t.data.length > 0) {
      const e = t.columns.map((a) => a.columnName), n = Object.keys(t.data[0]);
      if (!e.some((a) => n.includes(a))) {
        const a = `Data alignment error: None of the columns [${e.join(", ")}] match any keys in data rows [${n.join(", ")}]`;
        throw console.error(a), new Error(a);
      }
    }
  }
  if (t.type === "form") {
    if (!Array.isArray(t.columns))
      throw new TypeError("columns must be an array for form rendering");
    t.columns.forEach((e, n) => {
      if (!e || typeof e != "object" || Array.isArray(e))
        throw new TypeError(`columns[${n}] must be an object`);
      if (typeof e.columnName != "string" || !e.columnName.trim())
        throw new TypeError(`columns[${n}].columnName must be a non-empty string`);
      if (e.type !== void 0 && !K.includes(e.type))
        throw new TypeError(`columns[${n}].type must be one of: ${K.join(", ")}`);
      if (e.options !== void 0 && !Array.isArray(e.options))
        throw new TypeError(`columns[${n}].options must be an array`);
    });
    for (let e = 0; e < t.data.length; e++) {
      const n = t.data[e];
      if (!n || typeof n != "object" || Array.isArray(n))
        throw new TypeError(`data[${e}] must be an object for form rendering`);
    }
  }
  return !0;
}, rt = "table", ot = [], nt = [], at = {}, st = !1, g = {
  type: rt,
  columns: ot,
  data: nt,
  options: at,
  showLog: st
}, ct = [
  {
    columnName: "Name",
    width: "150px"
  },
  {
    columnName: "Designation",
    width: "100px"
  }
], it = [
  {
    Name: "Keshav",
    Designation: "Founder"
  }
], lt = {
  columns: ct,
  data: it
}, w = {
  ...g,
  ...lt
}, v = ({
  type: r = w.type,
  data: t = w.data,
  columns: e = w.columns,
  options: n = w.options,
  showLog: o = w.showLog
} = {}) => {
  const c = {
    type: r,
    data: t,
    columns: e,
    options: n,
    showLog: o
  };
  return M({ inConfig: c }), c;
};
Object.assign(v, w);
v.toJSON = () => structuredClone(w);
const ut = (r) => typeof r == "object" && r !== null && !Array.isArray(r), bt = (r, t) => {
  if (!ut(r)) return;
  let e = {};
  for (const [n, o] of Object.entries(r))
    e[n] = C(t, o);
  return e;
}, dt = (r, t) => {
  const e = structuredClone(r);
  return Array.isArray(e) ? e.map((o) => C(t, o)) : void 0;
}, Y = (r, t, e) => {
  if (r === "${agg:count}" && "rowData" in t) {
    if (Array.isArray(t == null ? void 0 : t.rowData))
      return t == null ? void 0 : t.rowData.length;
  } else
    return r === "${rowValue}" && "rowData" in t ? t == null ? void 0 : t.rowData : r.replace(/\$\{(\w+)\}/g, (n, o) => t[o] !== void 0 ? t[o] : n);
}, ft = (r, t) => Y(r, t), mt = (r, t, e) => {
  if (t == null)
    throw new TypeError("inTemplate is required");
  if (typeof t != "object" && typeof t != "string")
    throw new TypeError("inTemplate must be an object or string");
  if (!r || typeof r != "object" || Array.isArray(r))
    throw new TypeError("inElement must be an object");
  return !0;
}, C = (r, t, e) => {
  const n = r, o = t;
  mt(n, o);
  const a = structuredClone(o);
  return typeof a == "string" ? Y(a, n) : (a === null || typeof a != "object" || ("textContent" in a && (a.textContent = ft(a == null ? void 0 : a.textContent, n)), "attributes" in a && (a.attributes = bt(a == null ? void 0 : a.attributes, n)), "children" in a && (a.children = dt(a == null ? void 0 : a.children, n))), a);
}, pt = (r, t) => {
  if (!Array.isArray(r))
    throw new TypeError("inSource must be an Array");
  if (r.length === 0)
    throw new Error("inSource cannot be empty");
  for (let e = 0; e < r.length; e++)
    if (!r[e] || typeof r[e] != "object")
      throw new TypeError(`inSource[${e}] must be an object`);
  if (!t || typeof t != "object" && typeof t != "string")
    throw new TypeError("inTemplate must be an object or string");
  return !0;
}, S = (r, t) => {
  const e = r, n = t;
  return pt(e, n), e.map((o) => C(o, n));
}, yt = (r, t) => r.map((n) => ({
  ...n,
  rowData: t[n.columnName]
})), ht = (r, t, e) => {
  var o, a, u, b, s, l;
  if (!Array.isArray(r))
    throw new TypeError("inColumns must be an Array");
  if (r.length === 0)
    throw new Error("inColumns cannot be empty");
  for (let c = 0; c < r.length; c++) {
    const i = r[c];
    if (!i || typeof i != "object")
      throw new TypeError(`inColumns[${c}] must be an object`);
    if (typeof i.columnName != "string" || !i.columnName.trim())
      throw new TypeError(`inColumns[${c}].columnName must be a non-empty string`);
  }
  if (!Array.isArray(t))
    throw new TypeError("inData must be an Array");
  for (let c = 0; c < t.length; c++) {
    const i = t[c];
    if (!i || typeof i != "object")
      throw new TypeError(`inData[${c}] must be an object`);
  }
  if (!e || typeof e != "object" || Array.isArray(e))
    throw new TypeError("inSpec must be an object");
  const n = ((u = (a = (o = r[0]) == null ? void 0 : o.template) == null ? void 0 : a.body) == null ? void 0 : u.tr) || "buildBodyTr";
  if (!(n in e))
    throw new Error(`Row template "${n}" not found in inSpec`);
  for (let c = 0; c < r.length; c++) {
    const i = r[c], d = ((s = (b = i.template) == null ? void 0 : b.body) == null ? void 0 : s.cell) || ((l = i.template) == null ? void 0 : l.bodyCell) || "buildBodyCell";
    if (!(d in e))
      throw new Error(`Cell template "${d}" for column "${i.columnName}" not found in inSpec`);
  }
  return !0;
}, wt = (r, t) => r.map((n) => {
  var b, s, l;
  const o = ((s = (b = n.template) == null ? void 0 : b.body) == null ? void 0 : s.cell) || ((l = n.template) == null ? void 0 : l.bodyCell) || "buildBodyCell", a = t[o];
  return C(n, a);
}), gt = (r, t, e) => {
  var l, c, i;
  ht(r, t, e);
  const n = r, o = t, a = e, u = ((i = (c = (l = n[0]) == null ? void 0 : l.template) == null ? void 0 : c.body) == null ? void 0 : i.tr) || "buildBodyTr", b = a[u];
  return o.map((d) => {
    const p = C(d, b), R = yt(n, d), T = wt(R, a);
    return p.children = T, p;
  });
}, k = (r, t) => {
  var e;
  if (((e = r == null ? void 0 : r.attributes) == null ? void 0 : e["data-role"]) === t) return r;
  for (const n of (r == null ? void 0 : r.children) ?? []) {
    const o = k(n, t);
    if (o) return o;
  }
  return null;
}, Nt = (r, t) => {
  const e = r[t.fileName], n = t.dataRole ? k(e, t.dataRole) : e;
  return (t.filePath ?? []).reduce((o, a) => o[a], n);
}, $t = {
  tagName: "tr",
  attributes: {
    class: "align-middle"
  },
  children: []
}, jt = {
  tagName: "col",
  attributes: {
    width: "${width}"
  }
}, xt = {
  tagName: "th",
  textContent: "${columnName}",
  attributes: {
    class: "py-3 px-3 fw-semibold text-uppercase small"
  }
}, Ct = {
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
}, Tt = {
  tagName: "td",
  textContent: "${rowValue}",
  attributes: {
    class: "py-3 px-3 text-secondary"
  }
}, At = {
  tagName: "button",
  textContent: "${columnName}",
  attributes: {
    class: "btn btn-primary btn-sm"
  }
}, St = {
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
}, Lt = {
  tagName: "option",
  textContent: "${rowValue}",
  attributes: {
    value: "${rowValue}"
  }
}, Et = {
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
}, P = {
  buildBodyTr: $t,
  buildColGroup: jt,
  buildHeader: xt,
  buildFooter: Ct,
  buildBodyCell: Tt,
  button: At,
  buttonCell: St,
  buildOption: Lt,
  buildSelect: Et,
  buildDataList: Rt
}, It = "table", Ft = {
  class: "table table-hover table-striped align-middle border mb-0"
}, Dt = [
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
], q = {
  tagName: It,
  attributes: Ft,
  children: Dt
}, vt = [
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
], kt = [
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
], A = (r) => Array.isArray(r) ? r : [r], _ = {
  set: (r, t, e) => {
    r[t] = e;
  },
  push: (r, t, e) => {
    r[t].push(...A(e));
  },
  unshift: (r, t, e) => {
    r[t].unshift(...A(e));
  },
  pushToRows: (r, t, e) => {
    r[t].forEach((n) => {
      n.children.push(...structuredClone(A(e)));
    });
  },
  unshiftToRows: (r, t, e) => {
    r[t].forEach((n) => {
      n.children.unshift(...structuredClone(A(e)));
    });
  },
  unshiftSerialToRows: (r, t, e) => {
    r[t].forEach((n, o) => {
      const a = structuredClone(e);
      a.textContent = o + 1, n.children.unshift(a);
    });
  }
}, J = (r, t, e) => {
  const n = t.dataRole ? k(r[t.fileName], t.dataRole) : r[t.fileName], o = [...t.filePath ?? []], a = o.pop(), u = o.reduce((s, l) => s[l], n);
  (_[t.action] || _.set)(u, a, e);
}, N = { data: {}, base: q, spec: P }, U = {
  fromCollection: S,
  twoDimensional: gt
}, Pt = (r) => {
  r.forEach((t) => {
    const e = Nt(N, t.sourcePath);
    if (e) {
      const n = U[t.func](e, P[t.templateKey]);
      J(N, t.destinationPath, n);
    } else
      console.log("   !instruction : ", t), console.log("   !source : ", e);
  });
}, Bt = (r) => {
  r.forEach((t) => {
    const e = U[t.func](
      N.data.columns,
      N.data.data,
      P
    );
    J(N, t.destinationPath, e);
  });
}, Vt = (r) => (N.data = r, Pt(vt), Bt(kt), q), G = ({
  inData: r,
  inColumns: t,
  footer: e = [],
  options: n
} = {}) => Vt({
  columns: t,
  data: r
}), Wt = {
  tagName: "option",
  textContent: "${rowValue}",
  attributes: {
    value: "${rowValue}"
  }
}, Kt = {
  tagName: "select",
  attributes: {
    id: "LedgerName"
  },
  children: []
}, _t = {
  tagName: "datalist",
  attributes: {
    "data-name": "${columnName}"
  },
  children: []
}, x = {
  buildOption: Wt,
  buildSelect: Kt,
  buildDataList: _t
}, Gt = ({ inData: r = [] } = {}) => {
  const t = (r ?? []).map(
    (n) => typeof n == "object" && n !== null ? n : { rowValue: n }
  ), e = structuredClone(x.buildSelect);
  return e.children = S(t, x.buildOption), e;
}, Ht = ({ inData: r = [], inColumns: t = [] } = {}) => t.map((n) => {
  const o = structuredClone(x.buildOption);
  o.textContent = o.textContent.replace("rowValue", n.columnName), o.attributes.value = o.attributes.value.replace("rowValue", n.columnName);
  const a = S(r, o);
  return console.log("createdArray : ", a[0], o), a;
}), H = ({ inData: r = [] } = {}) => {
  const t = (r ?? []).map(
    (n) => typeof n == "object" && n !== null ? n : { rowValue: n }
  ), e = structuredClone(x.buildDataList);
  return e.children = S(t, x.buildOption), e;
}, Mt = {
  version: "1.1.0",
  name: "json-renderers-build-input-row"
}, Yt = (r) => {
  const t = r;
  if (typeof globalThis > "u" || !t) return;
  globalThis.ks ?? (globalThis.ks = {});
  const e = typeof t == "function" ? t : t.render;
  globalThis.ks.jsonRenderersBuildInputRow = {
    meta: Mt,
    render: e,
    ...typeof t == "object" ? t : {}
  };
}, F = [
  "input",
  "inputOnly",
  "inputWithLabel",
  "inputWithLabelButton"
], qt = ({ inConfig: r } = {}) => {
  const t = r;
  if (!t || typeof t != "object")
    throw console.error("Config must be an object"), new TypeError("Config must be an object");
  if (t.type && (typeof t.type != "string" || !F.includes(t.type)))
    throw console.error(`type must be one of: ${F.join(", ")}`), new Error(`type must be one of: ${F.join(", ")}`);
  if (t.options && typeof t.options != "object")
    throw console.error("options must be an object"), new TypeError("options must be an object");
  return !0;
}, Jt = {
  tagName: "input",
  attributes: {
    type: "search",
    placeholder: "Search...",
    class: "form-control",
    id: "searchInputId"
  }
}, Ut = {
  tagName: "label",
  textContent: "Search:",
  attributes: {
    class: "form-label mb-0 text-nowrap fw-semibold",
    for: "searchInputId"
  }
}, zt = {
  tagName: "button",
  textContent: "Search",
  attributes: {
    type: "button",
    class: "btn btn-primary text-nowrap",
    id: "searchButtonId"
  }
}, Qt = {
  tagName: "div",
  attributes: {
    class: "d-flex align-items-center gap-2"
  },
  children: []
}, m = {
  input: Jt,
  label: Ut,
  button: zt,
  rowWrapper: Qt
}, $ = ({ inOptions: r = {} } = {}) => {
  const t = r, e = structuredClone(m.input);
  return t != null && t.placeholder && (e.attributes.placeholder = t.placeholder), t != null && t.class && (e.attributes.class = t.class), t != null && t.id && (e.attributes.id = t.id), t != null && t.name && (e.attributes.name = t.name), t != null && t.type && (e.attributes.type = t.type), t != null && t.value && (e.attributes.value = t.value), e;
}, L = ({ inOptions: r = {} } = {}) => {
  const t = r, e = structuredClone(m.rowWrapper), n = structuredClone(m.label), o = (t == null ? void 0 : t.id) ?? m.input.attributes.id;
  t != null && t.wrapperClass && (e.attributes.class = t.wrapperClass), t != null && t.label && (n.textContent = t.label), t != null && t.labelClass && (n.attributes.class = t.labelClass), n.attributes.for = o;
  const a = $({
    inOptions: {
      ...t,
      id: o
    }
  });
  return e.children = [n, a], e;
}, E = ({ inOptions: r = {} } = {}) => {
  const t = r, e = structuredClone(m.rowWrapper), n = structuredClone(m.label), o = structuredClone(m.button), a = (t == null ? void 0 : t.id) ?? m.input.attributes.id, u = (t == null ? void 0 : t.buttonId) ?? m.button.attributes.id;
  t != null && t.wrapperClass && (e.attributes.class = t.wrapperClass), t != null && t.label && (n.textContent = t.label), t != null && t.labelClass && (n.attributes.class = t.labelClass), n.attributes.for = a;
  const b = $({
    inOptions: {
      ...t,
      id: a
    }
  });
  return t != null && t.buttonText && (o.textContent = t.buttonText), t != null && t.buttonClass && (o.attributes.class = t.buttonClass), t != null && t.buttonType && (o.attributes.type = t.buttonType), o.attributes.id = u, e.children = [n, b, o], e;
}, Xt = {
  input: $,
  inputOnly: $,
  inputWithLabel: L,
  inputWithLabelButton: E
}, Zt = ({
  type: r = "inputWithLabel",
  options: t = {},
  inType: e,
  inOptions: n,
  showLog: o = !1
} = {}) => {
  const a = e ?? r, u = n ?? t, b = o;
  qt({ inConfig: { type: a, options: u } });
  const s = Xt[a];
  if (!s)
    throw new Error(`Flavour for type "${a}" not found.`);
  const l = s({ inOptions: u });
  return b && console.log("json-renderers-build-input-row output:", l), l;
};
Yt({
  render: Zt,
  inputOnly: $,
  inputWithLabel: L,
  inputWithLabelButton: E
});
const D = ({ inOptions: r = {}, options: t = {} } = {}) => {
  const e = r && Object.keys(r).length > 0 ? r : t;
  return (e == null ? void 0 : e.label) === !1 || (e == null ? void 0 : e.flavour) === "inputOnly" ? $({ inOptions: e }) : (e == null ? void 0 : e.flavour) === "inputWithLabelButton" || e != null && e.button || e != null && e.buttonText ? E({ inOptions: e }) : L({ inOptions: e });
}, Ot = {
  version: "1.1.0",
  name: "json-renderers-build-form"
}, te = (r) => {
  const t = r;
  if (typeof globalThis > "u" || !t) return;
  globalThis.ks ?? (globalThis.ks = {});
  const e = typeof t == "function" ? t : t.render;
  globalThis.ks.jsonRenderersBuildForm = {
    meta: Ot,
    render: e,
    ...typeof t == "object" ? t : {}
  };
}, ee = ({ inConfig: r } = {}) => {
  const t = r;
  if (!t || typeof t != "object")
    throw console.error("Config must be an object"), new TypeError("Config must be an object");
  if (t.columns && !Array.isArray(t.columns))
    throw console.error("columns must be an Array"), new TypeError("columns must be an Array");
  if (t.data && !Array.isArray(t.data))
    throw console.error("data must be an Array"), new TypeError("data must be an Array");
  if (t.options && typeof t.options != "object")
    throw console.error("options must be an object"), new TypeError("options must be an object");
  return !0;
}, re = {
  tagName: "form",
  attributes: {
    class: "vstack gap-3",
    id: "appFormId"
  },
  children: []
}, oe = {
  tagName: "button",
  textContent: "Save",
  attributes: {
    type: "submit",
    class: "btn btn-primary align-self-start",
    id: "formSubmitBtnId"
  }
}, ne = {
  tagName: "div",
  attributes: {
    class: "mb-3"
  },
  children: [
    {
      tagName: "label",
      textContent: "Notes",
      attributes: {
        class: "form-label fw-semibold",
        for: "fieldId"
      }
    },
    {
      tagName: "textarea",
      attributes: {
        class: "form-control",
        rows: "3",
        id: "fieldId",
        name: "fieldName"
      }
    }
  ]
}, ae = {
  tagName: "div",
  attributes: {
    class: "mb-3"
  },
  children: [
    {
      tagName: "label",
      textContent: "Select",
      attributes: {
        class: "form-label fw-semibold",
        for: "fieldId"
      }
    },
    {
      tagName: "select",
      attributes: {
        class: "form-select",
        id: "fieldId",
        name: "fieldName"
      },
      children: []
    }
  ]
}, se = {
  tagName: "div",
  attributes: {
    class: "form-check mb-3"
  },
  children: [
    {
      tagName: "input",
      attributes: {
        type: "checkbox",
        class: "form-check-input",
        id: "fieldId",
        name: "fieldName",
        value: "true"
      }
    },
    {
      tagName: "label",
      textContent: "Agree",
      attributes: {
        class: "form-check-label",
        for: "fieldId"
      }
    }
  ]
}, j = {
  form: re,
  submitButton: oe,
  textareaRow: ne,
  selectRow: ae,
  checkboxRow: se
}, ce = /* @__PURE__ */ new Set([
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
]), ie = (r) => String(r ?? "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "field", le = ({ inOption: r, inSelectedValue: t } = {}) => {
  const e = r, n = t, o = e && typeof e == "object" ? e.value : e, a = e && typeof e == "object" ? e.label ?? o : e, u = n != null && String(o) === String(n);
  return {
    tagName: "option",
    textContent: String(a ?? ""),
    attributes: {
      value: String(o ?? ""),
      ...u ? { selected: !0 } : {}
    }
  };
}, z = ({ inColumn: r, inRow: t = {}, inIndex: e = 0, inFormLayout: n = "vertical" } = {}) => {
  var B, V, W;
  const o = r, a = t, u = e, b = n, s = (o == null ? void 0 : o.columnName) ?? `field_${u}`, l = (o == null ? void 0 : o.type) ?? "text", c = (o == null ? void 0 : o.label) ?? (o == null ? void 0 : o.title) ?? s, i = (o == null ? void 0 : o.id) ?? `form-${u}-${ie(s)}`, d = a[s] ?? (o == null ? void 0 : o.value), p = {
    id: i,
    name: s,
    ...o != null && o.placeholder ? { placeholder: o.placeholder } : {},
    ...o != null && o.required ? { required: !0 } : {},
    ...o != null && o.disabled ? { disabled: !0 } : {},
    ...o != null && o.readOnly ? { readonly: !0 } : {}
  };
  if (l === "checkbox") {
    const f = structuredClone(j.checkboxRow), y = f.children[0], h = f.children[1];
    return Object.assign(y.attributes, p, {
      type: "checkbox",
      value: (o == null ? void 0 : o.value) ?? "true"
    }), y.properties = { checked: !!(d ?? (o == null ? void 0 : o.checked) ?? !1) }, h.textContent = c, h.attributes.for = i, f;
  }
  if (l === "textarea") {
    const f = structuredClone(j.textareaRow), y = f.children[0], h = f.children[1];
    return y.textContent = c, y.attributes.for = i, Object.assign(h.attributes, p, {
      rows: String((o == null ? void 0 : o.rows) ?? 3)
    }), d != null && (h.textContent = String(d)), f;
  }
  if (l === "select") {
    const f = structuredClone(j.selectRow), y = f.children[0], h = f.children[1];
    return y.textContent = c, y.attributes.for = i, Object.assign(h.attributes, p), h.children = ((o == null ? void 0 : o.options) ?? []).map(
      (Z) => le({ inOption: Z, inSelectedValue: d })
    ), f;
  }
  const R = ce.has(l) ? l : "text", T = {
    label: c,
    type: R,
    id: i,
    name: s,
    placeholder: (o == null ? void 0 : o.placeholder) ?? "",
    class: (o == null ? void 0 : o.class) ?? "form-control",
    value: d != null ? String(d) : void 0,
    wrapperClass: b === "inline" ? "d-flex align-items-center gap-2 mb-3" : "mb-3",
    labelClass: b === "inline" ? "form-label mb-0 text-nowrap fw-semibold" : "form-label fw-semibold"
  };
  return o != null && o.buttonText || o != null && o.button ? E({
    inOptions: {
      ...T,
      buttonText: o.buttonText ?? ((B = o.button) == null ? void 0 : B.text) ?? "Action",
      buttonClass: o.buttonClass ?? ((V = o.button) == null ? void 0 : V.class) ?? "btn btn-outline-primary",
      buttonId: o.buttonId ?? ((W = o.button) == null ? void 0 : W.id) ?? `${i}-btn`
    }
  }) : L({ inOptions: T });
}, Q = ({ inColumns: r = [], inData: t = [], inOptions: e = {}, columns: n, data: o, options: a } = {}) => {
  const u = Array.isArray(r) && r.length > 0 ? r : Array.isArray(n) ? n : [], b = Array.isArray(t) && t.length > 0 ? t : Array.isArray(o) ? o : [], s = e && Object.keys(e).length > 0 ? e : a ?? {}, l = b[0] ?? {}, c = (s == null ? void 0 : s.layout) ?? "vertical", i = structuredClone(j.form);
  if (s != null && s.formId && (i.attributes.id = s.formId), s != null && s.className && (i.attributes.class = s.className), s != null && s.ariaLabel && (i.attributes["aria-label"] = s.ariaLabel), i.children = u.map(
    (d, p) => z({
      inColumn: d,
      inRow: l,
      inIndex: p,
      inFormLayout: c
    })
  ), (s == null ? void 0 : s.showSubmit) !== !1) {
    const d = structuredClone(j.submitButton);
    d.textContent = (s == null ? void 0 : s.submitLabel) ?? "Save", s != null && s.submitClass && (d.attributes.class = s.submitClass), s != null && s.submitId && (d.attributes.id = s.submitId), i.children.push(d);
  }
  return i;
}, X = ({
  columns: r = [],
  data: t = [],
  options: e = {},
  inColumns: n,
  inData: o,
  inOptions: a,
  showLog: u = !1
} = {}) => {
  const b = n ?? r, s = o ?? t, l = a ?? e, c = u;
  ee({
    inConfig: {
      columns: b,
      data: s,
      options: l
    }
  });
  const i = Q({
    inColumns: b,
    inData: s,
    inOptions: l
  });
  return c && console.log("json-renderers-build-form output:", i), i;
};
te({
  render: X,
  renderForm: Q,
  renderField: z
});
const ue = ({
  inColumns: r = [],
  inData: t = [],
  inOptions: e = {},
  columns: n,
  data: o,
  options: a
} = {}) => {
  const u = r && r.length > 0 ? r : n ?? [], b = t && t.length > 0 ? t : o ?? [], s = e && Object.keys(e).length > 0 ? e : a ?? {};
  return X({
    inColumns: u,
    inData: b,
    inOptions: s
  });
}, be = {
  table: G,
  tableFromSpec: G,
  select: Gt,
  selectOptionsOnly: Ht,
  dataList: H,
  datalist: H,
  searchInput: D,
  search: D,
  inputRow: D,
  form: ue
}, de = ({
  type: r = g.type,
  data: t = g.data,
  columns: e = g.columns,
  options: n = g.options,
  showLog: o = g.showLog
} = {}) => {
  const c = {
    type: r,
    data: t,
    columns: e,
    options: n,
    showLog: o
  };
  M({ inConfig: c });
  const i = be[c.type];
  if (!i)
    throw new Error(`Renderer for type "${c.type}" not found.`);
  const d = i({
    inColumns: c.columns,
    inData: c.data,
    inOptions: c.options,
    options: c.options
  });
  return c.showLog && console.log("json-renderers-build output:", d), d;
};
tt({ render: de, getSpec: v, spec: w });
export {
  de as default,
  v as getSpec,
  de as render,
  w as spec
};
