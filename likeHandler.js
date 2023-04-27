const mysql = require("mysql2/promise");
const config = require("./config");
const getLikesHandler =  async (req, res) => {
    const connection = await mysql.createConnection(config)
    const postId = req.params.id

    try {
        const [results] = await connection.query('SELECT * FROM likes WHERE postId = ?', [ postId])
        res.status(200).send(results)

    } catch (err) {
        console.log(err)
        return res.status(404).send("hubo un error")
    }
}
const addLikeHandler =  async (req, res) => {
    const connection = await mysql.createConnection(config)
    const userId = req.userId
    const postId = req.params.id

    try {
        const [results] = await connection.query('INSERT INTO `likes` (userId, postId) VALUES (?,?)', [userId, postId])
        res.status(200).send(results)

    } catch (err) {
        console.log(err)
        return res.status(404).send("hubo un error")
    }
}
const deleteLikeHandler =  async (req, res) => {
    const connection = await mysql.createConnection(config)
    const userId = req.userId
    const postId = req.params.id

    try {
        const [results] = await connection.query('DELETE FROM `likes` WHERE `userId` = ? AND `postId` = ?', [userId, postId])
        res.status(200).send(results)

    } catch (err) {
        console.log(err)
        return res.status(404).send("hubo un error")
    }
}

module.exports = { getLikesHandler, addLikeHandler, deleteLikeHandler }