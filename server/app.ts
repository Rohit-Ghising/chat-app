import  express from "express"
import cookieParser from "cookie-parser"
import {config} from "dotenv"
import fileUpload from "express-fileupload"
import cors from "cors"
import userRouter from "../server/routes/user.routes"
import { dbConnection } from "./database/db"
const app = express()
config({path :"./config/config.env"})
app.use(cors({
  origin:[process.env.FRONTEND_URL ?? ""],
  credentials:true,
  methods:["GET","POST","PUT","DELETE"]
}))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(fileUpload({useTempFiles:true,
  tempFileDir:"./temp/",
}))
dbConnection()
app.use("/api/v1/user",userRouter)

export default app