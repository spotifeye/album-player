const postgresModel = require('../models/postgres.model.js');
const mySQLModel = require('../models/mysql.model.js');

module.exports = {
  allAlbums: {
    GET(req, res) {
      res.send('LOGGING GET FROM albumsRouter');
    },
    POST(req, res) {
      res.send('LOGGING POST FROM albumsRouter');
    },
    PUT(req, res) {
      res.send('LOGGING PUT FROM albumsRouter');
    },
    PATCH(req, res) {
      res.send('LOGGING PATCH FROM albumsRouter');
    },
    DELETE(req, res) {
      res.send('LOGGING DELETE FROM albumsRouter');
    }
  },
  oneAlbum: {
    GET(req, res) {
      res.send('LOGGING GET FROM albumsRouter - ID');
    },
    POST(req, res) {
      res.send('LOGGING POST FROM albumsRouter - ID');
    },
    PUT(req, res) {
      res.send('LOGGING PUT FROM albumsRouter - ID');
    },
    PATCH(req, res) {
      res.send('LOGGING PATCH FROM albumsRouter - ID');
    },
    DELETE(req, res) {
      res.send('LOGGING DELETE FROM albumsRouter - ID');
    }
  }
};
