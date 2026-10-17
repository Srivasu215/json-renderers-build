import registerGlobal from "./register/index.js";
import { getSpec, guardFunc, cleanSpec, sampleSpec as spec } from "./guard/index.js";

import renderTable from "./table/index.js";
import renderSelect from "./select/index.js";
import renderSelectOptions from "./selectOptionsOnly/index.js";
import renderDataList from "./dataList/index.js";
import renderSearchInput from "./searchInput/index.js";
import renderForm from "./form/index.js";

const RENDERER_MAP = {
    table: renderTable,
    tableFromSpec: renderTable,
    select: renderSelect,
    selectOptionsOnly: renderSelectOptions,
    dataList: renderDataList,
    datalist: renderDataList,
    searchInput: renderSearchInput,
    search: renderSearchInput,
    form: renderForm
};

// Main build renderer: Public API accepting clean single options object (no targetHtmlId)
const render = ({
    type = cleanSpec.type,
    data = cleanSpec.data,
    columns = cleanSpec.columns,
    options = cleanSpec.options,
    showLog = cleanSpec.showLog
} = {}) => {
    const localType = type;
    const localData = data;
    const localColumns = columns;
    const localOptions = options;
    const localShowLog = showLog;

    const config = {
        type: localType,
        data: localData,
        columns: localColumns,
        options: localOptions,
        showLog: localShowLog
    };

    // 1. Validate configuration
    guardFunc({ inConfig: config });

    // 2. Select the renderer
    const renderer = RENDERER_MAP[config.type];
    if (!renderer) {
        throw new Error(`Renderer for type "${config.type}" not found.`);
    }

    // 3. Build and return the component spec
    const createdRenderer = renderer({
        inColumns: config.columns,
        inData: config.data,
        inOptions: config.options,
        options: config.options
    });

    if (config.showLog) console.log("json-renderers-build output:", createdRenderer);

    return createdRenderer;
};

registerGlobal({ render, getSpec, spec });

export {
    render,
    getSpec,
    spec
};

export default render;
