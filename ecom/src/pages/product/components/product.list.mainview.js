
import { useHistory } from "react-router-dom"
export const MainView = props => {
    const generateProductCard = () => {
        if (props.data === null) {
            return
        }
        return props.data.map(element => {
            return (
                <ProductCard
                    key={element.id}
                    id={element.id}
                    image={element.img}
                    name={element.name}
                    price={element.price}
                />
            )
        })
    }

    return (
        <div className="product__mainview">
            <div className="product__mainview-header-container">
                <button className="product__mainview-sort-button">Sort by: <b>Popularity</b></button>
            </div>
            <div className="product__mainview-body-container">
                {generateProductCard()}
            </div>
            <div className="product__mainview-footer-container">

            </div>
        </div>
    )
}

const ProductCard = props => {
    const history = useHistory()

    const toProductInfo = () => {
        const params = {
            // TODO: CHANGE THIS AFTER APPLIED THE API
            id: props.id
        }
        const query = new URLSearchParams(params)
        history.push("/info?" + query.toString())
    }
    return (
        <div className="product__card">
            <div onClick={toProductInfo} className="product__card-image">
                <img
                    alt="card"
                    className="product__card-image-size"
                    src={props.image}></img>
                <button className="product__card-hover">+ Quick shop</button>
            </div>
            <div className="product__card-name">
                {props.name}
            </div>
            <div className="product__card-price">
                ${props.price}
            </div>
        </div>
    )
}
