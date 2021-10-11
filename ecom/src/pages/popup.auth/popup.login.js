import React, { useEffect, useReducer, useState } from "react";
import { ReactDOM } from "react";
import './popup.login.css';
import './checkbox.css'
import validator from 'validator';
import { Redirect } from "react-router";
import { signin, selectAuthUser, selectRemember, setRemember } from "../../redux/auth.redux";
import { useDispatch, useSelector } from "react-redux";
import { signinAPI } from "../../api/auth.api";

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
    const [redirect, setRedirect] = useState('');
    
    let user = useSelector(selectAuthUser);
    let remember = useSelector(selectRemember);
    const [isRemember, setIsRemember] = useState(remember !== null);
    
    useEffect(() => {
        if(isRemember) {
            setEmail(remember);
            setIsValidEmail(true);
        }
        console.log(email)
    })
    
    const dispatch = useDispatch();

    if(user != null){
        return(
            <Redirect to="/dashboard"></Redirect>
        )
    }
   
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

    const handleRemember = e => {
        console.log(remember)
        setIsRemember(!isRemember)
    }

    const handleSubmit = async e => {
        if (!isValidInput) {
            setErrorState(true);
            e.preventDefault();
            return;
        }
        e.preventDefault();
        console.log(`email: ${email}, password: ${password}`);

        const response = await signinAPI(email, password);
        if(response){
            dispatch(signin(email))

            if(isRemember) dispatch(setRemember(email))
            else dispatch(setRemember(null))

            setRedirect("dashboard")
        } else {
            setRedirect("index")
        }
    }

    if(redirect === "index"){
        return(
            <Redirect to="/"/>
        )
    } else if (redirect === "dashboard"){
        return(
            <Redirect to="/dashboard"/>
        )
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
                                <input onChange={changeEmail} defaultValue={remember}
                                    className={inputStyle()} type="text" placeholder="Enter your email..."></input>
                            </div>
                        </div>

                        <div className="input-group">
                            <div className="input-label"> Password </div>
                            <div className="input-container">
                                <input onChange={changePassword} className={inputStyle()} type="password" placeholder="Enter your password..."></input>
                            </div>
                        </div>

                        <div className="remember-block">
                            <label className="control control-checkbox">
                                Remember password
                                <input type="checkbox" className="inline-checkbox" onChange={handleRemember} defaultChecked={remember !== null}/>
                                <span className="control_indicator"></span>
                            </label>
                            <span className="forgot-password">
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