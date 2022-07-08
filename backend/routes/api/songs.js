const express = require('express');
const {restoreUser} = require('../../utils/auth');
const {requireAuth} = require('../../utils/auth');
const {Song, Album, User, Comment} = require('../../db/models');
const {check} = require('express-validator');
const {handleValidationErrors} = require('../../utils/validation');
const {Op} = require('sequelize');
const router = express.Router();

const validateSongAndBody = [
    check('title')
    .not()
    .isEmpty()
    .withMessage('Song title is required'),
    check('url')
    .not()
    .isEmpty()
    .withMessage('Audio is required'),
    handleValidationErrors
];

const validateBody = [
    check('body')
    .not()
    .isEmpty()
    .withMessage('Comment body is required'),
    handleValidationErrors
]

const validatePageAndSize = [
    check('page')
    .optional()
    .isInt({min: 1, max: 10})
    .withMessage('Page must be greater than or equal to 1'),
    check('size')
    .optional()
    .isInt({min: 1, max: 20})
    .withMessage("Size must be greater than or equal to 1"),
    check("createdAt")
    .optional()
    .custom(async function(createdAt) {
        const songs = await Song.findAll({where: {createdAt: createdAt}});
        if (songs.length === 0){
            throw new Error
        }
    })
    .withMessage('CreatedAt is invalid'),
    check("title")
    .optional()
    .custom(async function(title) {
        const songs = await Song.findAll({where: {title:title}});
        if (songs.length === 0) {
            throw new Error
        }
    })
    .withMessage('title is invalid'),
    handleValidationErrors
]


router.get('/',validatePageAndSize, async(req, res) => {
    let {page, size} = req.query;
    let pagination = {}
    let where = {};
    if (req.query.title) where.title = req.query.title;

    if (req.query.createdAt) where.createdAt = req.query.createdAt;
    size = size === undefined ? 20 : parseInt(size);
    page = page === undefined ? 1 : parseInt(page);

    pagination.limit = size
    pagination.offset = size * (page - 1)
    const songs = await Song.findAll({where, ...pagination});


    res.json({songs, page, size});
})

router.get('/current',[requireAuth, restoreUser], async(req, res) => {
    const {id} = req.user
    const songs = await Song.findAll({
        where: {userId: id}
    });

    res.json(songs);
})

router.get('/:songId/comments', async(req, res) => {
    const comments = await Comment.findAll({
        include: {
            model: User,
            attributes: ['id', 'username']
        },
        where: {songId: req.params.songId}});
    if (comments.length === 0) {
        res.status(404);
        return res.json({
            message: "Song couldn't be found",
            statusCode: 404
        })
    }
    res.json({comments});
})

router.post('/:songId/comments', [requireAuth, restoreUser, validateBody] ,async(req, res) => {
    const {id} = req.user;
    const {body} = req.body;
    const song = await Song.findOne({where: {id: req.params.songId}});

    if (!song) {
        res.status(404);
        res.json({
            message: "Song couldn't be found",
            statusCode: 404
        })
    }
    const comments = await Comment.findAll({where: {body:body, userId:id}});

    if (comments.length !== 0) {
        return res.json({
            message: "Can't have duplicate comments by same user"
        })
    }

    const newComment = await Comment.create({
        userId: id,
        songId: req.params.songId,
        body: body
    })



    const comment = await Comment.findAll({where: {body:body, userId:id}})


    res.json(comment);
})

router.get('/:id', async(req, res) => {
    const {id} = req.params;
    const songs = await Song.findOne({

        where: {id: id}
    })

    if (!songs) {
        res.status(404)
        return res.json({
            message: "Song couldn't be found",
            statusCode: 404
        })
    }

    const artist = await User.scope("Artist").findOne({

        where: {id: songs.userId}
    });

    const album = await Album.scope('albumSong').findOne({
        where: {id: songs.albumId}
    });

    res.json({songs, artist, album});
})

router.put('/:id', [requireAuth, restoreUser, validateSongAndBody], async(req, res) => {
    const {title, description, url, previewImage} = req.body;
    const {id} = req.user;
    const song = await Song.findOne({where: {id: req.params.id}});

    if (!song) {
        res.status(404);
        res.json({
            message: "Song could't be found",
            statusCode: 404
        })
    }
    if (song.userId !== id) {
        res.status(403);
        return res.json({
            message: 'Forbidden',
            statusCode: 403
        });
    }
    if (title) song.update({title: title})
    if (description) song.update({description: description});
    if (url) song.update({url: url});
    if (previewImage) song.update({previewImage: previewImage});
    res.json(song)
})

router.delete('/:id',[requireAuth, restoreUser], async(req, res) => {
    const {id} = req.user;
    const song = await Song.findOne({where: {id: req.params.id}});

    if (!song) {
        res.status(404);
        res.json({
            message: "Song could't be found",
            statusCode: 404
        })
    }

    if (song.userId !== id) {
        res.status(403);
        return res.json({
            message: 'Forbidden',
            statusCode: 403
        });
    }

    await song.destroy();

    res.json({
        message: "Successfully deleted",
        statusCode: 200
    });
})

module.exports = router;
