import { CustomCheckBox } from "../../../../components"

export const RememberAndForgot = props => {
    return (
        <div className="modal__remember-block">
            <CustomCheckBox
                handleChange={props.handleChange}
                default={props.default}
            >Remember me</CustomCheckBox>
            <span className="modal__forgot-password">
                Forgot your password?
            </span>
        </div>
    )
}