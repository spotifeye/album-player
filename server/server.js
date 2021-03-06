const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const server = express();
const compression = require('compression');

const apiV1Router = require('./api-v1/routes/api.v1.routes.js');

server.use(bodyParser.json());
server.use(cors());
server.use(compression());
server.use(express.urlencoded({ extended: true }));
server.use('/', express.static(path.join(__dirname, '../public')));

server.use('/artists/:artistID', express.static(path.join(__dirname, '../public')));

// server.get('/', (req, res, next) => {
//   res.send('LOGGING GET FROM HOST');
// });

server.use(
  '/api/v1',
  (req, res, next) => {
    // console.log('LOGGING FROM HOST - DELEGATING TO ARTISTS ROUTER');
    next();
  },
  apiV1Router
);

server.all('/*', (req, res, next) => {
  res.status(404).send('404 NOT FOUND');
});

module.exports = server;
