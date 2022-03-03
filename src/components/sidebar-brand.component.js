import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../assets/Nafabills-logo.svg'

const SidebarBrand = () => {
    return (
        <div className="w-full flex justify-center items-center h-16 py-12 mb-8 border-b-gray-500 border-b">
            <Link to="/">
                <img src={Logo} alt="Logo" width="140" />
            </Link>
        </div>
    )
}

export default SidebarBrand