import tagJson from "./tag.json" with { type: "json" };
import renderCell from "../cell/index.js";

const renderRow = ({ inColumns = [], inData = [] } = {}) => {
    const row = structuredClone(tagJson);
    row.children = inColumns.map((inColumn, inIndex) =>
        renderCell({ inColumn, inIndex, inData })
    );
    return row;
};

export default renderRow;
