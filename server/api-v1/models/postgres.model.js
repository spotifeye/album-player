const { ADD, FIND, UPDATE, DELETE } = require('./postgres.queries');
const nestObj = require('./nestObj');
module.exports = {
  GET: {
    ALBUMS: async (artistID, callback) => {
      try {
        var artistAlbumsSongs = await FIND.artistAlbumsSongs(artistID);
        // this gives the following structure: artist = {..., albums:[song{...},song{...}, ... ]}
        callback(null, nestObj(artistAlbumsSongs));
      } catch (error) {
        callback(error);
      }
    },
    ALBUM: async (albumID, callback) => {
      try {
        var album = await FIND.album(albumID);
        album.songs = await FIND.songs(album.albumID);
        // this gives the following structure: album = {..., songs:[Array]}
        callback(null, album);
      } catch (error) {
        callback(error);
      }
    },
    SONGS: (albumID, callback) =>
      FIND.songs(albumID)
        .then(songs => callback(null, songs))
        .catch(error => callback(error)),
    SONG: (songID, callback) =>
      FIND.song(songID)
        .then(song => callback(null, song))
        .catch(error => callback(error))
  },
  POST: {
    ALBUMS: (AlbumObj, callback) =>
      ADD.album(AlbumObj)
        .then(data => callback(null, data))
        .catch(error => callback(error)),
    SONGS: (SongObj, callback) =>
      ADD.song(SongObj)
        .then(data => callback(null, data))
        .catch(error => callback(error))
  },
  PUT: {
    ALBUM: (AlbumObj, callback) =>
      UPDATE.album(AlbumObj)
        .then(data => callback(null, data))
        .catch(error => callback(error)),
    SONG: (SongObj, callback) =>
      UPDATE.song(SongObj)
        .then(data => callback(null, data))
        .catch(error => callback(error))
  },
  DELETE: {
    ALBUM: (AlbumID, callback) =>
      DELETE.album(AlbumID)
        .then(data => callback(null, data))
        .catch(error => callback(error)),
    SONG: (SongID, callback) =>
      DELETE.song(SongID)
        .then(data => callback(null, data))
        .catch(error => callback(error))
  }
};
