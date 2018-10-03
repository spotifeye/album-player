const pool = require('../../../database/postgres/connection.postgres.js');
const Promise = require('bluebird');

const dbPool = function(queryString) {
  return new Promise((resolve, reject) => {
    pool.connect((err, client, done) => {
      if (err) throw err;
      client.query(queryString, (err, res) => {
        done();
        if (err) {
          reject(err);
        } else {
          resolve(res.rows);
        }
      });
    });
  });
};

let artistTemplate = {
  id: undefined,
  name: undefined
};
let albumTemplate = {
  id: undefined,
  name: undefined,
  image: undefined,
  publishedyear: undefined,
  artist_id: undefined
};
let songTemplate = {
  id: undefined,
  name: undefined,
  streams: undefined,
  length: undefined,
  popularity: undefined,
  addedtolibrary: undefined,
  album_id: undefined
};

// var testQuery = 'SELECT * FROM "ALBUMS" WHERE artist_id = 11010000;';
var artist = {
  GET: targetArtistID => {
    var query = `SELECT * FROM "ARTISTS" WHERE id = ${targetArtistID};`;
    return dbPool(query);
  }
};

var albums = {
  GET: targetArtistID => {
    var query = `SELECT id, name, image, publishedyear  FROM "ALBUMS" WHERE artist_id = ${targetArtistID};`;
    return dbPool(query);
  }
};

var songs = {
  GET: targetArtistID => {
    var query = `SELECT id,  FROM "ALBUMS" WHERE artist_id = ${targetArtistID};`;
    return dbPool(query);
  },
  GET2: targetArtistID => {
    var queryAlbums = `SELECT id, name, image, publishedyear  FROM "ALBUMS" WHERE artist_id = ${targetArtistID};`;
    dbPool(queryAlbums)
      .then(albumRes => {
        // console.log(albumRes);
        Promise.all(
          albumRes.map(album => {
            var querySongs = `SELECT id, name, streams, length, popularity, addedtolibrary FROM "SONGS" WHERE album_id = ${album.id};`;
            return dbPool(querySongs);
          })
        ).then(songRes => {
          console.log(songRes);
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
};

// GET Artist
// GET Albums
// For Each Album, get Songs
// Insert Songs into the Album Prop
// Insert Albums to Artists

console.time('nested db query');
songs.GET2(11010000);
console.timeEnd('nested db query');

module.exports = {};
