const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const artistsRouter = require('./artists.routes.js');
const apiV1Router = express.Router();

apiV1Router.all('/', (req, res) => {
  res.status(200).send({
    artists: 'DEPRECATED',
    artist: 'DEPRECATED',
    albums: './artists/{artist}/albums',
    album: './artists/{artist}/albums/{album}',
    songs: './{artist}/albums/{album}/songs/',
    song: './{artist}/albums/{album}/song/{songID}'
  });
});

apiV1Router.use(
  '/artists',
  (req, res, next) => {
    console.log('LOGGING FROM HOST - DELEGATING TO ARTISTS ROUTER');
    next();
  },
  artistsRouter
);

module.exports = apiV1Router;
