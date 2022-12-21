const express=require("express")
const router=express.Router()
const userModel=require("./modals/userModel")
const {checkExistingUser}=require("./utility")
const {generatePasswordHash}=require("./utility")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
router.post("/signup",async(req,res)=>{
if(await checkExistingUser(req.body.email)){
    res.status(400).send(`User Exists Try With Different User`)
}
else{
    generatePasswordHash(req.body.password).then((passwordHash)=>{
        userModel.create({email:req.body.email,password:passwordHash,id:req.body.id}).then(()=>{
            res.status(200).send(`User Registered Successfully!!!`)
        }).catch((err)=>{
            res.status(400).send(err)
        })
    }).catch((err)=>{
        res.status(400).send(err)
    })
    // userModel.create({email:req.body.email,password:req.body.password}).then(()=>{
    //     res.status(200).send(`User Registered Successfully!!!`)
    // })
}
})
router.post("/login",(req,res)=>{
    userModel.find({email:req.body.email}).then((userData)=>{
        if(userData.length){
bcrypt.compare(req.body.password,userData[0].password).then((val)=>{
    if(val){
        const authToken=jwt.sign(userData[0].email,process.env.secretKey)
        res.status(200).send({authToken})
        }
        else{
            res.status(400).send("Password is incorrect")
        }
})
        }
        else{
            res.status(400).send("User Not Found")
        }
    })
})
module.exports=router