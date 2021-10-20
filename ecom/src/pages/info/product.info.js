import { NavBar } from "../../components"
import { useState, useEffect, useLayoutEffect } from "react";
import {
    useLocation,
    Redirect
} from "react-router-dom";
import API_PATH from "../../config/api.path.const";
import { fetchEachProductAPI } from "../../api/product.api";

import "./product.info.css"
import { InfoBody } from "./components/info.body";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}


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
                    imgs: imgURLS,
                    name: response.data.Prod.name,
                    price: 0,
                    colors: ["red", "yellow", "blue"],
                    sizes: ["S", "M", "L"],
                    capacity: response.data.Prod.capacity,
                    description: response.data.Prod.description,
                })
                setBusy(false)
            }
        })
        console.log(data)
        // Prevent unmounted change
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
