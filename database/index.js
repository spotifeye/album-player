const mongoose = require('mongoose');
mongoose.connect('mongodb://root:WissemGamra1@ds211143.mlab.com:11143/artists');

const db = mongoose.connection;


const ArtistSchema = new mongoose.Schema({
  artistID: Number,
  artistName: String,
  albums: [{
    albumID: Number,
    albumName: String,
    albumImage: String,
    publishedYear: Number,
    songs: [{
      songID: Number,
      songName: String,
      streams: Number,
      length: Number,
      popularity: Number,
      addedToLibrary: Boolean
    }]
  }]
});

var Artist = mongoose.model('Artist', ArtistSchema);

var getArtist = (id, cb) => {
  Artist.find({'artistID': id}, (err, data) => {
    if (err) throw err;
    cb(data);
  })
}

module.exports.Artist = Artist;
module.exports.db = db;
module.exports.getArtist = getArtist;