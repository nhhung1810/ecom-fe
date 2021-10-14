export const ProductTableHeader = props => {
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