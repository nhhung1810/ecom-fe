
import Register from "./../../pages/modal/register/modal.register"
import Login from "./../../pages/modal/login/modal.login"
import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { signout } from "../../redux/auth.redux"
import { signoutAPI } from "../../api/auth.api"
import { useState } from "react"

export const AuthenticatedGroup = props => {
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

export const UnauthenticatedGroup = props => {
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
