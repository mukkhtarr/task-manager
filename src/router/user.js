const express = require('express')
const router = new express.Router()
const User = require('../model/user')

// create a new user
router.post('/users', async (req,res)=>{
  const user = new User(req.body);

  try {
    await user.save()
    res.status(201).send(user)
  } catch (e) {
    res.status(400).send(e)
  }

})
//get all users
router.get('/users', async (req,res)=>{
  try {
    const users = await User.find({})
    res.send(users)
  } catch (e) {
    res.status(500).send(e)
  }
  
})
//get a user by id 
router.get('/users/:id', async (req,res)=>{
  try {
    const user = await User.findById(req.params.id)
    if(!user){
      return res.status(404).send()
    }
    res.send(user)
  } catch (e) {
    res.status(500).send()
  }
  
})
//update a user info
router.patch('/users/:id', async (req,res)=>{
  try {
    const reqKeys = Object.keys(req.body)
    const allowedKeys = ['name', 'email', 'age', 'password']
    const isReqAllowed = reqKeys.every((key)=>allowedKeys.includes(key))
    
    if(!isReqAllowed){
      return res.status(400).send({error:"Update operation not allowed."})
    }
    
    const user = await User.findByIdAndUpdate(req.params.id,req.body,{runValidators:true,new:true})
    if(!user){
      return res.status(404).send()
    }

    res.send(user)
  } catch (e) {
    res.status(400).send(e)
  }
})

//delete a user

router.delete('/users/:id',async (req,res)=>{
  try {
    const user = await User.findByIdAndDelete(req.params.id)
    if(!user){
      return res.status(404).send({error:"User not found"})
    }
    res.send(user)
  } catch (e) {
    res.status(400).send()
  }
})


module.exports = router