const express = require('express')
const app = express()
const multer = require('multer')


const upload = multer({
  dest:'uploads'
})

app.post('/upload',upload.single('upload'),  (req,res)=>{
  res.send()
})

app.listen(3000)
