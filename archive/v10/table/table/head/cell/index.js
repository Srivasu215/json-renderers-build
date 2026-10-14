import tagJson from "./tag.json" with { type: "json" };

const buildHeadCell = ({ inColumn } = {}) => {
    const th = structuredClone(tagJson);

    th.attributes.value = inColumn;
    th.textContent = inColumn;

    return th;
};

export default buildHeadCell;
