import React from "react";
import { SearchInput, ExportButton } from "../../../../../components";
import "./orders.css"

const Order = props => {
    return (
        <div className>
            <OrderToolBar />
            <OrderTable />
        </div>
    )
}

const OrderToolBar = props => {
    return (
        <div className="order__toolbar">
            <div className="order__toolbar-text">
                ORDERED DATE
            </div>
            <button className="order__toolbar-date" disabled>
                01/08/2018 - 31/08/2018
                <img className="order__toolbar-date-calendar" src={process.env.PUBLIC_URL + "/images/calendar.svg"}></img>
            </button>
            <button className="order__toolbar-today">Today</button>
            <button className="order__toolbar-yesterday">Yesterday</button>
            <div className="order__toolbar-align-right">
                <span className="order__toolbar-search">
                    <SearchInput
                        placeholder={"Search order"} />
                </span>
                <span className="order__toolbar-export">
                    <ExportButton />
                </span>
            </div>
        </div>
    )
}

const OrderTable = props => {
    return(
        <div className="order__table-container">
            <OrderTableHeader/>
            <div className="order__table-line"/>
            <OrderTableRow isEven={true}/>
            <OrderTableRow isEven={false}/>
        </div>
    )
}

const OrderTableHeader = props => {
    return (
        <div className="order__table-header">
            <div className="order__table-header-id">ORDER ID</div>
            <div className="order__table-header-date">ORDERED DATE</div>
            <div className="order__table-header-detail">DETAIL</div>
            <div className="order__table-header-total">TOTAL ($)</div>
            <div className="order__table-header-status">STATUS</div>
            <div className="order__table-header-action"></div>
        </div>
    )
}

const OrderTableRow = props => {
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
            <div className="order__table-row-id">AB1234</div>
            <div className="order__table-row-date">Today, 8th Aug, 2018</div>
            <div className="order__table-row-detail">Collete Stretch Linen Minidress (M) x 1</div>
            <div className="order__table-row-total">60.00</div>
            <div className="order__table-row-status">
                <OrderStatus completed/>
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

    if(props.pending)
        status = "Pending"
    else if(props.completed)
        status = "Completed"
    else if(props.cancel)
        status = "Cancel"

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

export default Order