
const ApiError = require('../helper/apiError');
const userService=require('../services/user.service')
const httpStatus=require('../util/httpStatus')

const edit_profile=async(req,res,next)=>{
try{
    console.log("➡️ Reached edit_profile controller");
    const updatedData=req.body;

    if (req.file && req.file.path) {
        console.log(req.file);
        updatedData.profilePicture = req.file.path; // cloudinary gives full public URL
      }
    const result=await userService.updateUser(req.user._id,updatedData);
    console.log("✅ Updated:", result);
    res.status(httpStatus.ok).json({message: "user data is updated successfully", result})


}
catch(e)
{
    return next(new ApiError(httpStatus.unautherized, "unauthorized access"));
}
}

const getUserData=async(req,res)=>{
    try
    {
        const userData=await userService.getUserById(req.user._id);
        res.status(httpStatus.ok).json({message: "user data is sent", userData})
    }
    catch(e)
    {
        return next(new ApiError(httpStatus.unautherized, "unauthorized access"));
    }
    

}

module.exports={edit_profile, getUserData}