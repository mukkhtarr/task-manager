const express = require('express');
require('./db/mongoose')
const User = require('./model/user')
const Task = require('./model/task')

const app = express();
const port = process.env.PORT || 3000

app.use(express.json());

app.post('/users',(req,res)=>{
  const user = new User(req.body);
  user.save().then(()=>{
    res.status(200).send(user)
  }).catch((e)=>{
    res.status(400).send(e)
  })
})

app.get('/users',(req,res)=>{
  const users = User.find({})
  users.then((users)=>{
    res.send(users)
  }).catch((e)=>{
    res.status(500).send(e)
  })
})

app.get('/users/:id',(req,res)=>{
  const user = User.findById(req.params.id)
  user.then((user)=>{
    if(!user){
      return res.status(404).send()
    }
    res.send(user)
  }).catch((e)=>{
    res.status(500).send()
  })
})

app.get('/tasks',(req,res)=>{
  const tasks = Task.find({})
  tasks.then((tasks)=>{
    res.send(tasks)
  }).catch((e)=>{
    res.status(500).send(e)
  })
})

app.get('/tasks/:id',(req,res)=>{
  const _id = req.params.id
  Task.findById(_id).then((task)=>{
    if(!task){
      return res.status(404).send()
    }
    res.send(task)
  }).catch((e)=>{
    res.status(500).send()
  })
})

app.post('/tasks',(req,res)=>{
  const task = new Task(req.body);
  task.save().then(()=>{
    res.status(201).send(task)
  }).catch((e)=>{
    res.status(400).send(e)
  })
  
})

app.listen(port,()=>{
  console.log("app running on port: " + port)
})