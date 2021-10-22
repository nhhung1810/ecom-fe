import React from "react";
import { useState } from "react";
import { ColorButton, NavBar, QuantityButton } from "../../components";
import "./cart.css"
import { useDispatch, useSelector } from "react-redux";
import { selectAllProduct, removeFromCart } from "../../redux/cart.redux";
import { uploadProduct } from "../../api/api.order";


export const CartPage = props => {
    const cartData = useSelector(selectAllProduct);

    const onSubmit = async () => {
        if(cartData != null && cartData.length > 0){
            const submitData = cartData.map(e => {
                return{
                    productid : e.id,
                    quantity : e.quantity,
                    price : e.price,
                    color : e.color,
                    size : e.size
                }
            })
            console.log(submitData)
            const response = await uploadProduct(submitData)
            console.log("Is submited", response)
        }
    }

    return (
        <div className="cart__bg">
            <NavBar />
            <div className="cart__title ">
                My Bag
            </div>
            <div className="cart__body-container">
                <CartTable data={cartData} />
                <CartSummary onSubmit={onSubmit} />
            </div>
        </div>
    )
}

const CartSummary = props => {
    return (
        <div className="cart__body-summary">
            <div className="cart__body-summary-header">Total</div>
            <div className="cart__body-summary-card">
                <div className="cart__body-summary-text">
                    <span>Shipping & Handling:</span>
                    <span className="cart__body-summary-right">Free</span>
                </div>
                <div className="cart__body-summary-text">
                    <span>Total product:</span>
                    <span className="cart__body-summary-right">$1000</span>
                </div>
                <div className="cart__table-line margin-up" />
                <div className="cart__body-summary-text text-bolder">
                    <span>Subtotal</span>
                    <span className="cart__body-summary-right">$1000</span>
                </div>
            </div>
            <button
                type="button"
                onClick={props.onSubmit} 
                className="cart__body-check-out-button">
                Check out
            </button>
        </div>
    )
}

const CartTable = props => {
    const generateTableRow = () => {
        if(props.data == undefined)
            return (
                <></>
            )
        return props.data.map(e => {
            return (
                <CartTableRow 
                    key={e.id}
                    id={e.id}
                    quantity={e.quantity}
                    name={e.name}
                    color={e.color}
                    size={e.size}
                    image={e.img}
                    price={e.price} />
            )
        })
    }

    return (
        <div className="cart__body-table">
            <CartTableHeader />
            {generateTableRow()}
        </div>
    )
}

const CartTableRow = props => {
    const dispatch = useDispatch()
    const [quantity, setQuantity] = useState(props.quantity);
    const limit = 100;

    const handleQuantityChange = (offset) => {
        return e => {
            if (quantity + offset > 0 && quantity + offset < limit)
                setQuantity(quantity + offset)
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

const CartTableHeader = props => {
    return (
        <div className="cart__body-header">
            <div className="cart__body-header-product">
                Product
            </div>
            <div className="cart__body-header-color">
                Color
            </div>
            <div className="cart__body-header-size">
                Size
            </div>
            <div className="cart__body-header-quantity">
                Quantity
            </div>
            <div className="cart__body-header-amount">
                Amount
            </div>
        </div>
    )
}