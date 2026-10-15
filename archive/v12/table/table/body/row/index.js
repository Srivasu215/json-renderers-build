import tagJson from "./tag.json" with { type: "json" };
import buildBodyCell from "../cell/index.js";

const buildBodyRow = ({ inRow, inColumns = [] } = {}) => {
    const tr = structuredClone(tagJson);

    const children = inColumns.map(column => {
        const value = Array.isArray(inRow) ? inRow[column] : inRow?.[column];

        return buildBodyCell({ inValue: value });
    });

    tr.children = children;

    return tr;
};

export default buildBodyRow;
