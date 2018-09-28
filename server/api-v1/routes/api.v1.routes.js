const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const artistsRouter = require('./artists.routes.js');
const apiV1Router = express.Router();

apiV1Router.all('/', (req, res) => {
  res.status(200).send('Nothing Interesting Here - API/V1');
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
