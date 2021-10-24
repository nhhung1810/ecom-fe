import {SearchInput, ExportButton} from "./../../../../../../components/index"
export const OrderToolBar = props => {
    return (
        <div className="order__toolbar">
            <div className="order__toolbar-text">
                ORDERED DATE
            </div>
            <button className="order__toolbar-date" disabled>
                01/08/2018 - 31/08/2018
                <img 
                    alt="calendar icon" 
                    className="order__toolbar-date-calendar" src={process.env.PUBLIC_URL + "/images/calendar.svg"}></img>
            </button>
            <button className="order__toolbar-today">Today</button>
            <button className="order__toolbar-yesterday">Yesterday</button>
            <div className="order__toolbar-align-right">
                <span className="order__toolbar-search">
                    <SearchInput
                        placeholder={"Search order"} />
                </span>
                <span className="order__toolbar-export">
                    <ExportButton />
                </span>
            </div>
        </div>
    )
}