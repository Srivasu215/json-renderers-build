import jsonTransform from "@keshavsoft/json-transformer";

import skeletonJson from './skeleton.json' with { type: 'json' };

const startFunc = ({
    inData,
}) => {
    const localData = inData;

    let thAsArray = jsonTransform({
        children: localData
    }, skeletonJson);

    return thAsArray?.children;
};

export default startFunc;
