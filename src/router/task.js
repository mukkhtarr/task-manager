const express = require('express')
const router = new express.Router()
const Task = require('../model/task')

//get all tasks
router.get('/tasks',async (req,res)=>{
  try {
    const tasks = await Task.find({})
    res.send(tasks)
  } catch (e) {
    res.status(500).send(e)
  }
  
})

//get task by id 
router.get('/tasks/:id',async (req,res)=>{
  try {
    const _id = req.params.id
    const task = await Task.findById(_id)
    if(!task){
      return res.status(404).send()
    }
    res.send(task)
  } catch (e) {
    res.status(500).send()
  }
  
})

//update a task by id

router.patch('/tasks/:id', async (req,res)=>{
  
  try {
    const updates = Object.keys(req.body)
    const allowed = ['description', 'completed']
    const isAllowed = updates.every((update)=>allowed.includes(update))
    if(!isAllowed){
      res.status(400).send({error:"Update operation not allowed"})
    }

    const task = await Task.findByIdAndUpdate(req.params.id,req.body,{new: true, runValidators:true})

    if(!task){
      return res.status(404).send()
    }
    res.send(task)
  } catch (e) {
    res.status(400).send(e)
  }


})

//create a new task
router.post('/tasks', async (req,res)=>{
  try {
    const task = new Task(req.body)
    await task.save()
    res.status(201).send(task)
  } catch (e) {
    res.status(400).send(e)
  }
})

//delete a task

router.delete('/tasks/:id',async (req,res)=>{
  try {
    const task = await Task.findByIdAndDelete(req.params.id)
    if(!task){
      return res.status(404).send({error:"Task not found"})
    }
    res.send(task)
  } catch (e) {
    res.status(400).send()
  }
})

module.exports = router 