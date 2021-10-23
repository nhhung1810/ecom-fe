
export const CartSummary = props => {
    
    return (
        <div className="cart__body-summary">
            <div className="cart__body-summary-header">Total</div>
            <div className="cart__body-summary-card">
                <div className="cart__body-summary-text">
                    <span>Shipping & Handling:</span>
                    <span className="cart__body-summary-right">Free</span>
                </div>
                <div className="cart__body-summary-text">
                    <span>Total product:</span>
                    <span className="cart__body-summary-right">${props.total()}</span>
                </div>
                <div className="cart__table-line margin-up" />
                <div className="cart__body-summary-text text-bolder">
                    <span>Subtotal</span>
                    <span className="cart__body-summary-right">${props.total()}</span>
                </div>
            </div>
            <button
                type="button"
                onClick={props.onSubmit} 
                className="cart__body-check-out-button">
                Check out
            </button>
        </div>
    )
}