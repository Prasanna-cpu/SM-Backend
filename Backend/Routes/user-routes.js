

import express from 'express'
import { getAllUsers, signup } from '../Controllers/user-controller.js'


export const router=express.Router()

router.get("/",getAllUsers)


router.post("/signup",signup)


