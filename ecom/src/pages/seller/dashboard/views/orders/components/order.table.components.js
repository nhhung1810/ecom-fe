
export const OrderTableRow = props => {
    let isEven = true
    if(props.isEven != undefined)
        isEven = props.isEven

    const alterBackground = () => {
        if(isEven)
            return ""
        else 
            return "order__table-row-grey"
    }

    return (
        <div className={`order__table-row ${alterBackground()}`}>
            <div className="order__table-row-id">{props.orderid}</div>
            <div className="order__table-row-date">{props.createdDate} </div>
            <div className="order__table-row-detail">{props.name} ({props.size.toUpperCase()}) x {props.quantity}</div>
            <div className="order__table-row-total">{props.price * props.quantity}</div>
            <div className="order__table-row-status">
                <OrderStatus status={props.status}/>
            </div>
            <div className="order__table-row-action">
                Action
                <img
                    className="order__table-action-icon" 
                    src={process.env.PUBLIC_URL + "/images/dropdown.svg"}></img>
            </div>
        </div>
    )
}

const OrderStatus = props => {
    let status = "Pending"
    if(props.status != undefined)
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
