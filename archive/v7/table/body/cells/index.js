import jsonTransform from "@keshavsoft/json-transformer";

import skeletonJson from './skeleton.json' with { type: 'json' };

const startFunc = ({
    inData,
} = {}) => {
    const rawData = inData ?? [];
    const localData = rawData.map(val => {
        if (typeof val === "object" && val !== null) {
            return JSON.stringify(val);
        }
        return String(val ?? "");
    });

    const tdAsArray = jsonTransform({
        children: localData
    }, skeletonJson);

    return tdAsArray?.children ?? [];
};

export default startFunc;
