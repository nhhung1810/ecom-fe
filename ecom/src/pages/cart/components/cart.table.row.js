import { useDispatch } from "react-redux";
import { useState } from "react";
import { ColorButton, QuantityButton } from "../../../components";
import { removeFromCart, addToCart } from "../../../redux/cart.redux";

export const CartTableRow = props => {
    const dispatch = useDispatch()
    const [quantity, setQuantity] = useState(props.quantity);

    const handleQuantityChange = (offset) => {
        return e => {
            if (quantity + offset > 0 && quantity + offset <= props.remain){
                setQuantity(quantity + offset)
                dispatch(addToCart({
                    id : props.id,
                    quantity : offset 
                    // as quantity is plus into the store
                    // so this must be the offset
                }))
            }
            else
                return
        }
    }

    const handleRemove = () =>{
        dispatch(removeFromCart(props.id))
    }

    return (
        <div className="cart__body-row">
            <div className="cart__table-line" />
            <div className="cart__body-row-product">
                <img
                    alt="body"
                    className="cart__body-row-product-image"
                    src={props.image}>
                </img>
                <div className="cart__body-row-product-name">
                    {props.name}
                </div>
                <button className="cart__body-row-product-change"> Change </button>
                <div className="cart__body-row-product-line"></div>
                <button
                    onClick={handleRemove} 
                    className="cart__body-row-product-remove"> Remove </button>
            </div>
            <div className="cart__body-row-color">
                <ColorButton 
                    color={props.color}/>
            </div>
            <div className="cart__body-row-size">
                S
            </div>
            <div className="cart__body-row-quantity">
                <QuantityButton
                    onChange={handleQuantityChange}
                    quantity={quantity}
                />
            </div>
            <div className="cart__body-row-amount">
                ${props.price*props.quantity}
            </div>
        </div>
    )
}
