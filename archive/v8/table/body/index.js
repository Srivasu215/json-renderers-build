import bodyRows from "./rows/index.js";
import skeletonJson from './skeleton.json' with { type: 'json' };

const startFunc = ({
    inData,
    inColumns
}) => {
    const localData = inData;
    const localColumns = inColumns;
    const tbody = structuredClone(skeletonJson);

    tbody.children = bodyRows({
        inData: localData,
        inColumns: localColumns
    });

    return tbody;
};

export default startFunc;
