import connection from "../database/db.js";
import slugify from "slugify";
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
                reviews: rewiewsResult,
                image: "http://localhost:6700" + film.image

            })
        })
    })

}

function store(req, res, next) {
  const { title, director, abstract } = req.body;

  console.log(req.body, req.file);

  const slug = slugify(title, {
    lower: true,
    strict: true, // rimuove caratteri speciali
  });

  const fileName = req.file?.filename || null;

  const sql =
    "INSERT INTO `movies` (`slug`, `title`,`director`, `abstract`, `image`) VALUES  (?, ?, ?, ?, ?)";

  connection.query(
    sql,
    [slug, title, director, abstract, fileName],
    (err, result) => {
      if (err) return next(err);

      res.status(201);
      return res.json({
        message: "Il film è stato salvato con successo",
        filmId: result.insertId,
        filmSlug: slug,
      });
    },
  );
}
function storeReview(req, res, next) {
    const { name, vote, text } = req.body;
    const filmId = req.params.id;
    console.log(req.params.id , req.body)
    if (!name || !vote || vote < 1 || vote > 5 || !text) {
        res.status(400);
        return res.json({
            error: "CLIENT ERROR",
            message: "name, vote (1-5) e text obbligatori"
        });
    }
    
    const sql = "INSERT INTO reviews (movie_id, name, vote, text) VALUES (?, ?, ?, ?)";
    connection.query(sql, [filmId, name, vote, text], (err, result) => {
        if (err) return next(err);
        res.status(201).json({
            message: "Review aggiunta!",
            id: result.insertId
        });
    });
}

export default { index, show,storeReview,store }