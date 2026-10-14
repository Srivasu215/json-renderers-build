import tagJson from "./tag.json" with { type: "json" };

const renderCell = () => structuredClone(tagJson);

export default renderCell;
