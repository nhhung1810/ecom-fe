import { LeftSideImage } from "./info.left.images"
import { MainInfo } from "./info.main.info"
import "./info.body.css"
import { useState } from "react"

export const InfoBody = props => {
    const [mainImage, setMainImage] = useState(0) 

    const onChangeMainImage = (index) => {
        return (e) => {
            setMainImage(index)
        }
    }

    const generateSideImage = () =>{
        let tmp = props.data.imgs.map((e, index) => {
            if(index != mainImage)
                return(
                    <LeftSideImage 
                        key={index}
                        onChangeMainImage={onChangeMainImage(index)}
                        src={e}
                    />
                )
        }).filter(e => e != undefined)
        return tmp
    }

    const generateMainImage = () =>{
        return (
            <img className="info__main-image" 
            src={props.data.imgs[mainImage%5]}/>
        )
    }

    return (
        <div className="info__body">
            <div className="info__left-images-container">
                { generateSideImage() }
            </div>
            <div className="info__main-image-container">
                { generateMainImage() }
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
            />
            <div className="info__right-images-container"></div>
        </div>
    )
}
