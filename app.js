import express from "express"
 import movieRouter from "./router/movie_router.js"

const app=express()
const port= process.env.SERVER_PORT
 app.use("/api/movies", movieRouter)
app.listen(port,()=>{
    console.log(`il server è in ascolto sulla porta ${port}`);
    })