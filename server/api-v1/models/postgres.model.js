const pool = require('../../../database/postgres/connection.postgres.js');
const Promise = require('bluebird');

const dbPool = function(queryString) {
  return new Promise((resolve, reject) => {
    pool.connect((err, client, done) => {
      if (err) throw err;
      // console.log('connected!');
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

// var testQuery = 'SELECT * FROM "ALBUMS" WHERE artist_id = 11010000;';
var findArtist = targetArtistID => {
  var query = `SELECT * FROM "ARTISTS" WHERE id = ${targetArtistID};`;
  return dbPool(query);
};

var findAlbum = targetAlbumID => {
  var query = `SELECT id, name, image, "publishedYear"  FROM "ALBUMS" WHERE id = ${targetAlbumID};`;
  return dbPool(query);
};

var findAlbums = targetArtistID => {
  var query = `SELECT id, name, image, "publishedYear"  FROM "ALBUMS" WHERE artist_id = ${targetArtistID};`;
  return dbPool(query);
};

var findSongs = targetAlbumID => {
  var query = `SELECT * FROM "SONGS" WHERE album_id = ${targetAlbumID};`;
  return dbPool(query);
};

// const getArtistInfoNest = async (artistID, callback) => {
//   var artist = await findArtist(artistID);
//   var albums = await findAlbums(artistID);
//   var artist = artist[0];
//   artist.albums = albums;

//   // console.log(albums);
//   for (let i = 0; i < albums.length; i++) {
//     albums[i].songs = await findSongs(albums[i].id);
//   }
//   callback(artist);
// };

// console.time('test');
// console.time('nested db query');
// getArtistInfoNest(11040000, res => {
//   console.timeEnd('nested db query'); //average time = 40ms
//   console.log(res);
// });

module.exports = {
  GET: {
    ALBUMS: async (artistID, callback) => {
      var artist = await findArtist(artistID);
      var albums = await findAlbums(artistID);
      var artist = artist[0];
      artist.albums = albums;
      for (let i = 0; i < albums.length; i++) {
        albums[i].songs = await findSongs(albums[i].id);
      }
      callback(artist);
    },
    ALBUM: async (albumID, callback) => {
      var album = await findAlbum(albumID);
      album.songs = await findSongs(album.id);
      callback(album);
    }
  },

  POST: {
    ALBUMS: ArtistID => {},
    ALBUM: AlbumID => {}
  },

  PUT: {
    ALBUMS: ArtistID => {},
    ALBUM: AlbumID => {}
  },
  PATCH: {
    ALBUMS: ArtistID => {},
    ALBUM: AlbumID => {}
  },
  DELETE: {
    ALBUMS: ArtistID => {},
    ALBUM: AlbumID => {}
  }
};
