import registerGlobal from "./registerGlobal.js";

import renderTable from "./table/index.js";
import renderSelect, { renderSelectOptions } from "./select/index.js";

const RENDERER_MAP = {
    table: renderTable,
    select: renderSelect,
    selectOptionsOnly: renderSelectOptions
};

const render = ({
    type = "table",
    data,
    columns
}) => {
    const rawType = type;
    const renderer = RENDERER_MAP[rawType];

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
    renderSelect,
    renderSelectOptions
};
export default render;
