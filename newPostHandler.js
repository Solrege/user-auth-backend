const mysql = require("mysql2/promise");
const config = require("./config");

const newPostHandler = async (req, res) => {
    const connection = await mysql.createConnection(config)
    const text = req.body.text
    const userId = req.userId

    try {
      const [results] = await connection.query('INSERT INTO post (userId, text) VALUES (?,?)', [userId, text])
        res.status(201).send(results)

    } catch (err) {
        console.log(err)
        return res.status(404).send("hubo un error")
    }
}

module.exports = newPostHandler