import express from "express"
import movieController from "../controller/movie_controller.js"
const router=express.Router()

//index 
router.get("/",movieController.index)
//show
router.get("/:id",movieController.show)
export default router