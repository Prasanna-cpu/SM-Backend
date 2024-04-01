import express from "express";
import dotenv from 'dotenv';
import connectDB from "./Database/connectDB.js";
import { router } from "./Routes/user-routes.js";
import { blogRouter } from "./Routes/blog-routes.js";


dotenv.config()


const url=process.env.URL
const port=process.env.PORT
const app=express()

app.use(express.json())

// app.use("/api",(req,res,next)=>{
//     res.send("Hello")
// })


app.listen(port,()=>{
    console.log(`SERVER IN ${port}`);
})


connectDB(url)


app.use("/api/user",router)

app.use("/api/blog",blogRouter)

