import React from 'react'
import FloatingButton from '../components/floating-botton.component'
import Layout from '../components/layout.component'

const BanksPage = () => {
    const handleAddButton = () => {
        alert('Banks Page')
    }
    return (
        <Layout activeMenu="banks" title="Banks">
            <FloatingButton ClickEvent={handleAddButton} />
        </Layout>
    )
}

export default BanksPage