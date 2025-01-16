const USER = require('../models/schema')

function handelCreateTask(req, res){
    const {taskName , isComplited} = req.body;
    const id = req.user.id;

    if(!taskName || !isComplited){
        return res.status(400).json({msg:'pls send task name and task status'})
    }

        const taskToPush={
        taskName,
        isComplited
    }
    
    USER.findOneAndUpdate({_id : id},{$push:{tasks:taskToPush}},{new:true})
    .then(()=>{
        return res.status(201).end("created task object");
    })
    .catch((err)=>{
        console.log(err)
    })


}

function returnAllTasks(req,res){
    const id = req.user.id;

    USER.findOne({_id:id})
    .then((data)=>{
        console.log("data =" , data)
        return res.status(200).json({tasks:data.tasks})
    })
}

module.exports = {handelCreateTask , returnAllTasks}