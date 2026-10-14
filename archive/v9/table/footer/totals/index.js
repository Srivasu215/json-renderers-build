import renderRow from "./row/index.js";

const renderTotals = ({ inColumns = [], inData = [] } = {}) =>
    renderRow({ inColumns, inData });

export default renderTotals;
