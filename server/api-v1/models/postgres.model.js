const { ADD, FIND, UPDATE, DELETE } = require('./postgres.queries');
/*
{ ADD:
  { artist: [Function: artist],
    album: [Function: album],
    song: [Function: song] },
 FIND:
  { artist: [Function: artist],
    albums: [Function: albums],
    album: [Function: album],
    songs: [Function: songs],
    song: [Function: song] },
 UPDATE: { album: [Function: album], song: [Function: song] },
 DELETE: { album: [Function: album], song: [Function: song] } }
*/

module.exports = {
  GET: {
    ALBUMS: async (artistID, callback) => {
      try {
        var artist = await FIND.artist(artistID);
        var albums = await FIND.albums(artistID);
        var artist = artist[0];
        artist.albums = albums;
        for (let i = 0; i < albums.length; i++) {
          albums[i].songs = await FIND.songs(albums[i].id);
        }
        callback(null, artist);
      } catch (error) {
        callback(error);
      }
    },
    ALBUM: async (albumID, callback) => {
      var album = await FIND.album(albumID);
      album.songs = await FIND.songs(album.id);
      callback(album);
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
  /* PATCH: {
    ALBUMS: ArtistID => {},
    ALBUM: AlbumID => {}
  }, */
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

