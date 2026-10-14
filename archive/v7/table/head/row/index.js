import headCells from "../cells/index.js";
import skeletonJson from './skeleton.json' with { type: 'json' };

const startFunc = ({
    inData,
} = {}) => {
    const localData = inData ?? [];
    const row = structuredClone(skeletonJson);

    row.children = headCells({ inData: localData });

    return row;
};

export default startFunc;
