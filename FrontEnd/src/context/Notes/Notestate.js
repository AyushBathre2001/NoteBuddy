import Notecontext from "./notecontext";
import { useState } from 'react'

const Notestate = (props) => {

    const notesInitial = []
    const [notes, setNotes] = useState(notesInitial)
    const getNotes = async () => {
        //fetch all the notes from API
        const response = await fetch("http://localhost:5000/api/notes/getnotes", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token':localStorage.getItem('Token')
            },
        });
        const value = await response.json()
        // console.log(value)
        setNotes(value)
    }





    //add note in the database
    const addNote = async (title, description, tag) => {

        const response = await fetch("http://localhost:5000/api/notes/addnote", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token':localStorage.getItem('Token')
            },
            body: JSON.stringify({ title, description, tag })
        });

        getNotes()

    }

    const deleteNote = async (id) => {
        const response = await fetch(`http://localhost:5000/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token':localStorage.getItem('Token')
            },
        });

        getNotes()

    }

    const editNote = async (id,title,description,tag) =>{
        const response = await fetch(`http://localhost:5000/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token':localStorage.getItem('Token')
            },

            body: JSON.stringify({ title, description, tag })
        });

        for (let index = 0; index < notes.length; index++) {
            const element = notes[index];{
                if(element._id === id){
                    element.title = title
                    element.description = description
                    element.tag = tag
                }
            }
            
        }

        getNotes()
    }

    return (
        <Notecontext.Provider value={{ notes, addNote, deleteNote, getNotes ,editNote }}>
            {props.children}
        </Notecontext.Provider>
    )
}

export default Notestate