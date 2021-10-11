
export const signupAPI = async (name, email, password) => {
    return fetch(process.env.REACT_APP_API_ENDPOINT + "/register", {
        method: "POST",
        headers: { 'Content-Type': "application/json" },
        credentials: "include",
        body: JSON.stringify({
            name,
            email,
            password
        })
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

export const signinAPI = async (email, password) => {
    return fetch(process.env.REACT_APP_API_ENDPOINT + "/login", {
        method: "POST",
        headers: { 'Content-Type': "application/json" },
        credentials: "include",
        body: JSON.stringify({
            email,
            password
        })
    })
    .then(res => {
        if(!res.ok) throw new Error("error")
        return res.json()
    })
    .then(data => {
        // console.log(data)
        return true
    })
    .catch(error => {
        // console.log(error)
        return false
    })
};


export const signoutAPI = async () => {
    return fetch(process.env.REACT_APP_API_ENDPOINT + "/logout", {
        method: "POST",
        headers: { 'Content-Type': "application/json" },
        credentials: "include",
    })
    .then(res => {
        if(!res.ok) throw new Error("error")
        return res.json()
    })
    .then(data => {
        console.log(data)
        return true
    })
    .catch(error => {
        console.log(error)
        return false
    })
};