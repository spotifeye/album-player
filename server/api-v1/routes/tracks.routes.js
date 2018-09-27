const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const tracksRouter = express.Router(/* { mergeParams: true } */);

tracksRouter.get('/', (req, res, next) => {
  res.send('LOGGING GET FROM tracksRouter');
});

tracksRouter.get('/:trackID', (req, res, next) => {
  console.log('PARAMS FROM TRACK', req.params);
  res.send('LOGGING GET FROM tracksRouter - ID');
});

module.exports = tracksRouter;
