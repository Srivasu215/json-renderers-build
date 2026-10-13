import registerGlobal from "./registerGlobal.js";
import guardFunc from "./guard.js";

import renderTable from "./table/index.js";
import renderSelect, { renderSelectOptions } from "./select/index.js";
import tableFromSpec from "./tableFromSpec/index.js";

const RENDERER_MAP = {
    table: renderTable,
    select: renderSelect,
    selectOptionsOnly: renderSelectOptions,
    tableFromSpec
};

// Pure function: builds and validates the JSON configuration without rendering
const getSpec = ({
    type = "table",
    data,
    columns,
    options,
    showLog = false
} = {}) => {
    const localType = type;
    const localData = data;
    const localColumns = columns;
    const localOptions = options;
    const localShowLog = showLog;

    const specJson = {
        type: localType,
        data: localData,
        columns: localColumns,
        options: localOptions,
        showLog: localShowLog
    };

    // Internal call using in-convention
    guardFunc({ inConfig: specJson });

    return specJson;
};

// Main build renderer: Public API accepting clean single options object (no targetHtmlId)
const render = ({
    type = "table",
    data,
    columns,
    options,
    showLog = false
} = {}) => {
    // 1. Validate and obtain the clean JSON configuration
    const specJson = getSpec({
        type,
        data,
        columns,
        options,
        showLog
    });

    if (specJson.showLog) console.log("json-renderers-build specJson:", specJson);

    // 2. Select the renderer
    const renderer = RENDERER_MAP[specJson.type];
    if (!renderer) {
        throw new Error(`Renderer for type "${specJson.type}" not found.`);
    }

    // 3. Build and return the component spec
    const createdRenderer = renderer({
        inColumns: specJson.columns,
        inData: specJson.data,
        options: specJson.options
    });

    if (specJson.showLog) console.log("json-renderers-build output:", createdRenderer);

    return createdRenderer;
};

// Register on global window.ks.jsonRenderersBuild
registerGlobal({ render, getSpec });

// Export two ways:
// 1. As an object (named exports)
export {
    render,
    getSpec,
    guardFunc,
    renderTable,
    renderSelect,
    renderSelectOptions,
    tableFromSpec
};

// 2. As a single function (default export)
export default render;
