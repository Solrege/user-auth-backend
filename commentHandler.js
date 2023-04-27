const mysql = require("mysql2/promise");
const config = require("./config");
const getCommentHandler = async (req, res) => {
    const connection = await mysql.createConnection(config)
    const postId = req.params.id

    try {
        const [results] = await connection.query(
            'SELECT comments.*, user.name, user.lastName FROM `comments`' +
            'LEFT JOIN `post` ON comments.postId = post.postId ' +
            'LEFT JOIN `user` ON comments.userId = user.userId ' +
            'WHERE comments.postId = ?', [postId])
        res.status(200).send(results)

    } catch (err) {
        console.log(err)
        return res.status(404).send("hubo un error")
    }
}
const newCommentHandler = async (req, res) => {
    const connection = await mysql.createConnection(config)
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
const deleteCommentHandler = async (req, res) => {
    const connection = await mysql.createConnection(config)
    const postId = req.params.id
    const commentId= req.params.commentId

    try {
        const [results] = await connection.query('DELETE FROM comments WHERE commentId = ?', postId, commentId)
        res.status(200).send(results)

    } catch (err) {
        console.log(err)
        return res.status(404).send("hubo un error")
    }
}


module.exports = {getCommentHandler, newCommentHandler, deleteCommentHandler}