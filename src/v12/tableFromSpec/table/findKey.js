const startFunc = (structure, key) => {
    const findkey = key;

    const result = findkey
        .split(".")
        .reduce((obj, key) => {
            return key.split("[").reduce((value, part) => {
                return part.endsWith("]")
                    ? value[part.slice(0, -1)]
                    : value[part];
            }, obj);
        }, structure);

    return result;
};

export default startFunc;
