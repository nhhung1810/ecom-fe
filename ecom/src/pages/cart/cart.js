import React from "react";
import "./cart.css"
import { useDispatch, useSelector } from "react-redux";

import { NavBar } from "../../components";
import { selectAllProduct, removeAllFromCart } from "../../redux/cart.redux";
import { CartTable, CartSummary } from "./components";
import { uploadOrder } from "../../api/api.order";

export const CartPage = props => {
    const cartData = useSelector(selectAllProduct);
    const dispatch = useDispatch()

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
            const response = await uploadOrder(submitData)
            console.log("Is submited", response)
            if(response === true)
                dispatch(removeAllFromCart())
        }
    }

    const totalPrice = () => {
        let total = 0;
        for (let i = 0; i< cartData.length; i++){
            total += (cartData[i].price * cartData[i].quantity)
        }
        return total
    }

    return (
        <div className="cart__bg">
            <NavBar />
            <div className="cart__title ">
                My Bag
            </div>
            <div className="cart__body-container">
                <CartTable data={cartData} />
                <CartSummary total={totalPrice} onSubmit={onSubmit} />
            </div>
        </div>
    )
}