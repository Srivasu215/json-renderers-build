import tagJson from "./tag.json" with { type: "json" };

const buildBodyCell = ({ inValue } = {}) => {
    const td = structuredClone(tagJson);

    td.attributes.value = inValue;
    td.textContent = inValue;

    return td;
};

export default buildBodyCell;
