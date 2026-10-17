import render from "../../docs/dist/v21/min.js";
import { buildSpecElement } from "https://keshavsoft.github.io/json-to-tag/dist/v9/min.js";

const startFunc = () => {
  try {
    const searchControl = render({
      type: "searchInput",
      options: {
        label: "Search:",
        placeholder: "Search items, batches, godowns...",
        id: "searchInputId",
        class: "form-control"
      }
    });

    console.log("Search input spec:", searchControl);

    const specOutput = document.getElementById("spec-output");
    if (specOutput) {
      specOutput.textContent = JSON.stringify(searchControl, null, 2);
    }

    const target = document.getElementById("render-target");
    if (target) {
      const buildFunc = buildSpecElement || window.ks?.jsonToTag?.buildSpecElement;
      if (buildFunc) {
        const domElement = buildFunc(searchControl);
        console.log("Rendered DOM element:", domElement);
        if (domElement) {
          target.replaceChildren(...(Array.isArray(domElement) ? domElement : [domElement]));
        }
      }
    }
  } catch (err) {
    console.error("Error building search input spec:", err);
  }
};

startFunc();
