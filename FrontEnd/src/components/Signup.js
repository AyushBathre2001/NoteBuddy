import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

export default function Signup() {

    const Navigate = useNavigate()
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" })
    const [errStatus,setErrStatus] = useState(null)

    const handleNote = async (e) => {
        e.preventDefault()
        if(credentials.password !== credentials.cpassword){
            setErrStatus("Password not matched")
            Navigate('/signup')
            return
        }
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password })
        });

        const value = await response.json()
        if (value.success) {
            localStorage.setItem("Token", value.token)
            Navigate('/')
        }

    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <div className='container my-5'>
            <div className="register">
                <div className="user_icon mt-4 ">

                    <i class="ri-user-line"></i>
                </div>
                <h5>Sign up</h5>
                <form onSubmit={handleNote}>
                    <div className="mb-3 mt-1">
                        <label htmlFor="name" className="form-label">Name*</label>
                        <input type="text" className="form-control" id="name" name='name' onChange={onChange} aria-describedby="emailHelp" required minLength={5} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address*</label>
                        <input type="email" className="form-control" id="email" name='email' onChange={onChange} aria-describedby="emailHelp" required />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password*</label>
                        <input type="password" className="form-control" id="password" name='password' onChange={onChange} required minLength={6} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="cpassword" className="form-label">Confirm Password*</label>
                        <input type="password" className="form-control" id="cpassword" name='cpassword' onChange={onChange} required minLength={6} />
                        <p style={{color:'red'}}>{errStatus}</p>
                    </div>

                    <button type="submit" className="btn btn-success mb-5">Signup</button>
                </form>
            </div>
        </div>
    )
}
