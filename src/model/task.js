const mongoose = require('mongoose')

const Task = mongoose.model('Tasks',{
  description: {
    type: String,
    required: true,
    trim:true,
  },
  completed: {
    type: Boolean,
    default: false
  }
})

// const myTask = new Tasks({
//   description:"TeamTreeHouse JavaScript course",
// })

// myTask.save().then(()=>{
//   console.log(myTask);
// }).catch((e)=>{console.log(e)})

module.exports = Task