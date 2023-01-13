
import React, { useContext, useState } from 'react'
import notecontext from '../context/Notes/notecontext'
import ShowNotes from './ShowNotes'

export default function InsertNote() {

  const [note, setNote] = useState({ title: "", description: "", tag: "" })

  const addcontext = useContext(notecontext)
  const { addNote } = addcontext

  const handleNote = (e) => {
    e.preventDefault()
    addNote(note.title, note.description, note.tag)
    setNote({title:"",description:"",tag:""})
  }

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }
  return (
    <>
    <div className="insert_container">

      <div className="overlay my-5">


      <h4 className='mt-5'>Insert your note</h4>
      <form>
        <div className="mb-3 mt-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" value={note.title} onChange={onChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea className="form-control" style={{ height: "100px" }} id="description" name='description' value={note.description} onChange={onChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">Tag</label>
          <input type="text" className="form-control" id="tag" name='tag' onChange={onChange} value= {note.tag} />
        </div>

        <button type="submit" className="btn btn-success mb-5" onClick={handleNote}>Insert</button>
      </form>

      <h4 className='mt-4'>Your notes</h4>
      <ShowNotes />
      </div>
    </div>

    </>


  )
}
