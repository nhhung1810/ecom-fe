import API_PATH from "../const/api.path.const";
import { CATEGORIES_LIST } from "../const/options.list.const";


export const categoriesFormat = (strList) => {
    let ctgs = strList.map(value => {
        return CATEGORIES_LIST.find(e => e.value === value).label;
    }).filter(e => e !== undefined)
    return ctgs.join(", ")
}

export const formatImages = (id) => {
    const imageParam = {
        productid: id,
        id: 0,
    }
    const param = new URLSearchParams(imageParam)
    return API_PATH.IMAGE_QUERY + param.toString()
}