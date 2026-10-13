const applyShowSerial = (inSpec) => {
    const [thead, tbody] = inSpec.children;
    console.log("aaaaaaa--", thead.children[0]);

    // prepend <th>#</th> to head row
    thead.children[0].children.unshift({
        tagName: "th",
        textContent: "#"
    });

    // prepend <td>{rowIndex}</td> to each body row
    tbody.children.forEach((tr, index) => {
        tr.children.unshift({
            tagName: "td",
            textContent: String(index + 1)
        });
    });
};

export default applyShowSerial;
