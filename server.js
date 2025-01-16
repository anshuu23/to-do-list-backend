const express = require('express')
const app = express()
require('dotenv').config()
const {connectToDb} = require('./services/mongo-db-connection')
const {handelUserCreateAccount, handelUserLogin} = require("./handlers/user")
const {handelCreateTask , returnAllTasks} = require('./handlers/tasks')
const {authenticateUser} = require("./middlewares/auth")

const cors = require('cors')
const cookieParser = require("cookie-parser")

app.use(cors())
app.use(express.json())



// connecting to database
const URL = process.env.MONGODB_CONNECTION_URL
connectToDb(URL)

app.post('/createAccount' , handelUserCreateAccount)
app.post('/login' , handelUserLogin)

app.use(authenticateUser)

app.get('/tasks' , returnAllTasks)
app.post('/tasks' , handelCreateTask)

app.get('/task' , (req,res)=>{

})

app.listen(3022, ()=>{
    console.log('serve is listening on port 4000');
})
