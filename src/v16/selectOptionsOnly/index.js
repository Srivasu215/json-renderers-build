import { fromCollection } from "json-transformer-funcs";
import spec from "../spec.json" with { type: "json" };

const renderSelectOptions = ({ inData = [] } = {}) => {
    const localData = (inData ?? []).map(element =>
        typeof element === "object" && element !== null ? element : { rowValue: element }
    );

    return fromCollection(localData, spec.buildOption);
};

export default renderSelectOptions;
