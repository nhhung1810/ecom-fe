import React, { useState } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    Redirect
} from "react-router-dom";

import "./dashboard.css"
import "./sidecard.css"

import Order from "./views/orders.js"
import Product from "./views/products"

import { signin, selectAuthUser } from "../../redux/auth.redux";
import { useDispatch, useSelector } from "react-redux";

const SideCard = props => {
    let activeStyling = props.handleActiveStyling;
    let logo = () => {
        if (activeStyling) return props.activeLogo;
        else return props.logo;
    }

    return (
        <div className={"full-span-card " + activeStyling} onClick={props.handleClick}>
            <img src={logo()} alt="" className="logo"></img>
            <span className="logo-label">{props.name}</span>
        </div>
    )
}

const Header = props => {
    return (
        <div className="title-bar">
            <span className="title">{props.name}</span>
            <span className="name-position">
                <img src={process.env.PUBLIC_URL + "/images/ava.jpg"} alt="Avatar" className="avatar"></img>
                <span className="avatar-name">Nguyen H. Hung</span>
                <img src={process.env.PUBLIC_URL + "/images/dropdown.svg"} className="avatar-dropdown"></img>
                <img src={process.env.PUBLIC_URL + "/images/mail.svg"} className="avatar-mail"></img>
                <img src={process.env.PUBLIC_URL + "/images/notification.svg"} className="avatar-mail"></img>
            </span>
        </div>
    )
}

const Dashboard = () => {
    let match = useRouteMatch();
    let images = process.env.PUBLIC_URL;
    
    const [onActive, setOnActive] = useState(1);

    let user = useSelector(selectAuthUser);

    const activeStyling = (index) => {
        if (onActive == index) return "active-side-card";
        return "";
    }

    const setActive = index => {
        return (
            (e) => {
                if (index != onActive)
                    setOnActive(index);
                return;
            }
        )
    }

    if(user === null){
        return(
            <Redirect to="logindash"></Redirect>
        )
    }

    return (
        <Router>
            <div className="sidenav">
                <div className="main-logo-container">
                    <img src={images + "/images/logo.svg"} alt="Company logo" className="main-logo"></img>
                </div>
                <Link to={`${match.path}/overview`}>
                    <SideCard handleActiveStyling={activeStyling(1)} handleClick={setActive(1)}
                        name="Overview"
                        logo={images + "/images/overview-dark.svg"}
                        activeLogo={images + "/images/overview-dark.svg"} />
                </Link>
                <Link to={`${match.path}/order`}>
                    <SideCard handleActiveStyling={activeStyling(2)} handleClick={setActive(2)}
                        name="Orders"
                        logo={images + "/images/orders-dark.svg"}
                        activeLogo={images + "/images/orders-orange.svg"} />
                </Link>
                <Link to={`${match.path}/product`}>
                    <SideCard handleActiveStyling={activeStyling(3)} handleClick={setActive(3)}
                        name="Products"
                        logo={images + "/images/products-dark.svg"}
                        activeLogo={images + "/images/products-orange.svg"} />
                </Link>
                <Link to={`${match.path}/payment`}>
                    <SideCard handleActiveStyling={activeStyling(4)} handleClick={setActive(4)}
                        name="Payments"
                        logo={images + "/images/payment-dark.svg"}
                        activeLogo={images + "/images/payment-dark.svg"} />
                </Link>
                <Link to={`${match.path}/promotion`}>
                    <SideCard handleActiveStyling={activeStyling(5)} handleClick={setActive(5)}
                        name="Promotions"
                        logo={images + "/images/promotion-dark.svg"}
                        activeLogo={images + "/images/promotion-dark.svg"} />
                </Link>
                <Link to={`${match.path}/setting`}>
                    <SideCard handleActiveStyling={activeStyling(6)} handleClick={setActive(6)}
                        name="Setting"
                        logo={images + "/images/setting-dark.svg"}
                        activeLogo={images + "/images/setting-dark.svg"} />
                </Link>
            </div>

            <div className="main">
                <Switch>
                    <Route path={`${match.path}/overview`}>
                        <Header name="Overview"></Header>
                    </Route>
                </Switch>
                <Switch>
                    <Route path={`${match.path}/order`}>
                        <Header name="Orders"></Header>
                        <Order />
                    </Route>
                </Switch>
                <Switch>
                    <Route path={`${match.path}/product`}>
                        <Header name="Products"></Header>
                        <Product />
                    </Route>
                </Switch>
                <Switch>
                    <Route path={`${match.path}/payment`}>
                        <Header name="Payment"></Header>
                    </Route>
                </Switch>
                <Switch>
                    <Route path={`${match.path}/promotion`}>
                        <Header name="Promotions"></Header>
                    </Route>
                </Switch>
                <Switch>
                    <Route path={`${match.path}/setting`}>
                        <Header name="Setting"></Header>
                    </Route>
                </Switch>
            </div>
        </Router>
    )
}

export default Dashboard;


