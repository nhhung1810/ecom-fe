import React, { useState } from "react";
import "./add.css"

export const AddPage = props => {
    return (
        <div className="add__container">
            <PhotoGallery></PhotoGallery>
        </div>
    )
}

const PhotoGallery = props => {
    const [isOverflow, setIsOverflow] = useState(false)

    return (
        <div className="add__photo-container">
            <span className="add__photo-label">Photos</span>
            <PhotoRow />
            {isOverflow && <PhotoRow />}
            <p className='add__photo-note'>
                You can add up to 8 photos. 
                The 1st photo will be set as cover (main photo)
            </p>
        </div>
    )
}

const PhotoRow = props => {
    return (
        <span className="add__photo">
            <PhotoCard />
            <PhotoCard />
            <PhotoCard />
            <PhotoCard />
        </span>
    )
}

const PhotoCard = props => {
    return (
        <div className="add__photo-card">
            <div className="add__photo-icon-container">
                <img className="add__photo-icon"
                    src={process.env.PUBLIC_URL + "/images/add.svg"}>
                </img>
                Add Photo
            </div>
        </div>
    )
}