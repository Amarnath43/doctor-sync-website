const express=require("express");
const userController=require("../controllers/user.controller")
const authMiddleware=require('../middleware/auth');
const asyncHandler=require('../helper/asyncHandler')
const validate=require('../middleware/validate');
const {userValidation }=require('../validations/user.validation')
const upload = require('../middleware/multer');


const router=express.Router();

router.post('/edit_profile', authMiddleware.protect,upload.single('profileImage'),validate(userValidation), asyncHandler(userController.edit_profile) );

router.get('/', authMiddleware.protect, asyncHandler(userController.getUserData))

module.exports=router;