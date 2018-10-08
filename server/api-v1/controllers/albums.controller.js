const DB = require('../models/postgres.model.js');
const CheckReqBody = require('./CheckReqBody');

module.exports = {
  allAlbums: {
    GET(req, res) {
      DB.GET.ALBUMS(req.params.artistID, (error, albums) => {
        if (error || albums.length === 0) {
          res.sendStatus(404);
        } else {
          res.status(200).send(albums);
        }
      });
    },
    POST(req, res) {
      let expectedBody = {
        albumName: 'string',
        albumImage: 'string',
        publishedYear: 'number',
        artist_id: 'number'
      };
      DB.GET.Artist(req.body.artist_id, (error, artist) => {
        if (error || artist.length === 0) {
          res.sendStatus(404);
        } else {
          if (!CheckReqBody(expectedBody, req.body)) {
            res.sendStatus(400);
          } else {
            DB.ADD.ALBUM(req.body, (error, data) => {
              error ? res.sendStatus(404) : res.sendStatus(201);
            });
          }
        }
      });
    },
    PUT(req, res) {
      // 405 Method Not Allowed: no practical use case to swap out the entire album library of an artist
      res.sendStatus(405);
    },
    DELETE(req, res) {
      // 405 Method Not Allowed: disallow deleting all albums by accident
      res.sendStatus(405);
    }
  },
  oneAlbum: {
    GET(req, res) {
      DB.GET.ALBUM(req.params.albumID, (error, album) => {
        if (error) {
          res.sendStatus(404);
        } else {
          if (album.length === 0) {
            res.sendStatus(404);
          } else {
            var data = { album };
            res.status(200).send(data);
          }
        }
      });
    },
    POST(req, res) {
      // 405 Method Not Allowed: can't post to a specific album
      res.sendStatus(405);
    },
    PUT(req, res) {
      let expectedBody = {
        albumName: 'string',
        albumImage: 'string',
        publishedYear: 'number'
      };
      !CheckReqBody(expectedBody, req.body)
        ? res.sendStatus(400)
        : DB.GET.ALBUM(req.params.albumID, (error, album) => {
            if (album.length === 0) {
              res.sendStatus(404);
            } else {
              DB.UPDATE.ALBUM(req.body, (error, result) => {
                err ? res.sendStatus(500) : res.status(200).send(`ALBUM ${req.params.albumID} UPDATED`);
              });
            }
          });
    },
    DELETE(req, res) {
      DB.GET.ALBUM(req.params.albumID, (error, album) => {
        if (album.length === 0) {
          res.sendStatus(404);
        } else {
          DB.DELETE.ALBUM(req.params.albumID, (error, result) => {
            res.status(418).send(`ALBUM ${req.params.albumID} DELETED`);
          });
        }
      });
    }
  }
};
