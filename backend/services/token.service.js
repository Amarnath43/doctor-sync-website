const jwt=require('jsonwebtoken');
const moment=require('moment');
const config=require('../config');

const generateToken=(userId,expires,secret)=>
{
    const payload={
        _id:userId,
        iat:moment().unix(),
        exp:expires.unix(),
    };
    return jwt.sign(payload,secret)
};
const generateAuthToken=(user)=>
{
    const accessTokenExpires=moment().add(config.jwt.accessExpirationMinutes, "minutes");
    console.log("🧾 Signing token using secret:", config.jwt.accessSecret); 
    const accessToken=generateToken(user._id, accessTokenExpires, config.jwt.accessSecret);

    return accessToken;
}

const verifyToken=async(token,type)=>
{
    if(type==="accessToken")
    {
        console.log('Token:', token);
        console.log("🔐 Using secret:", config.jwt.accessSecret);
        return await jwt.verify(token, config.jwt.accessSecret)
    }
    else if(type==="verify")
    {
        return await jwt.verify(token, config.jwt.verificationSecret)
    }
}

module.exports={generateAuthToken,verifyToken}