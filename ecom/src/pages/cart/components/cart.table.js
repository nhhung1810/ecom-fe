

import { CartTableRow } from "."
export const CartTable = props => {
    const generateTableRow = () => {
        if(props.data === undefined)
            return (
                <></>
            )
        return props.data.map(e => {
            return (
                <CartTableRow 
                    key={e.id}
                    id={e.id}
                    quantity={e.quantity}
                    name={e.name}
                    color={e.color}
                    size={e.size}
                    image={e.img}
                    price={e.price}
                    remain={e.remain} />
            )
        })
    }

    return (
        <div className="cart__body-table">
            <CartTableHeader />
            {generateTableRow()}
        </div>
    )
}

const CartTableHeader = props => {
    return (
        <div className="cart__body-header">
            <div className="cart__body-header-product">
                Product
            </div>
            <div className="cart__body-header-color">
                Color
            </div>
            <div className="cart__body-header-size">
                Size
            </div>
            <div className="cart__body-header-quantity">
                Quantity
            </div>
            <div className="cart__body-header-amount">
                Amount
            </div>
        </div>
    )
}