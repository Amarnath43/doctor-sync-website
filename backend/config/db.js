const mongoose=require('mongoose')
const config=require('.');
mongoose.set("strictQuery", true)

console.log("✅ DB_URL from .env:", process.env.DB_URL);

mongoose.connect(config.DB_URL).then(()=>
{
    console.log("DB is connected")
}).catch((e)=>
{
    console.log("DB is not connected")
    console.log(e)
})

mongoose.connection.on("connected",()=>
{
    console.log("mongoose default connection is open to" +config.DB_URL)
})

mongoose.connection.on("error",(err)=>
    {
        console.log("mongoose default connection has an error" +err)
    })

    mongoose.connection.on("disconnected",()=>
        {
            console.log("mongoose default connection is disconnected")
        })

//Before shutting down the server, we are clearing the MongoDB connection to prevent unwanted resource usage.

process.on("SIGINT", ()=>
{
    process.exit(0)
})

module.exports=mongoose.connection