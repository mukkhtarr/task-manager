const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
    trim:true,
  },
  completed: {
    type: Boolean,
    default: false
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref:'User'
  }
},{
  timestamps:true
})

const Task = mongoose.model('Tasks',taskSchema)

// const myTask = new Tasks({
//   description:"TeamTreeHouse JavaScript course",
// })

// myTask.save().then(()=>{
//   console.log(myTask);
// }).catch((e)=>{console.log(e)})

module.exports = Task