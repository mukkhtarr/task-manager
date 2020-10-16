//require the mongodb module
const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

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

  //create a Collection eq. Table and insert one new Document/Row
  db.collection('users',(error,result)=>{
    if(error){
      return console.log('collection could not be created!')
    }

    result.insertOne({
      name:'Mukhtar',
      age: 31
    },(error,insertRes)=>{
      if(error){
        return console.log("record could not be created");
      }
      console.log("New document created");
    })

  })
})