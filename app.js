const express = require('express')
const app = express()
require('dotenv').config()
const loginHandler = require('./loginHandler')
const registerHandler = require('./registerHandle')

//const jwt = require("jsonwebtoken");

app.use(express.json())

const PUERTO = process.env.PUERTO || 3000
app.listen(PUERTO, () => {
    console.log(`El servidor está escuchando en el puerto ${PUERTO}`)
})
app.get('/', (req, res) => {
    res.status(200).send('holis')
})

app.post('/register', registerHandler)

app.post('/login', loginHandler)





