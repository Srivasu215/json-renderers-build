import bodyCells from "../cells/index.js";
import skeletonJson from './skeleton.json' with { type: 'json' };

const startFunc = ({
    inData,
    inColumns
} = {}) => {
    const localData = inData ?? [];
    const localColumns = inColumns;

    return localData.map(row => {
        let cellValues;

        if (Array.isArray(row)) {
            cellValues = row;
        } else if (typeof row === "object" && row !== null) {
            if (Array.isArray(localColumns) && localColumns.length > 0) {
                cellValues = localColumns.map(col => {
                    const key = typeof col === "object" ? (col.key || col.dataKey || col.title || col.name) : col;
                    return row[key] ?? "";
                });
            } else {
                cellValues = Object.values(row);
            }
        } else {
            cellValues = [row];
        }

        const tr = structuredClone(skeletonJson);
        tr.children = bodyCells({ inData: cellValues });

        return tr;
    });
};

export default startFunc;
