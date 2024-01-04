import React, { useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from "@fortawesome/free-solid-svg-icons"
import { gsap } from 'gsap/all'

const ModalSlider = ({ children, open, label }) => {
    const [modalOpen, setModalOpen] = open
    const modalRef = useRef(null)
    const toggleModal = () => {
        setModalOpen({ type: modalOpen.type, status: !modalOpen.status })
    }

    useEffect(() => {
        if (modalOpen.status) {
            gsap.to(modalRef.current, {
                duration: 1,
                x: 0,
                display: 'block',
                ease: 'power3'
            })
        } else {
            gsap.to(modalRef.current, {
                duration: 1,
                x: 384,
                display: 'none',
                ease: 'power3'
            })
        }
    }, [modalOpen])

    return (
        <div ref={modalRef} className={"top-0 right-0 h-screen bg-white w-96 shadow-md z-50 px-5 py-4 hidden fixed"}>
            <div className="flex justify-between items-center mb-3">
                <h1 className="text-lg text-gray-500 capitalize">{label}</h1>
                <div className="text-2xl hover:text-black text-gray-500 w-fit cursor-pointer" onClick={toggleModal}><FontAwesomeIcon icon={faTimes} /></div>
            </div>
            {children}
        </div>
    )
}

export default ModalSlider