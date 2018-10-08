const DB = require('../models/postgres.model.js');
const CheckReqBody = require('./CheckReqBody');

module.exports = {
  allSongs: {
    GET(req, res) {
      DB.GET.SONGS(req.params.albumID, (error, songs) => {
        if (error || songs.length === 0) {
          res.sendStatus(404);
        } else {
          var data = { songs };
          res.status(200).send(data);
        }
      });
    },
    POST(req, res) {
      let expectedBody = {
        songName: 'string',
        streams: 'number',
        length: 'number',
        popularity: 'number',
        addedToLibrary: 'boolean',
        album_id: 'number'
      };
      !CheckReqBody(expectedBody, req.body)
        ? res.sendStatus(400)
        : DB.GET.ALBUM(req.body.album_id, (error, album) => {
            if (error || album.length === 0) {
              res.sendStatus(404);
            } else {
              DB.ADD.SONG(req.body, (error, data) => {
                error ? res.sendStatus(404) : res.sendStatus(201);
              });
            }
          });
    },
    PUT(req, res) {
      // 405 Method Not Allowed: no practical use case to swap out the entire song list
      res.sendStatus(405);
    },
    DELETE(req, res) {
      // 405 Method Not Allowed: disallow deleting all songs by accident
      res.sendStatus(405);
    }
  },
  oneSong: {
    GET(req, res) {
      DB.GET.SONG(req.params.songID, (error, song) => {
        if (error) {
          res.sendStatus(404);
        } else {
          if (song.length === 0) {
            res.sendStatus(404);
          } else {
            var data = { song };
            res.status(200).send(data);
          }
        }
      });
    },
    POST(req, res) {
      // 405 Method Not Allowed: can't post to a specific song
      res.sendStatus(405);
    },
    PUT(req, res) {
      let expectedBody = {
        songName: 'string',
        streams: 'number',
        length: 'number',
        popularity: 'number',
        addedToLibrary: 'boolean'
      };
      !CheckReqBody(expectedBody, req.body)
        ? res.sendStatus(400)
        : DB.GET.SONG(req.params.songID, (error, song) => {
            if (song.length === 0) {
              res.sendStatus(404);
            } else {
              DB.UPDATE.SONG(req.body, (error, result) => {
                err ? res.sendStatus(500) : res.status(200).send(`SONG ${req.params.songID} UPDATED`);
              });
            }
          });
    },
    DELETE(req, res) {
      DB.GET.SONG(req.params.songID, (error, song) => {
        if (song.length === 0) {
          res.sendStatus(404);
        } else {
          DB.DELETE.SONG(req.params.songID, (error, result) => {
            res.status(418).send(`SONG ${req.params.songID} DELETED`);
          });
        }
      });
    }
  }
};
