const VALID_TYPES = ["table", "select", "selectOptionsOnly", "dataList", "datalist", "tableFromSpec"];

const guardFunc = ({ inConfig } = {}) => {
    const localConfig = inConfig;

    if (!localConfig || typeof localConfig !== "object") {
        console.error("Config must be an object");
        throw new TypeError("Config must be an object");
    }

    if (typeof localConfig.type !== "string" || !VALID_TYPES.includes(localConfig.type)) {
        console.error(`type must be one of: ${VALID_TYPES.join(", ")}`);
        throw new Error(`type must be one of: ${VALID_TYPES.join(", ")}`);
    }

    if (!Array.isArray(localConfig.data)) {
        console.error("data must be an Array");
        throw new TypeError("data must be an Array");
    }

    if (!Array.isArray(localConfig.columns)) {
        console.error("columns must be an array");
        throw new TypeError("columns must be an array");
    }

    if (localConfig.showLog !== undefined && typeof localConfig.showLog !== "boolean") {
        console.error("showLog must be a boolean");
        throw new TypeError("showLog must be a boolean");
    }

    return true;
};

export { guardFunc, VALID_TYPES };
export default guardFunc;
