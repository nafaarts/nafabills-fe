import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Button = ({ label, type, onClick, icon }) => {
    return (
        <button className="bg-orange-400 py-2 px-4 rounded-md hover:bg-orange-500 text-white" type={type} onClick={onClick}>{label} {icon && <FontAwesomeIcon icon={icon} className="ml-1" />}</button>
    )
}

export default Button