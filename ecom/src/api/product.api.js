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
        return res.json()
    })
    .catch(error => {
        return error
    })
}

export const fetchAllProductWithFilter = async (params, limit, offset) => {
    const paging = {
        limit : limit,
        offset : offset
    }
    const p = new URLSearchParams(paging)
    const url = API_PATH.GET_ALL_PRODUCTS_WITH_FILTER + params + "&" + p.toString()
    return fetch(url, {
        method: "GET",
        headers: { 'Content-Type': "application/json" },
        credentials: "include",
    })
    .then(res => {
        if(!res.ok) throw res.status
        return res.json()
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
        return res.json()
    })
    .catch(error => {
        return error
    })
}

export const countAllProducts = async (params) => {
    return fetch(API_PATH.COUNT_ALL_PRODUCT + params.toString() , {
        method: "GET",
        headers: { 'Content-Type': "application/json" },
        credentials: "include",
    })
    .then(res => {
        if(!res.ok) throw res.status
        return res.json()
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
        return res.json()
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
        return res.json()
    })
    .catch(error => {
        return false
    })
}

export const getRandomProduct = async () => {
    const url = API_PATH.GET_RANDOM_PRODUCTS;
    return fetch(url, {
        method: "GET",
        headers: { 'Content-Type': "application/json" },
        credentials: "include",
    })
    .then(res => {
        if(!res.ok) throw res.status
        return res.json()
    })
    .catch(error => {
        return error
    })
}

export const archiveProduct = async (id) => {
    const queryData = {
        id : id
    }
    const param = new URLSearchParams(queryData)
    const url = API_PATH.ARCHIVE_PRODUCT + param.toString()
    return fetch(url, {
        method : "PATCH",
        headers: { 'Content-Type': "application/json" },
        credentials: "include",
    })
    .then(res => {
        if(!res.ok) throw new Error("error")
        return res.json()
    })
    .catch(error => {
        return false
    })
}
