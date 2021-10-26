

import { CATEGORIES_LIST_FOR_SIDEBAR } from "../../../const/options.list.const"

// SIDEBAR
export const SideBar = props => {

    const activeStyling = (ctg) => {
        return () => {
            if (props.activeSideCard === ctg)
                return "product__active"
            else
                return ""
        }
    }

    const generateSideCard = () => {
        return CATEGORIES_LIST_FOR_SIDEBAR.map(e => {
            return(
                <SideCard
                    key={e.value} 
                    activeStyling={activeStyling(e.value)}
                    onChange={props.onChange(e.value)}>
                    {e.label}
                </SideCard>
            )
        })
    }

    return (
        <div className="product__sidebar">
            <div className="product__sidebar-padding-left">
            <div className="product__sidebar-title">Category</div>
            <SideCard
                activeStyling={activeStyling(null)} 
                onChange={props.onChange(null)}>
                All Dresses
            </SideCard>
            {generateSideCard()}
            <div className="product__sidebar-line"></div>
            <div className="product__sidebar-title">Filter</div>
            <FilterToolBar/>
            </div>
        </div>
    )
}

const FilterToolBar = props => {
    return (
        <div className="product__sidebar-filter">
            
        </div>
    )
}

const SideCard = props => {
    return (
        <div
            onClick={e => props.onChange()}
            className={`product__sidecard ${props.activeStyling()}`}>
            {props.children}
            <div className={`product__sidecard-line ${props.activeStyling()}`}></div>
        </div>
    )
}
