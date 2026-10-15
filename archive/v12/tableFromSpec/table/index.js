import tagJson from "./tag.json" with { type: "json" };
import renderTableFooter from "../footer/index.js";
import jsonTransformer from "@keshavsoft/json-transformer";
import spec from "./spec.json" with { type: "json" };

const renderTable = ({
    inColumns = [],
    inData = [],
    inFooter = []
} = {}) => {
    const table = structuredClone(tagJson);
    const columns = inColumns.map(element => {
        return {
            columnName: element
        };
    });

    const tableFromSpec = jsonTransformer({ columns, rows: inData }, spec);
    // console.log("tableFromSpec : ", tableFromSpec);

    // const header = renderTableHead({ inColumns });
    // const body = renderTableBody({ inColumns, inData });
    // console.log("header : ", header);

    table.children[0].children = [tableFromSpec?.columns];
    table.children[1] = tableFromSpec?.rows;

    return table;
};

export default renderTable;
