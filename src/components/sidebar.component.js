import React from 'react'
import SidebarBrand from './sidebar-brand.component'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus, faDashboard, faFileInvoice, faBusinessTime, faBank, faDoorOpen } from "@fortawesome/free-solid-svg-icons"
import SidebarLink from './sidebar-link.component'
import Copyright from './copyright.component'
import { Link } from 'react-router-dom'

const Sidebar = ({ activeMenu }) => {
    return (
        <div className="w-60 h-screen bg-zinc-800 px-8 flex flex-col justify-between" id="sidebar">
            <div className="content">
                <SidebarBrand />
                <button className="p-2 text-center bg-orange-400 text-white w-full rounded-md text-xs flex items-center justify-center mb-5">
                    <FontAwesomeIcon icon={faPlus} className="mr-1" /> Create Invoice</button>
                <SidebarLink isActive={activeMenu === "dashboard"} to="/" icon={faDashboard} label="Dashboard" />
                <SidebarLink isActive={activeMenu === "invoices"} to="/invoices" icon={faFileInvoice} label="Invoices" />
                <SidebarLink isActive={activeMenu === "clients"} to="/clients" icon={faBusinessTime} label="Clients" />
                <SidebarLink isActive={activeMenu === "banks"} to="/banks" icon={faBank} label="Banks" />

                <Link to="/login">
                    <div className="p-2 w-full my-3 text-sm flex hover:text-white text-zinc-400 cursor-pointer">
                        <div className="w-8">
                            <FontAwesomeIcon icon={faDoorOpen} />
                        </div>
                        Logout
                    </div>
                </Link>
            </div>
            <Copyright />
        </div>
    )
}

export default Sidebar