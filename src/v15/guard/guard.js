const VALID_TYPES = ["table", "tableFromSpec", "select", "selectOptionsOnly", "dataList", "datalist"];

const TABLE_TYPES = ["table", "tableFromSpec"];

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

    if (localConfig.showLog !== undefined && typeof localConfig.showLog !== "boolean") {
        console.error("showLog must be a boolean");
        throw new TypeError("showLog must be a boolean");
    }

    if (!Array.isArray(localConfig.data)) {
        console.error("data must be an Array");
        throw new TypeError("data must be an Array");
    }

    // Table-specific validation rules
    if (TABLE_TYPES.includes(localConfig.type)) {
        if (!Array.isArray(localConfig.columns)) {
            console.error("columns must be an array for table rendering");
            throw new TypeError("columns must be an array for table rendering");
        }

        // Validate each column item shape
        for (let i = 0; i < localConfig.columns.length; i++) {
            const col = localConfig.columns[i];
            if (!col || typeof col !== "object") {
                console.error(`columns[${i}] must be an object`);
                throw new TypeError(`columns[${i}] must be an object`);
            }
            if (typeof col.columnName !== "string" || !col.columnName.trim()) {
                console.error(`columns[${i}].columnName must be a non-empty string`);
                throw new TypeError(`columns[${i}].columnName must be a non-empty string`);
            }
        }

        // Validate data row objects
        for (let i = 0; i < localConfig.data.length; i++) {
            const row = localConfig.data[i];
            if (!row || typeof row !== "object") {
                console.error(`data[${i}] must be an object`);
                throw new TypeError(`data[${i}] must be an object`);
            }
        }

        // Interconnection check: ensure columns match data keys when both are provided
        if (localConfig.columns.length > 0 && localConfig.data.length > 0) {
            const columnNames = localConfig.columns.map(c => c.columnName);
            const firstRowKeys = Object.keys(localConfig.data[0]);
            const hasMatch = columnNames.some(name => firstRowKeys.includes(name));

            if (!hasMatch) {
                const msg = `Data alignment error: None of the columns [${columnNames.join(", ")}] match any keys in data rows [${firstRowKeys.join(", ")}]`;
                console.error(msg);
                throw new Error(msg);
            }
        }
    }

    return true;
};

export { guardFunc, VALID_TYPES };
export default guardFunc;
