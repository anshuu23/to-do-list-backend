const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())

app.post('/' , (req,res)=>{
    res.json({msg:'hello from server'})
})

app.listen(4000 , ()=>{
    console.log('serve is listening on port 4000');
})
