const mongoose = require('mongoose')
const dbURI = "mongodb://localhost:27017/inote"


mongoose.set('strictQuery',false)
const databaseConnect = ()=>{
    mongoose.connect(dbURI,()=>{
        console.log("Connected to database successfully")
    })
}

module.exports = databaseConnect