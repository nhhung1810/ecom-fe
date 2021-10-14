import "./table.css"
import { ProductTableHeader, ProductTableBody } from "./components"

export const ProductTable = props => {
    return (
        <div className="table__component">
            <ProductTableHeader />
            <ProductTableBody />
        </div>
    )
}
