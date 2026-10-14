import tagJson from "./tag.json" with { type: "json" };
import renderCell from "../cell/index.js";

const renderRow = ({ inColumns = [] } = {}) => {
    const row = structuredClone(tagJson);
    row.children = inColumns.map(inColumn => renderCell({ inColumn }));
    return row;
};

export default renderRow;
