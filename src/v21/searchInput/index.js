import spec from "../spec.json" with { type: "json" };

const renderSearchInput = ({ inOptions = {}, options = {} } = {}) => {
    const localOptions = inOptions && Object.keys(inOptions).length > 0 ? inOptions : options;

    if (localOptions?.label === false) {
        const input = structuredClone(spec.buildSearchInput.children[1]);
        if (localOptions?.placeholder) input.attributes.placeholder = localOptions.placeholder;
        if (localOptions?.class) input.attributes.class = localOptions.class;
        if (localOptions?.id) input.attributes.id = localOptions.id;
        if (localOptions?.name) input.attributes.name = localOptions.name;
        if (localOptions?.type) input.attributes.type = localOptions.type;
        return input;
    }

    const container = structuredClone(spec.buildSearchInput);
    const label = container.children[0];
    const input = container.children[1];

    if (localOptions?.label) {
        label.textContent = localOptions.label;
    }

    if (localOptions?.id) {
        label.attributes.for = localOptions.id;
        input.attributes.id = localOptions.id;
    }

    if (localOptions?.placeholder) {
        input.attributes.placeholder = localOptions.placeholder;
    }

    if (localOptions?.class) {
        input.attributes.class = localOptions.class;
    }

    if (localOptions?.name) {
        input.attributes.name = localOptions.name;
    }

    if (localOptions?.type) {
        input.attributes.type = localOptions.type;
    }

    if (localOptions?.wrapperClass) {
        container.attributes.class = localOptions.wrapperClass;
    }

    if (localOptions?.labelClass) {
        label.attributes.class = localOptions.labelClass;
    }

    return container;
};

export default renderSearchInput;
