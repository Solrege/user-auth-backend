const mysql = require("mysql2/promise");
const config = require("./config");
const bcrypt = require("bcrypt");

const registerHandler = async (req, res) => {
    const connection = await mysql.createConnection(config)

    const { userEmail, name, lastName, birth } = req.body
    const hashedPassword = bcrypt.hashSync((req.body.password, req.body.passConfirmation), 10)

    try {
        const [results] = await connection.query(
            'INSERT INTO user (userEmail, password, passConfirmation, name, lastName, birth) VALUES (?, ?, ?, ?, ?, ?)',
            [userEmail, hashedPassword, hashedPassword, name, lastName, birth])

        res.status(201).send({
            "message": 'Usuario creado',
            results
        })
    } catch (e) {
        console.log(e)

        return res.status(500).send({
            "message": 'Error al crear usuario'
        })
    }

    bcrypt.hash((req.body.password, req.body.passConfirmation), 10)
        .then((hashedPassword) => {

        })
        .catch((err) => {
            res.status(500).send({
                "message": 'Password not hashed', err
            })
        })
}

module.exports = registerHandler