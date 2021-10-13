import "./table.css"

export const ProductTable = props => {
    return (
        <div className="table__component">
            <ProductTableHeader />
            <ProductTableBody />
        </div>
    )
}

const ProductTableHeader = props => {
    return (
        <div className="table__header-container">
            <table className="table__header">
                <colgroup>
                    <col width="352" />
                    <col width="200" />
                    <col width="260" />
                    <col width="200" />
                </colgroup>
                <thead>
                    <tr>
                        <td>PRODUCTS</td>
                        <td>SOLD</td>
                        <td>DATE ADDED</td>
                        <td>PROFIT ($)</td>
                        <td></td>
                    </tr>
                </thead>
            </table>
        </div>
    )
}

const ProductTableBody = props => {
    const data = {
        imagePath: "",
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
            const { imagePath, pname, ptag, soldNum, capacity, dateAdded, totalProfit } = data
            return (
                <tr className="table__body-row">
                    <td><ProductSummary label={pname}/></td>
                    <td>{String(soldNum) + "/" + String(capacity)}</td>
                    <td>{dateAdded}</td>
                    <td>{totalProfit}</td>
                    <td className="table__body-align-left">Action</td>
                </tr>
            )
        })

    }

    return (
        <div className="table__body-container">
            <table className="table__body">
                <colgroup>
                    <col width="352" />
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

const ProductSummary = props => {
    return (
        <div>
            <img src=''/>
        </div>
    )
}
