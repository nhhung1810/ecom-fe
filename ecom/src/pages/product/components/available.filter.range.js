import { CustomCheckBox } from "../../../components"
import { useDispatch, useSelector } from "react-redux"
import { addAvailableFilter, removeAvailableFilter, selectAvailableFilter } from "../../../redux/product.filter.redux"


export const AvailableFilterRange = props => {
    const dispatch = useDispatch()
    let chosenAvailable = useSelector(selectAvailableFilter) 

    const onChange = data => {
        return e => {
            if(chosenAvailable.findIndex(e => e === data) !== -1)
                dispatch(removeAvailableFilter(data))
            else 
                dispatch(addAvailableFilter(data))
        }
            
    }

    const activeStyling = (data) =>{
        if(chosenAvailable.findIndex(e => e === data) !== -1)
            return "active"
        else 
            return ""
    }

    const isChecked = (data) => {
        if(chosenAvailable.findIndex(e => e === data) !== -1)
            return true
        else 
            return false
    }

    return (
        <div className="product__sidebar-filter-available">
            <div className="product__sidebar-filter-available-container">
                <div className={activeStyling("in")}>In-store</div>
                <div>
                    <CustomCheckBox
                        handleChange={onChange("in")}
                        default={isChecked("in")}
                    />
                </div>
            </div>
            <div className="product__sidebar-filter-available-container">
                <div className={activeStyling("out")}>Out of stock</div>
                <div>
                    <CustomCheckBox
                        handleChange={onChange("out")}
                        default={isChecked("out")}
                    />
                </div>
            </div>
        </div>
    )
}