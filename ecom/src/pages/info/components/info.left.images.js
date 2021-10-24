
export const LeftSideImage = props => {
    return (
        <img
            alt="left"
            onClick={props.onChangeMainImage}
            className="info__left-image"
            src={props.src}></img>
    )
}