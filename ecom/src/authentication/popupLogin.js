import React, { useState } from "react";
import './popupLogin.css';
import './checkbox.css'
import validator from 'validator';

const InvalidInput = () => {
    return (
        <div className="invalid-input">Your email/password is invalid</div>
    )
}

const Login = props => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [isValidEmail, setIsValidEmail] = useState(false);
    const [isValidPassword, setIsValidPassword] = useState(false);

    const [errorState, setErrorState] = useState(false);

    let isValidInput = isValidEmail && isValidPassword;

    let inputStyle = () => {
        if (errorState) return "input-input error";
        else return "input-input";
    }

    let validInput = () => {
        if (!isValidInput)
            return "login-button";
        return "login-button valid-button";
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

    let handleSubmit = e => {
        if (!isValidInput) {
            //if try to submit with invalid state, we will change to error ui
            setErrorState(true);
            e.preventDefault();
            return;
        }
        e.preventDefault();
        console.log(`email: ${email}, password: ${password}`);
    }

    return (
        <div className="popup-login">
            <div className="box">
                <div className="close-icon" onClick={props.handleClose}>
                    <img src="./images/cross.svg" alt="A cross"></img>
                </div>
                <div className="login-header">
                    Login
                </div>
                {errorState ? <InvalidInput/> : null}
                <form onSubmit={handleSubmit}>
                    <div className="login-form">
                        <div className="input-group">
                            <div className="input-label"> Email </div>
                            <div className="input-container">
                                <input onChange={changeEmail} className={inputStyle()} type="text" placeholder="Enter your email..."></input>
                            </div>
                        </div>

                        <div className="input-group">
                            <div className="input-label"> Password </div>
                            <div className="input-container">
                                <input onChange={changePassword} className={inputStyle()} type="text" placeholder="Enter your password..."></input>
                            </div>
                        </div>

                        <div className="remember-block">
                            <label className="control control-checkbox">
                                Remember password
                                <input type="checkbox" className="inline-checkbox"/>
                                <span className="control_indicator"></span>
                            </label>
                            <span class="forgot-password">
                                    Forgot your password?
                            </span>
                        </div>
                    </div>

                    <div className="login-button-container">
                        <div className="center-button">
                            <button className={validInput()} type="submit">
                                <span className="login-button-text">Login</span>
                            </button>
                        </div>
                    </div>
                </form>
                <hr className="span-line"/>
                <div className="login-footer">
                    Don't have an account? <span className="text-link" onClick={props.handleChange}> Register</span>
                </div>
            </div>
        </div>
    )
}

export default Login;