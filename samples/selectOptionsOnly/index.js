import render from "../../docs/dist/v19/min.js";

import data from "./data.json" with { type: "json" };
import columns from "./columns.json" with { type: "json" };

const start = () => {
  try {
    const createControl = render({
      type: "selectOptionsOnly",
      data, columns
    });
    console.log("createControl : ", createControl);

    const container = document.getElementById("dom-render-container");

  } catch (err) {
    console.log("error : ", err);
  }
};

start();