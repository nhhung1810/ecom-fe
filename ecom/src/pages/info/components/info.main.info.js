
import { RatingGroup } from "./info.rating.group"
import { useState } from "react"
import { QuantityButton } from "../../../components"
import { SizeGroup } from "./info.main.size"
import { ColorGroup } from "./info.main.color"
import { useDispatch } from "react-redux"
import { addToCart } from "../../../redux/cart.redux"

export const MainInfo = props => {
    const [chosenSize, setChosenSize] = useState(props.sizes[0])
    const [chosenColor, setChosenColor] = useState(props.colors[0])
    const [chosenQuantity, setChosenQuantity] = useState(1)
    const dispatch = useDispatch()

    const handleAddToCart = e => {
        // TODO: CONNECT TO CART
        e.preventDefault()
        const cartData = {
            id: props.id,
            name: props.pname,
            color: chosenColor,
            size: chosenSize,
            capacity: chosenQuantity,
            price: props.price,
            img: props.img
        }
        dispatch(addToCart(cartData))
    }

    const handleChangeQuantity = (offset) => {
        return e => {
            e.preventDefault()
            if (chosenQuantity + offset > 0 && chosenQuantity + offset <= props.capacity) {
                setChosenQuantity(chosenQuantity + offset)
            }
        }
    }

    return (
        <div className="info__info-container">
            <form onSubmit={handleAddToCart}>
                <div className="info__info-title">{props.pname}</div>
                <div className="info__info-price">${props.price}</div>
                <RatingGroup />
                <SizeGroup
                    onChange={setChosenSize}
                    sizes={props.sizes} />
                <ColorGroup
                    chosenColor={chosenColor}
                    onChange={setChosenColor}
                    colors={props.colors} />
                <div className="info__info-quantity">
                    <span className="info__info-quantity-text">
                        Quantity
                    </span>
                    <QuantityButton
                        quantity={chosenQuantity}
                        onChange={handleChangeQuantity}
                    />
                </div>
                <button
                    type="submit"
                    className="info__info-submit-button">
                    Add to cart
                </button>
                <div className="info__info-horizontal-line" />
                <div className="info__info-desc">
                    {props.description}
                </div>
            </form>
        </div>
    )
}
