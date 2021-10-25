import API_PATH from "../const/api.path.const"

export const uploadOrder = async (data) => {
    return fetch(API_PATH.UPLOAD_ORDER, {
        method: "POST",
        headers: { 'Content-Type': "application/json" },
        credentials: "include",
        body: JSON.stringify(data)
    })
    .then(res => {
        if(!res.ok) throw new Error("error")
        return res.json()})
    .then(data => {
        return true
    })
    .catch(error => {
        return false
    })
}

export const getAllOrderByProductID = async (id) => {
    const queryData = {
        productid : id
    }
    const query = new URLSearchParams(queryData)
    const url = API_PATH.GET_ORDER_QUERY + query.toString()
    return fetch(url, {
        method : "GET",
        headers: { 'Content-Type': "application/json" },
        credentials: "include",
    })
    .then(res => {
        if(!res.ok) throw new Error("error")
        return res.json()})
    .then(data => {
        return data
    })
    .catch(error => {
        return false
    })
}


export const getAllOrderBySellerID = async () => {
    const url = API_PATH.GET_ORDER_BY_SELLER
    return fetch(url, {
        method : "GET",
        headers: { 'Content-Type': "application/json" },
        credentials: "include",
    })
    .then(res => {
        if(!res.ok) throw new Error("error")
        return res.json()})
    .then(data => {
        return data
    })
    .catch(error => {
        return false
    })
}

export const getAllOrderBySellerWithPaging = async (limit, offset) => {
    const paging = {
        limit : limit,
        offset : offset
    }

    const params = new URLSearchParams(paging)
    const url = API_PATH.GET_ORDER_BY_SELLER_WITH_PAGING + params.toString() 
    return fetch(url, {
        method : "GET",
        headers: { 'Content-Type': "application/json" },
        credentials: "include",
    })
    .then(res => {
        if(!res.ok) throw new Error("error")
        return res.json()})
    .then(data => {
        return data
    })
    .catch(error => {
        return false
    })
}


export const countOrderBySellerID = async () => {
    const url = API_PATH.COUNT_ORDER_BY_SELLER 
    return fetch(url, {
        method : "GET",
        headers: { 'Content-Type': "application/json" },
        credentials: "include",
    })
    .then(res => {
        if(!res.ok) throw new Error("error")
        return res.json()})
    .then(data => {
        return data
    })
    .catch(error => {
        return false
    })
}

export const updateOrderStatusCompleted = async (id) => {
    const queryData = {
        orderid : id
    }
    const param = new URLSearchParams(queryData)
    const url = API_PATH.UPDATE_ORDER_STATUS_COMPLETED + param.toString()
    return fetch(url, {
        method : "POST",
        headers: { 'Content-Type': "application/json" },
        credentials: "include",
    })
    .then(res => {
        if(!res.ok) throw new Error("error")
        return res.json()})
    .then(data => {
        return data
    })
    .catch(error => {
        return false
    })
}


export const updateOrderStatusCancel = async (id) => {
    const queryData = {
        orderid : id
    }
    const param = new URLSearchParams(queryData)
    const url = API_PATH.UPDATE_ORDER_STATUS_CANCEL + param.toString()
    return fetch(url, {
        method : "POST",
        headers: { 'Content-Type': "application/json" },
        credentials: "include",
    })
    .then(res => {
        if(!res.ok) throw new Error("error")
        return res.json()})
    .then(data => {
        return data
    })
    .catch(error => {
        return false
    })
}