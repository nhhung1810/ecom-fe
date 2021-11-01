
import { useHistory } from "react-router-dom"
import { SORT_PRODUCT_LIST } from "../../../const/options.list.const"
import { SortProductList } from "./custom.select.sort"
export const MainView = props => {
    const generateProductCard = () => {
        return props.data.map(element => {
            return (
                <ProductCard
                    remain={element.remain}
                    key={element.id}
                    id={element.id}
                    image={element.img}
                    name={element.name}
                    price={element.price}
                    mainCtg={element.mainCtg}
                    subStg={element.subStg}
                />
            )
        })
    }

    const onChange = value => {
        if (props.onSortChange)
            props.onSortChange(value)
        return
    }

    return (
        <div className="product__mainview">
            <div className="product__mainview-header-container">
                <div className="product__mainview-sort-button">
                    <SortProductList
                        placeholder="Sort"
                        options={SORT_PRODUCT_LIST}
                        onChange={onChange}
                    />
                </div>
                {
                    props.data !== null && props.data.length > 0 ?
                        <CustomPaging 
                            limit={props.limit}
                            offset={props.offset}
                            maxPage={props.maxPage}
                            count={props.count}
                            handlePagingChange={props.handlePagingChange}
                        />
                        : 
                        null
                }
            </div>
            {
                props.data !== null && props.data.length > 0 ?
                    <div className="product__mainview-body-container">
                        {generateProductCard()}
                    </div>
                    :
                    <div className="product__mainview-no-result">
                        No result found
                    </div>
            }
            <div className="product__mainview-footer-container">

            </div>
        </div>
    )
}

const CustomPaging = props => {

    const handlePrev = e => {
        if(props.offset === 0) return
        props.handlePagingChange(
            props.limit, 
            props.offset - props.limit,
            props.maxPage,
            props.count
        )
        console.log("Here")
    }

    const handleNext = e => {
        if(props.offset + props.limit >= props.count) return
        props.handlePagingChange(
            props.limit, 
            props.offset + props.limit,
            props.maxPage,
            props.count
        )
        console.log("Here")
    }

    return (
        <div className="product__mainview-paging">
            <img
                onClick={handlePrev}
                className="product__mainview-paging-prev"
                src={process.env.PUBLIC_URL + "/images/arrow.svg"}
            />
            <span className="product__mainview-paging-number">
                {props.offset + 1} / {props.count}
            </span>
            <img
                onClick={handleNext}
                className="product__mainview-paging-next"
                src={process.env.PUBLIC_URL + "/images/arrow.svg"}
            />
        </div>
    )
}

const ProductCard = props => {
    const history = useHistory()

    const toProductInfo = () => {
        if (props.remain === 0)
            return
        const params = {
            // TODO: CHANGE THIS AFTER APPLIED THE API
            id: props.id,
            mc: props.mainCtg,
            sc: props.subStg
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
                    src={props.image} />
                {
                    props.remain === 0
                        ?
                        <div className="product__card-sold-out">Sold out</div>
                        :
                        <button className="product__card-hover">+ Quick shop</button>
                }
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
