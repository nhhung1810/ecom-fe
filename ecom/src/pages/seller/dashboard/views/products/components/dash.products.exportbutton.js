export const ProductExportButton = props => {
    return (
        <button className="products__export-button">
            <img
                src={process.env.PUBLIC_URL + "/images/export-orange.svg"}
                className="products__plus-sym" />
            <span className="products__add-button-text">Export</span>
        </button>
    )
}