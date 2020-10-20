const express = require('express')
const router = new express.Router()
const User = require('../model/user')
const auth = require('../middleware/auth')

// create a new user
router.post('/users', async (req,res)=>{
  const user = new User(req.body);

  try {
    await user.save()
    const token = await user.generateAuthToken()
    res.status(201).send({user,token})
  } catch (e) {
    res.status(400).send(e)
  }

})

//login a user

router.post('/users/login', async (req,res)=>{
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password)
    const token = await user.generateAuthToken()

    res.send({user, token})
  } catch (e) {
    res.status(400).send(e)
  }

})

router.post('/users/logout',auth,async (req,res)=>{
  try {
    req.user.tokens = req.user.tokens.filter((t)=>{
      return t.token !== req.token
    })
    await req.user.save()
    res.send()
  } catch (e) {
    res.status(500).send()
  }
})

//logout from all devices

router.post('/users/logoutAll',auth,async (req,res)=>{
  try {
    req.user.tokens = []
    await req.user.save()
    res.send()
  } catch (e) {
    res.status(500).send()
  }
  
})

//get profile
router.get('/users/me',auth, async (req,res)=>{
  try {
    res.send(req.user)
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
//update my info
router.patch('/users/me', auth, async (req,res)=>{
  try {
    const reqKeys = Object.keys(req.body)
    const allowedKeys = ['name', 'email', 'age', 'password']
    const isReqAllowed = reqKeys.every((key)=>allowedKeys.includes(key))
    
    if(!isReqAllowed){
      return res.status(400).send({error:"Update operation not allowed."})
    }

    const user = req.user

    reqKeys.forEach((key)=> user[key]=req.body[key])

     await user.save()
    
    // const user = await User.findByIdAndUpdate(req.params.id,req.body,{runValidators:true,new:true})

  
    res.send(user)
  } catch (e) {
    res.status(400).send(e)
  }
})

//delete my profile

router.delete('/users/me',auth, async (req,res)=>{
  try {
    req.user.remove()
    res.send(req.user)
  } catch (e) {
    res.status(400).send()
  }
})


module.exports = router