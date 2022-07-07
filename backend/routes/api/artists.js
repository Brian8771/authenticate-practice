const express = require('express');
const {restoreUser} = require('../../utils/auth');
const {requireAuth} = require('../../utils/auth');
const {Song, Album, User, Comment} = require('../../db/models');
const {check} = require('express-validator');
const {handleValidationErrors} = require('../../utils/validation');
const router = express.Router();

router.get('/:id', async(req, res) => {
    const totalSongs = await Song.count({
        where: {userId: req.params.id}
    });
    const totalAlbums = await Album.count({
        where: {userId: req.params.id}
    })
    const user = await User.findOne({where: {id: req.params.id}})

    if (!user) {
        res.status(404);
        res.json({
            message: "Artist couldn't be found",
            statusCode: 404
        })
    }

    res.json({
        id: user.id,
        username: user.username,
        totalSongs: totalSongs,
        totalAlbums: totalAlbums,
        previewImage: user.previewImage
    })
})

module.exports = router;
