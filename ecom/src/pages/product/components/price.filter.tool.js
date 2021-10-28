import Slider from "@mui/material/Slider"
import { useDispatch, useSelector } from "react-redux"
import { changePriceRange, selectPriceRangeFilter } from "../../../redux/product.filter.redux"

export const FilterToolPriceRange = props => {
    const dispatch = useDispatch()
    let priceRange = useSelector(selectPriceRangeFilter)  

    const handleChange = (e) => {
        console.log(e.target.value)
        dispatch(changePriceRange(e.target.value))
    }
    
    const formatText = (value) => {
        return `$${value}`
    }

    return (
        <div className="product__sidebar-filter-price">
            <Slider
                getAriaLabel={() => 'Get Price Range'}
                onChange={e => handleChange(e)}
                valueLabelFormat={formatText}
                valueLabelDisplay="auto"
                value={priceRange}
                min={0}
                max={10000}
                step={1000}
                disableSwap
                sx ={{
                    color: "#ffa15f",
                }}
            />
        </div>
    )
}

