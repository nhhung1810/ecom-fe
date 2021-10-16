import { Link } from "react-router-dom"

export const AddSubmitButton = props => {
    return (
        <div className="add__button-container">
            <Link to="/dashboard/product">
                <button className="add__button-cancel">
                    Cancel
                </button>
            </Link>
            <button 
                type="submit"
                className="add__button-complete">
                    Complete
            </button>
        </div>
    )
}