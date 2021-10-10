import React, { useState } from "react";
import './loginDash.css';
import {Redirect} from "react-router-dom"
import validator from 'validator';

const InvalidInput = () => {
    return (
        <div className="invalid-input">Your email/password is invalid</div>
    )
}

const LoginDash = props => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [isValidEmail, setIsValidEmail] = useState(false);
    const [isValidPassword, setIsValidPassword] = useState(false);
    const [errorState, setErrorState] = useState(false);

    const [redirect, setRedirect] = useState(false)

    let isValidInput = isValidEmail && isValidPassword;

    let inputStyle = () => {
        if (errorState) return "dash-input-input dash-error";
        else return "dash-input-input";
    }

    let validInput = () => {
        if (!isValidInput)
            return "dash-login-button";
        return "dash-login-button dash-valid-button";
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

    const handleSubmit = async e => {
        if (!isValidInput) {
            //if try to submit with invalid state, we will change to error ui
            setErrorState(true);
            e.preventDefault();
            return;
        }
        e.preventDefault();
        console.log(`email: ${email}, password: ${password}`);

        const res = await fetch("http://localhost:5000/login", {
            method : "POST",
            headers : {'Content-Type' : "application/json"},
            credentials : "include",
            body : JSON.stringify({
                email,
                password
            })
        }).then(res => {
            const content = res.json();
            console.log(content)
            setRedirect(true)
        }).catch(err => {
            //TODO: CHANGE THIS
            setRedirect(true)
            console.log(err)
        })
    }

    if(redirect){
        return <Redirect to="/dashboard"></Redirect>
    }

    return (
        <div className="dash-background">
            <img src={process.env.PUBLIC_URL + "./images/login-dash-bg.png"} className="bg"></img>
            <div className="dash-box">
                <div className="dash-login-header">
                    Login
                </div>
                {errorState ? <InvalidInput /> : null}
                <form onSubmit={handleSubmit}>
                    <div className="dash-login-form">
                        <div className="dash-input-group">
                            <div className="dash-input-label"> EMAIL </div>
                            <div className="dash-input-container">
                                <input onChange={changeEmail} className={inputStyle()} type="text" placeholder="Enter your email..."></input>
                            </div>
                        </div>

                        <div className="dash-input-group">
                            <div className="dash-input-label"> PASSWORD </div>
                            <div className="dash-input-container">
                                <input onChange={changePassword} className={inputStyle()} type="password" placeholder="Enter your password..."></input>
                            </div>
                        </div>

                    </div>

                    <div className="dash-login-button-container">
                        <div className="dash-center-button">
                            <button className={validInput()} type="submit">
                                <span className="dash-login-button-text">Log in</span>
                            </button>
                        </div>
                    </div>
                </form>
                <div className="dash-forgot-container">
                    <div className="dash-forgot-password"> Forgot password? </div>
                </div>
            </div>
        </div>


    )
}

export default LoginDash;