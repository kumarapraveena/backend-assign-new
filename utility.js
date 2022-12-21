const userModel=require("./modals/userModel")
const mongoose=require("mongoose")
const bcrypt=require("bcryptjs")
const checkExistingUser=async(email)=>{
    let exist=false;
    await userModel.find({email:email}).then((user)=>{
        if(user.length){
            exist=true
        }
    })
    return exist;
}
const generatePasswordHash=(password)=>{
    let salt=10;
    return new Promise((resolve,reject)=>{
        bcrypt.genSalt(salt).then((hashSalt)=>{
            bcrypt.hash(password,hashSalt).then((passwordHash)=>{
    resolve(passwordHash)
            })
        })
    })
    }
    module.exports={checkExistingUser,generatePasswordHash}