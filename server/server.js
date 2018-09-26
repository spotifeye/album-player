const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { getArtist } = require('../database/index.js');
const cors = require('cors');
const server = express();
const compression = require('compression');

server.use(bodyParser.json());
server.use(cors());
server.use(express.urlencoded({ extended: true }));
server.use(express.static(path.join(__dirname, '../public')));

server.get('/artists/:artistID/albums/', (req, res) => {
  getArtist(req.params.artistID, data => {
    res.send(data);
  });
});

server.post('/artists/:artistID/albums/', (req, res) => {
  getArtist(req.params.artistID, data => {
    res.send(data);
  });
});

server.put('/artists/:artistID/albums/', (req, res) => {
  getArtist(req.params.artistID, data => {
    res.send(data);
  });
});

server.delete('/artists/:artistID/albums/', (req, res) => {
  getArtist(req.params.artistID, data => {
    res.send(data);
  });
});

module.exports = server;
