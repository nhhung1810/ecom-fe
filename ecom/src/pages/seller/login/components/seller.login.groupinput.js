export const DashboardLoginGroupInput = props => {
    return (
        <div className="dash-input-group">
            <div className="dash-input-label"> {props.label} </div>
            <div className="dash-input-container">
                <input onChange={props.handleChange} className={props.styling}
                    type={props.type} placeholder={props.placeholder}></input>
            </div>
        </div>
    )
}