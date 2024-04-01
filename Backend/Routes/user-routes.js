

import express from 'express'
import { getAllUsers, signup,login } from '../Controllers/user-controller.js'


export const router=express.Router()

router.get("/",getAllUsers)


router.post("/signup",signup)


router.post("/login",login)




