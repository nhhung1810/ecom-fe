
export const uploadAPI = async (data) => {
    return fetch(process.env.REACT_APP_API_ENDPOINT + "/upload", {
        method: "POST",
        headers: { 'Content-Type': "application/json" },
        credentials: "include",
        body: JSON.stringify(data)
    })
    .then(res => {
        if(!res.ok) throw new Error("error")
        return res.json()})
    .then(data => {
        // console.log(data)
        return true
    })
    .catch(error => {
        // console.log(error)
        return false
    })
}