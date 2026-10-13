import render from "../../docs/dist/v11/min.js";

// import "https://cdn.jsdelivr.net/gh/keshavsoft/json-renderers@main/docs/dist/v12/min.js";
import "https://keshavsoft.github.io/json-to-tag/dist/v9/min.js";

import data from "./batches.json" with { type: "json" };

const start = () => {
  try {
    // window.ks.jsonRenderers.renderToDom({
    //   type: "table",
    //   data,
    //   targetHtmlId: "dom-render-container"
    // });

    const createControl = render({
      type: "tableFromSpec",
      columns: [{
        columnName: "itemName",
        width: "70%"
      }],
      data: data.slice(0, 10)
    });
    console.log("createControl : ", createControl);

    const result = window.ks.jsonToTag.buildSpecElement(createControl);
    console.log("result : ", result);

    const container = document.getElementById("dom-render-container");
    if (container) {
    }

  } catch (err) {
    console.log("error : ", err);
    const container = document.getElementById("dom-render-container");
    if (container) {
      container.innerHTML = `<div class="alert alert-danger font-monospace small">${err.message}</div>`;
    }
  }
};

start();