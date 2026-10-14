import jsonTransform from "@keshavsoft/json-transformer";

import skeletonJson from './skeleton.json' with { type: 'json' };

const startFunc = ({
    inData,
} = {}) => {
    const rawData = inData ?? [];
    const localData = rawData.map(col => {
        if (typeof col === "object" && col !== null) {
            return col.title || col.name || col.key || "";
        }
        return String(col);
    });

    const thAsArray = jsonTransform({
        children: localData
    }, skeletonJson);

    return thAsArray?.children ?? [];
};

export default startFunc;
