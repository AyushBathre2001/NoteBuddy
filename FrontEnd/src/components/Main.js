import React from 'react'
import Navbar from './Navbar'
import bg from '../Images/bg.jpg'
import notepng from '../Images/notepng.png'
import { Link } from 'react-router-dom'

export default function Main() {
  return (
    <>
      <div className='homepage'>
        <div className="left">
          <img src={bg} alt="" />
          <div className="text">
            <h1>NoteBuddy</h1>
            <h4>Your notes on the cloud</h4>
            <p>Organized and Accessible</p>
            <img src={notepng} alt="" />
            <div className="buttons my-3">
              <Link className="btn btn-dark" to="/login" role="button">Login</Link>
              <Link className="btn btn-success mx-2" to="/signup" role="button">Signup</Link>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}
