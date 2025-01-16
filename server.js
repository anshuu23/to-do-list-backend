const express = require('express')
const app = express()
require('dotenv').config()
const cors = require('cors')

const {connectToDb} = require('./services/mongo-db-connection')
const {handelUserCreateAccount, handelUserLogin} = require("./handlers/user")
const {handelCreateTask , returnAllTasks , updateTask , deleteTask, searchTask} = require('./handlers/tasks')
const {authenticateUser} = require("./middlewares/auth")


// middlewares
app.use(cors())
app.use(express.json())


// connecting to database
const URL = process.env.MONGODB_CONNECTION_URL
connectToDb(URL)


//routes for creating account and loggin in .
app.post('/createAccount' , handelUserCreateAccount)
app.post('/login' , handelUserLogin)


//routes for task purposes. requires token to access. Get token from creating account 
app.get('/tasks' , authenticateUser , returnAllTasks)
app.post('/tasks' , authenticateUser ,handelCreateTask)
app.put('/tasks' , authenticateUser , updateTask)
app.delete('/tasks' , authenticateUser , deleteTask)
app.get('/tasks/search' , authenticateUser , searchTask)


const PORT = process.env.PORT
app.listen(PORT, ()=>{
    console.log(`serve is listening on port ${PORT}`);
})
