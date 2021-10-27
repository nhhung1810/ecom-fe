import { useDispatch, useSelector } from "react-redux"
import { ColorButton } from "../../../components"
import { COLORS_LIST } from "../../../const/options.list.const"
import { addColorsFilter, removeColorsFilter, selectColorFilter } from "../../../redux/product.filter.redux"

export const ColorFilterTool = props => {
    const dispatch = useDispatch()
    let chosenColors = useSelector(selectColorFilter)
    console.log(chosenColors);

    const activeStyling = color => {
        try {
            if(chosenColors.findIndex(data => data === color) != -1)
                return "active"
        } catch (error) {
            console.log(error);
        }
        return ""
    }

    const onColorChosen = color => {
        return e => {
            try {
                if(chosenColors.findIndex(data => data === color) != -1)
                    dispatch(removeColorsFilter(color))
                else
                    dispatch(addColorsFilter(color))
            } catch (error) {
                console.log(error);
            }
        }
    }

    const generateColorsButton = () => {
        return COLORS_LIST.map(e => {
            return(
                <ColorButton
                    key={e.value}
                    onChange={onColorChosen(e.value)}
                    activeStyling={activeStyling(e.value)}
                    color={e.value}
                />
            )
        })
    }

    return (
        <div className='product__sidebar-filter-color'>
            {generateColorsButton()}
        </div>
    )
}
