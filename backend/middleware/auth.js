const httpStatus = require('../util/httpStatus');
const tokenService=require('../services/token.service');
const userService=require('../services/user.service');
const ApiError = require('../helper/apiError');


const protect = async (req, res, next) => {
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        let token;
        token = req.headers.authorization.split(" ")[1];
        console.log('Extracted Token:', token);
        if (!token) {
            next(new ApiError("Unauthorized Access", httpStatus.unautherized))
        }

        try{
            console.log("karma")
            const decoded= await tokenService.verifyToken(token, "accessToken");
            console.log("helo")
            const currentUser= await userService.getUserById(decoded._id);

            if(!currentUser)
            {
                return new ApiError(httpStatus.unautherized, "user not found")
            }
            req.user=currentUser;
            next()

        }
        catch(e)
        {
            console.error(e); 
            next(new ApiError("Unauthorized Access", httpStatus.unautherized))
        }


    }
}

const restrictTo = (...roles) => {
    return (req, res, next) => {
        if (roles.includes(req.user.role)) {
            console.log("hello")
            return next(); // Allow the request to proceed if the role is allowed
        }

        return next(new ApiError(httpStatus.unautherized, "You are not allowed")); // Reject the request if role is not allowed
    };
};
module.exports = { protect, restrictTo };