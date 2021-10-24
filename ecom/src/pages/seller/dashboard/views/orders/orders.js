import React, { useEffect, useLayoutEffect, useState } from "react";
import { getAllOrderBySellerID } from "../../../../../api/api.order";
import { SearchInput, ExportButton } from "../../../../../components";
import { dateFormat } from "../../../../../utilities/date.format";
import "./orders.css"

const Order = props => {
    return (
        <div className="">
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
    const [data, setData] = useState([])
    const [busy, setBusy] = useState(true)
    useEffect(() => {
        let mounted = true
        getAllOrderBySellerID().then(response => {
            if(mounted){
                if(response != null && response.data != null){
                    let tmp = response.data.map(e => {
                        return {
                            orderid: e.orderid,
                            name  : e.name,
                            productid: e.productid,
                            quantity: e.quantity,
                            price: e.price,
                            color: e.color,
                            size: e.size,
                            status: e.status,
                            created_date: dateFormat(e.created_date)
                        }
                    })
                    console.log(tmp)
                    setData(tmp)
                    setBusy(false)
                }
            }
        })
        return () => mounted = false
    }, [])

    const rowGenerator = () => {
        let tmp = data.map((e, index) => {
            return(
                <OrderTableRow
                    key={e.orderid}
                    isEven={(index + 1)%2}
                    orderid={e.orderid}
                    name={e.name}
                    size={e.size}
                    color={e.color}
                    status={e.status}
                    createdDate={e.created_date}
                    price={e.price}
                    quantity={e.quantity}
                />
            ) 
        })
        return tmp
    }


    return(
        <div className="order__table-container">
            <OrderTableHeader/>
            <div className="order__table-line"/>
            {busy ? null : rowGenerator()}
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

export default Order