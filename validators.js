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
        const result = validationResult(req)
        if (result.isEmpty()) {
            return next()
        }

        res.status(400).send({ errors: result.array() });
    }
]

module.exports = { validatorRegister }