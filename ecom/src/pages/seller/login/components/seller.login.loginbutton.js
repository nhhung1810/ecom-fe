export const DashboardLoginButton = props => {
    return (
        <div className="dash-login-button-container">
            <div className="dash-center-button">
                <button className={props.styling} type="submit">
                    <span className="dash-login-button-text">Log in</span>
                </button>
            </div>
        </div>
    )
}