import "./table.css"
import { ProductTableHeader, ProductTableBody } from "./components"
import { PagingTool } from "../../../../../../../components"
import { useEffect, useLayoutEffect, useState } from "react"
import { countProductByUserID, fetchAllProductWithOrderInfo } from "../../../../../../../api/product.api"
import { categoriesFormat, formatImages } from "../../../../../../../utilities/dash.product.utils"
import { dateFormat } from "../../../../../../../utilities/date.format"
import { useDispatch, useSelector } from "react-redux"
import { selectAuthUser, signout } from "../../../../../../../redux/auth.redux"
import { Redirect } from "react-router-dom"

export const ProductTable = props => {
    let user = useSelector(selectAuthUser);
    const dispatch = useDispatch()
    const [data, setData] = useState([])
    const [busy, setBusy] = useState(true)
    const [loading, setLoading] = useState({
        data : [],
        busy : true,
    })
    const [paging, setPaging] = useState({
        limit: 5,
        offset: 0,
        maxPage: 1,
        count : 0,
    })

    useEffect(() => {
        let mounted = true
        countProductByUserID()
        .then(response => {
            if (!mounted) throw response;
            if (!response) throw response
            if (!response.count) throw response
            setPaging({
                limit: paging.limit,
                offset: paging.offset,
                maxPage: response.count / paging.limit,
                count: response.count
            })
        })
        .then(() => {
           return fetchAllProductWithOrderInfo(paging.limit, paging.offset)
        })
        .then(response => {
            if (!mounted) throw {response, mounted};
            if (!response) throw response
            if (!response.data) throw response
            if (response.data.length === 0) throw response

            let tmp = response.data.map(data => {
                // IMAGE FETCHING
                const imgUrl = formatImages(data.id)
                return {
                    id: data.id,
                    imagePath: imgUrl,
                    price: data.price,
                    pname: data.name,
                    soldNum: data.sold,
                    capacity: data.capacity,
                    totalProfit: data.sold * data.price,
                    ptag: categoriesFormat(data.categories),
                    dateAdded: dateFormat(data.created_date),
                }
            })
            setLoading({
                data : tmp,
                busy : false,
            })
        }).catch(error => {
            if(error === 401){
                dispatch(signout())
            }
        })
        return () => mounted = false
    }, [paging.offset])

    console.log(paging)

    const handleChange = (limit, offset, maxPage, count) => {
        setPaging({
            limit: limit,
            offset: offset,
            maxPage: maxPage,
            count: count
        })
        return
    }

    if (user === null) {
        return (
            <Redirect to="/logindash"></Redirect>
        )
    }

    return (
        <div className="table__component">
            <ProductTableHeader />
            {
                loading.busy
                    ?
                    null
                    :
                    <ProductTableBody data={loading.data} />
            }
            <div className="table__component-paging">
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
