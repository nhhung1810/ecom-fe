import React from "react";
import { OrderTable, OrderToolBar } from "./components";
import "./orders.css"

const Order = props => {
    return (
        <div className="">
            <OrderToolBar />
            <OrderTable />
        </div>
    )
    }

export default Order