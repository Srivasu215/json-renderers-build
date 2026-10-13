import buildSpec from "./buildSpec/index.js";

const render = ({
    inData,
    inColumns,
    footer = [],
    options
} = {}) => {

    const spec = buildSpec({
        columns: inColumns,
        data: inData
    });

    return spec;
};

export default render;
