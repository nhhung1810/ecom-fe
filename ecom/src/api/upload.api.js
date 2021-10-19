import API_PATH from "../config/api.path.config"

export const imageUploadAPI = async (data) => {
    return fetch(API_PATH.UPLOAD_IMAGE, {
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

export const uploadProductAPI = async (data) => {
    return fetch(API_PATH.UPLOAD_PRODUCT, {
        method: "POST",
        headers: { 'Content-Type': "application/json" },
        credentials: "include",
        body: JSON.stringify(data)
    })
    .then(res => {
        if(!res.ok) throw new Error("error")
        return res.json()})
    .then(data => {
        return data
    })
    .catch(error => {
        console.log(error);
        return false
    })
}


export const fetchProductAPI = async () => {
    return fetch(API_PATH.GET_ALL_PRODUCTS, {
        method: "GET",
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
        console.log(error);
        return false
    })
}