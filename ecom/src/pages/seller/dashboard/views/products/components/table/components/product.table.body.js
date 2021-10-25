import { useEffect, useRef, useState } from "react"
import API_PATH from "../../../../../../../../const/api.path.const"
import { fetchAllProductWithOrderInfo } from "../../../../../../../../api/product.api"
import { CATEGORIES_LIST } from "../../../../../../../../const/options.list.const"
import { dateFormat } from "../../../../../../../../utilities/date.format"
import { useOnClickOutside } from "../../../../../../../../hook"

export const ProductTableBody = props => {
    const [data, setData] = useState([])

    const categoriesFormat = (strList) => {
        let ctgs = strList.map(value => {
            let tmp = CATEGORIES_LIST.find(e => e.value === value).label;
            return tmp
        }).filter(e => e !== undefined)
        return ctgs.join(", ")
    }
    const formatImages = (id) => {
        const imageParam = {
            productid: id,
            id: 0,
        }
        const param = new URLSearchParams(imageParam)
        return API_PATH.IMAGE_QUERY + param.toString()
    }


    useEffect(() => {
        let mounted = true
        fetchAllProductWithOrderInfo().then(response => {
            if (mounted && response !== null
                && response.data !== null && response.data.length > 0) {
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
                // console.log(tmp)
                setData(tmp)
            }
        }).catch(error => {
            console.log(error);
        })
        return () => mounted = false
    }, [])

    const dataset = data

    const rowGenerator = dataset => {
        return dataset.map((data) => {
            let tag = ""
            const { id, imagePath, pname, ptag, soldNum, capacity, dateAdded, totalProfit } = data
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
                    {rowGenerator(dataset)}
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