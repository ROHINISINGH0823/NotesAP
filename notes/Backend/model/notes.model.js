import mongoose from "mongoose";


const notesSchema=mongoose.Schema({
    name:String,
    price:Number,
    category:String,
    image:String,
    title:String,
    tags: [String]
})

const Notes=mongoose.model("Notes",notesSchema);

export default Notes;