const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const mysql = require("mysql2/promise");
require('dotenv').config()
const config = require("./config");

//const jwt = require("jsonwebtoken");

app.use(express.json())

const PUERTO = process.env.PUERTO || 3000
app.listen(PUERTO, () => {
    console.log(`El servidor está escuchando en el puerto ${PUERTO}`)
})

app.get('/', (req, res) => {
    res.status(200).send('holis')
})

app.post('/register', async (req, res) => {
    const connection = await mysql.createConnection(config)
    const userEmail = req.body.userEmail
    const hashedPassword = bcrypt.hashSync(req.body.password, 10)

    try {
        const [results] = await connection.query('INSERT INTO user (userEmail, password) VALUES (?, ?)', [userEmail, hashedPassword])

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

    bcrypt.hash(req.body.password, 10)
        .then((hashedPassword) => {

        })
        .catch((err) => {
            res.status(500).send({
                "message": 'Password not hashed', err
            })
        })
})

const loginHandler = async (req, res) => {
    const userEmail = req.body.userEmail
    const connection = await mysql.createConnection(config)

    try {
        const [results] = await connection.query('SELECT userEmail, password FROM user WHERE userEmail = ?', [userEmail])

        if (results.length == 0 || !bcrypt.compareSync(req.body.password, results[0].password)) {
            return res.status(404).send("usuario inexistente o contraseña inválida")
        }

        return res.status(200).send({
            message: 'Email y contraseña correctas'

        })
    } catch (e) {
        console.log(e)

        return res.status(404).send("hubo un error")
    }
}

app.post('/login', loginHandler)





