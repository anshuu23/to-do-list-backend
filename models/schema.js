const mongoose = require("mongoose")

const schema = mongoose.Schema({
    name:{
        type:String,
        require:true
    },

    email:{
        type:String,
        require:true,
        unique:true
    },

    password:{
        type:String,
        require:true
    },

    tasks:[
        {
           
            taskName:{
                type:String,
                required:true,
            },

            isComplited:{
                type:Boolean,
                default:false
            }
            
        }
    ]

})

const USER = mongoose.model('user' , schema)

module.exports = USER