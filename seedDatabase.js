const {db, Artist} = require('./database/index.js');
const faker = require('faker');
const fs = require('fs');
const coolImages = require('cool-images');


var allArtists = [];

for (let i = 1; i < 101; i++) {
  let artist = {
    artistID: i,
    artistName: faker.name.findName(),
    albums: []
  }
  var albumNumber = Math.floor(Math.random() * 4) + 1;
  for (let j = 1; j < albumNumber + 1; j++) {
    let album = {
      albumID: i * 10 + j,
      albumName: faker.random.words(),
      albumImage: "https://s3.us-east-2.amazonaws.com/spotifyalbumplayer/Album+Images/"+ j +".jpeg",
      publishedYear: Math.floor(Math.random() * 69) + 1950,
      songs: []
    }
    var songNumber = Math.floor(Math.random() * 10) + 12;
    for (let k = 1; k < songNumber + 1; k++) {
      let song = {
        songID: i * 100 + j * 10 + k,
        songName: faker.random.words(),
        streams: Math.floor(Math.random() * 250000000),
        length: Math.floor(Math.random() * 221) + 30,
        popularity: Math.floor(Math.random() * 8) + 1,
        addedToLibrary: faker.random.boolean()
      }
      album.songs.push(song);
    }
    artist.albums.push(album);
  }
  allArtists.push(artist);
}

fs.writeFile('data.json', JSON.stringify(allArtists), 'utf8', (err) => {
  if (err) throw err;
  console.log("File written!");
  Artist.remove({}, function(err) {
    if (err) throw err;
    Artist.insertMany(allArtists, function(err,result) {
      if (err) throw err;
      console.log("In Database!")
   });
  })
})

