const express = require('express')
const router = new express.Router()
const multer = require('multer')
const sharp = require('sharp')
const User = require('../model/user')
const auth = require('../middleware/auth')
const { sendWelcomeEmail, sendGoodByeEmail } = require('../emails/account')


// create a new user
router.post('/users', async (req,res)=>{
  const user = new User(req.body);

  try {
    await user.save()
    sendWelcomeEmail(user.email,user.name)
    const token = await user.generateAuthToken()
    res.status(201).send({user,token})
  } catch (e) {
    res.status(400).send(e)
  }

})

//profile image upload
const upload = multer({
  limits:{
    fileSize:1000000
  },
  fileFilter(req,file,cb){
    if(!file.originalname.match(/\.(png|jpg|jpeg)$/)){
      return cb(new Error("Please upload png, jpg or jpeg file"))
    }
    cb(undefined, true)
  }
})
router.post('/users/me/avatar', auth, upload.single('avatar'), async(req,res)=>{
  const buffer = await sharp(req.file.buffer).resize({width:250, height:250}).png().toBuffer()
  req.user.avatar = buffer
  await req.user.save()
  res.send()
},(error,req,res,next)=>{
  res.status(400).send({error:error.message})
})

//Delete user avatar
router.delete('/users/me/avatar', auth, async (req,res)=>{
  req.user.avatar = undefined
  await req.user.save()
  res.send()
})

//get user avatar
router.get('/users/:id/avatar', async (req,res)=>{
  try {
    const user = await User.findById(req.params.id)

    if(!user || !user.avatar){
      throw new Error('404')
    }
    res.set('Content-Type','image/png')
    res.send(user.avatar)
  } catch (e) {
    res.status(404).send()
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
    sendGoodByeEmail(req.user.email,req.user.name)
    res.send(req.user)
  } catch (e) {
    res.status(400).send()
  }
})


module.exports = router