const express = require('express')
const mysql = require("mysql2/promise");
const config = require("./config");
const bcrypt = require("bcrypt");

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

module.exports = loginHandler