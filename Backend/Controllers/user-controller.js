import User from "../Models/User.js";


import bcrypt from "bcryptjs"
// class InsufficientLengthError extends Error{
//     constructor(message){
//         super(message)
//         this.name="InsufficientLengthError"
// }
// }

export const getAllUsers=async(req,res,next)=>{
    let users;
    try {
        users=await User.find();
        if (users.length===0) {
            return res.status(404).json({message:"No users found"})
        }else{
            return res.status(200).json({users})
        }
    } catch (error) {
        return res.status(500).json({message:"Something went wrong"})
    }
}


export const signup=async(req,res,next)=>{
    const {name,email,password}=req.body 


    let existingUser

    try {
        existingUser=await User.findOne({email})
        if (existingUser) {
            return res.status(400).json({message:"User already exists"})
        }else{
            

            const hashedPassword=bcrypt.hashSync(password,10)
            const user = new User({
              name,
              email,
              password:hashedPassword,
            });
            
            
                await user.save()
                return res.status(201).json({message:"User created",user:user})
            

        }
    } catch (error) {
        return res.status(500).json({message:"Something went wrong"})
    }

    
}


export const login=async(req,res,next)=>{
    const {email,password}=req.body

    if(!email || !password){
        return res.status(400).json({message:"Please provide email and password"})
    }

    let existingUser

    try {
        existingUser=await User.findOne({email})
        if(!existingUser){
            return res.status(404).json({message:"User not found"})
        }
        const isPasswordCorrect=bcrypt.compareSync(password,existingUser.password)

        if(!isPasswordCorrect){
            return res.status(400).json({message:"Incorrect password"})
        }
        else{
            return res.status(200).json({message:"Login successful",user:existingUser})
        }

    } catch (error) {
        return res.status(500).json({message:"Something went wrong"})
    }


}