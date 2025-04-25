const express=require("express")
const cors=require("cors")
const cookieParser=require('cookie-parser')
const authRoute=require('./routes/auth.routes')
const userRoute=require('./routes/user.route')


const app=express()
require("./config/db")

const config=require('./config');

app.use(cors({
    origin: 'http://localhost:5173', // ✅ match your frontend port
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  }));
  
app.use(express.json())

app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

app.use('/auth', authRoute)
app.use('/user', userRoute)


module.exports=app;