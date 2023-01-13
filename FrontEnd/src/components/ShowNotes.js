import React, { useContext, useEffect, useRef ,useState} from 'react'
import notecontext from '../context/Notes/notecontext'
import NoteItems from './NoteItems'

export default function ShowNotes() {
  const context = useContext(notecontext)
  const { notes, getNotes,editNote } = context
  useEffect(() => {
    getNotes()

  }, [])
  const [note, setNote] = useState({ eid:"", etitle: "", edescription: "", etag: "" })

  let ref = useRef(null)
  const updatenote = (currentNote) => {
    ref.current.click()
    setNote({eid: currentNote._id, etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag})
  }

  const handleNote = (e) => {
    e.preventDefault()
    console.log(note)
    editNote(note.eid,note.etitle,note.edescription,note.etag)
  
  }

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }
  return (

    <>

      <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>


      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Update note</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
            <form>
        <div className="mb-3 mt-3">
          <label htmlFor="etitle" className="form-label">Title</label>
          <input type="text" className="form-control" id="etitle" name='etitle' value={note.etitle} aria-describedby="emailHelp" onChange={onChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="edescription" className="form-label">Description</label>
          <input type="text" className="form-control" style={{ height: "100px" }} id="edescription" value={note.edescription} name='edescription' onChange={onChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="etag" className="form-label">Tag</label>
          <input type="text" className="form-control" id="etag" name='etag' value={note.etag} onChange={onChange} />
        </div>

      </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button onClick={handleNote} type="button" data-bs-dismiss = "modal" className="btn btn-primary">Update changes</button>
            </div>
          </div>
        </div>
      </div>

      <div className='row my-3 mx-2'>
      
        {notes.map((note) => {
          return <NoteItems key={note._id} updatenote={updatenote} note={note} />
        })}

      </div>
    </>
  )
}
