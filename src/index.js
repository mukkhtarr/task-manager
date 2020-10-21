const express = require('express');
require('./db/mongoose')
const userRouter = require('./router/user')
const taskRouter = require('./router/task')

const app = express();
const port = process.env.PORT || 3000

app.use(express.json());

app.use(userRouter);
app.use(taskRouter);

app.listen(port,()=>{
  console.log("app running on port: " + port)
})

const Task = require('./model/task')
const User = require('./model/user')


const main = async ()=>{
  // const task = await Task.findById('5f8f847d08d29e50146f17bf')
  // await task.populate('owner').execPopulate()  
  // console.log(task.owner)

  const user = await User.findById('5f8ef43aa4f97628e487679b')
  await user.populate('tasks').execPopulate()
  console.log(user.tasks)
}
main()
