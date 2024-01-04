import React, { useEffect, useState } from 'react'
import Layout from '../../components/layout.component'
import { useParams, useNavigate } from 'react-router-dom'
import Logo from '../../assets/logo.svg'

const InvoiceDetail = () => {
    const params = useParams()
    const [data, setData] = useState({})
    const navigate = useNavigate()
    const getInvoice = () => {
        fetch(`${process.env.REACT_APP_API_URI}/api/invoice/${params.invoiceNumber}`)
            .then(response => response.json())
            .then(data => setData(data))
            .catch(err => {
                navigate('/invoices')
            })
    }
    useEffect(() => {
        getInvoice()
    }, [])

    return (
        <Layout activeMenu="invoices">
            <div className="p-10 bg-white rounded-md">
                <div className="flex justify-between items-center">
                    <div className="w-98">
                        <img src={Logo} alt="Nafaarts Logo" width="240" />
                        <h1 className="text-xs text-gray-400">Nafaarts Development | www.nafaarts.com</h1>
                    </div>
                    <div className="w-98 text-right">
                        <h1>{data.invoice_type}</h1>
                        <h1 className="text-3xl font-bold">#{params.invoiceNumber.replace(/[-]/g, '/')}</h1>
                    </div>
                </div>
                <hr className="my-5" />
                <div className="flex justify-between text-xs">
                    <div>
                        <h3>Issued Date : <span className="font-bold">{new Date(data.issued_date).toLocaleDateString()}</span></h3>
                        <h3>Due Date : <span className="font-bold">{new Date(data.due_date).toLocaleDateString()}</span></h3>
                        <h3>Invoice Reference : <span className="font-bold">{data.job_reference ? data.job_reference : '-'}</span></h3>
                        <h3>Email : <span className="font-bold">support@nafaarts.com</span></h3>
                    </div>
                    <div className="w-72">
                        <h3>To : <span className="font-bold">{data.client ? data.client.name : ''}</span></h3>
                        <h3>Address : <span className="font-bold whitespace-normal">{data.client ? data.client.address : ''}</span></h3>
                        <h3>Kind Attn : <span className="font-bold">Accountant Department</span></h3>
                        <h3>Payment: <span className="font-bold">50% Down Payment</span> (opsi)</h3>
                    </div>
                </div>
                <table className="w-full rounded-t-lg overflow-hidden mt-5 text-xs">
                    <thead>
                        <tr className="font-bold">
                            <td className="py-2 px-4 uppercase bg-gray-300 text-center">#</td>
                            <td className="py-2 px-4 uppercase bg-gray-300 text-center">detail</td>
                            <td className="py-2 px-4 uppercase bg-gray-300 text-center">qty</td>
                            <td className="py-2 px-4 uppercase bg-gray-300 text-center">unit</td>
                            <td className="py-2 px-4 uppercase bg-gray-300 text-center">price</td>
                            <td className="py-2 px-4 uppercase bg-gray-300 text-center">amount</td>
                        </tr>
                    </thead>
                    <tbody>
                        {data.item && data.item.length !== 0 ? data.item.map((item, index) => (
                            <tr className="border-b" key={index}>
                                <td className="py-2 px-4 text-center">{index + 1}</td>
                                <td className="py-2 px-4 text-center">{item.detail}</td>
                                <td className="py-2 px-4 text-center">{item.quantity}</td>
                                <td className="py-2 px-4 text-center">{item.unit}</td>
                                <td className="py-2 px-4 text-center">{
                                    new Intl.NumberFormat('id-ID').format(item.price, 0)
                                }</td>
                                <td className="py-2 px-4 text-center">{new Intl.NumberFormat('id-ID').format(item.price * item.quantity, 0)}</td>
                            </tr>
                        )) : <tr><td className="text-center py-10" colSpan="6">No data Available</td></tr>}
                        <tr>
                            <td className="py-2 px-4 text-center" colSpan="5">TOTAL</td>
                            <td className="py-2 px-4 text-center font-bold">{data.item ?
                                new Intl.NumberFormat('id-ID').format(data.item.reduce((total, item) => {
                                    return total + (item.price * item.quantity)
                                }, 0)) : 0
                            }</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </Layout >
    )
}

export default InvoiceDetail