const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const tracks = express.Router({ mergeParams: true });
var albumsRouter = express.Router({ mergeParams: true });

module.exports = tracks;
