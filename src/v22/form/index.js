import renderForm, { renderField } from "json-renderers-build-form";

const render = ({
    inColumns = [],
    inData = [],
    inOptions = {},
    columns,
    data,
    options
} = {}) => {
    const localColumns = inColumns && inColumns.length > 0 ? inColumns : (columns ?? []);
    const localData = inData && inData.length > 0 ? inData : (data ?? []);
    const localOptions = inOptions && Object.keys(inOptions).length > 0 ? inOptions : (options ?? {});

    return renderForm({
        inColumns: localColumns,
        inData: localData,
        inOptions: localOptions
    });
};

export { render, renderForm, renderField };
export default render;
