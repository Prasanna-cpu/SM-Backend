import express from 'express'

import Blog from '../Models/Blog.js'

export const getAllBlogs=async(_,res,next)=>{
    let blogs;
    try {
        blogs=await Blog.find()
        if(!blogs){
            return res.status(404).json({message:"No blogs found"})
        }else{
            return res.status(200).json({blogs})
        }
    } catch (error) {
        return res.status(500).json({message:"Something went wrong"})
    }
}

export const addBlog=async(req,res,next)=>{
    const {title,description,image,user}=req.body
    if (!title || !description || !user){
        return res.status(400).json({message:"Please fill the required fields"})
    }
    try {
        const blog=new Blog({
            title,
            description,
            image,
            user
        })
        await blog.save()
        return res.status(200).json({message:"Blog added",blog:blog})
    } catch (error) {
        return res.status(500).json({message:"Something went wrong"})
    }
}

export const updateBlog = async (req, res, next) => {
  const { title, description } = req.body;
  const blogId = req.params.id;
  try {
    let blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    blog.title = title;
    blog.description = description;
    await blog.save();
    return res.status(200).json({ message: "Blog updated", blog: blog });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const deleteBlog=async(req,res,next)=>{
    const blogId=req.params.id
    try {
        let blog=await Blog.findByIdandRemove(blogId)
        if(!blog){
            return res.status(404).json({message:"Blog not found"})
        }
        return res.status(200).json({message:"Blog deleted"})
    } catch (error) {
        return res.status(500).json({message:"Something went wrong"})
    }
}