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
var findArtists = {
  GET: targetArtistID => {
    var query = `SELECT * FROM "ARTISTS" WHERE id = ${targetArtistID};`;
    return dbPool(query);
  }
};

var findAlbums = {
  GET: targetArtistID => {
    var query = `SELECT id, name, image, "publishedYear"  FROM "ALBUMS" WHERE artist_id = ${targetArtistID};`;
    return dbPool(query);
  }
};

var findSongs = {
  GET: targetAlbumID => {
    var query = `SELECT * FROM "SONGS" WHERE album_id = ${targetAlbumID};`;
    return dbPool(query);
  }
};

const getArtistInfoNest = async function(artistID, callback) {
  var artist = await findArtists.GET(artistID);
  var albums = await findAlbums.GET(artistID);
  var artist = artist[0];
  artist.albums = albums;

  // console.log(albums);
  for (let i = 0; i < albums.length; i++) {
    albums[i].songs = await findSongs.GET(albums[i].id);
  }
  callback(artist);
};

console.time('test');
console.time('nested db query');
getArtistInfoNest(11040000, res => {
  console.timeEnd('nested db query'); //average time = 40ms
  console.log(res);
});

module.exports = {};
