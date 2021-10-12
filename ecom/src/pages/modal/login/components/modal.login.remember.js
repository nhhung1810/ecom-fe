export const RememberAndForgot = props => {
    return (
        <div className="modal__remember-block">
            <label className="control control-checkbox">
                Remember password
                <input type="checkbox" className="inline-checkbox" onChange={props.handleChange} defaultChecked={props.default} />
                <span className="control_indicator"></span>
            </label>
            <span className="modal__forgot-password">
                Forgot your password?
            </span>
        </div>
    )
}