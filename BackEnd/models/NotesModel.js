const mongoose = require('mongoose')

const noteSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    tag:{
        type:String,

    },
    date:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model('Note',noteSchema)