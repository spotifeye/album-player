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

/* 
NOTE: METHODS NOT AVAILABLE ARE COMMENTED OUT.
Left in for organization and future updates.
*/
var db = {
  ADD: {
    /* artist: () => {// METHOD NOT AVAILABLE}, */
    /* albums: () => {// METHOD NOT AVAILABLE}, */
    album: targetArtistID => dbPool(`SELECT * FROM "ARTISTS" WHERE id = ${targetArtistID};`),
    /* songs: () => {// METHOD NOT AVAILABLE}, */
    song: targetAlbumID => dbPool(`SELECT * FROM "ARTISTS" WHERE id = ${targetArtistID};`)
  },
  FIND: {
    artist: targetArtistID => dbPool(`SELECT * FROM "ARTISTS" WHERE id = ${targetArtistID};`),
    albums: targetArtistID => dbPool(`SELECT id, name, image, "publishedYear"  FROM "ALBUMS" WHERE artist_id = ${targetArtistID};`),
    album: targetAlbumID => dbPool(`SELECT id, name, image, "publishedYear"  FROM "ALBUMS" WHERE id = ${targetAlbumID};`),
    songs: targetAlbumID => dbPool(`SELECT * FROM "SONGS" WHERE album_id = ${targetAlbumID};`),
    song: targetSongID => dbPool(`SELECT * FROM "SONGS" WHERE id = ${targetSongID};`)
  },
  UPDATE: {
    /* artist:() => {// METHOD NOT AVAILABLE}, */
    albums: () => {},
    album: () => {},
    songs: () => {},
    song: () => {}
  },
  SWAP: {
    /* artist:() => {// METHOD NOT AVAILABLE}, */
    /* albums:() => {// METHOD NOT AVAILABLE}, */
    /* album:() => {// METHOD NOT AVAILABLE}, */
    /* songs:() => {// METHOD NOT AVAILABLE}, */
    song: () => {}
  },
  DELETE: {
    /* artist:() => {// METHOD NOT AVAILABLE}, */
    /* albums:() => {// METHOD NOT AVAILABLE}, */
    album: () => {},
    /* songs:() => {// METHOD NOT AVAILABLE}, */
    song: () => {}
  }
};

module.exports = db;
