const express = require('express');
const {restoreUser} = require('../../utils/auth');
const {requireAuth} = require('../../utils/auth');
const {Song, Album, User, Playlist, PlaylistSong} = require('../../db/models');
const {check} = require('express-validator');
const {handleValidationErrors} = require('../../utils/validation');
const router = express.Router();

const validateBody = [
    check('name')
    .not()
    .isEmpty()
    .withMessage('Playlist name is required'),
    handleValidationErrors
]
router.get('/current', [requireAuth, restoreUser], async(req, res) => {
    const {id} = req.user;

    const playlist = await Playlist.findAll({where: {userid: id}});

    res.json({playlist})
})

router.post('/',[requireAuth, restoreUser, validateBody], async(req, res) => {
    const {id} = req.user;
    const {name, imageUrl} = req.body;
    let playlistFinder = await Playlist.findOne({where: {name: name, userId: id}})
    if (playlistFinder){
        return res.json({
            message: "Playlist name and user already exist"
        })
    }
    await Playlist.create({
        userId: id,
        name: name,
        previewImage: imageUrl
    })

    const playlist = await Playlist.findOne({where: {name: name, userId: id}})

    res.json(playlist)
})

router.put('/:id', [requireAuth, restoreUser, validateBody], async(req, res) => {
    const {id} = req.user;
    const {name, imageUrl} = req.body;

    const playlists = await Playlist.findOne({where:{id: req.params.id}});

    if (!playlists) {
        res.status(404);
        res.json({
            message: "Playlist couldn't be found",
            statusCode: 404
        });
    }
    playlists.update({name: name});
    if (imageUrl) playlists.update({previewImage: imageUrl});

    res.json({
        playlists
    })
})

router.get('/:id', async(req, res) => {
    const playlists = await Playlist.findAll({
        include: [{model: Song, through: {attributes:[]}}

                    ],
                    attributes: {},
                    where: {id: req.params.id},

    })
    if (!playlists.length) {
        res.status(404);
        return res.json({
            message: "Playlist couldn't be found",
            statusCode: 404
        });
    }


    res.json({playlists})
})

router.delete('/:id', [requireAuth, restoreUser], async(req, res) => {
    const {id} = req.user;

    const playlist = await Playlist.findOne({where: {id: req.params.id}});

    if (!playlist) {
        res.status(404);
        return res.json({
            message: "Playlist couldn't be found",
            statusCode: 404
        });
    }

    if (playlist.userId !== id) {
        res.status(403);
        return res.json({
            message: 'Forbidden',
            statusCode: 403
        });
    };

    await playlist.destroy();

    res.json({
        message: "Successfully deleted",
        statusCode: 404
    })

})

router.post('/:playlistId/songs', [requireAuth, restoreUser], async(req, res) => {
    const {id} = req.user;
    const {songId} = req.body;

    const playlist = await Playlist.findOne({where: {id: req.params.playlistId}});
    const song = await Song.findOne({where: {id: songId}});

    if (!playlist) {
        res.status(404);
        res.json({
                message: "Playlist couldn't be found",
                statusCode: 404
        })
    }
    if (!song) {
        res.status(404);
        res.json({
            message: "Song couldn't be found",
            statusCode: 404
          });
    }

    if (playlist.userId !== id) {
        res.status(403);
        return res.json({
            message: 'Forbidden',
            statusCode: 403
        });
    }
    let playlists = await PlaylistSong.findOne({where: {playlistId: req.params.playlistId, songId: songId}})
    if (playlists) {
        return res.json("Song exists in playlist")
    }
    else {
        await PlaylistSong.create({
            playlistId: req.params.playlistId,
            songId: songId
        });

    }


    const playlistSong = await PlaylistSong.findOne({where: {playlistId: req.params.playlistId, songId: songId}})

    res.json({
        playlistSong,

});
})

module.exports = router;
