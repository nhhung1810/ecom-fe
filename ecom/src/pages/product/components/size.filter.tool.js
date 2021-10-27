import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { 
    selectSizesFilter, 
    addSizesFilter, 
    removeSizesFilter 
} from "../../../redux/product.filter.redux"
import { SIZE_LIST } from "../../../const/options.list.const"

export const SizeFilterTool = props => {
    const dispatch = useDispatch()
    let chosenSizes = useSelector(selectSizesFilter)

    const handleChange = size => {
        return e => {
            try {
                if (chosenSizes.findIndex(e => e === size) != -1)
                    dispatch(removeSizesFilter(size))
                else
                    dispatch(addSizesFilter(size))    
            } catch (error) {
                console.log(error);
            }
        }
    }

    const activeStyling = size => {
        try {
            if (chosenSizes.findIndex(e => e === size) != -1)
                return "product__size-active"
            else
                return ""    
        } catch (error) {
            console.log(error);
            return ""
        }
    }

    const generateSizeButton = () => {
        let result = SIZE_LIST.map(e => {
            return (
                <button
                    key={e.value}
                    className={activeStyling(e.value)}
                    onClick={handleChange(e.value)}>
                    {e.label}
                </button>
            )
        })
        return result
    }

    return (
        <div className="product__sidebar-filter-size">
            {generateSizeButton()}
        </div>
    )
}
