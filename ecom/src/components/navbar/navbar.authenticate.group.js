
import Register from "./../../pages/modal/register/modal.register"
import Login from "./../../pages/modal/login/modal.login"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { signout } from "../../redux/auth.redux"
import { signoutAPI } from "../../api/auth.api"
import { useState } from "react"
import { useHistory } from "react-router-dom"
import { selectAllProduct } from "../../redux/cart.redux"
import { Avatar } from ".."


export const AuthenticatedGroup = props => {
    const dispatch = useDispatch()
    const logout = async () => {
        const response = await signoutAPI();
        if (response) dispatch(signout())
    }

    return (
        <>
            <span className="navbar__align-avatar">
                <Avatar onSignout={logout}/>
                <CartIcon />
            </span>
        </>
    )
}

{/* <Link to="/logindash"><button type="button">Login Dash</button></Link> */}

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
        if (!isRegisterOpen) toggleLoginPopup();
        else {
            setIsLoginOpen(true)
            setIsRegisterOpen(false)
        }
        console.log(isRegisterOpen)
    }

    const handleCartToLogin = e => {
        toggleLoginPopup()
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
            <CartIcon handleCartToLogin={handleCartToLogin} />
        </>
    )
}

const CartIcon = props => {
    let product = useSelector(selectAllProduct);
    const history = useHistory()

    const handleRedirect = e => {
        if (props.handleCartToLogin != null)
            props.handleCartToLogin()
        else
            history.push("/cart")
    }
    return (
        <span className="navbar__right-shopping-cart">
            <img
                onClick={handleRedirect}
                src={process.env.PUBLIC_URL + "/images/cart.svg"}
                alt="cart">
            </img>
            {
                product.length > 0
                    ?
                    <div className="navbar__right-shopping-cart-count">
                        {product.length}
                    </div>
                    :
                    null
            }
        </span>
    )
}