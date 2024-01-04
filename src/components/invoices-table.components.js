import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons"
import { Link } from 'react-router-dom'

const InvoicesTable = ({ data, deletedData, editData }) => {

    return (
        <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="overflow-hidden sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-white">
                                <tr>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Invoice
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Status
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Client
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Bank
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Amount
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Date Created
                                    </th>
                                    <th scope="col" className="relative px-6 py-3">
                                        <span className="sr-only">Edit</span>
                                    </th>
                                </tr>
                            </thead>
                            <RenderTable data={data} />
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

const RenderTable = ({ data }) => {
    

    return (
        <tbody className="bg-white divide-y divide-gray-200">
            {data.map((invoice, index) => (
                <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{invoice.invoice_number.replace(/[-]/g, '/')}</div>
                        <div className="text-sm font-medium text-gray-500">{invoice.invoice_type}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <div className={"text-xs p-1 rounded-md text-center " + (invoice.status === 'PAID' ? 'bg-green-300' : 'bg-yellow-300')}>{invoice.status}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{invoice.client.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{invoice.bank.detail}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">Rp {
                            new Intl.NumberFormat('id-ID').format(invoice.item.reduce((total, item) => {
                                return total + (item.price * item.quantity)
                            }, 0))
                        }</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(invoice.createdAt).toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link to={"/invoice/" + invoice.invoice_number + "/detail"}>
                            <div className="border border-orange-400 text-orange-400 rounded-md py-1 px-2 text-center text-xs hover:bg-orange-400 hover:text-white">Open Invoice</div>
                        </Link>
                        {/* <div className="flex">
                                                <div className="text-zinc-600 hover:text-orange-500" onClick={() => editData(invoice)}>
                                                    <FontAwesomeIcon icon={faEdit} />
                                                </div>
                                                <div className="text-zinc-600 hover:text-orange-500 ml-2" onClick={() => deletedData(invoice._id)}>
                                                    <FontAwesomeIcon icon={faTrash} />
                                                </div>
                                            </div> */}
                    </td>
                </tr>
            ))}
        </tbody>
    )
}

export default InvoicesTable