import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from "@fortawesome/free-solid-svg-icons"

const FloatingButton = ({ ClickEvent }) => {
    return (
        <div className="w-14 h-14 bg-orange-400 rounded-full absolute bottom-10 right-10 flex justify-center items-center text-2xl text-white hover:bg-orange-500 cursor-pointer transition-all hover:scale-110" onClick={ClickEvent}>
            <FontAwesomeIcon icon={faPlus} />
        </div>
    )
}
export default FloatingButton