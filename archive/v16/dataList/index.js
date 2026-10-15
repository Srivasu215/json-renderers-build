import { fromCollection } from "json-transformer-funcs";
import spec from "../spec.json" with { type: "json" };

const renderDataList = ({ inData = [] } = {}) => {
    const localData = (inData ?? []).map(element =>
        typeof element === "object" && element !== null ? element : { rowValue: element }
    );

    const dataList = structuredClone(spec.buildDataList);
    dataList.children = fromCollection(localData, spec.buildOption);

    return dataList;
};

export default renderDataList;
