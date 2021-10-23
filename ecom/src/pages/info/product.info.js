import { NavBar } from "../../components"
import { useState, useLayoutEffect } from "react";
import { Redirect } from "react-router-dom";

import { useQuery } from "../../hook";
import API_PATH from "../../const/api.path.const";
import { fetchEachProductAPI } from "../../api/product.api";

import "./product.info.css"
import { InfoBody } from "./components/info.body";

export const ProductInfo = props => {
    let query = useQuery()
    const [data, setData] = useState(null)
    const [busy, setBusy] = useState(true)

    useLayoutEffect(() => {
        let mounted = true
        fetchEachProductAPI(param).then(response => {
            if (mounted && response != null
                && response.data != null && response.data.Prod != null) {
                let imgURLS = []
                for (let i = 0; i < response.data.ImageCount; i++) {
                    const imageParam = {
                        productid: response.data.Prod.id,
                        id: i,
                    }
                    const param = new URLSearchParams(imageParam)
                    const url = API_PATH.IMAGE_QUERY + param.toString()
                    imgURLS.push(url)
                }
                setData({
                    id : response.data.Prod.id,
                    imgs: imgURLS,
                    name: response.data.Prod.name,
                    colors: response.data.Prod.colors,
                    sizes: response.data.Prod.size,
                    capacity: response.data.Prod.quantity,
                    description: response.data.Prod.description,
                    price : response.data.Prod.price
                })
                setBusy(false)
            }
        })
        console.log(data)
        return () => mounted = false
    }, [])

    const param = {
        id: query.get("id")
    }


    // REDIRECT WHEN PATH IS NOT MET
    // TODO: COMBINE WITH CASE WHEN PATH IS NOT FOUND
    if (param.id == undefined)
        return (
            <Redirect to="/" />
        )

    return (
        <div className="info__container">
            <NavBar />
            {busy ? null : <InfoTitle />}
            {busy ? null : <InfoBody data={data} />}

        </div>
    )
}

const InfoTitle = props => {
    return (
        <div className="info__title">Ladies / Dresses / Collete Stretch Linen Minidress</div>
    )
}
