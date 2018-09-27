const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const artists = express.Router({ mergeParams: true });
const albumsRouter = require('./albums.router.js');

module.exports = artists;
