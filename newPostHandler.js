const mysql = require("mysql2/promise");
const config = require("./config");

const newPostHandler = async (req, res) => {
    const connection = await mysql.createConnection(config)
    const text = req.body.text
    console.info(req.user)
    //const upload = req.body.upload
    connection.query('INSERT INTO post (text) VALUES (?)',
        [text],
        (err, res) => {
        if (err) {
            console.log(err)

            return
        }
        res.status(201).send('Post creado')
    })
}

module.exports = newPostHandler