import renderRow from "./row/index.js";

const renderEmpty = ({ inColumns = [] } = {}) =>
    renderRow({ inColumns });

export default renderEmpty;
