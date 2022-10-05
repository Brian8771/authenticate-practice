const express = require('express');
const { restoreUser } = require('../../utils/auth');
const { requireAuth } = require('../../utils/auth');
const { Song, Album, User, Playlist } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();

router.get('/:id', async (req, res) => {
    const totalSongs = await Song.count({
        where: { userId: req.params.id }
    });
    const totalAlbums = await Album.count({
        where: { userId: req.params.id }
    })
    const user = await User.findOne({ where: { id: req.params.id } })

    if (!user) {
        res.status(404);
        res.json({
            message: "Artist couldn't be found",
            statusCode: 404
        })
    }

    res.json({
        user,
        // username: user.username,
        totalSongs: totalSongs,
        totalAlbums: totalAlbums,
        // previewImage: user.previewImage
    })
})

router.get('/:id/songs', async (req, res) => {
    const songs = await Song.findAll({ where: { userId: req.params.id } });

    if (songs.length === 0) {
        res.status(404);
        res.json({
            message: "Artist couldn't be found",
            statusCode: 404
        })
    }

    res.json(songs)
})

router.get('/:id/albums', async (req, res) => {
    const albums = await Album.findAll({ where: { userId: req.params.id } });

    if (albums.length === 0) {
        res.status(404);
        res.json({
            message: "Artist couldn't be found",
            statusCode: 404
        })
    }

    res.json(albums)
})

router.get('/:id/playlists', async (req, res) => {
    const playlist = await Playlist.findAll({ where: { userId: req.params.id } });

    if (playlist.length === 0) {
        res.status(404);
        res.json({
            message: "Artist couldn't be found",
            statusCode: 404
        })
    }

    res.json(playlist)
})

module.exports = router;
