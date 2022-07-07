const express = require('express');
const {restoreUser} = require('../../utils/auth');
const {requireAuth} = require('../../utils/auth');
const {Comment} = require('../../db/models');
const {check} = require('express-validator');
const {handleValidationErrors} = require('../../utils/validation');
const router = express.Router();

const validateBody = [
    check('body')
    .not()
    .isEmpty()
    .withMessage('Comment body text is required'),
    handleValidationErrors
]


router.put('/:id',[requireAuth, restoreUser, validateBody] ,async(req, res) => {
    const {id} = req.user;
    const {body} = req.body;

    const comment = await Comment.findOne({where: {id: req.params.id}});

    if(!comment) {
        res.status(404);
        res.json({
            message: "Comment couldn't be found",
            statusCode: 404
        });
    }

    if (comment.userId !== id) {
        res.status(403);
        res.json({
            message: 'Forbidden',
            statusCode: 403
        });
    }


    comment.update({
        body: body
    });

    res.json(comment);

})

router.delete('/:id', [requireAuth, restoreUser], async(req, res) => {
    const {id} = req.user;
    const {body} = req.body;

    const comment = await Comment.findOne({where: {id: req.params.id}});

    if(!comment) {
        res.status(404);
        res.json({
            message: "Comment couldn't be found",
            statusCode: 404
        });
    }

    if (comment.userId !== id) {
        res.status(403);
        return res.json({
            message: 'Forbidden',
            statusCode: 403
        });
    }

    comment.destroy()

    res.json({
        message: 'Successfully deleted',
        statusCode: 200
    })
})

module.exports = router;
