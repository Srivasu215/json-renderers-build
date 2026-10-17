import { render as renderInputRow, inputOnly, inputWithLabel, inputWithLabelButton } from "json-renderers-build-input-row";

const renderSearchInput = ({ inOptions = {}, options = {} } = {}) => {
    const localOptions = inOptions && Object.keys(inOptions).length > 0 ? inOptions : options;

    if (localOptions?.label === false || localOptions?.flavour === "inputOnly") {
        return inputOnly({ inOptions: localOptions });
    }

    if (localOptions?.flavour === "inputWithLabelButton" || localOptions?.button || localOptions?.buttonText) {
        return inputWithLabelButton({ inOptions: localOptions });
    }

    return inputWithLabel({ inOptions: localOptions });
};

export { renderSearchInput, renderInputRow, inputOnly, inputWithLabel, inputWithLabelButton };
export default renderSearchInput;

