import React, { useState, useEffect } from 'react'
import ClientsTable from '../../components/clients-table.component'
import FloatingButton from '../../components/floating-botton.component'
import Layout from '../../components/layout.component'
import ModalSlider from '../../components/modal-slider.component'
import InputFloatingLabel from "../../components/input-floating-label.component"
import { faArrowRight, faSpinner } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Button from '../../components/button.component'

const ClientPage = () => {
    const [clients, setClients] = useState([])
    const [editValue, setEditValue] = useState({})
    const [modalOpen, setModalOpen] = useState({
        status: false,
        type: 'add'
    })
    const mySwal = withReactContent(Swal)

    const handleAddButton = () => {
        setModalOpen({ type: 'add', status: true })
    }

    const getClientsData = async () => {
        try {
            const getData = await fetch(`${process.env.REACT_APP_API_URI}/api/client`)
            const data = await getData.json()
            setClients(data)
        } catch (error) {
            console.log(`Error : ${error}`)
        }
    }

    const getEditedData = (data) => {
        setModalOpen({ type: 'edit', status: true })
        setEditValue(data)
    }

    const getDeletedData = (id) => {
        mySwal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#FF904D',
            cancelButtonColor: '#C4C4C4',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`${process.env.REACT_APP_API_URI}/api/client/${id}`, { method: 'DELETE' })
                    .then(data => {
                        Swal.fire({
                            title: 'Deleted!',
                            text: 'Your data has been deleted.',
                            icon: 'success',
                            confirmButtonColor: '#FF904D',
                        })
                        getClientsData()
                    })
                    .catch(err => {
                        Swal.fire({
                            title: 'Oppss!',
                            text: 'something error!.',
                            icon: 'error',
                            confirmButtonColor: '#FF904D',
                        })
                    })

            }
        })
    }

    useEffect(() => {
        getClientsData()
    }, [])

    return (
        <Layout activeMenu="clients" title="Clients">
            <ClientsTable data={clients} editData={getEditedData} deletedData={getDeletedData} />
            <ModalSlider open={[modalOpen, setModalOpen]} label={modalOpen.type}>
                {modalOpen.type === 'add' ? <AddFormBank reloadData={getClientsData} /> : <EditFormBank reloadData={getClientsData} value={editValue} />}
            </ModalSlider>
            <FloatingButton ClickEvent={handleAddButton} />
        </Layout>
    )
}

const AddFormBank = ({ reloadData }) => {
    const [name, setName] = useState("")
    const [code, setCode] = useState("")
    const [address, setAddress] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [loading, setLoading] = useState(false)

    const mySwal = withReactContent(Swal)

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        let data = {
            name, code, address, email, phone
        }
        fetch(`${process.env.REACT_APP_API_URI}/api/client/`, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(data => {
            setLoading(false)
            reloadData()
            mySwal.fire({
                icon: 'success',
                title: 'Client data has been saved!',
                showConfirmButton: false,
                timer: 1500
            })
        }).catch(err => console.log(err))
    }

    useEffect(() => {
        if (name) {
            setCode(name.match(/^[PT|CV]+|\b[A-Z]/gi).join('').toUpperCase())
        } else {
            setCode('')
        }
    }, [name])

    return (
        <form onSubmit={handleSubmit}>
            <hr className="mt-3 mb-5" />
            <InputFloatingLabel type="text" label="Name" bind={[name, setName]} />
            <InputFloatingLabel type="text" label="Code" bind={[code, setCode]} />
            <InputFloatingLabel type="text" label="Email" bind={[email, setEmail]} />
            <InputFloatingLabel type="text" label="Phone" bind={[phone, setPhone]} />
            <InputFloatingLabel type="text" label="Address" bind={[address, setAddress]} />
            <div className="flex">
                <Button type="submit" label="Submit" icon={faArrowRight} />
                {loading && <FontAwesomeIcon icon={faSpinner} className="animate-spin text-3xl text-gray-400" />}
            </div>
        </form>
    )
}


const EditFormBank = ({ value, reloadData }) => {
    const [name, setName] = useState(value.name)
    const [code, setCode] = useState(value.code)
    const [address, setAddress] = useState(value.address)
    const [email, setEmail] = useState(value.email)
    const [phone, setPhone] = useState(value.phone)
    const [loading, setLoading] = useState(false)

    const mySwal = withReactContent(Swal)

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        let data = {
            name, code, address, email, phone
        }
        fetch(`${process.env.REACT_APP_API_URI}/api/client/${value._id}`, {
            method: 'PUT',
            mode: 'cors',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(data => {
            setLoading(false)
            reloadData()
            mySwal.fire({
                icon: 'success',
                title: 'Bank data successfully edited!',
                showConfirmButton: false,
                timer: 1500
            })
        }).catch(err => console.log(err))
    }

    useEffect(() => {
        if (name) {
            setCode(name.match(/^[PT|CV]+|\b[A-Z]/gi).join('').toUpperCase())
        } else {
            setCode('')
        }
    }, [name])

    return (
        <form onSubmit={handleSubmit}>
            <hr className="mt-3 mb-5" />
            <InputFloatingLabel type="text" label="Name" bind={[name, setName]} />
            <InputFloatingLabel type="text" label="Code" bind={[code, setCode]} />
            <InputFloatingLabel type="text" label="Email" bind={[email, setEmail]} />
            <InputFloatingLabel type="text" label="Phone" bind={[phone, setPhone]} />
            <InputFloatingLabel type="text" label="Address" bind={[address, setAddress]} />
            <div className="flex">
                <Button type="submit" label="Submit" icon={faArrowRight} />
                {loading && <FontAwesomeIcon icon={faSpinner} className="animate-spin text-3xl text-gray-400" />}
            </div>
        </form>
    )
}

export default ClientPage