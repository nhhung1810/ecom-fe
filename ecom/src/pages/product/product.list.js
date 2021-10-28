import React, { useLayoutEffect, useState } from "react";
import { useQuery } from "../../hook";
import "./product.list.css"

import { extractParam, formatFirstCtg, formatSecondCtg } from "../../utilities/product.list.utils";

import { NavBar } from "../../components";
import { SideBar, MainView } from "./components";
import { Footer } from "../../components";

import { fetchAllProductWithFilter } from "../../api/product.api";
import API_PATH from "../../const/api.path.const";

import { useSelector } from "react-redux";
import { 
    selectAvailableFilter, selectBrandsFilter, 
    selectColorFilter, selectPriceRangeFilter, 
    selectSizesFilter } from "../../redux/product.filter.redux";

export const ProductList = props => {
    const [busy, setBusy] = useState(true)
    const [data, setData] = useState([])
    let sizeChosen = useSelector(selectSizesFilter)
    let colorChosen = useSelector(selectColorFilter)
    let brandChosen = useSelector(selectBrandsFilter)
    let priceRangeChosen = useSelector(selectPriceRangeFilter)
    let availableChosen = useSelector(selectAvailableFilter)

    let query = useQuery()
    let mainCtg = query.get("ctg")

    const [subCtgChosen, setSubCtgChosen] = useState(null)


    useLayoutEffect(() => {
        let finalParam = extractParam([mainCtg, subCtgChosen],
                            sizeChosen, colorChosen, brandChosen,
                             priceRangeChosen, availableChosen);
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
        }).catch(error => {
            setData([])
            setBusy(false)
        })
        return () => mounted = false
    }, [query.toString(), subCtgChosen, 
        sizeChosen, colorChosen, brandChosen, 
        availableChosen, priceRangeChosen])



    const handleChangeCategories = ctg => {
        return e => {
            setSubCtgChosen(ctg)
        }
    }

    return (
        <div>
            <NavBar />
            <div className="product__title">
                {formatFirstCtg(mainCtg)}{formatSecondCtg(subCtgChosen)}
            </div>

            <div className="product__container">
                <SideBar
                    activeSideCard={subCtgChosen}
                    onChange={handleChangeCategories} />
                {busy ? null : <MainView data={data} />}
            </div>
            <Footer />
        </div>
    )
}