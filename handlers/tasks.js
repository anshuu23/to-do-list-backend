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
    .then((data)=>{

        const objToSend = data.tasks.find((element) => element.taskName === taskName);
        console.log(objToSend)
        return res.status(201).json({task:objToSend });
    })
    .catch((err)=>{
        console.log(err)
    })


}

function returnAllTasks(req,res){
    const id = req.user.id;

    USER.findOne({_id:id})
    .then((data)=>{
        return res.status(200).json({tasks:data.tasks})
    })
}



function updateTask(req,res){
    let {taskName , isComplited} = req.body ; 
    const userId = req.user.id;
    const taskId = req.query.id
    
    if( !taskId || !taskName || isComplited !== "true" && isComplited !== "false"){
        return res.status(400).json({msg:'pls send task name and task status'})
    }

    
    USER.findOneAndUpdate({_id:userId, "tasks._id":taskId},
        { $set: { "tasks.$.isComplited": isComplited } },
        { new: true })

        .then((data)=>{
            
            const objToSend = data.tasks.find((element) => element._id == taskId);

            res.status(200).json({task:objToSend})
            
        })
        .catch((err)=>{
            console.log(err)
        })
}

function deleteTask(req,res){
    const userId = req.user.id;
    const taskId = req.query.id

    if(!taskId){
        return res.status(400).json({msg:'pls send task Id'})
    }

    USER.findOneAndUpdate({_id : userId},{$pull:{tasks:{_id:taskId}}})
    .then((data)=>{
        if(!data){
            return res.status(400).json({msg : "wrong task id"})
        }
        return res.status(200).json({msg : "task deleted"})
    })
    .catch((err)=>{
        console.log(err)
        return res.send({msg:'internal server error in db'})
    })
}

module.exports = {handelCreateTask , returnAllTasks , updateTask , deleteTask}