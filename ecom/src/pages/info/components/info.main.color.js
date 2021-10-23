
import { COLORS } from "../../../const/colors.const"
import { ColorButton } from "../../../components"

export const ColorGroup = props => {
    const handleChooseColor = color => {
        return e => {
            e.preventDefault()
            props.onChange(color)
        }
    }

    const activeStyling = (colors) => {
        if (props.chosenColor == colors)
            return "active"
        else
            return ""
    }

    const generateColorButton = () => {
        const cleanedColor = props.colors.filter(e =>
            COLORS[e] != undefined
        )
        if (cleanedColor.length > 0) {
            return cleanedColor.map(e => {
                return (
                    <span key={e} className="info__info-colors-button-margin">
                        <ColorButton
                            activeStyling={activeStyling(e)}
                            onChange={handleChooseColor(e)}
                            color={e} />
                    </span>
                )
            })
        } else {
            return (
                <ColorButton color="red" />
            )
        }
    }

    return (
        <div className="info__info-colors">
            <div className="info__info-colors-text">Colors</div>
            <div className="info__info-colors-button-row">
                {generateColorButton()}
            </div>
        </div>
    )
}