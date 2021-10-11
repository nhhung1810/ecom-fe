import React from "react";
import "./products.css";

import Dropdown from "./dropdown/Dropdown"



const Product = props => {
    const locations = [
        {
            label: "Date added",
            value: 1,
        },
        {
            label: "A - Z",
            value: 2,
        },
        {
            label: "Z - A",
            value: 3,
        }
    ];

    const onChange = (item, name) => {
        // TODO: add sort 
        console.log(item, name)
    }

    return (
        <div className="product-toolbar">
            <span className="sort-label">SORT BY</span>
            <Dropdown
                    name="location"
                    title="Select location"
                    list={locations}
                    onChange={onChange}
                    select={{value: 1}} 
                />
            <div className="right-tool-align">
                <div className="product-search">
                    <img src={process.env.PUBLIC_URL + "/images/search.svg"} className="search-icon"></img>
                    <input type="text" className="product-search-bar" placeholder="Search product"></input>
                </div>
                <span className="add-button-wrapper">
                    <button className="add-button">
                        <img src={process.env.PUBLIC_URL + "/images/plus-white.svg"} className="plus-sym"></img> 
                        <span className="add-button-text">Add Product</span>
                    </button>
                    <button className="export-button">
                        <img src={process.env.PUBLIC_URL + "/images/export-orange.svg"} className="plus-sym"></img> 
                        <span className="add-button-text">Export</span>
                    </button>
                </span>
            </div>
        </div>
    )
}

export default Product;