import registerGlobal from "./registerGlobal.js";

import renderTable from "./table/index.js";
import renderSelect, { renderSelectOptions } from "./select/index.js";
import tableFromSpec from "./tableFromSpec/index.js";

const RENDERER_MAP = {
    table: renderTable,
    select: renderSelect,
    selectOptionsOnly: renderSelectOptions,
    tableFromSpec
};

const render = ({
    type = "table",
    data,
    columns,
    options
}) => {
    const rawType = type;
    const renderer = RENDERER_MAP[rawType];
    // console.log("rawType : ", rawType, renderer);
    const localData = data;
    const localColumns = columns;

    const createdRenderer = renderer({
        inColumns: localColumns,
        inData: localData,
        options
    });

    return createdRenderer;
};

registerGlobal(render);

export {
    renderTable,
    renderSelect,
    renderSelectOptions
};
export default render;
