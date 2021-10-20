import { useHistory } from "react-router"

const SideBar = props => {
    return (
        <div className="product__sidebar">
            <div className="product__sidebar-padding-left">
            <SideCategory></SideCategory>
            </div>
        </div>
    )
}

const SideCategory = props => {
    return (
        <>
            <div className="product__sidebar-title">Category</div>
            <SideCard>All Dresses</SideCard>
            <SideCard>Rompers / Jumpsuits</SideCard>
            <SideCard>Casual Dresses</SideCard>
            <SideCard>Going out dresses</SideCard>
            <SideCard>Party / Occasion dresses</SideCard>
            <SideCard>Mini Dresses</SideCard>
            <SideCard>Maxi / Midi dresses</SideCard>
            <SideCard>Sets</SideCard>
        </>
    )
}

const SideCard = props => {
    return (
        <div className="product__sidecard">
            {props.children}
            <div className="product__sidecard-line"></div>
        </div>
    )
}

const MainView = props => {
    return (
        <div className="product__mainview">
            <div className="product__mainview-header-container">
                <button className="product__mainview-sort-button">Sort by: <b>Popularity</b></button>
            </div>
            <div className="product__mainview-body-container">
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
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
            id : 1
        }
        const query = new URLSearchParams(params)
        history.push("/info" + "?" + query.toString())
    }
    return (
        <div className="product__card">
            <div onClick={toProductInfo} className="product__card-image">
                <img className="product__card-image-size" src={process.env.PUBLIC_URL + "images/product-image-card.jpg"}></img>
                <button className="product__card-hover">+ Quick shop</button>
            </div>
            <div className="product__card-name">
                Collete Stretch Linen Minidress
            </div>
            <div className="product__card-price">
                $69.00
            </div>
        </div>
    )
}

const Footer = props => {
    return (
        <></>
    )
}

export {Footer, SideBar, MainView}