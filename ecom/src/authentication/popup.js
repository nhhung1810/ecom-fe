import React from "react";
import './popup.css'

const Register = props => {
    return (
        <div className="popup-register">
            <div className="box">
                <div className="close-icon" onClick={props.handleClose}>
                    <img src="./images/cross.svg" alt="A cross"></img>
                </div>
                <div className="register-header">
                    Register
                </div>
                <form>
                    <div className="register-form">
                        <div className="input-group">
                            <div className="input-label"> Name </div>
                            <div className="input-container">
                                <input className="input-input" type="text" placeholder="Enter your name..."></input>
                            </div>

                        </div>

                        <div className="input-group">
                            <div className="input-label"> Email </div>
                            <div className="input-container">
                                <input className="input-input" type="text" placeholder="Enter your email..."></input>
                            </div>
                        </div>

                        <div className="input-group">
                            <div className="input-label"> Password </div>
                            <div className="input-container">
                                <input className="input-input" type="text" placeholder="Enter your password..."></input>
                            </div>
                        </div>
                    </div>
                </form>
                <div class="term-service">
                    By creating an account you agree to the <span class="text-link"> Terms of Service </span> and <span class="text-link"> Privacy Policy </span>
                </div>
                <div className="register-button-container">
                    <div className="center-button">
                        <button className="register-button">
                            <span className="register-button-text">Register</span>
                        </button>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default Register;