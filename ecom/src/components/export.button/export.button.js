
import "./export.button.css"

export const ExportButton = props => {
    return (
        <button className="export__button">
            <img
                className="export__button-icon" 
                src={process.env.PUBLIC_URL + "/images/export-orange.svg"}></img>
            Export
        </button>
    )
}