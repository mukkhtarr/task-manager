require('../src/db/mongoose')
const Task = require('../src/model/task')

// Task.findByIdAndDelete("5f8b47eaa6af7b5a54ebe554").then((record)=>{
//   console.log(record)
//   return Task.countDocuments({completed:false})
// }).then(count=>console.log(count))
// .catch(e=>console.log(e))

const deleteTaskAndCount = async (id)=>{
  const deleteTask = await Task.findByIdAndDelete(id)
  const incompleteTasks = await Task.countDocuments({completed:false})
  return incompleteTasks
}

deleteTaskAndCount("5f8b43d1ef0b3550a0429460").then((count)=>{
  console.log('result', count)
}).catch(e=>console.log(e))