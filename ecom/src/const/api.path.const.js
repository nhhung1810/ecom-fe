const HOST_URL = "http://localhost:8080";

const API_PATH = {
    SIGNUP : HOST_URL + "/register",
    SIGNIN : HOST_URL + "/login",
    SIGNOUT : HOST_URL + "/logout",

    UPLOAD_PRODUCT : HOST_URL + "/upload/product",
    GET_ALL_PRODUCTS : HOST_URL + "/product",
    GET_ALL_PRODUCTS_WITH_FILTER : HOST_URL + "/product/q?",
    GET_PRODUCT_INFO_QUERY : HOST_URL + "/product/info?",
    GET_PRODUCT_WITH_ORDER_INFO : HOST_URL + "/seller/product",
    
    UPLOAD_IMAGE : HOST_URL + "/upload/image",
    IMAGE : HOST_URL + "/image",
    IMAGE_QUERY : HOST_URL + "/image?",

    UPLOAD_ORDER : HOST_URL + "/upload/order",
    GET_ORDER_QUERY: HOST_URL + "/order?",
    GET_ORDER_BY_SELLER : HOST_URL + "/seller/order",
    GET_ORDER_BY_SELLER_WITH_PAGING : HOST_URL + "/seller/order?",

    COUNT_ORDER_BY_SELLER : HOST_URL + "/count/order"

}

export default API_PATH