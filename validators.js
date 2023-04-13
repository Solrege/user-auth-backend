const { check, validationResult} = require('express-validator')

const validatorRegister = [
    check('userEmail').exists().notEmpty().isEmail(),
    check('password').notEmpty().isLength({min: 8}),

    check('passConfirmation').custom((value, {req}) => {
        if (value !== req.body.password) {
            throw new Error ('La confirmación de la contraseña no coincide')
        }
        return true
    }),
    check('name').notEmpty().isLength({min: 3}),
    check('lastName').notEmpty().isLength({min: 3}),
    check('birth').notEmpty(),


    (req, res, next) => {
        try {
            validationResult(req).throw()
            return next()
        } catch (err){
            res.status(403).send(err)
        }
    }
]

module.exports = { validatorRegister }