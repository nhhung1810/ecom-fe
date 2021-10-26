import React from "react"
import { Link } from "react-router-dom"
import "./footer.css"

export const Footer = props => {
    return (
        <div className="footer__">
            <div className="footer__container">
                <div className="footer__first-row">
                    <div className="footer__first-row-logo">
                        <img src={process.env.PUBLIC_URL + "/images/logo.svg"} alt="logo" />
                    </div>
                    <FooterFirstRowLink />
                    <div className="footer__first-row-social">
                        <img src={process.env.PUBLIC_URL + "/images/twitter.svg"} />
                        <img src={process.env.PUBLIC_URL + "/images/facebook.svg"} />
                        <img src={process.env.PUBLIC_URL + "/images/instagram.svg"} />
                    </div>
                </div>
                <div className="footer__second-row">
                    <FooterSecondRowLink/>
                    <div className="footer__second-row-blank" />
                    <div className="footer__second-row-term">
                        <span className="footer__second-row-term-text">
                            <Link to="/">Terms & Conditions</Link>
                        </span>
                        <span className="footer__second-row-term-text">
                            <Link to="/">Privacy Policy</Link>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

const FooterFirstRowLink = props => {
    return (
        <>
            <span className="footer__first-row-link">
                <Link to="/">Home</Link>
            </span>
            <span className="footer__first-row-link">
                <Link to="/logindash">Products</Link>
            </span>
            <span className="footer__first-row-link">
                <Link to="/">Services</Link>
            </span>
            <span className="footer__first-row-link">
                <Link to="/">About us</Link>
            </span>
            <span className="footer__first-row-link">
                <Link to="/">Help</Link>
            </span>
            <span className="footer__first-row-link">
                <Link to="/">Contacts</Link>
            </span>
        </>
    )
}

const FooterSecondRowLink = props => {
    return (
        <>
            <span className="footer__second-row-link footer__flex-home">
                <Link to="/">Home</Link>
            </span>
            <span className="footer__second-row-link footer__align-center">
                <Link to="/logindash">Products</Link>
            </span>
            <span className="footer__second-row-link footer__align-center">
                <Link to="/">Services</Link>
            </span>
            <span className="footer__second-row-link footer__align-center">
                <Link to="/">About us</Link>
            </span>
            <span className="footer__second-row-link footer__align-center">
                <Link to="/">Help</Link>
            </span>
            <span className="footer__second-row-link">
                <Link to="/">Contacts</Link>
            </span>
        </>
    )
}

