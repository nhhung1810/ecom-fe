import { useEffect, useLayoutEffect, useRef, useState } from "react"

export const AddPhotoGallery = props => {
    const [isOverflow, setIsOverflow] = useState(false)
    const [imageList, setImageList] = useState([]);
    const hiddenFileInput = useRef(null)
    const [url, setUrl] = useState([])

    useLayoutEffect(() => {
        props.setImages(imageList)
        let tmp = imageList.map(data => {
            return URL.createObjectURL(data)
        })
        setUrl(tmp)
    }, [imageList])

    if (imageList.length == 4 && isOverflow == false) {
        setIsOverflow(true)
    } else if (imageList.length == 3 && isOverflow == true) {
        setIsOverflow(false)
    }

    const handleClose = (row) => {
        return (col) => {
            return e => {
                let index = row + col
                let tmp = imageList.slice(0)
                tmp.splice(index, 1)
                setImageList(imageList => [...tmp])
            }
        }
    }

    const handleUpload = e => {
        hiddenFileInput.current.click()
    }

    const handleImage = e => {
        if (e.target.files.length == 1)
            setImageList(imageList => [...imageList, e.target.files[0]])
    }

    return (
        <div className="add__photo-container">
            <input
                type="file"
                accept=".jpg"
                onChange={handleImage}
                className="add__photo-input-hidden"
                ref={hiddenFileInput} />
            <span className="add__photo-label">PHOTOS</span>
            <PhotoRow
                id={1}
                handleClose={handleClose(0)}
                handleUpload={handleUpload}
                url={url.slice(0, 4)} />
            {isOverflow &&
                <PhotoRow
                    id={2}
                    handleClose={handleClose(1)}
                    handleUpload={handleUpload}
                    url={url.slice(4, 8)} />
            }
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
            <PhotoCard
                url={props.url[0]}
                handleClose={props.handleClose(0)}
                handleUpload={props.handleUpload} />
            <PhotoCard
                url={props.url[1]}
                handleClose={props.handleClose(1)}
                handleUpload={props.handleUpload} />
            <PhotoCard
                url={props.url[2]}
                handleClose={props.handleClose(2)}
                handleUpload={props.handleUpload} />
            <PhotoCard
                url={props.url[3]}
                handleClose={props.handleClose(3)}
                handleUpload={props.handleUpload} />
        </span>
    )
}

const PhotoCard = props => {
    return (
        <div className="add__photo-card">
            {
                props.url == undefined ?
                    <PhotoCardNoImage handleUpload={props.handleUpload} />
                    :
                    <PhotoCardWithImage url={props.url} handleClose={props.handleClose} />
            }
        </div>
    )
}

const PhotoCardNoImage = props => {
    return (
        <div onClick={props.handleUpload} className="add__photo-icon-container">
            <img className="add__photo-icon"
                src={process.env.PUBLIC_URL + "/images/add.svg"}>
            </img>
            Add Photo
        </div>
    )
}

const PhotoCardWithImage = props => {
    return (
        <div className="add__photo-upload-container">
            <img
                src={process.env.PUBLIC_URL + "/images/close-1.svg"}
                className="add__photo-upload-cross"
                onClick={props.handleClose}
            />
            <img src={props.url} className="add__photo-upload-image" />
        </div>
    )
}