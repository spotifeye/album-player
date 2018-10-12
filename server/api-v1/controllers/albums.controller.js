const DB = require('../models/postgres.model.js');
const CheckReqBody = require('./CheckReqBody');
const redis = require('redis');
const client = redis.createClient(6379, process.env.REDIS_HOST);

const queryRedis = (req, res, postgresLookup) => {
  let key = req.params.toString();
  client.get(key, (err, result) => {
    if (result) {
      res.send(result);
    } else {
      postgresLookup(req, res);
    }
  });
};

const getAllAlbumsPG = (req, res) => {
  DB.GET.ALBUMS(req.params.artistID, (error, albums) => {
    if (error || albums.length === 0) {
      res.sendStatus(404);
    } else {
      client.setex(`${req.path},${req.params.artistID}`, 3600, albums);
      res.status(200).send(albums);
    }
  });
};

const getOneAlbumPG = (req, res) => {
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
};

module.exports = {
  allAlbums: {
    GET(req, res) {
      // Toggle between Redis On/Off
      if (process.env.REDIS_HOST) {
        queryRedis(req, res, getAllAlbumsPG);
      } else {
        getAllAlbumsPG(req, res);
      }
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
      if (process.env.REDIS_HOST) {
        queryRedis(req, res, getOneAlbumPG);
      } else {
        getOneAlbumPG(req, res);
      }
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
