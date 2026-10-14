import tagJson from "./tag.json" with { type: "json" };
import renderTableHead from "./head/index.js";
import renderTableBody from "./body/index.js";
import renderTableFooter from "../footer/index.js";

const renderTable = ({
    inColumns = [],
    inData = [],
    inFooter = []
} = {}) => {
    const table = structuredClone(tagJson);

    const children = [
        renderTableHead({ inColumns }),
        renderTableBody({ inData, inColumns })
    ];

    if (!Array.isArray(inFooter)) {
        throw new TypeError("The footer property must be an array of footer names.");
    }

    if (inFooter.length > 0) {
        children.push(renderTableFooter({
            inFooter,
            inColumns,
            inData
        }));
    }

    table.children = children;

    return table;
};

export { renderTableHead, renderTableBody };
export default renderTable;
