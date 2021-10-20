import { LeftSideImage } from "./info.left.images"
import { MainInfo } from "./info.main.info"
import "./info.body.css"
import { useState } from "react"

export const InfoBody = props => {
    const [mainImage, setMainImage] = useState(0) 
    console.log(props.data)

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
                pname={props.data.name}
                colors={props.data.colors}
                description={props.data.description}
            />
            <div className="info__right-images-container"></div>
        </div>
    )
}
