const express = require('express');
const artistsRouter = express.Router();
const albumsRouter = require('./albums.routes.js');

artistsRouter.all('/', (req, res) => {
  res.status(200).send({
    albums: './{artist}/albums',
    album: './{artist}/albums/{album}',
    songs: './{artist}/albums/{album}/songs/',
    song: './{artist}/albums/{album}/song/{songID}'
  });
});

// Attaching albums router
artistsRouter.use(
  '/:artistID/albums',
  (req, res, next) => {
    // console.log('LOGGING FROM artistsRouter - TO ARTISTS ROUTER');
    next();
  },
  albumsRouter
);


module.exports = artistsRouter;
