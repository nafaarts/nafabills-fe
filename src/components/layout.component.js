import React from 'react'
import Sidebar from './sidebar.component'

const Layout = ({ children, title, activeMenu }) => {
    return (
        <div className="flex">
            <Sidebar activeMenu={activeMenu} />
            <main className="min-h-screen overflow-y-auto flex-1 bg-zinc-200 p-7">
                <header className="mb-3">
                    <h1 className="text-2xl">{title}</h1>
                </header>
                {children}
            </main>
        </div>
    )
}

export default Layout