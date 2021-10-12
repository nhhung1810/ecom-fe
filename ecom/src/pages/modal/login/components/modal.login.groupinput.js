export const ModalLoginGroupInput = props => {
    return (
        <div className="modal__input-group">
            <div className="modal__input-label"> {props.label} </div>
            <div className="modal__input-container">
                <input onChange={props.handleChange} defaultValue={props.default}
                    className={props.styling} type={props.type} placeholder={props.placeholder}></input>
            </div>
        </div>
    )
}