import jsonTransform from "@keshavsoft/json-transformer";

import skeletonJson from './skeleton.json' with { type: 'json' };

const startFunc = ({
    inData,
}) => {
    const localData = inData;

    let specAsJsonToDom = jsonTransform({
        children: localData
    }, skeletonJson);

    return specAsJsonToDom?.children;
};

export default startFunc;
