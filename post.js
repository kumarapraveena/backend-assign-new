const express=require("express")
const router=express.Router()
const jwt=require("jsonwebtoken")
const uploadModel=require("./modals/postModel")
const signupModel=require("./modals/userModel")
router.post("/post-image",(req,res)=>{
    try{
const userVal= jwt.verify(req.headers.authorization,process.env.secretKey)
signupModel.find({email:userVal}).then((user)=>{
    console.log(user[0].length)
    if(user.length){
        uploadModel.create(req.body).then((data)=>{
            console.log(data)
            res.status(200).send("success")
        })
    }
})
    }
    catch{
    res.status(400).send("Token is invalid")
    }
})
// uploadModel.create(req.body).then((data)=>{
//     res.status(200).send(data)
// })
router.get("/get-users",(req,res)=>{
   signupModel.find().then((user)=>{
res.status(200).send(user)
   }
   )
    // let ar=[]
    // try{
    //     const userVal= jwt.verify(req.headers.authorization,process.env.secretKey)
    //     signupModel.find({email:userVal}).then((user)=>{
    //        for(let i=0;i<user.length;i++){
    //         // res.status(200).send(user[i].email)
    //         ar.push(user[i].email)
    //        }
    //        res.status(200).send(ar)
    //     })
    //         }
    //         catch{
    //         res.status(400).send("Token is invalid")
    //         }
})
router.get("/get-image",(req,res)=>{
    try{
        const userVal= jwt.verify(req.headers.authorization,process.env.secretKey)
        signupModel.find({email:userVal}).then((user)=>{
            console.log(user[0].length)
            if(user.length){
                uploadModel.find().then((imageData)=>{
                    res.status(200).send({images:imageData})
                })
            }
        })
            }
            catch{
            res.status(400).send("Token is invalid")
            }
    // uploadModel.find().then((imageData)=>{
    //     res.status(200).send({images:imageData})
    // })
})
module.exports=router