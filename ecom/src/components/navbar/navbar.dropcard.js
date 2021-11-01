import { useRef, useState } from "react"
import { Link } from "react-router-dom";
import { useOnClickOutside } from "../../hook";

export const DropCard = props => {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef();

    useOnClickOutside(ref, () => setIsOpen(false))

    return (
        <>
            <span className="navbar__footer-dropcard">
                {props.children}
                <img
                    onClick={e => setIsOpen(true)}
                    className="navbar__footer-dropcard-arrow"
                    alt="dropcard"
                    src={process.env.PUBLIC_URL + "/images/arrow.svg"}>
                </img>
            </span>
            {
                isOpen ?
                    <div ref={ref} className="navbar__dropcard">
                        <Link to={props.to}>
                            <button>Tops</button>
                        </Link>
                        <Link to={props.to}>
                            <button>Bottoms</button>
                        </Link>
                        <Link to={props.to}>
                            <button>Dresses </button>
                        </Link>
                        <Link to={props.to}>
                            <button>Jacket</button>
                        </Link>
                        <Link to={props.to}>
                            <button>Shoes</button>
                        </Link>
                        <Link to={props.to}>
                            <button>Accessories</button>
                        </Link>
                        <Link to={props.to}>
                            <button>Sale</button>
                        </Link>

                    </div>
                    :
                    null
            }

        </>
    )
}

