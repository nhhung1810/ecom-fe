import { useEffect, useLayoutEffect, useState } from "react"
import { fetchProductAPI } from "../../../../../../../../api/upload.api"
import API_PATH from "../../../../../../../../config/api.path.const"

export const ProductTableBody = props => {
    const [data, setData] = useState([])
    
    useEffect(() => {
        let mounted = true
        fetchProductAPI().then(response => {
            console.log(response)
            if(mounted && response != null && response.products != null && response.products.length > 0){
                let tmp = response.products.map(data => {
                    const imageParam = {
                        productid : data.Prod.id,
                        id : 0,
                    } 
                    const param = new URLSearchParams(imageParam)
                    const imgUrl = API_PATH.IMAGE_QUERY + param.toString()
                    
                    return {
                        imagePath: imgUrl,
                        pname: data.Prod.name,
                        ptag: data.Prod.categories,
                        soldNum: 0,
                        capacity: data.Prod.quantity,
                        dateAdded: "Today, 8th Aug, 2018",
                        totalProfit: 0,
                    }
                })
                setData(tmp)
            }
        })
        return () => mounted = false
    }, [])

    const dataset = data

    const rowGenerator = dataset => {
        return dataset.map((data) => {
            let tag = ""
            const { imagePath, pname, ptag, soldNum, capacity, dateAdded, totalProfit } = data
            tag = ptag
            // tag = tag.slice(0, tag.length - 2)
            return (
                <tr className="table__body-row">
                    <td><ProductSummary tag={tag} imagePath={imagePath} label={pname}/></td>
                    <td>{String(soldNum) + "/" + String(capacity)}</td>
                    <td>{dateAdded}</td>
                    <td>{totalProfit}</td>
                    <td className="table__body-align-left"><ActionButton/></td>
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

const ActionButton = props =>{
    return (
        <div className="table__action-container">
            <span>Action</span>
            <img src={process.env.PUBLIC_URL + "/images/dropdown.svg"} className="table__action-button"/>
            <span></span>
        </div>
    )
}

const ProductSummary = props => {
    return (
        <div className="table__product-summary-container">
            <img src={props.imagePath} className="table__product-image"/>
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
