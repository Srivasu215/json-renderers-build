import renderSelectOptions from "./options/index.js";

import skeletonJson from './skeleton.json' with { type: 'json' };

const startFunc = ({
    inData,
}) => {
    const localData = inData;

    let localChildren = renderSelectOptions({
        inData: localData
    });

    const select = structuredClone(skeletonJson);
    select.children = localChildren;

    return select;
};

export { renderSelectOptions };
export default startFunc;