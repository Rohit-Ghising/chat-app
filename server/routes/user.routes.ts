import express from "express"
import { getUser, signup } from "../controller/user.controller"
const router = express.Router()




router.post("/sign-up",signup)

export default router
