import React from 'react'
import FloatingButton from '../components/floating-botton.component'
import Layout from '../components/layout.component'

const ClientPage = () => {
    const handleAddButton = () => {
        alert('client page')
    }
    return (
        <Layout activeMenu="clients" title="Clients">
            <FloatingButton ClickEvent={handleAddButton} />
        </Layout>
    )
}

export default ClientPage