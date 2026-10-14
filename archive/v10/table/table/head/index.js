import tagJson from "./tag.json" with { type: "json" };
import buildHeadRow from "./row/index.js";

const renderTableHead = ({ inColumns = [] } = {}) => {
    const thead = structuredClone(tagJson);

    const children = [
        buildHeadRow({ inColumns })
    ];

    thead.children = children;

    return thead;
};

export default renderTableHead;
