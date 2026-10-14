import applyShowSerial from "./showSerial/index.js";
import applyShowOptions from "./showOptions/index.js";

const applyOptions = (inSpec, inOptions = {}) => {
    // console.log("inOptions : ", inOptions);

    if (inOptions.showSerial) {
        applyShowSerial(inSpec);
    }

    if (inOptions.showOptions) {
        applyShowOptions(inSpec, inOptions.showOptions);
    }

    return inSpec;
};

export default applyOptions;
