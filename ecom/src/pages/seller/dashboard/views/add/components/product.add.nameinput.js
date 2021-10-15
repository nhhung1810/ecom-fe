export const AddNameInput = props => {
    return (
        <div className="add__name-container">
            <span className="add__name-label">NAME</span>
            <input onChange={props.handleChange} className="add__name-input" type="text"></input>
        </div>
    )
}