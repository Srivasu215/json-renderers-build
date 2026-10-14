const resolveButtons = (inShowOptions) => {
    if (inShowOptions === true) {
        return [{ label: "Apply", type: "button" }];
    }

    if (Array.isArray(inShowOptions)) {
        return inShowOptions;
    }

    return [];
};

const applyShowOptions = (inSpec, inShowOptions) => {
    const buttons = resolveButtons(inShowOptions);

    if (buttons.length === 0) return;

    const [thead, tbody] = inSpec.children;

    // append <th>Actions</th> to head row
    thead.children[0].children.push({
        tagName: "th",
        textContent: "Actions"
    });

    // append <td> with buttons to each body row
    tbody.children.forEach(tr => {
        tr.children.push({
            tagName: "td",
            children: buttons.map(btn => ({
                tagName: "button",
                attributes: { type: btn.type || "button" },
                textContent: btn.label
            }))
        });
    });
};

export default applyShowOptions;
