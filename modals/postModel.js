const mongoose=require("mongoose")
const uploadSchema=mongoose.Schema({
    // username:String,
    image:String
})
const Upload=mongoose.model("upload",uploadSchema)
module.exports=Upload