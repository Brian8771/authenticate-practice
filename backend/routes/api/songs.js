const express = require('express');
const {restoreUser} = require('../../utils/auth');
const {requireAuth} = require('../../utils/auth');
const {Song, Album, User} = require('../../db/models');
const {check} = require('express-validator');
const user = require('../../db/models/user');
const {handleValidationErrors} = require('../../utils/validation');
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

router.get('/', async(req, res) => {
    const songs = await Song.findAll();

    res.json(songs);
})

router.get('/current', restoreUser, async(req, res) => {
    const {id} = req.user
    const songs = await Song.findAll({
        where: {userId: id}
    });

    res.json(songs);
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
        res.json({
            message: 'Forbidden',
            statusCode: 403
        });
    }
    if (title) song.title = title;
    if (description) song.description = description;
    if (url) song.url = url;
    if (previewImage) song.previewImage = previewImage;
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
        res.json({
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
