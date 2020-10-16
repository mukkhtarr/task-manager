/* CRUD OPERATION WITH NODEJS */

//require the mongodb module
const {MongoClient, ObjectID} = require('mongodb')
//Connect to database

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager' 


MongoClient.connect(connectionURL,{useUnifiedTopology: true},(error,client)=>{
  if(error){
    return console.log("Unable to connect");
  }

  //console.log("Connected Successfully");

  // create a database if not already exist
  const db = client.db(databaseName);

//   //create a Collection eq. Table and insert one new Document/Row
//   db.collection('users').insertOne({
//     name:'Andrew',
//     age: 27
//   },(error,result)=>{
//     if(error){
//       return console.log("record could not be created");
//     }
//     console.log("New document created");
//   })
  // db.collection('tasks').insertMany([
  //   {
  //     description: "teamtreehouse front-end track",
  //     completed: true
  //   },
  //   {
  //     description: "teamtreehouse Javascript track",
  //     completed: true
  //   },
  //   {
  //     description: "Udemy NodeJS",
  //     completed: false
  //   }
  // ],(error,result)=>{
  //   if(error){
  //     return console.log("Unable to insert records at this time")
  //   }

  //   console.log(result.ops)
  // })

  //read a single document/row
  db.collection('tasks').findOne({_id: new ObjectID('5f89281a7702853060f4ec02')},(error,task)=>{
    if(error){
      return console.log('something went wrong')
    }

    console.log(task);

  })

  //read many records

  db.collection('tasks').find({completed:true}).toArray((error,tasks)=>{
    console.log(tasks)
  })

 })



