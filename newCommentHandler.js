const mysql = require("mysql2/promise");
const config = require("./config");

const connection = await mysql.createConnection(config)
const newCommentHandler = async (req, res) => {
    const comment = req.body.comment
    const userId = req.userId
    const postId = req.params.id

    try {
      const [results] = await connection.query('INSERT INTO comments (userId, comment, postId) VALUES (?,?,?)', [userId, comment, postId])
        res.status(201).send(results)

    } catch (err) {
        console.log(err)
        return res.status(404).send("hubo un error")
    }
}

module.exports = newCommentHandler