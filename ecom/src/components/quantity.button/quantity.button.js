import "./quantity.button.css"

export const QuantityButton = props => {

    const handleChange = (offset) => {
        if (props.onChange != undefined)
            return props.onChange(offset)
        else return () => { return }
    }

    const quantity = () => {
        if (props.quantity != undefined)
            return props.quantity
        else
            return 0
    }



    return (
        <span className="info__info-quantity-button">
            <button
                type="button"
                onClick={handleChange(-1)}
                className="info__info-quantity-button-down">&ndash;</button>
            <button
                type="button"
                className="info__info-quantity-button-number"
                disabled>
                {quantity()}
            </button>
            <button
                type="button"
                onClick={handleChange(1)}
                className="info__info-quantity-button-up">+</button>
        </span>
    )
}