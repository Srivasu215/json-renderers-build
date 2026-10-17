import { simple } from "json-renderers-build-table";

const render = ({
    inData,
    inColumns,
    footer = [],
    options
} = {}) => {

    const spec = simple({
        columns: inColumns,
        data: inData
    });

    return spec;
};

export default render;