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