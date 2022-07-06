const express = require('express');
const {restoreUser} = require('../../utils/auth');
const {requireAuth} = require('../../utils/auth');
const {Song, Album, User} = require('../../db/models');
const {check} = require('express-validator');
const {handleValidationErrors} = require('../../utils/validation');
const router = express.Router();

const validateTitleAndUrl = [
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

router.get('/', async(req, res) => {
    const albums = await Album.findAll();

    res.json(albums);
})

router.get('/current',[requireAuth, restoreUser], async(req, res) => {
    const {id} = req.user;
    const albums = await Album.findAll({where: {userId: id}});

    res.json(albums);
})

router.post('/:albumId/songs',[requireAuth, restoreUser, validateTitleAndUrl], async(req, res) => {
    const {id} = req.user;

    const {title, description, url, imageUrl} = req.body;

    const album = await Album.findOne({where: {id: req.params.albumId}})


    if (!album) {
        res.status(404);
        res.json({
            message: "Album couldn't be found",
            statusCode: 404
        });
    }

    if (album.userId !== id) {
        res.status(403);
        res.json({
            message: 'Forbidden',
            statusCode: 403
        });
    }

    const newSong = await Song.create({
        userId: id,
        albumId: req.params.albumId,
        title: title,
        description,
        url,
        previewImage: imageUrl
    });

    const foundSong = await Song.findOne({where: {title: title}});
    // if (title) album.title = title;
    // if (description) album.description = description;
    // if (url) album.url = url;
    // if (imageUrl) album.previewImage = imageUrl;

    res.json(foundSong);
})


module.exports = router;
