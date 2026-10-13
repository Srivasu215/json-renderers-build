import { fromCollection } from "json-transformer-funcs";
import spec from "../spec.json" with { type: "json" };

const renderSelectOptions = ({ inData = [] } = {}) => {
    const localData = (inData ?? []).map(element =>
        typeof element === "object" && element !== null ? element : { rowValue: element }
    );

    return fromCollection(localData, spec.buildOption);
};

const renderSelect = ({ inData = [] } = {}) => {
    const select = structuredClone(spec.buildSelect);
    select.children = renderSelectOptions({ inData });

    return select;
};

const renderDataList = ({ inData = [] } = {}) => {
    const dataList = structuredClone(spec.buildDataList);
    dataList.children = renderSelectOptions({ inData });

    return dataList;
};

export { renderSelect, renderSelectOptions, renderDataList };
export default renderSelect;