import renderTableHead from "./head/index.js";
import renderTableBody from "./body/index.js";
import skeletonJson from './skeleton.json' with { type: 'json' };

const startFunc = ({
    inColumns,
    inData
}) => {
    const localColumns = inColumns;
    const localData = inData;

    const table = structuredClone(skeletonJson);

    table.children = [
        renderTableHead({ inData: localColumns }),
        renderTableBody({ inData: localData, inColumns: localColumns })
    ];

    return table;
};

export {
    renderTableHead,
    renderTableBody
};
export default startFunc;
