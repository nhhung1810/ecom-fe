import React, { useState } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import "./index.css"

import Register from "../popup.auth/popup.register.js";
import Login from "../popup.auth/popup.login.js"
import { useDispatch } from "react-redux";
import { signout } from "../../redux/auth.redux";
import { signoutAPI } from "../../api/auth.api";

const HomePage = props => {
    const [isRegisterOpen, setIsRegisterOpen] = useState(false) 
    const [isLoginOpen, setIsLoginOpen] = useState(false)

    const dispatch = useDispatch()



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
        if (!isRegisterOpen) toggleRegisterPopup();
        else {
            setIsLoginOpen(true)
            setIsRegisterOpen(false)
        }
    }

    const logout = async () =>{
        const response = await signoutAPI();
        if(response) dispatch(signout())
    }

        return (
                <div>
                    <button type="button" onClick={toggleRegisterPopup}>Register</button>
                    {
                        isRegisterOpen && <Register handleClose={toggleRegisterPopup} handleChange={registerToLogin} />
                    }
                    <button type="button" onClick={toggleLoginPopup}>Login</button>
                    {
                        isLoginOpen && <Login handleClose={toggleLoginPopup} handleChange={loginToRegister} />
                    }

                    <Link to="/logindash"><button type="button">Login Dash</button></Link>
                    
                    <button type="button" onClick={logout}>Log out</button>
                </div>  
        )
}

export default HomePage;