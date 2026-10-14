import bodyCells from "../cells/index.js";
import skeletonJson from './skeleton.json' with { type: 'json' };

const startFunc = ({
    inData,
    inColumns
}) => {
    const localData = inData;
    const localColumns = inColumns;

    return localData.map(row => {
        const cellValues = Array.isArray(row)
            ? row
            : localColumns.map(col => row[col]);

        const tr = structuredClone(skeletonJson);
        tr.children = bodyCells({ inData: cellValues });

        return tr;
    });
};

export default startFunc;
