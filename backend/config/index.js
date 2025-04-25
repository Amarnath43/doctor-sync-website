

require('dotenv').config()

module.exports={
    PORT: process.env.PORT,
    DB_URL: process.env.DB_URL,
    jwt:
    {
        accessSecret:process.env.JWT_ACCESS_SECRET,
        accessExpirationMinutes:process.env.JWT_ACCESS_EXPIRATION_MINUTES
    },
    cloudinary: 
    {
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,        
        api_secret: process.env.CLOUDINARY_API_SECRET 
    }

}