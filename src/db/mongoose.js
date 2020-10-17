const mongoose = require('mongoose')

mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api",{
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const User = mongoose.model('User',{
  name:{
    type: String
  },
  age:{
    type: Number
  }
})

// const me = new User({
//   name:'Mukhtar',
//   age: 31
// });

// me.save().then(()=>{
//   console.log(me);
// }).catch((e)=>{
//   console.log(e);
// })

const Tasks = mongoose.model('Tasks',{
  description: {
    type: String
  },
  completed: {
    type: Boolean
  }
})

const myTask = new Tasks({
  description:"TeamTreeHouse Frontend course",
  completed: true
})

myTask.save().then(()=>{
  console.log(myTask);
}).catch((e)=>{console.log(e)})

