import { useHistory } from "react-router"
import { CATEGORIES_LIST_FOR_SIDEBAR } from "../../../const/options.list.const"

// SIDEBAR
const SideBar = props => {

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
        <div className="product__sidebar-filter"></div>
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

// MAINVIEW

const MainView = props => {
    const generateProductCard = () => {
        if(props.data === null){
            return
        }
        return props.data.map(element => {
            return (
                <ProductCard
                    key={element.id}
                    id={element.id}
                    image={element.img}
                    name={element.name}
                    price={element.price}
                />
            )
        })
    } 

    return (
        <div className="product__mainview">
            <div className="product__mainview-header-container">
                <button className="product__mainview-sort-button">Sort by: <b>Popularity</b></button>
            </div>
            <div className="product__mainview-body-container">
                {generateProductCard()}
            </div>
            <div className="product__mainview-footer-container">

            </div>
        </div>
    )
}

const ProductCard = props => {
    const history = useHistory()
    
    const toProductInfo = () =>{
        const params = {
            // TODO: CHANGE THIS AFTER APPLIED THE API
            id : props.id
        }
        const query = new URLSearchParams(params)
        history.push("/info?" + query.toString())
    }
    return (
        <div className="product__card">
            <div onClick={toProductInfo} className="product__card-image">
                <img 
                    alt="card"
                    className="product__card-image-size" 
                    src={props.image}></img>
                <button className="product__card-hover">+ Quick shop</button>
            </div>
            <div className="product__card-name">
                {props.name}
            </div>
            <div className="product__card-price">
                ${props.price}
            </div>
        </div>
    )
}

export {SideBar, MainView}