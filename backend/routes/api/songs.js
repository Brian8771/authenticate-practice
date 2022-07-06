const express = require('express');
const {restoreUser} = require('../../utils/auth');
const {requireAuth} = require('../../utils/auth');
const {Song, Album, User} = require('../../db/models');
const {check} = require('express-validator');
const user = require('../../db/models/user');

const router = express.Router();

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

    const artist = await User.scope("artist").findOne({

        where: {id: songs.userId}
    });

    const album = await Album.scope('albumSong').findOne({
        where: {id: songs.albumId}
    });

    res.json({songs, artist, album});
})

module.exports = router;
