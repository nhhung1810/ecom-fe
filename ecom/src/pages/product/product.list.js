import React from "react";
import { NavBar } from "../../components";
import { SideBar, MainView, Footer } from "./components";
import "./product.list.css"

export const ProductList = props => {
    return (
        <div>
            <NavBar />
            <div className="product__title">
                Ladies / Dresses
            </div>

            <div className="product__container">
                <SideBar />
                <MainView />
            </div>
            <Footer />
        </div>
    )
}