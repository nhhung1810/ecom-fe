import React, { useRef, useState } from "react";
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
import { Order, Product } from "./views";

import { selectAuthUser, signout } from "../../../redux/auth.redux";
import { useDispatch, useSelector } from "react-redux";
import { AddPage } from "./views/add/product.add";
import { useOnClickOutside } from "../../../hook";



const Dashboard = () => {
    let match = useRouteMatch();
    let images = process.env.PUBLIC_URL;
    const [onActive, setOnActive] = useState(1);
    let user = useSelector(selectAuthUser);

    const activeStyling = (index) => {
        if (onActive === index) return "active-side-card";
        return "";
    }

    const setActive = index => {
        return (
            (e) => {
                if (index !== onActive)
                    setOnActive(index);
                return;
            }
        )
    }

    if (user === null) {
        return (
            <Redirect to="/logindash"></Redirect>
        )
    }

    return (
        <Router>
            <div className="sidenav">
                <Logo path={images} />

                <SideCard handleActiveStyling={activeStyling(1)} handleClick={setActive(1)}
                    name="Overview"
                    logo={images + "/images/overview-dark.svg"}
                    activeLogo={images + "/images/overview-dark.svg"}
                    path={`${match.path}/overview`} />

                <SideCard handleActiveStyling={activeStyling(2)} handleClick={setActive(2)}
                    name="Orders"
                    logo={images + "/images/orders-dark.svg"}
                    activeLogo={images + "/images/orders-orange.svg"}
                    path={`${match.path}/order`} />

                <SideCard handleActiveStyling={activeStyling(3)} handleClick={setActive(3)}
                    name="Products"
                    logo={images + "/images/products-dark.svg"}
                    activeLogo={images + "/images/products-orange.svg"}
                    path={`${match.path}/product`} />

                <SideCard handleActiveStyling={activeStyling(4)} handleClick={setActive(4)}
                    name="Payments"
                    logo={images + "/images/payment-dark.svg"}
                    activeLogo={images + "/images/payment-dark.svg"}
                    path={`${match.path}/payment`} />

                <SideCard handleActiveStyling={activeStyling(5)} handleClick={setActive(5)}
                    name="Promotions"
                    logo={images + "/images/promotion-dark.svg"}
                    activeLogo={images + "/images/promotion-dark.svg"}
                    path={`${match.path}/promotion`} />

                <SideCard handleActiveStyling={activeStyling(6)} handleClick={setActive(6)}
                    name="Setting"
                    logo={images + "/images/setting-dark.svg"}
                    activeLogo={images + "/images/setting-dark.svg"}
                    path={`${match.path}/setting`} />
            </div>

            <MainView path={match.path} />
        </Router>
    )
}


const Header = props => {
    const ref = useRef()
    const [isModalOpen, setIsModalOpen] = useState(false)
    useOnClickOutside(ref, () => setIsModalOpen(false))
    const dispatch = useDispatch()

    const onSignout = e => {
        dispatch(signout())
    }

    return (
        <div className="title-bar">
            <span className="title">{props.name}</span>
            <span className="name-position">
                <img src={process.env.PUBLIC_URL + "/images/ava.jpg"} alt="Avatar" className="avatar"></img>
                <span className="avatar-name">Nguyen H. Hung</span>
                <img
                    onClick={e => setIsModalOpen(true)}
                    alt="dropdown"
                    src={process.env.PUBLIC_URL + "/images/dropdown.svg"}
                    className="avatar-dropdown" />
                {
                    isModalOpen
                        ?
                        <div ref={ref} className="avatar-dropdown-container">
                            <button type="button">
                                <img src={process.env.PUBLIC_URL + "/images/profile.svg"} />
                                View Profile</button>
                            <button type="button" onClick={onSignout}>
                                <img src={process.env.PUBLIC_URL + "/images/logout.svg"} />
                                Log out</button>
                        </div>
                        :
                        null
                }
                <img alt="mail" src={process.env.PUBLIC_URL + "/images/mail.svg"} className="avatar-mail"></img>
                <img alt="noti" src={process.env.PUBLIC_URL + "/images/notification.svg"} className="avatar-mail"></img>
            </span>
        </div>
    )
}

const Logo = props => {
    return (
        <div className="main-logo-container">
            <img src={props.path + "/images/logo.svg"} alt="Company logo" className="main-logo"></img>
        </div>
    )
}

const SideCard = props => {
    let activeStyling = props.handleActiveStyling;
    let logo = () => {
        if (activeStyling) return props.activeLogo;
        else return props.logo;
    }

    return (
        <Link to={`${props.path}`}>
            <div className={"full-span-card " + activeStyling} onClick={props.handleClick}>
                <img src={logo()} alt="" className="logo"></img>
                <span className="logo-label">{props.name}</span>
            </div>
        </Link>
    )
}

const MainView = props => {
    return (
        <div className="main">
            <Switch>
                <Route path={`${props.path}/overview`}>
                    <Header name="Overview"></Header>
                </Route>

                <Route path={`${props.path}/order`}>
                    <Header name="Orders"></Header>
                    <Order />
                </Route>

                <Route exact path={`${props.path}/product`}>
                    <Header name="Products"></Header>
                    <Product />
                </Route>

                <Route path={`${props.path}/product/add`}>
                    <Header name="Add product"></Header>
                    <AddPage />
                </Route>

                <Route path={`${props.path}/payment`}>
                    <Header name="Payment"></Header>
                </Route>

                <Route path={`${props.path}/promotion`}>
                    <Header name="Promotions"></Header>
                </Route>

                <Route path={`${props.path}/setting`}>
                    <Header name="Setting"></Header>
                </Route>
            </Switch>
        </div>
    )
}

export default Dashboard;


