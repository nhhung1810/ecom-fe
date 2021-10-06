import React from "react";

import "./dashboard.css"
import "./sidecard.css"

const SideCard = props => {
    return (
        <div className="full-span-card">
            <img src={props.logo} alt="" className="logo"></img>
            <span className="logo-label">{props.name}</span>
        </div>
    )
}

const Header = props => {
    return (
        <div className="title-bar">
            <span className="title">{props.name}</span>
            <span className="name-position">
                <img src="./images/ava.jpg  " alt="Avatar" class="avatar"></img>
                <span className="avatar-name">Nguyen H. Hung</span>
                <img src="./images/dropdown.svg" className="avatar-dropdown"></img>
                <img src="./images/mail.svg" className="avatar-mail"></img>
                <img src="./images/notification.svg" className="avatar-mail"></img>
            </span>
        </div>
    )
}

const Dashboard = () => {
    return (
        <div>
            <div className="sidenav">
                <div className="main-logo-container">
                    <img src="./images/logo.svg" alt="Company logo" className="main-logo"></img>
                </div>
                <SideCard name="Overview" logo="./images/overview-dark.svg" />
                <SideCard name="Orders" logo="./images/orders-dark.svg" />
                <SideCard name="Products" logo="./images/products-dark.svg" />
                <SideCard name="Payments" logo="./images/payment-dark.svg" />
                <SideCard name="Promotions" logo="./images/promotion-dark.svg" />
                <SideCard name="Setting" logo="./images/setting-dark.svg" />
            </div>

            <div className="main">
                <Header name="Orders"></Header>
            </div>
        </div>
    )
}

export default Dashboard;


