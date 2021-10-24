import { Link, useRouteMatch } from "react-router-dom"

export const ProductAddButton = props => {
    let match = useRouteMatch();
    return (
        <Link to={`${match.path}/add`}>
            <button className="products__add-button">
                <img 
                    alt="plus" 
                    src={process.env.PUBLIC_URL + "/images/plus-white.svg"} 
                    className="products__plus-sym"></img>
                <span className="products__add-button-text">Add Product</span>
            </button>
        </Link>
    )
}
