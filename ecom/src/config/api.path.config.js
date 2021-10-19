const HOST_URL = "http://localhost:8080";

const API_PATH = {
    SIGNUP : HOST_URL + "/register",
    SIGNIN : HOST_URL + "/login",
    SIGNOUT : HOST_URL + "/logout",

    UPLOAD_IMAGE : HOST_URL + "/upload/image",
    UPLOAD_PRODUCT : HOST_URL + "/upload/product",
    GET_ALL_PRODUCTS : HOST_URL + "/product"
    
}

export default API_PATH