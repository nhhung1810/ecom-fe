import API_PATH from "../const/api.path.const"

export const fetchAllProductAPI = async () => {
    return fetch(API_PATH.GET_ALL_PRODUCTS, {
        method: "GET",
        headers: { 'Content-Type': "application/json" },
        credentials: "include",
    })
    .then(res => {
        if(!res.ok) throw res.status
        return res.json()
    })
    .then(data => {
        return data
    })
    .catch(error => {
        return error
    })
}

export const fetchEachProductAPI = async (paramJson) => {
    const query = new URLSearchParams(paramJson)
    const path = API_PATH.GET_PRODUCT_INFO_QUERY + query.toString()
    return fetch(path, {
        method: "GET",
        headers: { 'Content-Type': "application/json" },
        credentials: "include",
    })
    .then(res => {
        if(!res.ok) throw res.status
        return res.json()})
    .then(data => {
        return data
    })
    .catch(error => {
        return error
    })
}

export const fetchAllProductWithFilter = async (params) => {
    return fetch(API_PATH.GET_ALL_PRODUCTS_WITH_FILTER + params, {
        method: "GET",
        headers: { 'Content-Type': "application/json" },
        credentials: "include",
    })
    .then(res => {
        if(!res.ok) throw res.status
        return res.json()})
    .then(data => {
        return data
    })
    .catch(error => {
        return error
    })
}

export const countProductByUserID = async () => {
    return fetch(API_PATH.COUNT_PRODUCT_BY_SELLER, {
        method: "GET",
        headers: { 'Content-Type': "application/json" },
        credentials: "include",
    })
    .then(res => {
        if(!res.ok) throw res.status
        return res.json()})
    .then(data => {
        return data
    })
    .catch(error => {
        return error
    })
}

export const fetchAllProductWithOrderInfo = async (limit, offset) => {
    const paging = {
        limit : limit,
        offset : offset
    }

    const params = new URLSearchParams(paging)
    const url = API_PATH.GET_PRODUCT_WITH_ORDER_INFO_WITH_PAGING + 
        params.toString() 
    return fetch(url, {
        method: "GET",
        headers: { 'Content-Type': "application/json" },
        credentials: "include",
    })
    .then(res => {
        if(!res.ok) throw res.status
        return res.json()})
    .then(data => {
        return data
    })
    .catch(error => {
        return error
    })
}


export const searchProduct = async (value) => {
    const search = {
        name : value.toUpperCase(),
    }

    const params = new URLSearchParams(search)
    const url = API_PATH.SEARCH_PRODUCT +  params.toString()
        params.toString() 
    return fetch(url, {
        method: "GET",
        headers: { 'Content-Type': "application/json" },
        credentials: "include",
    })
    .then(res => {
        if(!res.ok) throw res.status
        return res.json()})
    .then(data => {
        return data
    })
    .catch(error => {
        return false
    })
}