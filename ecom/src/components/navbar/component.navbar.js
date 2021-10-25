import React from "react";
import { useSelector} from "react-redux";
import { Link } from "react-router-dom";

import { selectAuthUser } from "../../redux/auth.redux";
import "./navbar.css"

import { DropCard } from "./navbar.dropcard";
import { AuthenticatedGroup, UnauthenticatedGroup } from "./navbar.authenticate.group";


export const NavBar = props => {
    return (
        <div className="navbar__container">
            <div className="navbar__header">
                <SearchBar />
                <Logo />
                <RightTool />
            </div>
            <div className="navbar__footer">
                <div className="navbar__footer-dropcard-center">
                    <DropCard>Men</DropCard>
                    <Link to="/product?ctg=ladies">
                        <DropCard>Ladies</DropCard>
                    </Link>
                    <DropCard>Girls</DropCard>
                    <DropCard>Boys</DropCard>
                </div>
            </div>
        </div>
    )
}

const SearchBar = props => {
    return (
        <span className="navbar__search-container">
            <img 
                src={process.env.PUBLIC_URL + "/images/search.svg"} 
                className="navbar__search-icon"
                alt="search icon"></img>
            <input type="text" className="navbar__searchbar" placeholder="Search"></input>
        </span>
    )
}

const Logo = props => {
    return (
        <img 
            className="navbar__logo" 
            src={process.env.PUBLIC_URL + "/images/logo.svg"}
            alt="logo"></img>
    )
}

const RightTool = props => {

    let user = useSelector(selectAuthUser);

    return (
        <span className="navbar__right-align">
            {
                user === null ?
                    <UnauthenticatedGroup />
                    :
                    <AuthenticatedGroup />
            }
            <span className="navbar__right-shopping-cart">
                <Link to="/cart">
                    <img 
                        src={process.env.PUBLIC_URL + "/images/cart.svg"}
                        alt="cart"></img>
                </Link>
            </span>
        </span>
    )
}
