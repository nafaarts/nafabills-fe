import React from 'react'

const InputField = ({ value, label, name, placeholder, type, onChange }) => (
    <div className="flex flex-col">
        {label && <label className="text-xs mb-2 text-gray-500" htmlFor="input-field">{label}</label>}
        <input
            type={type}
            value={value}
            name={name}
            className="border-b py-2 px-3 mb-5 focus:border-b-orange-400 focus:outline-none text-gray-400"
            placeholder={placeholder}
            onChange={onChange}
            autoComplete="false"
        />
    </div>
)

export default InputField