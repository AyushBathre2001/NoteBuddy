const express = require('express')
const router = express.Router()
const Note = require('../models/NotesModel')
const fetchuser = require('../middleware/fetchuser')
const { body, validationResult } = require('express-validator');
// const { findByIdAndDelete } = require('../models/NotesModel');


//add notes - post request
router.post('/addnote',fetchuser,[
    body('title').isLength({ min: 3 }),
    body('description').isLength({ min: 6 }),
],async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const {title, description,tag} = req.body
        const note = Note({title,description,tag,user:req.user.id})
        await note.save()
        res.json(note)
    }  catch (error) {
        res.status(500).send("Internal server error")
    }
})

//fetch notes - get request
router.get('/getnotes',fetchuser,async(req,res)=>{
    try {
        const notes = await Note.find({user:req.user.id})
        res.json(notes)
    } catch (error) {
        res.status(500).send("Internal server error")
    }
})

//update notes - put request
router.put('/updatenote/:id',fetchuser,async(req,res)=>{
    try {
        let newnote = {}
        const {title,description,tag} = req.body
        if(title){newnote.title = title}
        if(description){newnote.description = description}
        if(tag){newnote.tag = tag}

        let note = await Note.findById(req.params.id)
        if(!note){
            return res.status(404).send("Not found")
        }

        if(note.user.toString() !== req.user.id){
            return res.send("Note allowed")
        }

        note = await Note.findByIdAndUpdate(req.params.id,{$set: newnote}, {new:true})

        res.json(note)
    } catch (error) {
        res.status(500).send("Internal server error")
    }
})

//delete note - delete request
router.delete('/deletenote/:id',fetchuser,async(req,res)=>{
    try {
        let note = await Note.findById(req.params.id)
        if(!note){
            return res.status(404).send("Not found")
        }

        if(note.user.toString() !== req.user.id){
            return res.send("Not allowed")
        }

        note = await Note.findByIdAndDelete(req.params.id)
        res.status(200).send("Note deleted")
    } catch (error) {
        res.status(500).send("Internal server error")
    
    }
})

module.exports = router