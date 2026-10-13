import { fromCollection } from "json-transformer-funcs";
import spec from "../spec.json" with { type: "json" };

const renderSelect = ({ inData = [] } = {}) => {
    const localData = (inData ?? []).map(element =>
        typeof element === "object" && element !== null ? element : { rowValue: element }
    );

    const select = structuredClone(spec.buildSelect);
    select.children = fromCollection(localData, spec.buildOption);

    return select;
};

export default renderSelect;