import React from 'react'

const InputFloatingLabel = ({ type, label, value, name, bind }) => {
    const [inputValue, setValue] = bind
    const changeValue = e => {
        setValue(e.target.value)
    }

    return (
        <div className="relative z-0 mb-6 w-full group">
            <input type={type} name={name} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:focus:border-orange-500 focus:outline-none focus:ring-0 focus:border-orange-600 peer" placeholder="" value={inputValue} onChange={changeValue} />
            <label htmlFor="floating_email" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-orange-600 peer-focus:dark:text-orange-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">{label}</label>
        </div >
    )
}

export default InputFloatingLabel