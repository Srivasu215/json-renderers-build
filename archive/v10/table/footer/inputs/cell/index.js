import cellJson from "./tag.json" with { type: "json" };
import inputJson from "../input/tag.json" with { type: "json" };

const renderCell = ({ inColumn } = {}) => {
    const cell = structuredClone(cellJson);
    const input = structuredClone(inputJson);

    input.attributes.name = inColumn;
    input.attributes.placeholder = inColumn;
    cell.children.push(input);

    return cell;
};

export default renderCell;
