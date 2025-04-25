const userModel=require('../models/user.model')


const getUserById=async(id)=>{
    return await userModel.findById(id)
}

const updateUser=async(id,data)=>{
    return await userModel.findByIdAndUpdate(id,data, {new:true})
}

module.exports={
    getUserById, updateUser
}