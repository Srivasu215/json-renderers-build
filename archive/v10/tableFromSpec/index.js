import renderTable from "./table/index.js";

import applyOptions from "./options/index.js";
import renderRequests from "./render-requests.json" with { type: "json" };

const render = ({
    inData,
    inColumns,
    footer = [],
    options
} = {}) => {
    const spec = renderTable({
        inColumns,
        inData,
        inFooter: footer
    });

    if (options) {
        return applyOptions(spec, options);
    };

    return spec;
};

render.requests = renderRequests;

export {
    render,
    renderRequests
};

export default render;
