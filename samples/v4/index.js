import "../../docs/dist/v18/min.js";
import "https://keshavsoft.github.io/json-to-tag/dist/v9/min.js";
import data from "./batches.json" with { type: "json" };

const container = document.getElementById("dom-render-container");
const modalEl = document.getElementById("batchModal");
const batchModal = new bootstrap.Modal(modalEl);
const modalTitle = document.getElementById("batchModalTitle");
const modalBody = document.getElementById("batchModalBody");

import { saveClick } from "./methods/saveClick.js";
import { rowOptionsClick } from "./methods/rowOptionsClick.js";
import { cellButtonClick } from "./methods/cellButtonClick.js";

const start = async () => {
    try {
        const spec = window.ks.jsonRenderersBuild.renderToDom({
            type: "table",
            columns: [{
                columnName: "itemName", width: "300px", template: {
                    bodyCell: "buildBodyCell"
                }
            },
            {
                columnName: "baseUnit", width: "200px", template: {
                    bodyCell: "buildBodyCell"
                }
            },
            {
                columnName: "batches", width: "100px", template: {
                    bodyCell: "buttonCell"
                }
            }
            ],
            data,
            serial: {
                col: { width: "50px" },
                header: { columnName: "#" },
                body: {},
                footer: {}
            },
            options: {
                col: { width: "100px" },
                header: { columnName: "options" },
                body: { columnName: "show" },
                footer: { columnName: "save" }
            }
        });

        console.log("spec : ", spec);
        const control = window.ks.jsonToTag.buildSpecElement(spec);
        container.appendChild(control);

        // Click Event: dynamically build batch table on demand using sectionRowIndex
        container.addEventListener("click", (event) => {
            const currentTarget = event.currentTarget;

            const button = event.target.closest("button");
            console.log("button : ", button);


            if (!button || !currentTarget.contains(button)) return;
            const label = button.textContent.trim().toLowerCase();
            const tr = button.closest("tr");
            if (!tr) return;

            if (label === "save") {
                saveClick({ ...event, currentTarget: button });
            } else {
                const tbody = button.closest("tbody");
                console.log("hhhhhhh : ", tbody);

                if (tbody) {
                    cellButtonClick({ ...event, currentTarget: button }, { data, modalTitle, modalBody, batchModal });
                } else {
                    rowOptionsClick({ ...event, currentTarget: button });
                };

                // if (label === "1") {
                //     cellButtonClick({ ...event, currentTarget: button }, { data, modalTitle, modalBody, batchModal });
                // } else if (label === "options") {
                //     rowOptionsClick({ ...event, currentTarget: button });
                // };
            };
        });

    } catch (err) {
        console.error("Render error:", err);
        container.innerHTML = `<div class="alert alert-danger font-monospace small mb-0">${err.message}</div>`;
    }
};

start();