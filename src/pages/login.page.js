import React from 'react'
import LoginIllustrator from '../components/login-illustrate.component'
import Illustrate from "../assets/illustrate.svg"
import LoginForm from '../components/login-form.component'

const LoginPage = () => {
    return (
        <div className="h-screen flex">
            <LoginIllustrator illustrate={Illustrate} />
            <LoginForm />
        </div>
    )
}

export default LoginPage