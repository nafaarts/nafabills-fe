import React from 'react'
import Sidebar from './sidebar.component'

const Layout = ({ children, title, activeMenu }) => {
    return (
        <div className="flex">
            <Sidebar activeMenu={activeMenu} />
            <main className="relative h-screen overflow-y-auto flex-1 bg-zinc-200 p-7 overflow-x-hidden">
                {title && <header className="mb-6">
                    <h1 className="text-2xl">{title}</h1>
                </header>}
                {children}
            </main>
        </div>
    )
}

export default Layout