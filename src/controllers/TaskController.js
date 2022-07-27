const TaskModel = require('../models/TaskModel')

exports.CreateTask = (req,res)=>{
    let reqBody = req.body;
    reqBody.Email = req.headers['Email']

    TaskModel.create(reqBody,(err,data)=>{
        if(err){
            res.status(400).json({status:'failed',data:err})
        }
        else{
            res.status(200).json({status:'success',data:data})
        }
    })
}

exports.DeleteTask = (req,res)=>{
    let id = req.params.id
    let query = {_id:id}
    
    TaskModel.deleteOne(query,(err,data)=>{
        if(err){
            res.status(400).json({status:'failed',data:err})
        }
        else{
            res.status(200).json({status:'success',data:data})
        }
    })
}

exports.UpdateTaskStatus = (req,res)=>{
    let id = req.params.id;
    let Status = req.params.Status;
    let query = {_id:id};
    let reqBody = {Status:Status};

    TaskModel.updateOne(query,reqBody,(err,data)=>{
        if(err){
            res.status(400).json({status:'failed',data:err})
        }
        else{
            res.status(200).json({status:'success',data:data})
        }
    })
}

exports.ListTaskByStatus = (req,res)=>{
    let Status = req.params.Status;
    let Email = req.headers['Email']

    TaskModel.aggregate([{$match:{Status:Status,Email:Email}},{$project:{_id:1,Title:1,Description:1,CreateDate:{$dateToString:{date:'$CreateDate',format:'%d-%m-%Y'}}}}],(err,data)=>{
        if(err){
            res.status(400).json({status:'failed',data:err})
        }
        else{
            res.status(200).json({status:'success',data:data})
        }
    })
}

exports.TaskStatusCount = (req,res)=>{
    let Email = req.headers['Email'];

    TaskModel.aggregate([{$match:{Email:Email}},{$group:{_id:'$Status',sum:{$count:{}}}}],(err,data)=>{
        if(err){
            res.status(400).json({status:'failed',data:err})
        }
        else{
            res.status(200).json({status:'success',data:data})
        }
    })
}