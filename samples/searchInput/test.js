import render from "../../docs/dist/v21/min.js";

const runTest = ({ inType = "searchInput", inOptions = {} } = {}) => {
  const localType = inType;
  const localOptions = inOptions;

  console.log(`Testing build with type "${localType}" and options:`, localOptions);

  const spec = render({
    type: localType,
    options: localOptions
  });

  console.log("Generated Spec:", JSON.stringify(spec, null, 2));

  if (localOptions?.label === false) {
    if (!spec || spec.tagName !== "input") {
      throw new Error(`Expected tagName 'input', got '${spec?.tagName}'`);
    }
  } else {
    if (!spec || spec.tagName !== "div") {
      throw new Error(`Expected wrapper tagName 'div', got '${spec?.tagName}'`);
    }
    const labelChild = spec.children?.[0];
    const inputChild = spec.children?.[1];

    if (labelChild?.tagName !== "label") {
      throw new Error(`Expected child 0 to be 'label', got '${labelChild?.tagName}'`);
    }
    if (inputChild?.tagName !== "input") {
      throw new Error(`Expected child 1 to be 'input', got '${inputChild?.tagName}'`);
    }
  }

  console.log("Test PASSED!");
  return spec;
};

// 1. Test default searchInput (label + input on same line)
runTest();

// 2. Test with custom label and options
runTest({
  inType: "searchInput",
  inOptions: {
    label: "Search:",
    placeholder: "Search table records...",
    id: "tableSearchInput",
    class: "form-control"
  }
});

// 3. Test without label (label: false)
runTest({
  inType: "searchInput",
  inOptions: {
    label: false,
    placeholder: "Search only..."
  }
});
