
import { useState } from "react"

export const SizeGroup = props => {
    const [size, setSize] = useState(0)
    // TODO: ADD INACTIVE FEATURES
    const [inactiveSizeList, setInactiveSizeList] = useState([-1])

    const sizeButtonStyling = (index) => {
        if (inactiveSizeList.find(e => e == index))
            return "inactive"
        if (index == size)
            return "chosen"
    }

    const setActiveSize = (e, index) => {
        if (inactiveSizeList.find(inactive => inactive == index))
            return
        else {
            props.onChange(e)
            setSize(index)
        }
    }

    const generateSizeButton = () => {
        return props.sizes.map((e, index) => {
            return (
                <button
                    type="button"
                    key={e}
                    className={`${sizeButtonStyling(index)} info__info-size-button`}
                    onClick={event => setActiveSize(e, index)}>
                    {e.toUpperCase()}
                </button>
            )
        })
    }

    return (
        <div className="info__info-size">
            <div>Size</div>
            {generateSizeButton()}
        </div>
    )
}