import jsonTransform from "@keshavsoft/json-transformer";

import skeletonJson from './skeleton.json' with { type: 'json' };

const startFunc = ({
    inData,
}) => {
    const localData = inData;

    let tdAsArray = jsonTransform({
        children: localData
    }, skeletonJson);

    return tdAsArray?.children;
};

export default startFunc;
