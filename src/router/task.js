const express = require('express')
const auth = require('../middleware/auth')
const router = new express.Router()
const Task = require('../model/task')

//get all tasks + filtering ( ?completed=true) + pagination
// tasks?completed=true
// tasks?limit=10&skip=10
// tasks?sortBy=createdAt:desc
router.get('/tasks',auth,async (req,res)=>{
  try {
    //const tasks = await Task.find({owner:req.user._id})
    const match = {}
    const sort = {}
    if(req.query.completed){
      match.completed = req.query.completed === 'true'
    }
    if(req.query.sortBy){
      const parts = req.query.sortBy.split(':')
      sort[parts[0]] = parts[1]==='desc'?-1:1
    }

    await req.user.populate({
      path:'tasks',
      match,
      options:{
        limit: parseInt(req.query.limit),
        skip: parseInt(req.query.skip),
        sort
      }
    }).execPopulate()
    res.send(req.user.tasks)
  } catch (e) {
    res.status(500).send(e)
  }
  
})

//get task by id 
router.get('/tasks/:id',auth, async (req,res)=>{
  try {
    const _id = req.params.id
    //const task = await Task.findById(_id)
    const task = await Task.findOne({_id,owner:req.user._id})
    if(!task){
      return res.status(404).send()
    }
    res.send(task)
  } catch (e) {
    res.status(500).send()
  }
  
})

//update a task by id

router.patch('/tasks/:id',auth, async (req,res)=>{
  
  try {
    const updates = Object.keys(req.body)
    const allowed = ['description', 'completed']
    const isAllowed = updates.every((update)=>allowed.includes(update))
    if(!isAllowed){
      res.status(400).send({error:"Update operation not allowed"})
    }
    
    const task = await Task.findOne({_id:req.params.id,owner:req.user._id})
    if(!task){
      return res.status(404).send()
    }
    updates.forEach((update)=>task[update] = req.body[update])

    await task.save()

    // const task = await Task.findByIdAndUpdate(req.params.id,req.body,{new: true, runValidators:true})

   
    res.send(task)
  } catch (e) {
    res.status(400).send(e)
  }


})

//create a new task
router.post('/tasks', auth, async (req,res)=>{
  try {
    //const task = new Task(req.body)
    const task = new Task({
      ...req.body,
      owner: req.user._id
    })
    await task.save()
    res.status(201).send(task)
  } catch (e) {
    res.status(400).send(e)
  }
})

//delete a task

router.delete('/tasks/:id',auth, async (req,res)=>{
  try {
    //const task = await Task.findByIdAndDelete(req.params.id)

    const task = await Task.findOneAndDelete({_id:req.params.id,owner:req.user._id})
    if(!task){
      return res.status(404).send({error:"Task not found"})
    }
    res.send(task)
  } catch (e) {
    res.status(400).send()
  }
})

module.exports = router 