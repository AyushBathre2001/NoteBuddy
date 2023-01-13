import React from 'react'
import { useNavigate } from 'react-router-dom'
import InsertNote from './InsertNote'
import Login from './Login'
import Main from './Main'
import ShowNotes from './ShowNotes'

export default function Home() {
    const Navigate = useNavigate()
  return (
    <>
    {!localStorage.getItem('Token') ? <Main/> :<InsertNote/>}
    
    </>
  )
}
