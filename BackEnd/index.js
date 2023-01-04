const express = require('express')
const databaseConnect = require('./db')
databaseConnect()

const app = express()

app.use(express.json())
app.use('/api/auth', require('./routes/authentication'))
app.use('/api/notes', require('./routes/notesOperation'))

app.listen(5000,()=>{
    console.log("Server is running...")
})