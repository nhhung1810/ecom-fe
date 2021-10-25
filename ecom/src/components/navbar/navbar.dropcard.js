import { useRef, useState } from "react"
import { useOnClickOutside } from "../../hook";

export const DropCard = props => {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef();

    useOnClickOutside(ref, () => setIsOpen(false))

    return (
        <span className="navbar__footer-dropcard">
            {props.children}
            <img
                onClick={e => setIsOpen(true)} 
                className="navbar__footer-dropcard-arrow"
                alt="dropcard"
                src={process.env.PUBLIC_URL + "/images/arrow.svg"}>
            </img>
            {
            isOpen ?
            <div ref={ref} className="navbar__dropcard"> 
                <button>Tops</button>
                <button>Bottoms</button>
                <button>Dresses </button>
                <button>Jacket</button>
                <button>Shoes</button>
                <button>Accessories</button>
                <button>Sale</button>
            </div>
            :
            null
            }
        </span>
    )
}

