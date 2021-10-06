import React from "react";
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import "./index.css"

import Register from "../authentication/popupRegister.js";
import Login from "../authentication/popupLogin.js"

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isRegisterOpen: false,
            isLoginOpen: false,
        }
    }

    toggleRegisterPopup = () => {
        // console.log(this);
        let reg = this.state.isRegisterOpen;
        // let log = this.state.isLoginOpen;
        this.setState({ isRegisterOpen: !reg });
        if (this.state.isLoginOpen) this.setState({ isLoginOpen: false });
        return;
    }

    toggleLoginPopup = () => {
        // let reg = this.state.isRegisterOpen;
        let log = this.state.isLoginOpen;
        if (this.state.isRegisterOpen)
            this.setState({ isRegisterOpen: false });
        this.setState({ isLoginOpen: !log });
        return;
    }

    loginToRegister = () => {
        let log = this.state.isLoginOpen;
        if (!log) this.toggleRegisterPopup();
        else {
            this.setState({ isLoginOpen: false });
            this.setState({ isRegisterOpen: true });
        }
    }

    registerToLogin = () => {
        let reg = this.state.isRegisterOpen;
        if (!reg) this.toggleRegisterPopup();
        else {
            this.setState({ isLoginOpen: true });
            this.setState({ isRegisterOpen: false });
        }
    }

    render() {

        return (
                <div>
                    <button type="button" onClick={this.toggleRegisterPopup}>Register</button>
                    {
                        this.state.isRegisterOpen && <Register handleClose={this.toggleRegisterPopup} handleChange={this.registerToLogin} />
                    }
                    <button type="button" onClick={this.toggleLoginPopup}>Login</button>
                    {
                        this.state.isLoginOpen && <Login handleClose={this.toggleLoginPopup} handleChange={this.loginToRegister} />
                    }
                    <Link to="/dashboard"><button type='button'>Seller Dashboard</button></Link>
                    {/* <p className="fill-page"><object data="./images/text.txt" className="fill-page"></object></p>
                    <p className="fill-page"><object data="./images/text.txt" className="fill-page"></object></p>
                    <p className="fill-page"><object data="./images/text.txt" className="fill-page"></object></p>
                    <p className="fill-page"><object data="./images/text.txt" className="fill-page"></object></p>
                    <p className="fill-page"><object data="./images/text.txt" className="fill-page"></object></p>
                    <p className="fill-page"><object data="./images/text.txt" className="fill-page"></object></p> */}
                </div>  
        )
    }
}

export default HomePage;