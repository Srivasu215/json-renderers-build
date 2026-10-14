import headRow from "./row/index.js";
import skeletonJson from './skeleton.json' with { type: 'json' };

const startFunc = ({
    inData,
}) => {
    const localData = inData;
    const thead = structuredClone(skeletonJson);

    thead.children = [headRow({ inData: localData })];

    return thead;
};

export default startFunc;
