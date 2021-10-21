import React, { useState } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import { NavBar } from "../../components";
import Register from "../modal/register/modal.register.js";
import Login from "../modal/login/modal.login.js"
import { useDispatch } from "react-redux";
import { signout } from "../../redux/auth.redux";
import { signoutAPI } from "../../api/auth.api";
import { fetchAllProductAPI } from "../../api/product.api";
import { imageUploadAPI } from "../../api/upload.api";

const HomePage = props => {

    return (
        <div className="home__fill-page">
            <NavBar />
            <TestSite />
        </div>
    )
}

const TestSite = props => {
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

    const logout = async () => {
        const response = await signoutAPI();
        if (response) dispatch(signout())
    }

    const testUpload = async e => {
        if (e.target.files.length == 0) return
        let file = e.target.files[0]
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = async () => {
            console.log(reader.result)
            const file = [
                {
                    "data": reader.result,
                    "productId": 1
                }
            ]
            const response = await imageUploadAPI(file)
            console.log(response);
        }
    }

    const fetchProductTest = async e => {
        const response = await fetchAllProductAPI();
        console.log(response)
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
            <input accept=".jpg" type="file" onChange={testUpload}></input>
            <button type="button" onClick={fetchProductTest}>Fetch Products</button>
        </div>
    )
}

export default HomePage;