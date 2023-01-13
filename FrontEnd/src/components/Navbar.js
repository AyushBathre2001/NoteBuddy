import React from 'react'
import {Link, useNavigate} from 'react-router-dom'

export default function Navbar(){
  const Navigate = useNavigate()
  const logOut = ()=>{
    localStorage.removeItem('Token')
    Navigate('/')
  }
  return (
    <div className='Navbar'>
      <nav className="navbar navbar-expand-lg bg-body-tertiary bg-dark" data-bs-theme="dark">
  <div className="container-fluid">
    <Link className="navbar-brand" to="#">NoteBuddy</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/about">About</Link>
        </li>

      </ul>
    
    </div>
  </div>

  {!localStorage.getItem('Token') ?  <div className="d-flex butt">
    
    <Link className="btn btn-light" to="/login" role="button">Login</Link>
    <Link className="btn btn-success mx-2" to="/signup" role="button">Signup</Link>
  
    </div> :  <div className="d-flex">
    
    <button className='btn btn-danger mx-2' onClick={logOut}>Logout</button>
    </div>}

 
</nav>
    </div>
  )
}
