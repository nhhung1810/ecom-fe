import "./search.input.css"

export const SearchInput = props => {
    var defaultPlaceholder = "Search ..."
    if (props.placeholder !== undefined)
        defaultPlaceholder = props.placeholder

    return (
        <span>
            <img
                alt="search"
                className="search__input-icon"
                src={process.env.PUBLIC_URL + "/images/search.svg"}>
            </img>
            <input className="search__input"
                placeholder={defaultPlaceholder}>
            </input>
        </span>
    )
}