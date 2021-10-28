import { useRef, useState } from "react"
import { useOnClickOutside } from "../../../../../../../../hook"

export const ProductTableBody = props => {
    const rowGenerator = dataset => {
        return dataset.map((data) => {
            let tag = ""
            const { id, imagePath, pname, 
                ptag, soldNum, capacity, dateAdded, totalProfit } = data
            tag = ptag
            return (
                <tr key={id} className="table__body-row">
                    <td><ProductSummary tag={tag} imagePath={imagePath} label={pname} /></td>
                    <td>{String(soldNum) + "/" + String(capacity)}</td>
                    <td>{dateAdded}</td>
                    <td>{totalProfit}</td>
                    <td className="table__body-align-left"><ActionButton /></td>
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
                    {rowGenerator(props.data)}
                </tbody>
            </table>
        </div>
    )
}

const ActionButton = props => {
    const [isOpen, setIsOpen] = useState(false)
    const ref = useRef()

    useOnClickOutside(ref, () => setIsOpen(false))
    return (
        <div className="table__action-container">
            <span>Action</span>
            <img
                onClick={e => setIsOpen(true)}
                alt="action"
                src={process.env.PUBLIC_URL + "/images/dropdown.svg"}
                className="table__action-button"
            />
            {
                isOpen
                    ?
                    <div ref={ref} className="table__action-modal">
                        <button className="table__action-modal-edit">
                            Edit
                            <img
                                className="table__action-edit-icon"
                                src={process.env.PUBLIC_URL + "/images/edit.svg"}
                            />
                        </button>
                        <button className="table__action-modal-remove">
                            Remove
                            <img
                                className="table__action-remove-icon"
                                src={process.env.PUBLIC_URL + "/images/remove.svg"}
                            />
                        </button>
                    </div>
                    :
                    null
            }
        </div>
    )
}

const ProductSummary = props => {
    return (
        <div className="table__product-summary-container">
            <img alt="product" src={props.imagePath} className="table__product-image" />
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