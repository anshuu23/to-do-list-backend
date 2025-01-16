const express = require('express')
const app = express()
require('dotenv').config()
const {connectToDb} = require('./services/mongo-db-connection')
const {handelUserCreateAccount, handelUserLogin} = require("./handlers/user")
const {handelCreateTask , returnAllTasks , updateTask , deleteTask, searchTask} = require('./handlers/tasks')
const {authenticateUser} = require("./middlewares/auth")

const cors = require('cors')

app.use(cors())
app.use(express.json())



// connecting to database
const URL = process.env.MONGODB_CONNECTION_URL
connectToDb(URL)

app.post('/createAccount' , handelUserCreateAccount)
app.post('/login' , handelUserLogin)


app.get('/tasks' , authenticateUser , returnAllTasks)
app.post('/tasks' , authenticateUser ,handelCreateTask)
app.put('/tasks' , authenticateUser , updateTask)
app.delete('/tasks' , authenticateUser , deleteTask)
app.get('/tasks/search' , authenticateUser , searchTask)


app.listen(3022, ()=>{
    console.log('serve is listening on port 4000');
})
