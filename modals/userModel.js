const mongoose=require("mongoose")
const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    id:{
        type:Number,
        required:true
    }
})
const userModel=mongoose.model("login-signup",userSchema)
module.exports=userModel