const HOST_URL = "http://localhost:8080";

const API_PATH = {
    SIGNUP : HOST_URL + "/register",
    SIGNIN : HOST_URL + "/login",
    SIGNOUT : HOST_URL + "/logout",

    UPLOAD_PRODUCT : HOST_URL + "/upload/product",
    GET_ALL_PRODUCTS : HOST_URL + "/product",
    GET_ALL_PRODUCTS_WITH_FILTER : HOST_URL + "/product/q?",
    GET_PRODUCT_INFO_QUERY : HOST_URL + "/product/info?",
    
    UPLOAD_IMAGE : HOST_URL + "/upload/image",
    IMAGE : HOST_URL + "/image",
    IMAGE_QUERY : HOST_URL + "/image" + "?",
}

export default API_PATH