import mongoose from "mongoose";


export const dbConnection = ()=>{
  mongoose.connect(process.env.MONGO_URI ||"",{
    dbName:"CHAT_APP"

  }).then(()=>{
    console.log("Connected to data succesfully")
  }).catch((err)=>{
    console.log(`Error connectinf dtabase ${err.message|| err}`)
  })
}