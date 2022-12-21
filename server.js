const express=require("express")
const app=express()
const mongoose=require("mongoose")
const userController=require("./user")
const postController=require("./post")
const cors=require("cors")
const multer=require("multer")()
app.use(cors())
app.use(multer.array())
require("dotenv").config()
app.use(express.json())
app.use(express.urlencoded({extended:false}))
mongoose.set('strictQuery', true)
app.listen(3006,(err)=>{
if(!err){
    console.log("Connected Successfully at Port3006!!!")
}
else{
    console.log(err)
}
})
mongoose.connect("mongodb://localhost:27017/edaiva-assign",(data)=>{
console.log("Successfully Connected to DataBase")
},(err)=>{
console.log(err)
})
app.use("/user",userController)
app.use("/post",postController)