import React from "react";
import './popup.css'

const Register = props => {
    return (
        <div className="popup-register">
            <div className="box">
                <span className="close-icon" onClick={props.handleClose}>x</span>
                <div>
                    <span class="Register">
                        Register
                    </span>
                    <div>
                        <div>
                            <span class="e-mail Text-Style-5">
                                Name
                            </span>
                            <input placeholder="Enter your name"></input>
                        </div>
                        
                        <div>
                            <span class="e-mail Text-Style-5">
                                Email
                            </span>
                            <input placeholder="Enter your name"></input>
                        </div>

                        <div>
                            <span class="e-mail Text-Style-5">
                                Password
                            </span>
                            <input placeholder="Enter your name"></input>
                        </div>
                    </div>
                </div>
                {props.content}
            </div>
        </div>
    )
}

export default Register;