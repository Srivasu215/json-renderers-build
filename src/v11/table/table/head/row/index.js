import tagJson from "./tag.json" with { type: "json" };
import buildHeadCell from "../cell/index.js";

const buildHeadRow = ({ inColumns = [] } = {}) => {
    const tr = structuredClone(tagJson);

    const children = inColumns.map(column => buildHeadCell({ inColumn: column }));

    tr.children = children;

    return tr;
};

export default buildHeadRow;
