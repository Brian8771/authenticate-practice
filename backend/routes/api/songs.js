const express = require('express');
const {restoreUser} = require('../../utils/auth');
const {requireAuth} = require('../../utils/auth');
const {Song} = require('../../db/models');
const {check} = require('express-validator');

const router = express.Router();

router.get('/', async(req, res) => {
    const songs = await Song.findAll();

    res.json(songs);
})

router.get('/current', restoreUser, async(req, res) => {
    const {id}= req.user
    const songs = await Song.findAll({
        where: {userId: id}
    });

    res.json(songs);
})

module.exports = router;
