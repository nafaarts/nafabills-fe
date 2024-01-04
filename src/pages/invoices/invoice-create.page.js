import React, { useState, useEffect } from 'react'
import Layout from '../../components/layout.component'
import { AddInvoice } from './invoices.page'


const InvoiceCreatePage = () => {

    return (
        <Layout activeMenu="invoices" title="Create Invoice">
            <div className="bg-white p-5 rounded-lg">
                <AddInvoice type="page" />
            </div>
        </Layout>
    )
}

export default InvoiceCreatePage    