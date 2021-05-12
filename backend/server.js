const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose')

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json()); //server wiil be sending json 


const URI = process.env.ATLAS_URI || "mongodb://localhost:27017/myFirstDatabase";
//Store Connection Object
const db = mongoose.connection;
//Config Object to Avoid Deprecation Warnings
const config = { useNewUrlParser: true, useUnifiedTopology: true };

mongoose.connect(URI, config);

//CONNECTION EVENTS
db.on("open", () => {
  console.log(`You are connected to Mongo`);
})
  .on("error", (err) => {
    console.log(err);
  })
  .on("close", () => {
    console.log(`You are no longer connected to Mongo`);
  });

  module.exports = mongoose

const excerciseRouter = require("./routes/excercise")
const usersRouter = require('./routes/users')

//routing functionality
app.use('./excercise',excerciseRouter);
app.use('./users',usersRouter)

app.listen(port , (req,res)=>{
    console.log(`Server is running on port ${port}`);
})