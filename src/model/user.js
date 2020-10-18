const mongoose = require('mongoose')
const validator = require('validator')

const User = mongoose.model('User',{
  name:{
    type: String,
    required: true,
    trim: true
  },
  email:{
    type: String,
    required: true,
    trim:true,
    lowercase: true,
    validate(value){
      if(!validator.isEmail(value)){
        throw Error("Must provide valid email address")
      }
    }
  },
  password:{
    required: true,
    type: String,
    trim: true,
    minlength: 7,
    validate(value){
      if(value.toLowerCase().includes('password')){
        throw new Error("Please choose a different password")
      }
    }
  },
  age:{
    type: Number,
    default:0,
    validate(value){
      if(value<0){
        throw Error("Age must be a positive number")
      }
    }
  }
})

// const me = new User({
//   name:'   Mukhtar',
//   email:'  super_javaman@YAHOO.com ',
//   password:'Password',
//   age: 31
// });

// me.save().then(()=>{
//   console.log(me);
// }).catch((e)=>{
//   console.log(e);
// })

module.exports = User