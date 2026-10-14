import registerGlobal from "./registerGlobal.js";

import renderTable, { renderTableHead, renderTableBody } from "./table/index.js";
import renderSelect, { renderSelectOptions } from "./select/index.js";

const RENDERER_MAP = {
    table: renderTable,
    select: renderSelect,
    selectOptionsOnly: renderSelectOptions,
    tableHead: renderTableHead,
    tableBody: renderTableBody
};

const render = ({
    type = "table",
    data,
    columns
} = {}) => {
    const rawType = type;
    const renderer = RENDERER_MAP[rawType];

    if (!renderer) {
        console.error(
            `[Renderer] Unknown renderer type "${rawType}". Available types: ${Object.keys(RENDERER_MAP).join(", ")}`
        );
        return null;
    }

    const localData = data;
    const localColumns = columns;

    return renderer({
        inColumns: localColumns,
        inData: localData
    });
};

registerGlobal(render);

export {
    renderTable,
    renderTableHead,
    renderTableBody,
    renderSelect,
    renderSelectOptions
};
export default render;
