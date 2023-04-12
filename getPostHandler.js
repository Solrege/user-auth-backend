const mysql = require("mysql2/promise");
const config = require("./config");

const getPostHandler = async (req, res) => {
    const connection =  await mysql.createConnection(config)

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

    try {
        const results = await connection.query('SELECT * FROM `post` WHERE `postId` = ?', id)
        res.status(200).send(results)
    } catch (err) {
        console.log(err)
        return res.status(404).send("hubo un error")
    }
}

module.exports = { getPostHandler, getPostByIdHandler }