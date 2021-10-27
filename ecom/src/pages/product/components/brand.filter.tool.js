
import { useDispatch, useSelector } from "react-redux"
import { CustomCheckBox } from "../../../components"
import { BRAND_LIST } from "../../../const/options.list.const"
import { 
    addBrandsFilter, 
    removeBrandsFilter, 
    selectBrandsFilter 
} from "../../../redux/product.filter.redux"


export const BrandFilterTool = props => {
    const dispatch = useDispatch()
    let chosenBrands = useSelector(selectBrandsFilter)
    console.log(chosenBrands)

    const activeStyling = (brand) => {
        if(chosenBrands.findIndex(e => e === brand) !== -1)
            return "product__sidebar-filter-active"
        else
            return ""
    }
    
    const onBrandChosen = brand => {
        return e => {
            if(chosenBrands.findIndex(e => e === brand) !== -1)
                dispatch(removeBrandsFilter(brand))
            else
                dispatch(addBrandsFilter(brand))
        }
    }

    const generateBrands = () => {
        return BRAND_LIST.map(e => {
            return(
                <div className="product__sidebar-filter-brand-align">
                    <div className={activeStyling()}>
                        {e.label}
                    </div>
                    <div>
                        <CustomCheckBox
                            handleChange={onBrandChosen(e.value)}
                        />
                    </div>
                </div>
            )
        })
    }    
    return (
        <div className="product__sidebar-filter-brands">
            {generateBrands()}
        </div>
    )
}