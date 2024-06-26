import express from 'express'
import { getAllBlogs,addBlog, updateBlog, deleteBlog } from '../Controllers/blog-controller.js'


export const blogRouter=express.Router()


blogRouter.get("/",getAllBlogs)

blogRouter.post("/add",addBlog)

blogRouter.put("/update/:id",updateBlog)

blogRouter.delete("/delete/:id",deleteBlog)
