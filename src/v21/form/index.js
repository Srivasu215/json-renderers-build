const FIELD_TYPES = new Set([
    "text", "email", "number", "tel", "url", "password", "search",
    "date", "datetime-local", "time", "month", "week", "color"
]);

const slugify = value => value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "") || "field";

const optionSpec = (option, selectedValue) => {
    const value = option && typeof option === "object" ? option.value : option;
    const label = option && typeof option === "object" ? (option.label ?? value) : option;
    const isSelected = selectedValue != null && String(value) === String(selectedValue);

    return {
        tagName: "option",
        textContent: String(label ?? ""),
        attributes: { value: String(value ?? ""), ...(isSelected ? { selected: true } : {}) }
    };
};

const renderField = ({ column, row, index } = {}) => {
    const name = column.columnName;
    const type = column.type ?? "text";
    const labelText = column.label ?? column.title ?? name;
    const id = column.id ?? `form-${index}-${slugify(name)}`;
    const value = row[name];
    const commonAttributes = {
        id,
        name,
        ...(column.placeholder ? { placeholder: column.placeholder } : {}),
        ...(column.required ? { required: true } : {}),
        ...(column.disabled ? { disabled: true } : {}),
        ...(column.readOnly ? { readonly: true } : {})
    };

    if (type === "checkbox") {
        return {
            tagName: "div",
            attributes: { class: "form-check mb-3" },
            children: [
                {
                    tagName: "input",
                    attributes: { ...commonAttributes, type: "checkbox", value: column.value ?? "true", class: "form-check-input" },
                    properties: { checked: Boolean(value ?? column.checked ?? false) }
                },
                {
                    tagName: "label",
                    textContent: labelText,
                    attributes: { class: "form-check-label", for: id }
                }
            ]
        };
    }

    let control;
    if (type === "textarea") {
        control = {
            tagName: "textarea",
            textContent: value == null ? "" : String(value),
            attributes: { ...commonAttributes, rows: column.rows ?? 3, class: "form-control" }
        };
    } else if (type === "select") {
        control = {
            tagName: "select",
            attributes: { ...commonAttributes, class: "form-select" },
            children: (column.options ?? []).map(option => optionSpec(option, value))
        };
    } else {
        const inputType = FIELD_TYPES.has(type) ? type : "text";
        control = {
            tagName: "input",
            attributes: { ...commonAttributes, type: inputType, class: "form-control" },
            ...(value == null ? {} : { properties: { value: String(value) } })
        };
    }

    return {
        tagName: "div",
        attributes: { class: "mb-3" },
        children: [
            {
                tagName: "label",
                textContent: labelText,
                attributes: { class: "form-label", for: id }
            },
            control
        ]
    };
};

const renderForm = ({ inColumns = [], inData = [], options = {} } = {}) => {
    const columns = Array.isArray(inColumns) ? inColumns : [];
    const data = Array.isArray(inData) ? inData : [];
    const row = data[0] ?? {};
    const localOptions = options && typeof options === "object" ? options : {};

    const form = {
        tagName: "form",
        attributes: {
            class: localOptions.className ?? "vstack gap-1",
            ...(localOptions.formId ? { id: localOptions.formId } : {}),
            ...(localOptions.ariaLabel ? { "aria-label": localOptions.ariaLabel } : {})
        },
        children: columns.map((column, index) => renderField({ column, row, index }))
    };

    if (localOptions.showSubmit !== false) {
        form.children.push({
            tagName: "button",
            textContent: localOptions.submitLabel ?? "Save",
            attributes: { type: "submit", class: "btn btn-primary align-self-start" }
        });
    }

    return form;
};

export { renderForm };
export default renderForm;
