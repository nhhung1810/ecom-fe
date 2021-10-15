export  const AddDescriptionInput = props => {
    return (
        <div className="add__desc-container">
            <span className="add__desc-label">DESCRIPTION</span>
            <textarea onChange={props.handleChange} className="add__desc-input"></textarea>
        </div>
    )
}