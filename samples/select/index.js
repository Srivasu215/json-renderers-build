import render from "../../docs/dist/v18/min.js";

const start = () => {
  try {
    const createControl = render({
      type: "select",
      data: ["Apex Industries", "Blue Valley Foods", "Crown Logistics"]
    });
    console.log("createControl : ", createControl);

    const container = document.getElementById("dom-render-container");
    if (container) {
    }

  } catch (err) {
    console.log("error : ", err);
  }
};

start();