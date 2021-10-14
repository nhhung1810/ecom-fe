export const ProductTableBody = props => {
    const data = {
        imagePath: "http://localhost:8080/image",
        pname: "Collete Strect Linen Minidress",
        ptag: ["Women", "Casual dresses"],
        soldNum: 4,
        capacity: 100,
        dateAdded: "Today, 8th Aug, 2018",
        totalProfit: 400,
    }

    const dataset = [data, data, data, data]

    const rowGenerator = dataset => {
        return dataset.map((data, index) => {
            let tag = ""
            const { imagePath, pname, ptag, soldNum, capacity, dateAdded, totalProfit } = data
            for (const e of ptag){
                tag += e + ", " 
            }
            tag = tag.slice(0, tag.length - 2)
            return (
                <tr className="table__body-row">
                    <td><ProductSummary tag={tag} imagePath={imagePath} label={pname}/></td>
                    <td>{String(soldNum) + "/" + String(capacity)}</td>
                    <td>{dateAdded}</td>
                    <td>{totalProfit}</td>
                    <td className="table__body-align-left"><ActionButton/></td>
                </tr>   
            )
        })

    }

    return (
        <div className="table__body-container">
            <table className="table__body">
                <colgroup>
                    <col width="380" />
                    <col width="200" />
                    <col width="260" />
                    <col width="200" />
                </colgroup>
                <tbody className="table__body">
                    {rowGenerator(dataset)}
                </tbody>
            </table>
        </div>
    )
}

const ActionButton = props =>{
    return (
        <div className="table__action-container">
            <span>Action</span>
            <img src={process.env.PUBLIC_URL + "/images/dropdown.svg"} className="table__action-button"/>
            <span></span>
        </div>
    )
}

const ProductSummary = props => {
    return (
        <div className="table__product-summary-container">
            <img src={props.imagePath} className="table__product-image"/>
            <span className="table__product-summary-text">
                <div className="table__product-label">
                    {props.label}
                </div>
                <div className="table__product-tag">
                    {props.tag}
                </div>
            </span>
        </div>
    )
}
