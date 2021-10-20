
export const LeftSideImage = props => {
    return (
        <img
            onClick={props.onChangeMainImage}
            className="info__left-image"
            src={props.src}></img>
    )
}