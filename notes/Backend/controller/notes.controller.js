import Notes from "../model/notes.model.js"


export const getNotes = async(req,res) =>
    {
        try{
            const notes=await Notes.find();
            res.status(200).json(notes);
        }catch(error) {
            console.log("Error: ",error);
            res.status(500).json(error);
        }
    }
