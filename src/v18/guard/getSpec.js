import guardFunc from "./guard.js";
import cleanSpec from "./configSpec.json" with { type: "json" };
import sample from "./sample.json" with { type: "json" };

// Composed sample spec: clubs the canonical base spec with the sample array structures
const sampleSpec = {
    ...cleanSpec,
    ...sample
};

// Pure function: returns the clubbed sample spec, or validates given options
const getSpec = ({
    type = sampleSpec.type,
    data = sampleSpec.data,
    columns = sampleSpec.columns,
    options = sampleSpec.options,
    showLog = sampleSpec.showLog
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

    // Internal validation call
    guardFunc({ inConfig: specJson });

    return specJson;
};

// Attach sample properties directly to getSpec
Object.assign(getSpec, sampleSpec);

// Allows JSON.stringify(getSpec) to produce the exact JSON output as JSON.stringify(spec)
getSpec.toJSON = () => structuredClone(sampleSpec);

export { getSpec, cleanSpec, sampleSpec, sample };
export default getSpec;
