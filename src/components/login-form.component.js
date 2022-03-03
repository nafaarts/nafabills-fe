import React, { useState } from 'react'
import Input from '../components/input.component'
import logo from "../assets/logo.svg"
import GoogleLogo from '../assets/GoogleLogo.svg'
import { Link } from 'react-router-dom'

const LoginForm = () => {
    const [loginData, setloginData] = useState({
        username: "",
        password: ""
    })
    const getUsername = e => {
        setloginData({
            username: e.target.value,
            password: loginData.password
        })
    }
    const getPassword = e => {
        setloginData({
            username: loginData.username,
            password: e.target.value
        })
    }
    const submitEvent = (e) => {
        e.preventDefault()
        alert(JSON.stringify(loginData))
    }

    return (
        <div className="justify-center items-center flex w-1/2 h-full">
            <form className="p-5 flex flex-col w-96" onSubmit={submitEvent}>
                <div className="flex items-center justify-center">
                    <img src={logo} alt="Logo Nafaarts" width="180" className="my-auto" />
                    <h1 className="text-3xl ml-4 font-light border-l-2 pl-4">Log in</h1>
                </div>
                <hr className="my-10" />
                <Input type="text" placeholder="Enter your email" onChange={getUsername} />
                <Input type="password" placeholder="Enter your password" onChange={getPassword} />
                <button type="submit" className="mt-5 px-4 py-2 bg-orange-400 hover:bg-orange-500 cursor-pointer text-white rounded-md"><Link to="/">Login</Link></button>
                <button type="submit" className="mt-5 px-4 py-2 border border-gray-500 cursor-pointer rounded-md text-gray-500 flex items-center justify-center hover:border-orange-400 hover:text-orange-400"><img src={GoogleLogo} alt="Google" /> <span className="ml-2"> Login with Google</span></button>
            </form>
        </div>
    )
}

export default LoginForm