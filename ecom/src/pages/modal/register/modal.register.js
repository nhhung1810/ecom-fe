import React, { useState } from "react";
import './modal.register.css';
import validator from 'validator';
import { Redirect } from "react-router-dom";

import { signupAPI } from "../../../api/auth.api";
import { GroupInputRegister, TermService, RegisterButton } from "./components";

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
        if (errorState) return "input-input error";
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
        if (!isValidInput) {
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
                <Header />
                <form onSubmit={handleSubmit}>
                    <div className="register-form">

                        <GroupInputRegister handleChange={changeName} styling={inputStyle()}
                            type={"text"} placeholder={"Enter your name..."} label={"Name"} />
                        {(errorState && !isValidName) ? <InvalidName /> : null}

                        <GroupInputRegister handleChange={changeEmail} styling={inputStyle()}
                            type={"text"} placeholder={"Enter your email..."} label={"Email"} />
                        {(errorState && !isValidEmail) ? <InvalidEmail /> : null}

                        <GroupInputRegister handleChange={changePassword} styling={inputStyle()}
                            type={"password"} placeholder={"Enter your password..."} label={"Password"} />
                        {(errorState && !isValidPassword) ? <InvalidPassword /> : null}
                    </div>

                    <TermService />
                    <RegisterButton styling={validInput()} />
                </form>

                <hr className="span-line" />
                <Footer props={props.handleChange}/>
            </div>
        </div>
    )
}

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

const Header = () => {
    return (
        <div className="register-header">
            Register
        </div>
    )
}

const Footer = props => {
    return (
        <div className="register-footer">
            Do you have an account? <span className="text-link" onClick={props.handleChange}> Login</span>
        </div>
    )
}

export default Register;