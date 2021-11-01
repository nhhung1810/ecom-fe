import "./paging.tool.css"


export const PagingTool = props => {
    return (
        <div className="paging__container">
            <span className="paging__text">
                Show {`${props.offset + 1} `}
                to
                {` ${(props.offset + props.limit) > props.count
                    ?
                    props.count
                    :
                    (props.offset + props.limit)
                    }`} of {props.count} entries
            </span>
            <div className="paging__tool-container">
                <PagingSelect
                    count={props.count}
                    handleChange={props.handleChange}
                    offset={props.offset}
                    limit={props.limit}
                    maxPage={props.maxPage} />
            </div>
        </div>
    )
}

const PagingSelect = props => {
    const page = props.maxPage
    const handleClick = (index) => {
        return e => {
            props.handleChange(props.limit, (index) * props.limit, props.maxPage, props.count)
        }
    }

    const activeStyling = (index) => {
        if (index === parseInt(props.offset / props.limit))
            return "active"
        else return ""
    }

    const generateButton = () => {
        let tmp = [];
        for (let i = 0; i < page; i++) {
            tmp.push(
                <button
                    key={i}
                    onClick={handleClick(i)}
                    className={`paging__move paging__move-number ${activeStyling(i)}`}> 
                    {i + 1} 
                </button>
            )
        }
        return tmp;
    }

    return (
        <span className="paging__tool">
            <button className="paging__max paging__move-number" disabled> {props.limit} </button>
            <button className="paging__move">
                <img src={process.env.PUBLIC_URL + "/images/first-page.svg"} />
            </button>
            <button className="paging__move">
                <img src={process.env.PUBLIC_URL + "/images/prev.svg"} />
            </button>
            {generateButton()}
            <button className="paging__move">
                <img src={process.env.PUBLIC_URL + "/images/next.svg"} />
            </button>
            <button className="paging__move">
                <img src={process.env.PUBLIC_URL + "/images/last-page.svg"} />
            </button>
        </span>
    )
}
