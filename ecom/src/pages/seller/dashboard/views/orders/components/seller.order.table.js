import React, { useState, useEffect, useReducer } from "react"
import { OrderTableRow } from "./order.table.components"
import { countOrderBySellerID, getAllOrderBySellerWithPaging } from "./../../../../../../api/api.order"
import { dateFormat } from "./../../../../../../utilities/date.format"
import { PagingTool } from "../../../../../../components"
import { useDispatch, useSelector } from "react-redux"
import { selectAuthUser, signout } from "../../../../../../redux/auth.redux"
import { Redirect } from "react-router-dom"


export const OrderTable = props => {
    let user = useSelector(selectAuthUser)
    const dispatch = useDispatch()
    const [data, setData] = useState([])
    const [busy, setBusy] = useState(true)
    const [paging, setPaging] = useState({
        limit: 10,
        offset: 0,
        maxPage: 1,
        count: 0,
    })

    useEffect(() => {
        let mounted = true
        countOrderBySellerID().then(response => {
            if (!mounted) throw response;
            if (!response) throw response;
            if (!response.count) throw response;
            setPaging({
                limit: paging.limit,
                offset: paging.offset,
                maxPage: response.count / paging.limit,
                count: response.count
            })
        }).catch(error => {
            if(error === 401)
                dispatch(signout())
        })
        return () => mounted = false
    }, [])

    useEffect(() => {
        let mounted = true
        getAllOrderBySellerWithPaging(paging.limit, paging.offset)
        .then(response => {
            if (!mounted) throw response;
            if (!response) throw response;
            if (!response.data) throw response;
            if (response.data.length === 0) throw response;

            let result = response.data.map(e => {
                // TODO:
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
            setData(result)
            setBusy(false)

        }).catch(error => {
            if(error === 401)
                dispatch(signout())
        })
        return () => mounted = false
    }, [paging.offset])

    if (user === null) {
        return (
            <Redirect to="/logindash"></Redirect>
        )
    }

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

    const handleChange = (limit, offset, maxPage, count) => {
        setPaging({
            limit: limit,
            offset: offset,
            maxPage: maxPage,
            count: count
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
                    count={paging.count}
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


