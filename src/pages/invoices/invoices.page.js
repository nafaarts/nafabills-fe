import React, { useState, useEffect } from 'react'
import FloatingButton from '../../components/floating-botton.component'
import InvoicesTable from '../../components/invoices-table.components'
import Layout from '../../components/layout.component'
import { useNavigate, useParams } from "react-router-dom"
import { faArrowRight, faSpinner } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Button from '../../components/button.component'
import ModalSlider from '../../components/modal-slider.component'
import InputFloatingLabel from "../../components/input-floating-label.component"
import SelectFloatingLabel from '../../components/select-floating-label.component'

export const InvoicesPage = () => {
    const params = useParams()
    const [invoices, setInvoices] = useState([])
    const [modalOpen, setModalOpen] = useState({
        status: (params.create === 'create') ? true : false,
        type: 'add'
    })
    const handleAddButton = () => {
        setModalOpen({ type: 'add', status: true })
    }
    const getInvoices = async () => {
        try {
            const getData = await fetch(`${process.env.REACT_APP_API_URI}/api/invoice`)
            const data = await getData.json()
            setInvoices(data)
        } catch (error) {
            console.log(`Error : ${error}`)
        }
    }

    // const onEditData = () => {
    //     alert('edit')
    // }

    // const onDeleteData = (id) => {
    //     mySwal.fire({
    //         title: 'Are you sure?',
    //         text: "You won't be able to revert this!",
    //         icon: 'warning',
    //         showCancelButton: true,
    //         confirmButtonColor: '#FF904D',
    //         cancelButtonColor: '#C4C4C4',
    //         confirmButtonText: 'Yes, delete it!'
    //     }).then((result) => {
    //         if (result.isConfirmed) {
    //             fetch(`${process.env.REACT_APP_API_URI}/api/invoice/${id}`, { method: 'DELETE' })
    //                 .then(data => {
    //                     Swal.fire({
    //                         title: 'Deleted!',
    //                         text: 'Invoice has been deleted.',
    //                         icon: 'success',
    //                         confirmButtonColor: '#FF904D',
    //                     })
    //                     getInvoices()
    //                 })
    //                 .catch(err => {
    //                     Swal.fire({
    //                         title: 'Oppss!',
    //                         text: 'something error!.',
    //                         icon: 'error',
    //                         confirmButtonColor: '#FF904D',
    //                     })
    //                 })

    //         }
    //     })
    // }

    useEffect(() => {
        getInvoices()
    }, [])
    return (
        <Layout activeMenu="invoices" title="Invoices">
            <InvoicesTable data={invoices} />
            <ModalSlider open={[modalOpen, setModalOpen]} label={modalOpen.type}>
                <AddInvoice reloadData={getInvoices} type="sidebar" />
            </ModalSlider>
            <FloatingButton ClickEvent={handleAddButton} />
        </Layout>
    )
}

export const AddInvoice = ({ reloadData, type }) => {
    const [issuedDate, setIssuedDate] = useState(new Date().toISOString().substring(0, 10))
    const [dueDate, setDueDate] = useState("")
    const [client, setClient] = useState("")
    const [bank, setBank] = useState("")
    const [invoiceType, setInvoiceType] = useState("INVOICE")
    const [status, setStatus] = useState("UNPAID")
    const [loading, setLoading] = useState(false)

    const [clients, setClients] = useState([])
    const [banks, setBanks] = useState([])

    const mySwal = withReactContent(Swal)
    const navigate = useNavigate()

    const getClients = async () => {
        const getData = await fetch(`${process.env.REACT_APP_API_URI}/api/client`)
        const datas = await getData.json()
        setClients(datas)
        setClient(datas[0]._id)
    }

    const getBanks = async () => {
        const getData = await fetch(`${process.env.REACT_APP_API_URI}/api/bank`)
        const datas = await getData.json()
        setBank(datas[0]._id)
        setBanks(datas)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(e)
        debugger
        setLoading(true)
        let data = {
            issued_date: issuedDate,
            due_date: dueDate,
            client: client,
            bank: bank,
            invoice_type: invoiceType,
            status: status,
        }
        fetch(`${process.env.REACT_APP_API_URI}/api/invoice`, {
            method: 'POST', mode: 'cors',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json'
            }, body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => {
                setLoading(false)
                if (data.status === 'success') {
                    Swal.fire({
                        title: 'Success',
                        text: 'Invoice successfully added.',
                        icon: 'success',
                        confirmButtonColor: '#FF904D',
                        confirmButtonText: `Return to Invoice`
                    }).then(result => {
                        if (type === 'sidebar') reloadData()
                        if (result.isConfirmed) {
                            navigate('/invoice/' + data.data.invoice_number + '/detail')
                        } else {
                            if (type === 'page') navigate('/invoices')
                        }
                    })
                }
            })
            .catch(err => {
                setLoading(false)
                console.error('Error: ' + err)
                Swal.fire({
                    title: 'Oppss',
                    text: 'failed to add invoice!.',
                    icon: 'error',
                    confirmButtonColor: '#FF904D',
                })
            })
    }

    useEffect(() => {
        getClients()
        getBanks()
    }, [])

    return (
        <form onSubmit={handleSubmit}>
            <hr className="mt-3 mb-5" />
            <SelectFloatingLabel label="Client" bind={[client, setClient]} data={clients.map(item => {
                return { label: item.name, value: item._id }
            })} />
            <InputFloatingLabel name="issued_date" type="date" label="Issued Date" bind={[issuedDate, setIssuedDate]} />
            <InputFloatingLabel name="due_date" type="date" label="Due Date" bind={[dueDate, setDueDate]} />
            <SelectFloatingLabel label="Bank" bind={[bank, setBank]} data={banks.map(item => {
                return { label: item.detail, value: item._id }
            })} />
            <SelectFloatingLabel label="Invoice Type" bind={[invoiceType, setInvoiceType]} data={[
                { value: 'INVOICE', label: 'INVOICE' },
                { value: 'PROFORMA', label: 'PROFORMA' },
                { value: 'REPAYMENT', label: 'REPAYMENT' }]} />
            <SelectFloatingLabel label="Status" bind={[status, setStatus]} data={[
                { value: 'UNPAID', label: 'UNPAID' },
                { value: 'PAID', label: 'PAID' }]} />
            <div className="flex items-center">
                <Button type="submit" label="Submit" icon={faArrowRight} />
                {loading && <FontAwesomeIcon icon={faSpinner} className="animate-spin text-3xl text-gray-400 ml-3" />}
            </div>
        </form>
    )
}
