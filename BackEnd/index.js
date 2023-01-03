const express = require('express')
const databaseConnect = require('./db')
databaseConnect()

const app = express()

app.use(express.json())
app.use('/api/auth', require('./routes/register'))
app.use('/api/notes', require('./routes/savenotes'))

app.listen(5000,()=>{
    console.log("Server is running...")
})