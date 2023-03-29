const express = require('express')
const app = express()
require('dotenv').config()
const loginHandler = require('./loginHandler')
const registerHandler = require('./registerHandler')
const auth = require('./auth')

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

app.post('/auth-endpoint', auth, (req, res) => {
    res.status(200).send('Autorizado a acceder')
} )





