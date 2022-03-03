import React from 'react'
import background from "../assets/login-bg.svg"

const LoginIllustrator = ({ illustrate }) => {
    const style = {
        backgroundImage: `url("${background}")`,
        backgroundRepeat: "no-repeat",
        backgroundSize: 'auto 100%'
    }
    return (
        <div className="flex w-1/2 h-full loginBG justify-center items-center" style={style}>
            <img src={illustrate} alt="Logo" width="600" />
        </div >
    )
}

export default LoginIllustrator