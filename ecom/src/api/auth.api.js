import API_PATH from "../const/api.path.const"

export const signupAPI = async (name, email, password) => {
    return fetch(API_PATH.SIGNUP, {
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
        return true
    })
    .catch(error => {
        return false
    })
}

export const signinAPI = async (email, password) => {
    return fetch(API_PATH.SIGNIN, {
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
        return true
    })
    .catch(error => {
        return false
    })
};

export const signoutAPI = async () => {
    return fetch(API_PATH.SIGNOUT, {
        method: "POST",
        headers: { 'Content-Type': "application/json" },
        credentials: "include",
    })
    .then(res => {
        if(!res.ok) throw new Error("error")
        return res.json()
    })
    .then(data => {
        return true
    })
    .catch(error => {
        console.log(error)
        return false
    })
};

export const checkAuthAPI = async () => {
    return fetch(API_PATH.CHECK_AUTH, {
        method: "GET",
        headers: { 'Content-Type': "application/json" },
        credentials: "include",
    })
    .then(res => {
        if(!res.ok) throw res.status
        return res.json()
    })
    .then(data => {
        return true
    })
    .catch(error => {
        return false
    })
}