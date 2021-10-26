import React, { useRef, useState } from "react";
import { useOnClickOutside } from "../../hook";
import "./avatar.css"

export const Avatar = props => {
    const ref = useRef()
    const [isModalOpen, setIsModalOpen] = useState(false)

    useOnClickOutside(ref, () => setIsModalOpen(false))

    const logoutHandle = e => {
        if (props.onSignout) props.onSignout()
        else return
    }
    return (
        <div className="avatar__container">
            <img
                onClick={e =>setIsModalOpen(true)}
                className="avatar__container-image"
                src={process.env.PUBLIC_URL + "/images/ava.jpg"}
                alt="avatar" />
            {
                isModalOpen
                    ?
                    <div ref={ref} className="avatar__dropdown-menu">
                        <button>Account Setting</button>
                        <button onClick={logoutHandle} >Logout</button>
                    </div>
                    :
                    null
            }
        </div>
    )
}