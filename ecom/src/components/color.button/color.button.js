import { COLORS } from "../../const/colors.const"
import "./color.button.css" 

export const ColorButton = props => {
    console.log(props.color)
    let color = props.color
    if (!(color in COLORS))
        color = "red"

    const handleChange = e => {
        if(props.onChange !== undefined)
            return props.onChange
        else return () => {return}
    }

    const activeStyling = () => {
        if(props.activeStyling !== undefined)
            return props.activeStyling
        else return ""
    }

    return (
        <button
            type="button"
            onClick={handleChange}
            className={`info__info-colors-button ${activeStyling}`}
            style={{ backgroundColor: COLORS[color] }}
        ></button>
    )
}