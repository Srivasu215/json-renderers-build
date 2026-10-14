import renderTable from "./table/index.js";

import applyOptions from "./options/index.js";
import renderRequests from "./render-requests.json" with { type: "json" };

const render = ({
    type = "table",
    inData,
    inColumns,
    footer = [],
    options = {}
} = {}) => {
    if (type === "table") {
        const spec = renderTable({
            inColumns,
            inData,
            inFooter: footer
        });

        return applyOptions(spec, options);
    };

    throw new Error(`Unknown table renderer type "${type}".`);
};

render.requests = renderRequests;

export {
    render,
    renderRequests
};

export default render;
