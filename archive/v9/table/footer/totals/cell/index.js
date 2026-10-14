import tagJson from "./tag.json" with { type: "json" };

const getValue = (row, column) =>
    Array.isArray(row) ? row[column] : row?.[column];

const renderCell = ({ inColumn, inIndex, inData = [] } = {}) => {
    const cell = structuredClone(tagJson);
    const values = inData
        .map(row => getValue(row, inColumn))
        .filter(value => value !== null && value !== undefined && String(value).trim() !== "")
        .map(Number)
        .filter(Number.isFinite);

    cell.textContent = values.length
        ? String(values.reduce((sum, value) => sum + value, 0))
        : inIndex === 0 ? "Total" : "";

    return cell;
};

export default renderCell;
