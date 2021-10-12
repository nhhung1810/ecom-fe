export const LoginButton = props => {
    return (
        <div className="modal__login-button-container">
            <div className="modal__center-button">
                <button className={props.styling} type="submit">
                    <span className="modal__login-button-text">Login</span>
                </button>
            </div>
        </div>
    )
}