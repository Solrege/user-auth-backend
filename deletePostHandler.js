const mysql = require("mysql2/promise");
const config = require("./config");

const deletePostHandler = async (req, res) => {
    const connection = await mysql.createConnection(config)
    const id = req.params.id

    try {
       const [results] = await connection.query('DELETE FROM post WHERE postId = ?', id)
        res.status(200).send(results).end()

    } catch (err) {
        console.log(err)
        res.status(404).send('hubo un error')
    }
}

module.exports = deletePostHandler