export const RegisterButton = props => {
    return (
        <div className="register-button-container">
            <div className="center-button">
                <button className={props.styling} type="submit">
                    <span className="register-button-text">Register</span>
                </button>
            </div>
        </div>
    )
}