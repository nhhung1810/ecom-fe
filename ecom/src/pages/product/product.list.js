import React, { useEffect, useLayoutEffect, useState } from "react";
import { useQuery } from "../../hook";
import "./product.list.css"

import { extractParam, formatFirstCtg, formatSecondCtg } from "../../utilities/product.list.utils";

import { NavBar } from "../../components";
import { SideBar, MainView } from "./components";
import { Footer } from "../../components";

import { countAllProducts, fetchAllProductWithFilter } from "../../api/product.api";
import API_PATH from "../../const/api.path.const";

import { useSelector } from "react-redux";
import { 
    selectAvailableFilter, selectBrandsFilter, 
    selectColorFilter, selectPriceRangeFilter, 
    selectSizesFilter 
} from "../../redux/product.filter.redux";
import { Redirect } from "react-router-dom";

export const ProductList = props => {
    const [busy, setBusy] = useState(true)
    const [data, setData] = useState([])
    const [subCtgChosen, setSubCtgChosen] = useState(null)
    const [sortIndex, setSortIndex] = useState(0)
    const [paging, setPaging] = useState({
        limit: 20,
        offset: 0,
        maxPage: 1,
        count : 0,
    })

    let sizeChosen = useSelector(selectSizesFilter)
    let colorChosen = useSelector(selectColorFilter)
    let brandChosen = useSelector(selectBrandsFilter)
    let priceRangeChosen = useSelector(selectPriceRangeFilter)
    let availableChosen = useSelector(selectAvailableFilter)

    let query = useQuery()
    let mainCtg = query.get("ctg")

    useEffect(() => {
        let finalParam = extractParam([mainCtg, subCtgChosen],
            sizeChosen, colorChosen, brandChosen,
             priceRangeChosen, availableChosen, sortIndex);
        let mounted = true
        countAllProducts(finalParam)
        .then(response => {
            if (!mounted) throw response;
            if (!response) throw response;
            if (!response.count) throw response;

            setPaging({
                limit: paging.limit,
                offset: paging.offset,
                maxPage: Math.ceil(response.count / paging.limit),
                count: response.count
            })
        })
        .catch(error => {
            console.log(error)
        })
        return () => mounted = false
    }, [
        query.toString(), 
        subCtgChosen, 
        sizeChosen, 
        colorChosen, 
        brandChosen, 
        availableChosen, 
        priceRangeChosen,
    ])

    useLayoutEffect(() => {
        let finalParam = extractParam([mainCtg, subCtgChosen],
                            sizeChosen, colorChosen, brandChosen,
                             priceRangeChosen, availableChosen, sortIndex);
        let mounted = true

        // FETCH API HERE
        fetchAllProductWithFilter(finalParam, paging.limit, paging.offset)
        .then(response => {
            // CHECK RESPONSE
            if (!mounted) throw response;
            if (!response) throw response;
            if (!response.data) throw response
            if (response.data.length === 0) throw response
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
                    remain : e.Prod.remain,
                    mainCtg : mainCtg,
                    subStg : subCtgChosen
                }
            })
            setData(tmp)
            setBusy(false)
        }).catch(error => {
            setData([])
            setBusy(false)
        })
        return () => mounted = false
    }, [
        query.toString(), 
        subCtgChosen, 
        sizeChosen, 
        colorChosen, 
        brandChosen, 
        availableChosen, 
        priceRangeChosen,
        sortIndex,
        paging.offset,
    ])

    const handleChangeCategories = ctg => {
        return e => {
            setSubCtgChosen(ctg)
        }
    }

    const onSortChange = value => {
        setSortIndex(value%4)
    }   

    const handlePagingChange = (limit, offset, maxPage, count) => {
        setPaging({
            limit: limit,
            offset: offset,
            maxPage: maxPage,
            count: count,
        })
        return
    }

    if(mainCtg === null){
        return (
            <Redirect to="/product?ctg=ladies"/>
        )
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
                {busy ? null : 
                    <MainView
                        onSortChange={onSortChange} 
                        data={data} 
                        limit={paging.limit}
                        offset={paging.offset}
                        maxPage={paging.maxPage}
                        count={paging.count}
                        handlePagingChange={handlePagingChange}
                    />
                }
            </div>
            <Footer />
        </div>
    )
}