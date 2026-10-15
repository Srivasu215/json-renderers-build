import { fromCollection } from "json-transformer-funcs";
import spec from "../spec.json" with { type: "json" };

const renderSelectOptions = ({ inData = [], inColumns = [] } = {}) => {
    const arrayOfCollections = inColumns.map(element => {
        const template = structuredClone(spec.buildOption);

        template.textContent = template.textContent.replace("rowValue", element.columnName);
        template.attributes.value = template.attributes.value.replace("rowValue", element.columnName);

        const createdArray = fromCollection(inData, template);

        return createdArray;
    });

    return arrayOfCollections;
};

export default renderSelectOptions;