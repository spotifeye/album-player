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
    artist: ({ name }) => {
      dpPool(`INSERT INTO "ARTISTS" (name) VALUES (${name});`);
    },
    /* albums: () => {// METHOD NOT AVAILABLE}, */
    album: ({ name, image, publishedYear, targetArtistID }) => dbPool(`INSERT INTO "ALBUMS" (name,image,"publishedYear",artist_id) VALUES ('${name}', '${image}' , ${publishedYear}, ${targetArtistID});`),
    /* songs: () => {// METHOD NOT AVAILABLE}, */
    song: ({ name, streams, length, popularity, addedToLibrary, targetAlbum_id }) => dbPool(`INSERT INTO "SONGS" (name,streams,length,popularity,"addedToLibrary",album_id) VALUES ('${name}', ${streams} , ${length}, ${popularity}, ${addedToLibrary},${targetAlbum_id});`)
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
    /* albums: () => {// METHOD NOT AVAILABLE}, */
    album: ({ targetAlbumID, name, image, publishedYear }) =>
      dbPool(`UPDATE "ALBUMS" SET 
      name = '${name}', 
      image = '${image}', 
      "publishedYear" = ${publishedYear} 
      WHERE id = ${targetAlbumID};`),
    /* songs: () => {// METHOD NOT AVAILABLE}, */
    song: ({ targetSongID, name, streams, length, popularity, addedToLibrary, targetAlbum_id }) =>
      dbPool(`UPDATE "SONGS" SET 
      name = '${name}', 
      streams = ${streams}, 
      length = ${length}, 
      popularity = ${popularity}, 
      "addedToLibrary" = ${addedToLibrary} 
      WHERE id = ${targetSongID};`)
  },
  DELETE: {
    /* artist:() => {// METHOD NOT AVAILABLE}, */
    /* albums:() => {// METHOD NOT AVAILABLE}, */
    album: targetAlbumID => dbPool(`DELETE FROM "ALBUMS" WHERE id = ${targetAlbumID}`),
    /* songs:() => {// METHOD NOT AVAILABLE}, */
    song: targetSongID => dbPool(`DELETE FROM "SONGS" WHERE id = ${targetSongID}`)
  }
};

module.exports = db;
