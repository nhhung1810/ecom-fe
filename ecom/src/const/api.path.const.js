const HOST_URL = "http://localhost:8080";

const API_PATH = {
    SIGNUP : HOST_URL + "/register",
    SIGNIN : HOST_URL + "/login",
    SIGNOUT : HOST_URL + "/logout",
    CHECK_AUTH : HOST_URL + "/check",

    UPLOAD_PRODUCT : HOST_URL + "/product/upload",
    GET_ALL_PRODUCTS : HOST_URL + "/product",
    SEARCH_PRODUCT : HOST_URL + "/product/search?",
    GET_ALL_PRODUCTS_WITH_FILTER : HOST_URL + "/product/q?",
    GET_PRODUCT_INFO_QUERY : HOST_URL + "/product/info?",
    GET_PRODUCT_WITH_ORDER_INFO : HOST_URL + "/seller/product",
    GET_PRODUCT_WITH_ORDER_INFO_WITH_PAGING : HOST_URL + "/seller/product?",
    GET_RANDOM_PRODUCTS : HOST_URL + "/product/random",
    
    UPLOAD_IMAGE : HOST_URL + "/image/upload",
    IMAGE : HOST_URL + "/image",
    IMAGE_QUERY : HOST_URL + "/image?",

    UPLOAD_ORDER : HOST_URL + "/order/upload",
    GET_ORDER_QUERY: HOST_URL + "/order?",
    GET_ORDER_BY_SELLER : HOST_URL + "/seller/order",
    GET_ORDER_BY_SELLER_WITH_PAGING : HOST_URL + "/seller/order?",

    COUNT_ORDER_BY_SELLER : HOST_URL + "/order/count",
    COUNT_PRODUCT_BY_SELLER : HOST_URL + "/product/count",
    COUNT_ALL_PRODUCT : HOST_URL + "/product/count/all?",
    
    UPDATE_ORDER_STATUS_COMPLETED : HOST_URL + "/order/status?status=1&",
    UPDATE_ORDER_STATUS_CANCEL : HOST_URL + "/order/status?status=2&",

    ARCHIVE_PRODUCT: HOST_URL + "/product/archive?",

}

export default API_PATH