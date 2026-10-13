import tagJson from "./tag.json" with { type: "json" };
import renderInputs from "./inputs/index.js";
import renderInputsWithSave from "./inputsWithSave/index.js";
import renderTotals from "./totals/index.js";
import renderEmpty from "./empty/index.js";

const footerBuilders = {
    inputs: renderInputs,
    inputsWithSave: renderInputsWithSave,
    totals: renderTotals,
    empty: renderEmpty
};

const renderTableFooter = ({ inFooter = [], inColumns = [], inData = [] } = {}) => {
    const tfoot = structuredClone(tagJson);

    tfoot.children = inFooter.map(footerName => {
        if (!Object.hasOwn(footerBuilders, footerName)) {
            throw new Error(`Unknown footer "${footerName}".`);
        }

        return footerBuilders[footerName]({ inColumns, inData });
    });

    return tfoot;
};

export default renderTableFooter;
