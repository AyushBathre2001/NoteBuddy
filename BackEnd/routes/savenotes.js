const express = require('express')
const router = express.Router()
const Note = require('../models/NotesModel')

router.post('/',(req,res)=>{
    let note = Note(req.body)
    note.save()
    res.send(req.body)
})

module.exports = router