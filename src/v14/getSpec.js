import guardFunc from "./guard.js";
import spec from "./configSpec.json" with { type: "json" };

// Pure function: builds and validates the JSON configuration without rendering
const getSpec = ({
    type = spec.type,
    data = spec.data,
    columns = spec.columns,
    options = spec.options,
    showLog = spec.showLog
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

// Also attach properties directly to getSpec so it functions as both an object and a callable function
Object.assign(getSpec, spec);

export { getSpec, spec };
export default getSpec;
