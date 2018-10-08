const express = require('express');
const songsRouter = express.Router({ mergeParams: true });
const songsController = require('../controllers/songs.controller.js');

songsRouter.get('/', songsController.allSongs.GET);
songsRouter.get('/:songID', songsController.oneSong.GET);

songsRouter.post('/', songsController.allSongs.POST);
songsRouter.post('/:songID', songsController.oneSong.POST);

songsRouter.put('/', songsController.allSongs.PUT);
songsRouter.put('/:songID', songsController.oneSong.PUT);

songsRouter.delete('/', songsController.allSongs.DELETE);
songsRouter.delete('/:songID', songsController.oneSong.DELETE);

songsRouter.all('/', (req, res) => {
  res.sendStatus(405);
});
songsRouter.all('/:songID', (req, res) => {
  res.sendStatus(405);
});

module.exports = songsRouter;
