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

const validateTitle = [
    check('title')
    .not()
    .isEmpty()
    .withMessage('Album title is required'),
    handleValidationErrors
]

router.get('/', async(req, res) => {
    const albums = await Album.findAll();

    res.json(albums);
})

router.get('/current',[requireAuth, restoreUser], async(req, res) => {
    const {id} = req.user;
    const albums = await Album.findAll({where: {userId: id}});

    res.json(albums);
})

router.get('/:id', async(req, res) => {
    const album = await Album.findOne({where: {id: req.params.id}});

    if (!album) {
        res.status(404);
        res.json({
            message: "Album couldn't be found",
            statusCode: 404
        })
    }

    const artist = await User.scope('Artist').findOne({where: {id: album.userId}})

    const songs = await Song.findAll({where: {albumId: album.id}});

    res.json({album, artist, songs})
})

router.post('/', [requireAuth, restoreUser, validateTitle], async(req, res) => {
    const {id} = req.user;
    const {title, description, imageUrl} = req.body;

    const newAlbum = await Album.create({
        userId: id,
        title,
        description,
        previewImage: imageUrl
    });

    const album = await Album.findOne({where: {title: title}});
    res.status(201);
    res.json(album);

})

router.put('/:id',[requireAuth, restoreUser, validateTitle], async(req, res) => {
    const {id} = req.user;
    const {title, description, imageUrl} = req.body;

    const fixAlbum = await Album.findOne({where: {id: req.params.id}});


    if (!fixAlbum) {
        res.status(404);
        res.json({
            message: "Album couldn't be found",
            statusCode: 404
        })
    }

    if (fixAlbum.userId !== id) {
        res.status(403);
        return res.json({
            message: 'Forbidden',
            statusCode: 403
        });
    };

    if (title) fixAlbum.update({title: title});
    if (description) fixAlbum.update({description: description});
    if (imageUrl) fixAlbum.update({previewImage: imageUrl});

    res.json(fixAlbum);
});
router.delete('/:id', [requireAuth, restoreUser],async(req,res) => {
    const {id} = req.user;

    const album = await Album.findOne({where: {id: req.params.id}});

    if (!album) {
        res.status(404);
        return res.json({
            message: "Couldn't be found",
            statusCode: 404
        })
    };

    if (album.userId !== id) {
        res.status(403);
        return res.json({
            message: 'Forbidden',
            statusCode: 403
        })
    };

    await album.destroy();

    res.json({
        message: "Successfully deleted",
        statusCode: 200
    })
})

router.post('/:albumId/songs',[requireAuth, restoreUser, validateTitleAndUrl], async(req, res) => {
    const {id} = req.user;

    const {title, description, url, imageUrl} = req.body;

    // const album = await Album.findOne({where: {id: req.params.albumId}})


    // if (!album) {
    //     res.status(404);
    //     res.json({
    //         message: "Album couldn't be found",
    //         statusCode: 404
    //     });
    // }

    // if (album.userId !== id) {
    //     res.status(403);
    //     return res.json({
    //         message: 'Forbidden',
    //         statusCode: 403
    //     });

    // }
    if (url.length > 3 && !url.endsWith('.wav')) {
        res.status(403);
        return res.json({
            message: 'Url has to end with .wav',
            statusCode: 403
        })
    }

    if (!imageUrl.endsWith('.jpg')) {
        res.status(403);
        return res.json({
            message: 'Image Url has to end with .jpg',
            statusCode: 403
        })
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
    res.status(201);
    res.json(foundSong);
})


module.exports = router;
