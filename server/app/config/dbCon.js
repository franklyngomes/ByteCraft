const mongoose = require('mongoose')

const Database = async () => {
  const database = await mongoose.connect(process.env.MONGODB_CONNECTION_STRING)
  try {
    if(database){
      console.log("Database Connection Successful")
    }else{
      console.log("Database connection failed!")
    }
  } catch (error) {
    console.log(error)
  }
}
module.exports = Database