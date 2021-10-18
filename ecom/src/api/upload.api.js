
export const imageUploadAPI = async (data) => {
    return fetch(process.env.REACT_APP_API_ENDPOINT + "/upload/image", {
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
    return fetch(process.env.REACT_APP_API_ENDPOINT + "/upload/product", {
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
    return fetch(process.env.REACT_APP_API_ENDPOINT + "/product", {
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