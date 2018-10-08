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
    artist: ({ artistName }) => {
      dpPool(`INSERT INTO "ARTISTS" ("artistName") VALUES (${artistName});`);
    },
    /* albums: () => {// METHOD DISABLED}, */
    album: ({ artistName, albumImage, publishedYear, targetArtistID }) => dbPool(`INSERT INTO "ALBUMS" ("artistName","albumImage","publishedYear",artist_id) VALUES ('${artistName}', '${albumImage}' , ${publishedYear}, ${targetArtistID});`),
    /* songs: () => {// METHOD DISABLED}, */
    song: ({ songName, streams, length, popularity, addedToLibrary, targetAlbum_id }) => dbPool(`INSERT INTO "SONGS" ("songName",streams,length,popularity,"addedToLibrary",album_id) VALUES ('${songName}', ${streams} , ${length}, ${popularity}, ${addedToLibrary},${targetAlbum_id});`)
  },
  FIND: {
    artist: targetArtistID => dbPool(`SELECT * FROM "ARTISTS" WHERE artistID = ${targetArtistID};`),
    albums: targetArtistID => dbPool(`SELECT "albumID", "albumName", "albumImage", "publishedYear"  FROM "ALBUMS" WHERE artist_id = ${targetArtistID};`),
    album: targetAlbumID => dbPool(`SELECT "albumID", "albumName", "albumImage", "publishedYear"  FROM "ALBUMS" WHERE albumID = ${targetAlbumID};`),
    songs: targetAlbumID => dbPool(`SELECT * FROM "SONGS" WHERE album_id = ${targetAlbumID};`),
    song: targetSongID => dbPool(`SELECT * FROM "SONGS" WHERE songID = ${targetSongID};`)
  },
  UPDATE: {
    /* artist:() => {// METHOD DISABLED}, */
    /* albums: () => {// METHOD DISABLED}, */
    album: ({ targetAlbumID, albumName, albumImage, publishedYear }) =>
      dbPool(`UPDATE "ALBUMS" SET 
      "albumName" = '${albumName}', 
      "albumImage" = '${albumImage}', 
      "publishedYear" = ${publishedYear} 
      WHERE "albumID" = ${targetAlbumID};`),
    /* songs: () => {// METHOD DISABLED}, */
    song: ({ targetSongID, name, streams, length, popularity, addedToLibrary, targetAlbum_id }) =>
      dbPool(`UPDATE "SONGS" SET 
      "songName" = '${songName}', 
      streams = ${streams}, 
      length = ${length}, 
      popularity = ${popularity}, 
      "addedToLibrary" = ${addedToLibrary} 
      WHERE "songID" = ${targetSongID};`)
  },
  DELETE: {
    /* artist:() => {// METHOD DISABLED}, */
    /* albums:() => {// METHOD DISABLED}, */
    album: targetAlbumID => dbPool(`DELETE FROM "ALBUMS" WHERE albumID = ${targetAlbumID}`),
    /* songs:() => {// METHOD DISABLED}, */
    song: targetSongID => dbPool(`DELETE FROM "SONGS" WHERE songID = ${targetSongID}`)
  }
};

module.exports = db;
