const express = require('express');

const {setTokenCookie, requireAuth} = require('../../utils/auth');
const {User} = require('../../db/models');
const {check} = require('express-validator');
const {handleValidationErrors, handleRepeats} = require('../../utils/validation');

const router = express.Router();

const validateSignup = [
    check('email')
        .isEmail()
        .withMessage('Invalid email'),
    check('username')

        .isLength({min: 4})
        .withMessage('Username is required'),
    check('firstName')
        .not()
        .isEmpty()
        .withMessage('First Name is required'),
    check('lastName')
        .not()
        .isEmpty()
        .withMessage('Last Name is required'),
    handleValidationErrors
];

const checkRepeats = [
    check('email')
    .exists()
    .withMessage("User with that email already exists"),
    check('username')
    .exists()
    .withMessage('"User with that username already exists"'),
    handleRepeats
]

router.post('/', [validateSignup, checkRepeats], async(req, res) => {
    const {firstName, lastName, email, password, username} = req.body;

    const user = await User.signup({firstName, lastName, email, username, password});

    const token = await setTokenCookie(res, user);

    return res.json({
        user, token
    });
}
);



module.exports = router;
