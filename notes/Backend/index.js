import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";


import notesRoute from "./route/notes.route.js"

const app =express();

dotenv.config();
const PORT=process.env.PORT||4000;

//connect to mongodb
const URI = process.env.MongoDBURI;

try{
    mongoose.connect(URI,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    });
    console.log("Connected to MongoDb");
}catch(error)
{ 
  console.log("Error",error);
}
app.get('/', (req, res) => {
  res.send('Hii Arohi')
})

//defining routes

app.use("/notes",notesRoute)

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})