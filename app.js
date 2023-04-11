const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const loginHandler = require('./loginHandler')
const registerHandler = require('./registerHandler')
const auth = require('./auth')
const { validatorRegister } = require('./validators')

app.use(express.json())
app.use(cors())

const PUERTO = process.env.PUERTO || 8000
app.listen(PUERTO, () => {
    console.log(`El servidor está escuchando en el puerto ${PUERTO}`)
})
app.get('/', (req, res) => {
    res.status(200).send('holis')
})

app.post('/register', validatorRegister, registerHandler)

app.post('/login', loginHandler)


/*app.group("/user", (router) => {
    //todas estas rutas van a necesitar auth
    router.use(auth)

    router.post('/profile', (req, res) => {
        res.status(200).send('Autorizado a acceder')
    })

    router.post('/settings', (req, res) => {
        res.status(200).send('Autorizado a acceder')
    })
})*/






