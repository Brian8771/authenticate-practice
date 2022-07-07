const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const songsRouter = require('./songs.js');
const albumsRouter = require('./album.js');
const commentsRouter = require('./comments.js');
const artistsRouter = require('./artists.js');
const playlistsRouter = require('./playlists.js');
const {restoreUser} = require('../../utils/auth.js');
router.use(restoreUser);

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/songs', songsRouter);

router.use('/albums', albumsRouter);

router.use('/comments', commentsRouter);

router.use('/artists', artistsRouter);

router.use('/playlists', playlistsRouter);

router.post('/test', (req, res) => {
    res.json({requestBody: req.body});
});



module.exports = router;
