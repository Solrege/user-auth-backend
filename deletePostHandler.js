const mysql = require("mysql2/promise");
const config = require("./config");

const deletePostHandler = async (req, res) => {
    const connection = await mysql.createConnection(config)
    const id = req.params.id

    connection.query(
        'DELETE FROM post WHERE postId = ?', id,
        (err, results) => {
            if (err) {
                console.log(err)

                return
            }
            res.status(200).end()
        }
    )
}

module.exports = deletePostHandler