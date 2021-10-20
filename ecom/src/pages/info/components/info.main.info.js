
import { RatingGroup } from "./info.rating.group"
import { useState } from "react"
import { COLORS } from "../../../config/colors.const"

export const MainInfo = props => {
    const [size, setSize] = useState(0)
    // TODO: MERGE WITH BE
    const [inactiveSizeList, setInactiveSizeList] = useState([2])

    const sizeButtonStyling = (index) => {
        if (inactiveSizeList.find(e => e == index))
            return "inactive"
        if (index == size)
            return "chosen"
    }

    const setActiveSize = (index) => {
        if (inactiveSizeList.find(e => e == index))
            return
        else setSize(index)
    }

    // COLOR BUTTON GENERATOR


    return (
        <div className="info__info-container">
            <div className="info__info-title">{props.pname}</div>
            <div className="info__info-price">$69.00</div>
            <RatingGroup />
            <div className="info__info-size">
                <div>Size</div>
                <button
                    className={`${sizeButtonStyling(0)} info__info-size-button`}
                    onClick={e => setActiveSize(0)}>S</button>
                <button
                    className={`${sizeButtonStyling(1)} info__info-size-button`}
                    onClick={e => setActiveSize(1)}>M</button>
                <button
                    className={`${sizeButtonStyling(2)} info__info-size-button`}
                    onClick={e => setActiveSize(2)}>L</button>
            </div>
            <ColorGroup colors={props.colors} />
            <QuantityButton />
            <button className="info__info-submit-button">Add to cart</button>
            <div className="info__info-horizontal-line"/>
            <div className="info__info-desc">
                {props.description}
            </div>  
        </div>
    )
}

const ColorGroup = props => {
    const generateColorButton = () => {
        const cleanedColor = props.colors.filter(e =>
            COLORS[e] != undefined
        )
        if (cleanedColor.length > 0) {
            return cleanedColor.map(e => {
                return (
                    <ColorButton color={e} />
                )
            })
        } else {
            return (
                <ColorButton color="red" />
            )
        }
    }

    return (
        <div className="info__info-colors">
            <div className="info__info-colors-text">Colors</div>
            <div className="info__info-colors-button-row">
                {generateColorButton()}
            </div>
        </div>
    )
}

const ColorButton = props => {
    let color = props.color
    // VALIDATE THE COLOR PROPS
    if (!(color in COLORS))
        color = "red"

    return (
        <button
            className="info__info-colors-button"
            style={{ backgroundColor: COLORS[color] }}
        ></button>
    )
}

const QuantityButton = props => {
    return (
        <div className="info__info-quantity">
            <span className="info__info-quantity-text">Quantity</span>
            <span className="info__info-quantity-button">
                <button className="info__info-quantity-button-down">&ndash;</button>
                <button className="info__info-quantity-button-number" disabled>3</button>
                <button className="info__info-quantity-button-up">+</button>
            </span>
        </div>
    )
}