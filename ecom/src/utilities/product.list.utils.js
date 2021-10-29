
import { CATEGORIES_LIST, MAIN_CATEGORIES_LIST } from "../const/options.list.const";

export const extractParam = (
    ctgList,
    sizeParam,
    colorParam,
    brandParam,
    priceRangeParam,
    availableParam,
    sortIndex
) => {
    let ctgParam = ctgList.filter(e => e != null).map(e => {
        let tmp = new URLSearchParams({ categories: e });
        return tmp.toString();
    });

    if (ctgParam.length === 0)
        ctgParam = ["categories="];
    // SIZE
    if (sizeParam.length === 0)
        sizeParam = ["size="];
    else
        sizeParam = sizeParam.map(e => {
            let tmp = new URLSearchParams({ size: e });
            return tmp.toString()
        })
    // COLOR
    if (colorParam.length === 0)
        colorParam = ["colors="];
    else
        colorParam = colorParam.map(e => {
            let tmp = new URLSearchParams({ colors: e })
            return tmp.toString()
        })
    // BRAND
    if (brandParam.length === 0)
        brandParam = ["brands="];
    else
        brandParam = brandParam.map(e => {
            let tmp = new URLSearchParams({ brands: e })
            return tmp.toString()
        })
    // Price range
    let pstart = "pstart=" + priceRangeParam[0]
    let pstop = "pstop=" + priceRangeParam[1]
    
    // Available
    if (availableParam.length === 0)
        availableParam = ["available="];
    else
        availableParam = availableParam.map(e => {
            let tmp = new URLSearchParams({ available: e })
            return tmp.toString()
        })
    // SORT INDEX
    let sortParam = [`sort=${sortIndex}`]

    let final = [
        ...ctgParam, 
        ...sizeParam, 
        ...colorParam, 
        ...brandParam, 
        pstart, 
        pstop,
        ...availableParam,
        sortParam,
    ];
    let finalParam = final.join("&");
    console.log(finalParam);
    return finalParam;
}

export const formatFirstCtg = (mainCtg) => {
    let result = MAIN_CATEGORIES_LIST.find(e => e.value === mainCtg)
    if(result) return result.label
    else return null
}


export const formatSecondCtg = (subCtgChosen) => {
    if(subCtgChosen === "null") return ""
    if (subCtgChosen === null || 
            subCtgChosen === undefined) return ""
    return " / " + CATEGORIES_LIST.find(e => e.value === subCtgChosen).label
}


