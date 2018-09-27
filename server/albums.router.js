const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
var albums = express.Router({ mergeParams: true });
const tracksRouter = require('./tracks.router.js');

module.exports = albums;
