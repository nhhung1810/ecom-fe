import "./table.css"
import { ProductTableHeader, ProductTableBody } from "./components"
import { PagingTool } from "../../../../../../../components"
import { useEffect, useState } from "react"
import { countProductByUserID, fetchAllProductWithOrderInfo } from "../../../../../../../api/product.api"
import { categoriesFormat, formatImages } from "../../../../../../../utilities/dash.product.utils"
import { dateFormat } from "../../../../../../../utilities/date.format"

export const ProductTable = props => {
    const [data, setData] = useState([])
    const [busy, setBusy] = useState(true)
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
            var error = new Error("Null data")
            if (!mounted) throw error;
            if (!response) throw error
            if (!response.count) throw error
            setPaging({
                limit: paging.limit,
                offset: paging.offset,
                maxPage: response.count / paging.limit,
                count: response.count
            })
        })
        .catch(error => {console.log(error)})

        fetchAllProductWithOrderInfo(paging.limit, paging.offset).then(response => {
            var error = new Error("Null data")
            if (!mounted) throw error;
            if (!response) throw error
            if (!response.data) throw error
            if (response.data.length === 0) throw error

            let tmp = response.data.map(data => {
                // IMAGE FETCHING
                const imgUrl = formatImages(data.id)
                return {
                    id: data.id,
                    imagePath: imgUrl,
                    pname: data.name,
                    ptag: categoriesFormat(data.categories),
                    soldNum: data.sold,
                    capacity: data.capacity,
                    dateAdded: dateFormat(data.created_date),
                    totalProfit: data.sold * data.price,
                    price: data.price
                }
            })
            // ORDER SALE INFO FETCHING
            setData(tmp)
            setBusy(false)
        }).catch(error => {
            console.log(error);
        })
        return () => mounted = false
    }, [paging.count, paging.limit, paging.offset, paging.maxPage])

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
        <div className="table__component">
            <ProductTableHeader />
            {
                busy
                    ?
                    null
                    :
                    <ProductTableBody data={data} />
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
