import { LeftSideImage } from "./info.left.images"
import { MainInfo } from "./info.main.info"
import "./info.body.css"
import { useEffect, useState } from "react"
import { getRandomProduct } from "../../../api/product.api"
import { formatImages } from "../../../utilities/dash.product.utils"
import { MAIN_CATEGORIES_LIST } from "../../../const/options.list.const"
import { Link, useHistory } from "react-router-dom"


export const InfoBody = props => {
    const [mainImage, setMainImage] = useState(0)

    const onChangeMainImage = (index) => {
        return (e) => {
            setMainImage(index)
        }
    }

    const generateSideImage = () => {
        let tmp = props.data.imgs.map((e, index) => {
            if (index === mainImage)
                return (
                    <LeftSideImage
                        key={index}
                        onChangeMainImage={onChangeMainImage(index)}
                        src={e}
                    />
                )
            else return undefined
        }).filter(e => e !== undefined)
        return tmp
    }

    const generateMainImage = () => {
        return (
            <img
                alt="info"
                className="info__main-image"
                src={props.data.imgs[mainImage % 5]} />
        )
    }

    return (
        <div className="info__body">
            <div className="info__left-images-container">
                {generateSideImage()}
            </div>
            <div className="info__main-image-container">
                {generateMainImage()}
            </div>
            <MainInfo
                id={props.data.id}
                pname={props.data.name}
                colors={props.data.colors}
                description={props.data.description}
                price={props.data.price}
                sizes={props.data.sizes}
                capacity={props.data.capacity}
                img={props.data.imgs[0]}
                remain={props.data.remain}
            />
            <div className="info__right-images-container">
                <div className="info__right-images-more">
                More from
                </div>
                <div className="info__right-images-more-brand">
                Zara
                </div>
                <SuggestionAnotherProduct />
            </div>
        </div>
    )
}

const SuggestionAnotherProduct = props => {
    const [data, setData] = useState([])
    const [busy, setBusy] = useState(true)
    const history = useHistory()
    useEffect(() => {
        let mounted = true
        getRandomProduct().then(response => {
            if (!mounted) throw response
            if (!response) throw response
            if (!response.data) throw response
            if (response.data.length === 0) throw response

            let data = response.data.map(e => {
                let mainCtg = e.categories
                let mainCtgParam = ""
                if (MAIN_CATEGORIES_LIST.findIndex(e =>
                    e.value === mainCtg[0]) !== -1)
                    mainCtgParam = mainCtg[0]
                else if (MAIN_CATEGORIES_LIST.findIndex(e =>
                    e.value === mainCtg[1]) !== -1)
                    mainCtgParam = mainCtg[1]

                return {
                    id: e.id,
                    mc: mainCtgParam
                }
            })
            setBusy(false)
            setData(data)

        }).catch(error => {
            console.log(error)
        })


    }, [])

    const generateRandomImage = () => {
        return data.map(e => {
            let param = new URLSearchParams(e)
            console.log(param.toString())
            return (
                <Link to={"/info?" + param.toString()}>
                    <img
                        className="info__right-images"
                        alt="random"
                        src={formatImages(e.id)} />
                </Link>
            )
        })
    }

    return (
        <>
            {
                busy ? null : generateRandomImage()
            }
        </>
    )
}
