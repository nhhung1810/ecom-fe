import React, { useLayoutEffect, useState } from "react";
import { NavBar } from "../../components";
import { SideBar, MainView, Footer } from "./components";
import { useQuery } from "../../hook";
import "./product.list.css"
import { fetchAllProductWithFilter } from "../../api/product.api";
import API_PATH from "../../const/api.path.const";
import { CATEGORIES_LIST } from "../../const/options.list.const";
export const ProductList = props => {
    const [busy, setBusy] = useState(true)
    const [data, setData] = useState([])
    let query = useQuery()
    let ctgList = query.getAll("ctg")
    let sizeParam = []
    let colorParam = []


    useLayoutEffect(() => {
        let ctgParam = ctgList.map(e => {
            let tmp = new URLSearchParams({ categories: e })
            return tmp.toString()
        })

        if (ctgParam.length === 0) ctgParam = ["categories="]
        if (sizeParam.length === 0) sizeParam = ["size="]
        if (colorParam.length === 0) colorParam = ["colors="]

        let final = [...ctgParam, ...sizeParam, ...colorParam]
        let finalParam = final.join("&")
        console.log(finalParam);
        let mounted = true
        // FETCH API HERE
        fetchAllProductWithFilter(finalParam).then(response => {
            // CHECK RESPONSE
            var error = new Error("Null data")
            if (!mounted) throw error;
            if (!response) throw error
            if (!response.data) throw error
            if (response.data.length === 0) throw error
            // FETCH DATA
            let tmp = response.data.map(e => {
                const imageParam = {
                    productid: e.Prod.id,
                    id: 0,
                }
                const param = new URLSearchParams(imageParam)
                const url = API_PATH.IMAGE_QUERY + param.toString()
                return {
                    id: e.Prod.id,
                    img: url,
                    name: e.Prod.name,
                    price: e.Prod.price,
                }
            })
            setData(tmp)
            setBusy(false)
        }).catch(error =>{
            setData([])
            setBusy(false)
        })
        return () => mounted = false
    }, [query.toString()])

    const formatFirstCtg = () => {
        let tmp = ctgList[0]
        return CATEGORIES_LIST.find(e => e.value == tmp).label

    }

    return (
        <div>
            <NavBar />
            <div className="product__title">
                {formatFirstCtg()} / Dresses
            </div>

            <div className="product__container">
                <SideBar />
                {busy ? null : <MainView data={data} />}
            </div>
            <Footer />
        </div>
    )
}