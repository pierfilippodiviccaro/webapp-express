import connection from "../database/db.js";

//index
function index(req, res, next) {
    const query = "SELECT * FROM `movies`"

    connection.query(query, (err, result) => {
        if (err) return next(err)
        const movies = result.map((movie) => {
            return {
                ...movie,
                image: "http://localhost:6700" + movie.image
            }

        })




        return res.json({
            results: movies
        })
    })
}
function show(req, res, next) {
    const id = req.params.id
    const query = "SELECT * FROM `movies` WHERE `id` = ? "
    connection.query(query, [id], (err, results) => {
        if (err) return next(err)
            
        if (results.length === 0) {
            res.status(404)
            return res.json({
                error: "not found",
                message: "film non trovato",
            })
        }
        const film = results[0]

        const reviewsQuery = "SELECT * FROM `reviews` WHERE `movie_id`=? "
        connection.query(reviewsQuery, [id], (err, rewiewsResult) => {
            if (err) return next(err)
            res.json({
                ...film,
                reviews: rewiewsResult

            })
        })
    })

}
export default { index, show }