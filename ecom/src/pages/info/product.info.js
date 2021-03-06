import { Footer, NavBar } from "../../components"
import { useState, useLayoutEffect } from "react";
import { Redirect } from "react-router-dom";

import { useQuery } from "../../hook";
import API_PATH from "../../const/api.path.const";
import { fetchEachProductAPI } from "../../api/product.api";

import "./product.info.css"
import { InfoBody } from "./components/info.body";
import { formatFirstCtg, formatSecondCtg } from "../../utilities/product.list.utils";

export const ProductInfo = props => {
    let query = useQuery()
    const [data, setData] = useState(null)
    const [busy, setBusy] = useState(true)
    let id = query.get("id");

    useLayoutEffect(() => {
        let mounted = true
        fetchEachProductAPI(param).then(response => {
            if (!mounted) return response
            if (!response) return response
            if (!response.data) return response
            if (!response.data.Prod) return response

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
                id: response.data.Prod.id,
                imgs: imgURLS,
                name: response.data.Prod.name,
                colors: response.data.Prod.colors,
                sizes: response.data.Prod.size,
                capacity: response.data.Prod.quantity,
                description: response.data.Prod.description,
                price: response.data.Prod.price,
                remain : response.data.Prod.remain
            })
            setBusy(false)
        })
        console.log(data)
        return () => mounted = false
    }, [id])

    const param = {
        id: id,
        mainCtg: query.get("mc"),
        subCtg: query.get("sc")
    }
    

    // REDIRECT WHEN PATH IS NOT MET
    // TODO: COMBINE WITH CASE WHEN PATH IS NOT FOUND
    if (param.id === undefined)
        return (
            <Redirect to="/" />
        )

    return (
        <div className="info__container">
            <NavBar />
            {busy
                ?
                null
                :
                <InfoTitle
                    mainCtg={param.mainCtg}
                    subCtg={param.subCtg}
                    name={data.name}
                />
            }
            {busy ? null : <InfoBody data={data} />}
            <Footer/>
        </div>
    )
}

const InfoTitle = props => {
    return (
        <div className="info__title">
            {`${formatFirstCtg(props.mainCtg)}${formatSecondCtg(props.subCtg)} / ${props.name}`}
        </div>
    )
}
