const mysql = require("mysql2/promise");
const config = require("./config");
const getPostHandler = async (req, res) => {
    const connection = await mysql.createConnection(config)

    try {
        const [results] = await connection.query(
            'SELECT post.*, user.name, user.lastName FROM `post` LEFT JOIN `user` ON post.userId = user.userId')
       res.status(200).send(results)

    } catch (err) {
        console.log(err)
        return res.status(404).send("hubo un error")
    }
}

const getPostByIdHandler = async (req, res) => {
    const connection = await mysql.createConnection(config)
    const id = req.params.id


    let userId = parseInt(id, 10)
    if (!userId) {
        userId = req.userId
    }

    try {
        const [results] = await connection.query('SELECT * FROM `post` WHERE `userId` = ?', userId)
        res.status(200).send(results)

    } catch (err) {
        console.log(err)
        return res.status(404).send("hubo un error")
    }
}

module.exports = { getPostHandler, getPostByIdHandler }