

import { useState } from "react"
import { CATEGORIES_LIST_FOR_SIDEBAR } from "../../../const/options.list.const"
import "./sidebar.filter.css"
import { SizeFilterTool } from "./size.filter.tool"
import { ColorFilterTool } from "./colors.filter.tool"
import { BrandFilterTool } from "./brand.filter.tool"
import { FilterToolPriceRange } from "./price.filter.tool"
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
            return (
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
                <FilterToolBar />
            </div>
        </div>
    )
}

const FilterToolBar = props => {
    const [activeState, setActiveState] = useState("size")

    const setActive = (tool) => {
        return e => {
            setActiveState(tool)
        }
    }

    const activeStyle = (tool) => {
        return e => {
            if (tool === activeState)
                return "product__sidebar-active"
            else
                return ""
        }
    }

    return (
        <div className="product__sidebar-filter">
            <FilterToolLabel
                setActive={setActive("size")}
                activeStyle={activeStyle("size")} >
                Size
            </FilterToolLabel>
            {
                activeState === "size"
                    ?
                    <SizeFilterTool />
                    :
                    null
            }
            <FilterToolLabel
                setActive={setActive("color")}
                activeStyle={activeStyle("color")} >
                Color
            </FilterToolLabel>
            {
                activeState === "color"
                    ?
                    <ColorFilterTool />
                    :
                    null
            }
            <FilterToolLabel
                setActive={setActive("brand")}
                activeStyle={activeStyle("brand")} >
                Brand
            </FilterToolLabel>
            {
                activeState === "brand"
                    ?
                    <BrandFilterTool />
                    :
                    null
            }
            <FilterToolLabel
                setActive={setActive("price")}
                activeStyle={activeStyle("price")}>
                Price
            </FilterToolLabel>
            {
                activeState === "price"
                    ?
                    <FilterToolPriceRange />
                    :
                    null
            }
            <FilterToolLabel
                setActive={setActive("available")}
                activeStyle={activeStyle("available")}>
                Available
            </FilterToolLabel>
        </div>
    )
}


const FilterToolLabel = props => {
    const onClick = e => {
        if (props.setActive)
            props.setActive()
        else return
    }

    const activeStyle = () => {
        if (props.activeStyle)
            return props.activeStyle()
        return ""
    }

    return (
        <div onClick={onClick} className={`product__sidebar-filter-dropdown ${activeStyle()}`}>
            {props.children}
            <img
                className="product__sidebar-filter-dropdown-icon"
                src={process.env.PUBLIC_URL + "images/arrow.svg"} />
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
