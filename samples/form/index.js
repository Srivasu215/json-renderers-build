import render from "../../docs/dist/v21/min.js";
// import render from "../../src/index.js";
import "https://keshavsoft.github.io/json-to-tag/dist/v9/min.js";

const columns = [
  { columnName: "Name", type: "text", label: "Full name", placeholder: "Ada Lovelace", required: true },
  { columnName: "Email", type: "email", label: "Email address", placeholder: "ada@example.com", required: true },
  { columnName: "Role", type: "select", label: "Role", options: ["Designer", "Engineer", "Product manager"] },
  { columnName: "Notes", type: "textarea", label: "Notes", placeholder: "Anything else we should know?" },
  { columnName: "Updates", type: "checkbox", label: "Send me product updates" }
];

const data = [{
  Name: "Ada Lovelace",
  Email: "ada@example.com",
  Role: "Engineer",
  Notes: "Interested in the next release.",
  Updates: true
}];

const start = () => {
  const spec = render({
    type: "form",
    columns,
    data,
    options: { formId: "contact-form", ariaLabel: "Contact details", submitLabel: "Save contact" }
  });

  document.getElementById("spec-output").textContent = JSON.stringify(spec, null, 2);

  const container = document.getElementById("form-container");
  const formElement = window.ks.jsonToTag.buildSpecElement(spec);
  container.replaceChildren(formElement);

  formElement.addEventListener("submit", event => {
    event.preventDefault();
    const result = Object.fromEntries(new FormData(formElement));
    const resultElement = document.getElementById("submit-result");
    resultElement.textContent = `Submitted form data: ${JSON.stringify(result)}`;
    resultElement.classList.remove("d-none");
  });
};

try {
  start();
} catch (error) {
  document.getElementById("form-container").textContent = `Unable to build form: ${error.message}`;
  console.error(error);
}
