import React, { useState, useEffect, useRef } from 'react'
import BanksTable from '../../components/banks-table.component'
import Button from '../../components/button.component'
import FloatingButton from '../../components/floating-botton.component'
import InputFloatingLabel from '../../components/input-floating-label.component'
import Layout from '../../components/layout.component'
import ModalSlider from '../../components/modal-slider.component'
import { useKeyPress } from '../../usekeyPress'
import { faArrowRight, faListSquares, faSpinner } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const BanksPage = () => {
    const [modalOpen, setModalOpen] = useState({
        status: false,
        type: 'add'
    })
    const [banks, setBanks] = useState([])
    const [editValue, setEditValue] = useState({})
    const mySwal = withReactContent(Swal)
    const escPress = useKeyPress("Escape")

    const toggleModal = () => {
        setModalOpen({ type: 'add', status: !modalOpen.status })
    }

    const getBanksData = async () => {
        try {
            const getData = await fetch(`${process.env.REACT_APP_API_URI}/api/bank`)
            const data = await getData.json()
            setBanks(data)
        } catch (error) {
            console.log(`Error : ${error}`)
        }
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
                fetch(`${process.env.REACT_APP_API_URI}/api/bank/${id}`, { method: 'DELETE' })
                    .then(data => {
                        Swal.fire({
                            title: 'Deleted!',
                            text: 'Your data has been deleted.',
                            icon: 'success',
                            confirmButtonColor: '#FF904D',
                        })
                        getBanksData()
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

    const getEditedData = (data) => {
        setModalOpen({ type: 'edit', status: true })
        setEditValue(data)
    }

    useEffect(() => {
        setModalOpen({ type: modalOpen.type, status: false })
    }, [escPress])

    useEffect(() => {
        getBanksData()
    }, [])

    return (
        <Layout activeMenu="banks" title="Banks" onClick={() => setModalOpen(false)}>
            <BanksTable data={banks} deletedData={getDeletedData} editData={getEditedData} />
            <ModalSlider open={[modalOpen, setModalOpen]} label={modalOpen.type}>
                {modalOpen.type === 'add'
                    ? <AddFormBank reloadData={getBanksData} />
                    : <EditFormBank reloadData={getBanksData} value={editValue} />
                }
            </ModalSlider>
            <FloatingButton ClickEvent={toggleModal} />
        </Layout>
    )
}

const AddFormBank = ({ reloadData }) => {
    const [accountName, setAccountName] = useState("")
    const [bankDetail, setBankDetail] = useState("")
    const [accountNumber, setAccountNumber] = useState("")
    const [currency, setCurrency] = useState("")
    const [address, setAddress] = useState("")
    const [loading, setLoading] = useState(false)

    const mySwal = withReactContent(Swal)

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        let data = {
            name: accountName,
            detail: bankDetail,
            account_number: accountNumber,
            currency: currency,
            address: address
        }
        fetch(`${process.env.REACT_APP_API_URI}/api/bank/`, {
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
                title: 'Bank data has been saved!',
                showConfirmButton: false,
                timer: 1500
            })
        }).catch(err => console.log(err))
    }

    return (
        <form onSubmit={handleSubmit}>
            <hr className="mt-3 mb-5" />
            <InputFloatingLabel type="text" label="Account Name" name="account_name" bind={[accountName, setAccountName]} />
            <InputFloatingLabel type="text" label="Bank Detail" name="bank_detail" bind={[bankDetail, setBankDetail]} />
            <InputFloatingLabel type="text" label="Account Number" name="account_number" bind={[accountNumber, setAccountNumber]} />
            <InputFloatingLabel type="text" label="Currency" name="currency" bind={[currency, setCurrency]} />
            <InputFloatingLabel type="text" label="Address" name="address" bind={[address, setAddress]} />
            <div className="flex">
                <Button type="submit" label="Submit" icon={faArrowRight} />
                {loading && <FontAwesomeIcon icon={faSpinner} className="animate-spin text-3xl text-gray-400" />}
            </div>
        </form>
    )
}

const EditFormBank = ({ value, reloadData }) => {
    const [accountName, setAccountName] = useState(value.name)
    const [bankDetail, setBankDetail] = useState(value.detail)
    const [accountNumber, setAccountNumber] = useState(value.account_number)
    const [currency, setCurrency] = useState(value.currency)
    const [address, setAddress] = useState(value.address)
    const [loading, setLoading] = useState(false)

    const mySwal = withReactContent(Swal)

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        let data = {
            name: accountName,
            detail: bankDetail,
            account_number: accountNumber,
            currency: currency,
            address: address
        }
        fetch(`${process.env.REACT_APP_API_URI}/api/bank/${value._id}`, {
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

    return (
        <form onSubmit={handleSubmit}>
            <hr className="mt-3 mb-5" />
            <InputFloatingLabel type="text" label="Account Name" name="account_name" bind={[accountName, setAccountName]} />
            <InputFloatingLabel type="text" label="Bank Detail" name="bank_detail" bind={[bankDetail, setBankDetail]} />
            <InputFloatingLabel type="text" label="Account Number" name="account_number" bind={[accountNumber, setAccountNumber]} />
            <InputFloatingLabel type="text" label="Currency" name="currency" bind={[currency, setCurrency]} />
            <InputFloatingLabel type="text" label="Address" name="address" bind={[address, setAddress]} />
            <div className="flex">
                <Button type="submit" label="Submit" icon={faArrowRight} />
                {loading && <FontAwesomeIcon icon={faSpinner} className="animate-spin text-3xl text-gray-400" />}
            </div>
        </form>
    )
}

export default BanksPage