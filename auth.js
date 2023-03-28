const jwt = require('jsonwebtoken')

const auth = async (req, res, next) => {
    try {
        const token = await req.headers.authorization.split(' ')[1]
        const decodedToken = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        req.user = await decodedToken
        next()

    } catch (err) {
        res.status(401).send('Unauthorized')

    }
}

module.exports = auth