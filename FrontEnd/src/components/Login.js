import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";

export default function Login() {

    const Navigate = useNavigate()
    const [credentials, setCredentials] = useState({ email: "", password: "" })
    const [loginError, setLoginError] = useState(null)
    
        
    
    
    // useEffect(()=>{
    //     console.log("success")
    // },[loginError])
    
    
    const handleNote = async (e) => {
        e.preventDefault()
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        
        const value = await response.json()
        if(value.success === false){
            setLoginError("Invalid user credentials")

        }
        else{
            localStorage.setItem("Token", value.token)
            Navigate('/')
        }
        
        
            
        // setLoginError("Invalid user credentials")
        

    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <div className='container my-5'>

            <div className="login">
                <div className="user_icon ">

                    <i class="ri-user-line"></i>
                </div>
                <h5>Login</h5>
                <p className='err mb-5' style={{ color: "red" }}>{loginError}</p>
                <form onSubmit={handleNote}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="email" name='email' onChange={onChange} value={credentials.email} aria-describedby="emailHelp" required />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" name='password' onChange={onChange} value={credentials.password} minLength="6" required />
                    </div>
                 

                    <button type="submit" className="btn btn-dark my-3">Login</button>
                </form>
            </div>
        </div>
    )
}
