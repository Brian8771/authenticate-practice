const express = require('express');

const {requireAuth} = require('../../utils/auth');
const {Song} = require('../../db/models');
const {check} = require('express-validator');

const router = express.Router();

router.get('/', async(req, res) => {
    const songs = await Song.findAll();

    res.json(songs);
})

module.exports = router;
