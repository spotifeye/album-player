const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const artistsRouter = express.Router();
const albumsRouter = require('./albums.routes.js');

artistsRouter.all('/', (req, res) => {
  res.status(200).send('Nothing Interesting Here - ARTISTS');
});

artistsRouter.use(
  '/:artistID/albums',
  (req, res, next) => {
    console.log('LOGGING FROM artistsRouter - TO ARTISTS ROUTER');
    next();
  },
  albumsRouter
);

module.exports = artistsRouter;
