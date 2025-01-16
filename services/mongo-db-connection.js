const mongoose = require("mongoose")


// used to connnnect to mongodb
function connectToDb(URL){

    mongoose.connect(URL)
    .then(()=>{
        console.log("connected to database")
    })
    .catch((err)=>{
        console.log(err)
    })
    
}

module.exports = {connectToDb}