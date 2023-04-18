const express = require('express')
require('express-group-routes')
const app = express()
const cors = require('cors')
require('dotenv').config()
const router = require('express').Router()


const loginHandler = require('./loginHandler')
const registerHandler = require('./registerHandler')
const auth = require('./auth')
const { validatorRegister } = require('./validators')
const newPostHandler = require("./newPostHandler");
const {getPostHandler, getPostByIdHandler} = require("./getPostHandler");
const deletePostHandler = require('./deletePostHandler')

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

app.post('/', loginHandler)
app.group('/homepage', (router) => {
    router.use(auth);
    router.get('/', getPostHandler);
    router.get('/:id', getPostByIdHandler);
})
app.group('/post', (router) => {
    router.use(auth)
    router.post('/', newPostHandler)
    router.delete('/:id', deletePostHandler)
})






