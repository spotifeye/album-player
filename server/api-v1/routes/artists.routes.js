const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const artistsRouter = express.Router();
const albumsRouter = require('./albums.routes.js');

// GET
artistsRouter.get('/', (req, res, next) => {
  console.log('LOGGING GET FROM artistsRouter');
  res.send('LOGGING GET FROM artistsRouter');
});

artistsRouter.get('/:artistID', (req, res, next) => {
  res.send('LOGGING GET FROM artistsRouter - ID');
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
