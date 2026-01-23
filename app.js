import express from "express"
import movieRouter from "./router/movie_router.js"
import handleError from "./middleware/errorHandler.js"
import cors from "cors"
const app = express()
const port = process.env.SERVER_PORT

app.use(
  cors({
    origin: process.env.FRONTEND_URL
  }),
);
app.use(express.json())
app.use(express.static("public"))
app.use("/api/movies", movieRouter)
app.use('/movies', movieRouter);
app.use(handleError)
app.listen(port, () => {
    console.log(`il server è in ascolto sulla porta ${port}`);
})