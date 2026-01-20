import express from "express"
import movieRouter from "./router/movie_router.js"
import handleError from "./middleware/errorHandler.js"
const app = express()
const port = process.env.SERVER_PORT
app.use("/api/movies", movieRouter)

app.use(handleError)
app.listen(port, () => {
    console.log(`il server è in ascolto sulla porta ${port}`);
})