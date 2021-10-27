import "./checkbox.css"

export const CustomCheckBox = props => {
    const handleChange = () => {
        if(props.handleChange !== undefined)
            props.handleChange()
        else
            return
    }

    return (
        <label className="control control-checkbox">
            {props.children}
            <input
                type="checkbox"
                className="inline-checkbox"
                onChange={handleChange}
                defaultChecked={props.default}
            />
            <span className="control_indicator"></span>
        </label>
    )
}