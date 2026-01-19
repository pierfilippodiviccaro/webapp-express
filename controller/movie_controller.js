import connection from "../database/db.js";

//index
function index(req, res, next) {
    const query = "SELECT* FROM `movies`"
    connection.query(query, (err, result) => {
        if (err) return next(err)
        return res.json({
            results: result
        })
    })
}
export default { index }