const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
var albumsRouter = express.Router({ mergeParams: true });
// const tracksRouter = require('./tracks.routes.js');
const albumsController = require('../controllers/albums.controller.js');

albumsRouter.get('/', albumsController.allAlbums.GET);

albumsRouter.get('/:albumID', albumsController.oneAlbum.GET);

// albumsRouter.use(
//   '/:albumID/tracks',
//   (req, res, next) => {
//     console.log(req.params);
//     console.log('LOGGING FROM albumsRouter - TO ARTISTS ROUTER');
//     next();
//   },
//   tracksRouter
// );

module.exports = albumsRouter;
