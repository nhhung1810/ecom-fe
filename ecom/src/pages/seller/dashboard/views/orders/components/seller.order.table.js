import React, { useState, useEffect, useReducer } from "react"
import { OrderTableRow } from "./order.table.components"
import { countOrderBySellerID, getAllOrderBySellerWithPaging } from "./../../../../../../api/api.order"
import { dateFormat } from "./../../../../../../utilities/date.format"
import { PagingTool } from "../../../../../../components"


export const OrderTable = props => {
    const [data, setData] = useState([])
    const [busy, setBusy] = useState(true)
    const [paging, setPaging] = useState({
        limit: 10,
        offset: 0,
        maxPage: 1,
    })

    useEffect(() => {
        let mounted = true
        countOrderBySellerID().then(response => {
            if (mounted) {
                if (response != null && response.count != null)
                    setPaging({
                        limit: paging.limit,
                        offset: paging.offset,
                        maxPage: response.count / paging.limit,
                    })
            }
        }).catch(error => console.log(error))
        getAllOrderBySellerWithPaging(paging.limit, paging.offset).then(response => {
            if (mounted) {
                if (response != null && response.data != null) {
                    let tmp = response.data.map(e => {
                        return {
                            orderid: e.orderid,
                            name: e.name,
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
        }).catch(error => console.log(error))
        return () => mounted = false
    }, [paging.offset, paging.limit, paging.maxPage])

    const rowGenerator = () => {
        let tmp = data.map((e, index) => {
            return (
                <OrderTableRow
                    key={e.orderid}
                    isEven={(index + 1) % 2}
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

    const handleChange = (limit, offset, maxPage) => {
        console.log(limit, offset, maxPage)
        setPaging({
            limit : limit,
            offset : offset,
            maxPage : maxPage
        })
        return
    }


    return (
        <div className="order__table-container">
            <OrderTableHeader />
            <div className="order__table-line" />
            {busy ? null : rowGenerator()}
            <div className="order__table-paging-position">
                <PagingTool
                    limit={paging.limit}
                    offset={paging.offset}
                    maxPage={paging.maxPage}
                    handleChange={handleChange} />
            </div>
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


