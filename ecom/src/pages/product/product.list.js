import React, { useLayoutEffect, useState } from "react";
import { NavBar } from "../../components";
import { SideBar, MainView, Footer } from "./components";
import { useQuery } from "../../hook";
import "./product.list.css"
import { fetchAllProductWithFilter } from "../../api/product.api";
import API_PATH from "../../config/api.path.const";

export const ProductList = props => {
    const [busy, setBusy] = useState(true)
    const [data, setData] = useState([])

    let query = useQuery()
    let ctgList = query.getAll("ctg")

    useLayoutEffect(() => {
        let ctgParam = ctgList.map(e => {
            let tmp = new URLSearchParams({ categories: e })
            return tmp.toString()
        })
        let sizeParam = []
        let colorParam = []
        if (ctgParam.length == 0) ctgParam = ["categories="]
        if (sizeParam.length == 0) sizeParam = ["size="]
        if (colorParam.length == 0) colorParam = ["colors="]
        let final = [...ctgParam, ...sizeParam, colorParam]
        let finalParam = final.join("&")
        console.log(finalParam);
        let mounted = true
        // FETCH API HERE
        fetchAllProductWithFilter(finalParam).then(response => {
            if (mounted && mounted && response != null
                && response.data != null && response.data.length > 0) {
                let tmp = response.data.map(e => {
                    const imageParam = {
                        productid: e.Prod.id,
                        id: 0,
                    }
                    const param = new URLSearchParams(imageParam)
                    const url = API_PATH.IMAGE_QUERY + param.toString()
                    return {
                        id : e.Prod.id,
                        img: url,
                        name: e.Prod.name,
                        price: 0,
                    }
                })
                // console.log(tmp)
                setData(tmp)
                setBusy(false)
            }
        })
        // console.log(data)
        return () => mounted = false
    }, [])

    if(!busy) {
        // console.log(data);
    }

    return (
        <div>
            <NavBar />
            <div className="product__title">
                Ladies / Dresses
            </div>

            <div className="product__container">
                <SideBar />
                {busy ? null : <MainView data={data} />}
            </div>
            <Footer />
        </div>
    )
}