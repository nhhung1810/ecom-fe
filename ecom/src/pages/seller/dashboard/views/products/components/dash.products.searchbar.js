export const ProductSearchBar = props => {
    return (
        <div className="products__product-search">
            <img alt="icon" src={process.env.PUBLIC_URL + "/images/search.svg"} className="products__search-icon"></img>
            <input type="text" className="products__product-search-bar" placeholder="Search product"></input>
        </div>
    )
}