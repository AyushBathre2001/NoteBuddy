import React, { useContext } from 'react'
import notecontext from '../context/Notes/notecontext'

export default function NoteItems(props) {
  const deleteContext = useContext(notecontext)
  const { deleteNote } = deleteContext
  const { note, updatenote } = props
  return (
    <>
      <div className="card mx-3 my-3" style={{ width: "18rem", boxShadow: "0px 0px 2px rgb(183, 183, 183)", background: " rgb(255, 255, 253)" }}>
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{new Date(note.date).toLocaleString(undefined, {timeZone: 'Asia/Kolkata'})}</p>
          <p className="card-text">{note.description}</p>
          <p className="card-text fw-bold">{note.tag}</p>
          <div className="format">

            <span className="dcircle" onClick={() => { deleteNote(note._id) }} >
              <i className="ri-delete-bin-6-line" style={{ cursor: 'pointer' }}></i>

            </span>
            <span className="dcircle mx-2" onClick={() => { updatenote(note) }}>
              <i className="ri-edit-box-line mx-2"  style={{ cursor: 'pointer' }}></i>

            </span>
          </div>
        </div>
      </div>
    </>
  )
}

