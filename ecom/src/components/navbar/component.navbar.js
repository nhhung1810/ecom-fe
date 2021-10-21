import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { selectAuthUser, signout } from "../../redux/auth.redux";
import "./navbar.css"

import Login from "../../pages/modal/login/modal.login";
import Register from "../../pages/modal/register/modal.register";
import { signoutAPI } from "../../api/auth.api";


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
            <img src={process.env.PUBLIC_URL + "/images/search.svg"} className="navbar__search-icon"></img>
            <input type="text" className="navbar__searchbar" placeholder="Search"></input>
        </span>
    )
}

const Logo = props => {
    return (
        <img className="navbar__logo" src={process.env.PUBLIC_URL + "/images/logo.svg"}></img>
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
                <img src={process.env.PUBLIC_URL + "/images/cart.svg"}></img>
            </span>
        </span>
    )
}

const AuthenticatedGroup = props => {
    const dispatch = useDispatch()
    const logout = async () => {
        const response = await signoutAPI();
        if (response) dispatch(signout())
    }

    return (
        <>
            <button type="button" onClick={logout}>Signout</button>
            <Link to="/logindash"><button type="button">Login Dash</button></Link>

        </>
    )
}

const UnauthenticatedGroup = props => {
    const [isRegisterOpen, setIsRegisterOpen] = useState(false)
    const [isLoginOpen, setIsLoginOpen] = useState(false)

    const toggleRegisterPopup = () => {
        if (isLoginOpen) setIsLoginOpen(false)
        setIsRegisterOpen(!isRegisterOpen)
        return;
    }

    const toggleLoginPopup = () => {
        if (isRegisterOpen) setIsRegisterOpen(false)
        setIsLoginOpen(!isLoginOpen)
        return;
    }

    const loginToRegister = () => {
        if (!isLoginOpen) toggleRegisterPopup();
        else {
            setIsLoginOpen(false)
            setIsRegisterOpen(true)
        }
    }

    const registerToLogin = () => {
        console.log(isRegisterOpen)
        if (!isRegisterOpen) toggleLoginPopup();
        else {
            setIsLoginOpen(true)
            setIsRegisterOpen(false)
        }
        console.log(isRegisterOpen)
    }

    return (
        <>
            <span className="navbar__right-register">
                <button type="button"
                    onClick={toggleRegisterPopup}
                    className="navbar__right-register-button">
                    Register
                </button>
                {
                    isRegisterOpen && <Register
                        handleClose={toggleRegisterPopup}
                        handleChange={registerToLogin} />
                }
            </span>
            <span className="navbar__right-login">
                <button type="button"
                    onClick={toggleLoginPopup}
                    className="navbar__right-login-button">
                    Login
                </button>
                {
                    isLoginOpen && <Login
                        handleClose={toggleLoginPopup}
                        handleChange={loginToRegister} />
                }
            </span>
        </>
    )
}

const DropCard = props => {
    return (
        <span className="navbar__footer-dropcard">
            {props.children}
            <img className="navbar__footer-dropcard-arrow" 
            src={process.env.PUBLIC_URL + "/images/arrow.svg"}></img>
        </span>
    )
}

