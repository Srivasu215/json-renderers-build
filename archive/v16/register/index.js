import meta from "./meta.js";

export const registerGlobal = (inDefinition) => {
    const localDefinition = inDefinition;

    if (typeof globalThis === "undefined" || !localDefinition) return;

    globalThis.ks ??= {};

    const renderFunc = typeof localDefinition === "function"
        ? localDefinition
        : localDefinition.render;

    const getSpecFunc = typeof localDefinition === "object"
        ? localDefinition.getSpec
        : undefined;

    globalThis.ks.jsonRenderersBuild = {
        meta,
        renderToDom: renderFunc,
        render: renderFunc,
        ...(getSpecFunc ? { getSpec: getSpecFunc } : {}),
        ...(typeof localDefinition === "object" ? localDefinition : {})
    };
};

export default registerGlobal;
