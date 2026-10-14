import bodyRows from "./rows/index.js";
import skeletonJson from './skeleton.json' with { type: 'json' };

const startFunc = ({
    inData,
    inColumns
} = {}) => {
    const tbody = structuredClone(skeletonJson);

    tbody.children = bodyRows({ inData, inColumns });

    return tbody;
};

export default startFunc;
