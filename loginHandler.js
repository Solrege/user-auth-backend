const mysql = require("mysql2/promise");
const config = require("./config");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
require('dotenv')

const loginHandler = async (req, res) => {
    const userEmail = req.body.userEmail
    const connection = await mysql.createConnection(config)

    try {
        const [results] = await connection.query('SELECT idUser, userEmail, password FROM user WHERE userEmail = ?', [userEmail])

        if (results.length == 0 || !bcrypt.compareSync(req.body.password, results[0].password)) {
            return res.status(404).send("usuario inexistente o contraseña inválida")
        }

        const token = jwt.sign(results[0].idUser, process.env.ACCESS_TOKEN_SECRET)

        res.status(200).send({
            message: 'Email y contraseña correctas',
            token
        })


    } catch (e) {
        console.log(e)

        return res.status(404).send("hubo un error")
    }
}

module.exports = loginHandler