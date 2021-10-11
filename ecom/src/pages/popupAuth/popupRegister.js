import React, { useState } from "react";
import './popupRegister.css';
import validator from 'validator';
import { Redirect } from "react-router-dom";
import { signupAPI } from "../../api/auth.api";

const InvalidPassword = () => {
    return (
        <div className="invalid-password">Your password must be more than 6 characters</div>
    )
}

const InvalidEmail = () => {
    return (
        <div className="invalid-password">Please enter a valid email</div>
    )
}

const InvalidName = () => {
    return (
        <div className="invalid-password">Please enter a valid name</div>
    )
}

const Register = props => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [isValidName, setIsValidName] = useState(false);
    const [isValidEmail, setIsValidEmail] = useState(false);
    const [isValidPassword, setIsValidPassword] = useState(false);

    const [errorState, setErrorState] = useState(false);

    const [redirect, setRedirect] = useState(false);

    //this function will be call again after state is updated
    let isValidInput = isValidEmail && isValidName && isValidPassword;

    let inputStyle = () => {
        if(errorState) return "input-input error";
        else return "input-input";
    }

    let validInput = () => {
        if (!isValidInput)
            return "register-button";
        return "register-button valid-button";
    }

    let changeName = e => {
        if (e.target.value.length > 0)
            setIsValidName(true);
        else 
            setIsValidName(false);
        setName(e.target.value);
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
        if(!isValidInput){
            //if try to submit with invalid state, we will change to error ui
            setErrorState(true);
            e.preventDefault();
            return;
        }
        e.preventDefault();
        console.log(`name: ${name}, email: ${email}, password: ${password}`);
        const response = await signupAPI(name, email, password);
        console.log(response)
    }


    return (
        <div className="popup-register">
            <div className="box">
                <div className="close-icon" onClick={props.handleClose}>
                    <img src="./images/cross.svg" alt="A cross"></img>
                </div>
                <div className="register-header">
                    Register
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="register-form">
                        <div className="input-group">
                            <div className="input-label"> Name </div>
                            <div className="input-container">
                                <input onChange={changeName} className={inputStyle()} type="text" placeholder="Enter your name..."></input>
                            </div>
                        </div>
                        {(errorState && !isValidName) ? <InvalidName/> : null}
                        
                        <div className="input-group">
                            <div className="input-label"> Email </div>
                            <div className="input-container">
                                <input onChange={changeEmail} className={inputStyle()} type="text" placeholder="Enter your email..."></input>
                            </div>
                        </div>
                        {(errorState && !isValidEmail) ? <InvalidEmail/> : null}

                        <div className="input-group">
                            <div className="input-label"> Password </div>
                            <div className="input-container">
                                <input onChange={changePassword} className={inputStyle()} type="password" placeholder="Enter your password..."></input>
                            </div>
                        </div>
                        {(errorState && !isValidPassword) ? <InvalidPassword /> : null}
                    </div>

                    <div className="term-service">
                        By creating an account you agree to the <span href="#" className="text-link"> Terms of Service
                        </span> and <span href="#" className="text-link"> Privacy Policy</span>
                    </div>
                    <div className="register-button-container">
                        <div className="center-button">
                            <button className={validInput()} type="submit">
                                <span className="register-button-text">Register</span>
                            </button>
                        </div>
                    </div>
                </form>
                <hr className="span-line"/>
                <div className="register-footer">
                    Do you have an account? <span className="text-link" onClick={props.handleChange}> Login</span>
                </div>
            </div>
        </div>
    )
}

export default Register;