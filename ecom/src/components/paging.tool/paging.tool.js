import "./paging.tool.css"


export const PagingTool = props => {
    return (
        <div className="paging__container">
            <span className="paging__text"> Show 1 to 10 of 123 entries</span>
            <div className="paging__tool">
                <PagingSelect
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
    const handleClick = (index) =>{
        return e =>{
            console.log(index+1)
            props.handleChange(props.limit, (index)*props.limit, props.maxPage)
        }
    }
    const generateButton = () => {
        let tmp = [];
        for (let i = 0; i < page; i++) {
            tmp.push(
                <button
                    key={i}
                    onClick={handleClick(i)}
                    className="paging__move"> {i + 1} </button>
            )
        }
        return tmp;
    }

    return (
        <span className="paging__tool">
            <button className="paging__max" disabled> 10 </button>
            <button className="paging__move"> {"<<"} </button>
            <button className="paging__move"> {"<"} </button>
            {generateButton()}
            <button className="paging__move"> {">"} </button>
            <button className="paging__move"> {">>"} </button>
        </span>
    )
}
