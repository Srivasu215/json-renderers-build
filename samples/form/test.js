import render from "../../docs/dist/v22/min.js";

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

const formSpec = render({
  type: "form",
  columns,
  data,
  options: { formId: "contact-form", ariaLabel: "Contact details", submitLabel: "Save contact" }
});

console.log("Form spec tagName:", formSpec?.tagName);
console.log("Form children count:", formSpec?.children?.length);

if (!formSpec || formSpec.tagName !== "form") {
  throw new Error(`Expected tagName 'form', got '${formSpec?.tagName}'`);
}

if (!formSpec.children || formSpec.children.length === 0) {
  throw new Error("Expected form to have children");
}

console.log("Form test PASSED!");
