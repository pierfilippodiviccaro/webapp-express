import connection from "../database/db.js";

//index
function index(req, res, next) {
    const query = "SELECT * FROM `movies`"
    connection.query(query, (err, result) => {
        if (err) return next(err)
        return res.json({
            results: result
        })
    })
}
function show(req,res,next){
    const id= req.params.id
    const query= "SELECT * FROM `movies` WHERE `id` = ? "
    connection.query(query, [id],(err,results) => {
        if(err) return next (err)
        if(results.length=== 0){
            res.status(404)
            return res.json({
                error:"not found",
                message:"film non trovato",
            })
        }
        const film = results[0]
        res.json(film)
    })

}
export default { index , show}