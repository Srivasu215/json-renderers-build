import cellJson from "./tag.json" with { type: "json" };
import inputJson from "../input/tag.json" with { type: "json" };
import buttonJson from "../button/tag.json" with { type: "json" };

const renderCell = ({ inColumn, inSave = false } = {}) => {
    const cell = structuredClone(cellJson);
    const input = structuredClone(inputJson);

    input.attributes.name = inColumn;
    input.attributes.placeholder = inColumn;
    cell.children.push(input);

    if (inSave) {
        cell.children.push(structuredClone(buttonJson));
    }

    return cell;
};

export default renderCell;
