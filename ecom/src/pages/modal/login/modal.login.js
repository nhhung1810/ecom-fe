import React, { useEffect, useState } from "react";
import { Redirect } from "react-router";
import { signin, selectAuthUser, selectRemember, setRemember } from "../../../redux/auth.redux";
import { useDispatch, useSelector } from "react-redux";
import validator from 'validator';

import { signinAPI } from "../../../api/auth.api";
import './modal.login.css';
import './checkbox.css'

import { ModalLoginGroupInput, LoginButton, RememberAndForgot } from "./components";

const Login = props => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [isValidEmail, setIsValidEmail] = useState(false);
    const [isValidPassword, setIsValidPassword] = useState(false);

    const [errorState, setErrorState] = useState(false);
    const [redirect, setRedirect] = useState('');

    let user = useSelector(selectAuthUser);
    let remember = useSelector(selectRemember);
    const [isRemember, setIsRemember] = useState(remember !== null);

    useEffect(() => {
        if (isRemember) {
            if (remember != null) {
                setEmail(remember);
                setIsValidEmail(true);
            }
        }
    })

    const dispatch = useDispatch();

    //REDIRECT
    if (user != null) {
        return (
            <Redirect to="/dashboard"></Redirect>
        )
    }

    if (redirect === "index") {
        return (
            <Redirect to="/" />
        )
    } else if (redirect === "dashboard") {
        return (
            <Redirect to="/dashboard" />
        )
    }

    //LOGIC UI
    let isValidInput = isValidEmail && isValidPassword;

    let inputStyle = () => {
        if (errorState) return "modal__input-input modal__error";
        else return "modal__input-input";
    }

    let validInput = () => {
        if (!isValidInput)
            return "modal__login-button";
        return "modal__login-button modal__valid-button";
    }

    let changeEmail = e => {
        if (validator.isEmail(e.target.value))
            setIsValidEmail(true);
        else
            setIsValidEmail(false);
        setEmail(e.target.value);
    }

    let changePassword = e => {
        if (e.target.value.length > 6)
            setIsValidPassword(true);
        else
            setIsValidPassword(false);
        setPassword(e.target.value);
    }

    const handleRemember = e => {
        setIsRemember(!isRemember)
    }

    const handleSubmit = async e => {
        e.preventDefault();
        if (!isValidInput) {
            setErrorState(true);
            return;
        }

        const response = await signinAPI(email, password);
        if (response) {
            dispatch(signin(email))

            if (isRemember) dispatch(setRemember(email))
            else dispatch(setRemember(null))

            setRedirect("dashboard")
        } else {
            setRedirect("index")
        }
    }



    return (
        <div className="modal__popup-login">
            <div className="modal__box">
                <div className="modal__close-icon" onClick={props.handleClose}>
                    <img src="./images/cross.svg" alt="A cross"></img>
                </div>

                <Header />
                {errorState ? <InvalidInput /> : null}

                <form onSubmit={handleSubmit}>
                    <div className="modal__login-form">
                        <ModalLoginGroupInput handleChange={changeEmail} default={remember} label={"Email"} type={"text"}
                            styling={inputStyle()} placeholder={"Enter your email..."} />

                        <ModalLoginGroupInput handleChange={changePassword} default={""} label={"Name"} type={"password"}
                            styling={inputStyle()} placeholder={"Enter your password..."} />

                        <RememberAndForgot handleChange={handleRemember} default={remember !== null} />
                    </div>

                    <LoginButton styling={validInput()} />
                </form>

                <hr className="modal__span-line" />
                <Footer handleChange={props.handleChange}/>
            </div>
        </div>
    )
}

const InvalidInput = () => {
    return (
        <div className="modal__invalid-input">Your email/password is invalid</div>
    )
}

const Header = () => {
    return (
        <header className="modal__login-header">
            Login
        </header>
    )
}

const Footer = props => {
    return (
        <div className="modal__login-footer">
            Don't have an account? <span className="modal__text-link" onClick={props.handleChange}> Register</span>
        </div>
    )
}



export default Login;