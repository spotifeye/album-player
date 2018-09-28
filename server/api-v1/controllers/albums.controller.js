const postgresModel = require('../models/postgres.model.js');
const mySQLModel = require('../models/mysql.model.js');

module.exports = {
  allAlbums: {
    GET(req, res) {
      res.send('LOGGING GET FROM albumsRouter');
      /* TODO: 
      If previously deleted
      status: 404 NOT FOUND
      If no matching albumID found
      status: 400 BAD REQUEST
      status: 200 OK  // FIXME: 404 if query did not find.
      data: [album 1, album2, ... album n]*/
    },
    POST(req, res) {
      res.send('LOGGING POST FROM albumsRouter');
      /* TODO:
      status: 201 Created
      creates an album with all the nested info
      location: albums/[newID]*/
    },
    PUT(req, res) {
      // 405 Method Not Allowed: no practical use case to swap out the entire album library of an artist
      res.sendStatus(405);
    },
    PATCH(req, res) {
      // 405 Method Not Allowed:
      // redundant to PUT/api/v1/artists/:artistID/albums/:albumID
      res.sendStatus(405);
    },
    DELETE(req, res) {
      // 405 Method Not Allowed: disallow deleting all albums by accident
      res.sendStatus(405);
    }
  },
  oneAlbum: {
    GET(req, res) {
      res.send('LOGGING GET FROM albumsRouter - ID');
      /* TODO:
      If previously deleted
      status: 404 NOT FOUND
      If no matching albumID found
      status: 400 BAD REQUEST
      status: 200 OK
      data: [album id=albumID]*/
    },
    POST(req, res) {
      // 405 Method Not Allowed: can't post to a specific album
      res.sendStatus(405);
    },
    PUT(req, res) {
      res.send('LOGGING PUT FROM albumsRouter - ID');
      /* TODO:  
      If previously deleted
      status: 404 NOT FOUND
      If no matching albumID found
      status: 400 BAD REQUEST
      status: 200 OK
      swap out the target album of an artist
      request data shall provide a whole info*/
    },
    PATCH(req, res) {
      res.send('LOGGING PATCH FROM albumsRouter - ID');
      /* TODO:
      If previously deleted
      status: 404 NOT FOUND
      If no matching albumID found
      status: 400 BAD REQUEST
      status: 200 OK */
    },
    DELETE(req, res) {
      res.send('LOGGING DELETE FROM albumsRouter - ID');
      /* TODO: If no matching albumID found
      status: 400 BAD REQUEST
      If previously deleted
      status: 404 NOT FOUND
      els
      status: 418 I'm a teapot
      change all the values to null */
    }
  }
};
