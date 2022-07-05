const express = require('express');

const {setTokenCookie, restoreUser} = require('../../utils/auth');
const {User} = require('../../db/models');
const {check} = require('express-validator');
const {handleValidationErrors} = require('../../utils/validation');
const router = express.Router();

const validateLogin = [
    check('credential')
        .notEmpty()
        .withMessage('Email is required'),
    check('password')
        .exists({checkFalsy: true})
        .withMessage('Password is required'),
    handleValidationErrors
];

router.get('/', restoreUser, (req, res) => {
    const {user} = req;
    if (user) {
        return res.json(
            user.toSafeObject()
        );
    }else return res.json({});
}
);

router.post('/',
validateLogin, async (req, res, next) => {
    const {credential, password} = req.body;

    const user = await User.login({credential, password});

    if (!user) {
        const err = new Error('Invalid Credentials');
        err.status = 401;
        err.title = 'Invalid Credentials';
        err.errors = ['Invalid Credentials'];
        return next(err);
    }

    const token = await setTokenCookie(res, user);

    return res.json({
        user, token
    });
}
);

router.delete('/', (_req, res) => {
    res.clearCookie('token');
    return res.json({message: 'success'})
})

module.exports = router;
