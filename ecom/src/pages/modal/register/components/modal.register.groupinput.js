export const GroupInputRegister = props => {
    return (
        <div className="input-group">
            <div className="input-label"> {props.label} </div>
            <div className="input-container">
                <input onChange={props.handleChange} className={props.styling}
                    type={props.type} placeholder={props.placeholder}></input>
            </div>
        </div>
    )
}
