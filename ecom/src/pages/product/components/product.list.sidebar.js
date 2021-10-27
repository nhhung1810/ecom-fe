

import { useState } from "react"
import { CATEGORIES_LIST_FOR_SIDEBAR, COLORS_LIST, SIZE_LIST } from "../../../const/options.list.const"
import "./sidebar.filter.css"
import { selectColorFilter, removeColorsFilter, addColorsFilter } from "../../../redux/product.filter.redux"
import { useDispatch, useSelector } from "react-redux"
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
                activeStyle={activeStyle("color")}
            >
                Color
            </FilterToolLabel>
            <FilterToolLabel
                setActive={setActive("brand")}
                activeStyle={activeStyle("brand")}>
                Brand
            </FilterToolLabel>
            <FilterToolLabel
                setActive={setActive("price")}
                activeStyle={activeStyle("price")}>
                Price
            </FilterToolLabel>
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

const SizeFilterTool = props => {
    const dispatch = useDispatch()
    let chosenColors = useSelector(selectColorFilter)
    console.log(chosenColors)

    const handleChange = size => {
        return e => {
            if (chosenColors.findIndex(e =>  e === size) != -1)
                dispatch(removeColorsFilter(size))
            else
                dispatch(addColorsFilter(size))
        }
    }

    const activeStyling = size => {
        if (chosenColors.findIndex(e => e === size) != -1)
            return "product__size-active"
        else
            return ""
    }

    const generateSizeButton = () => {
        let result = SIZE_LIST.map(e => {
            return (
                <button
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
