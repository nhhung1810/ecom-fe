import API_PATH from "../config/api.path.const"

export const imageUploadAPI = async (data, productid) => {
    const formData = new FormData();
    // data should be array
    // productid should be int
    data.forEach((element, index) => {
        formData.append('images[]', element, index)
    });

    formData.append('productid', productid)
    console.log(formData)

    return fetch(API_PATH.UPLOAD_IMAGE, {
        method: "POST",
        credentials: "include",
        body: formData
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