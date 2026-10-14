import tagJson from "./tag.json" with { type: "json" };
import buildBodyRow from "./row/index.js";

const renderTableBody = ({ inData = [], inColumns = [] } = {}) => {
    const tbody = structuredClone(tagJson);

    const children = inData.map(row => buildBodyRow({
        inRow: row,
        inColumns
    }));

    tbody.children = children;

    return tbody;
};

export default renderTableBody;
