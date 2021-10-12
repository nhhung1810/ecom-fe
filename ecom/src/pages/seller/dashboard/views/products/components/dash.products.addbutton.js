export const ProductAddButton = props => {
    return (
        <button className="products__add-button">
            <img src={process.env.PUBLIC_URL + "/images/plus-white.svg"} className="products__plus-sym"></img>
            <span className="products__add-button-text">Add Product</span>
        </button>
    )
}
