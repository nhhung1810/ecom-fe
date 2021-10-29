import { createSlice } from "@reduxjs/toolkit";

export const cartStore = createSlice({
    name : "cart",
    initialState : {
        products : [],
        // One product should have the structure like this
        // p : {
        //     id : null, 
        //     name : null,
        //     color : null,
        //     size : null,
        //     quantity : null,
        //     price : null,
        //     img : null,
        //     remain : null,
        // }
    },

    reducers : {
        addToCart : (state, action) => {
            let tmp = state.products.findIndex(e => e.id === action.payload.id)
            if (tmp === -1)
                state.products.push(action.payload)
            else {
                let newQuantity = state.products[tmp].quantity + action.payload.quantity
                if(newQuantity > state.products[tmp].remain)
                    newQuantity = state.products[tmp].remain
                state.products[tmp].quantity = newQuantity
            }

        },

        removeFromCart : (state, action) => {
            let tmp = state.products.findIndex(e => e.id === action.payload)
            if(tmp === -1)
                return
            else
                state.products.splice(tmp, 1)
        },

        removeAllFromCart : (state) =>{
            state.products = []
        }
    }
})

export const {addToCart, removeFromCart, removeAllFromCart} = cartStore.actions

export default cartStore.reducer

export const selectAllProduct = state => state.cart.products 
