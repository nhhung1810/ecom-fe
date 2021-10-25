import { useRef, useState } from "react"
import { updateOrderStatusCancel, updateOrderStatusCompleted } from "../../../../../../api/api.order"
import { useOnClickOutside } from "../../../../../../hook"

export const OrderTableRow = props => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [status, setStatus] = useState(props.status)
    const ref = useRef()
    useOnClickOutside(ref, () => setIsModalOpen(false))

    let isEven = true
    if(props.isEven !== undefined)
        isEven = props.isEven

    const alterBackground = () => {
        if(isEven)
            return ""
        else 
            return "order__table-row-grey"
    }

    const handleUpdateComplete = async e => {
        const response = await updateOrderStatusCompleted(props.orderid)
        if(response)
            setStatus("Completed")
    }

    const handleUpdateCancel = async e => {
        const response = await updateOrderStatusCancel(props.orderid)
        if(response)
            setStatus("Cancel")
    }

    return (
        <div className={`order__table-row ${alterBackground()}`}>
            <div className="order__table-row-id">{props.orderid}</div>
            <div className="order__table-row-date">{props.createdDate} </div>
            <div className="order__table-row-detail">{props.name} ({props.size.toUpperCase()}) x {props.quantity}</div>
            <div className="order__table-row-total">{props.price * props.quantity}</div>
            <div className="order__table-row-status">
                <OrderStatus status={status}/>
            </div>
            <div className="order__table-row-action">
                Action
                <img
                    onClick={e => setIsModalOpen(true)}
                    alt="action"
                    className="order__table-action-icon" 
                    src={process.env.PUBLIC_URL + "/images/dropdown.svg"}>
                </img>
                {
                    isModalOpen && status.toLowerCase() === "pending"
                    ?
                    <div ref={ref} className="order__action-modal">
                        <button
                            onClick={handleUpdateComplete}
                            type="button" 
                            className="order__action-completed">
                            <div className="order__action-completed-icon"></div>
                            Mark as Completed
                        </button>
                        <button
                            onClick={handleUpdateCancel}
                            type="button" 
                            className="order__action-cancel">
                            <div className="order__action-cancel-icon"></div>
                            Mark as Canceled
                        </button>
                    </div>
                    :
                    null

                }
            </div>
        </div>
    )
}

const OrderStatus = props => {
    let status = "Pending"
    if(props.status !== undefined)
        status = props.status

    const COLORS_STATUS = {
        pending : "#fbba4e",
        completed : "#82bf11",
        cancel : "#f05d62"
    }

    return (
        <button 
            type="button" 
            style={{ backgroundColor : COLORS_STATUS[status.toLowerCase()] }}
            className="order__table-row-status-button" 
            disabled>
            {status}
        </button>
    )
}
