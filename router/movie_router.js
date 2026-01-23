import express from "express"
import movieController from "../controller/movie_controller.js"
import upload from "../middleware/handleFile.js"

const router = express.Router()

// GET /movies → Lista film
router.get("/", movieController.index)
// GET /movies/1 → Dettaglio film
router.get("/:id", movieController.show)
// POST /movies → Crea film + immagine
router.post("/", upload.single("image"), movieController.store)  // ← MULTER OBBLIGATORIO
// POST /movies/1/reviews → Aggiunge recensione
router.post("/:id/reviews", movieController.storeReview)

export default router
