const mongoose = require("mongoose")

const schema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true,
        unique:true
    },

    password:{
        type:String,
        required:true
    },

    tasks:[
        {
           
            taskName:{
                type:String,
                required:true,
                unique:true
            },

            isComplited:{
                type:String,
                default:false
            }
            
        }
    ]

})

const USER = mongoose.model('user' , schema)

module.exports = USER