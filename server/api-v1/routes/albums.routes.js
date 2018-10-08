const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
var albumsRouter = express.Router({ mergeParams: true });
const songsRouter = require('./songs.routes.js');
const albumsController = require('../controllers/albums.controller.js');

albumsRouter.get('/', albumsController.allAlbums.GET);
albumsRouter.get('/:albumID', albumsController.oneAlbum.GET);

albumsRouter.post('/', albumsController.allAlbums.POST);
albumsRouter.post('/:albumID', albumsController.oneAlbum.POST);

albumsRouter.put('/', albumsController.allAlbums.PUT);
albumsRouter.put('/:albumID', albumsController.oneAlbum.PUT);

albumsRouter.delete('/', albumsController.allAlbums.DELETE);
albumsRouter.delete('/:albumID', albumsController.oneAlbum.DELETE);

albumsRouter.use(
  '/:albumID/songs',
  (req, res, next) => {
    console.log(req.params);
    console.log('LOGGING FROM albumsRouter - TO ARTISTS ROUTER');
    next();
  },
  songsRouter
);

module.exports = albumsRouter;
