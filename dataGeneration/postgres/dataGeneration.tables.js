const faker = require('faker');
const fs = require('fs');
const coolImages = require('cool-images');

// sizeEachFile = number of artists in each file
const generateData = (sizeEachFile, TotalCounter) => {
  var numFiles = Math.ceil(TotalCounter / sizeEachFile);

  // Just Templates for Each Tables. I use it make CSV file headers.
  let artistTemplate = {
    id: undefined,
    name: undefined
  };

  let albumTemplate = {
    id: undefined,
    name: undefined,
    image: undefined,
    publishedYear: undefined,
    artist_ID: undefined
  };
  let songTemplate = {
    id: undefined,
    songName: undefined,
    streams: undefined,
    length: undefined,
    popularity: undefined,
    addedToLibrary: undefined,
    album_ID: undefined
  };

  for (let fileID = 0; fileID < numFiles; fileID++) {
    // Initiate writeStream
    var artistStream = fs.createWriteStream(__dirname + `/data/artists/data${fileID}.csv`);
    var albumStream = fs.createWriteStream(__dirname + `/data/albums/data${fileID}.csv`);
    var songStream = fs.createWriteStream(__dirname + `/data/songs/data${fileID}.csv`);

    artistStream.write(Object.keys(artistTemplate).join(',') + '\n');
    albumStream.write(Object.keys(albumTemplate).join(',') + '\n');
    songStream.write(Object.keys(songTemplate).join(',') + '\n');

    for (let i = fileID * sizeEachFile + 10000000; i < (fileID + 1) * sizeEachFile + 10000000; i++) {
      artistStream.write(`${i},${faker.name.findName()}\n`);

      var albumCount = faker.random.number({ min: 1, max: 4 });
      var start = faker.random.number({ min: 1, max: 996 });
      for (let j = 1; j < albumCount + 1; j++) {
        albumStream.write(`${i * 10 + j},${faker.random.words()},https://s3-us-west-1.amazonaws.com/sdc-spotifeye/photos/${start + j}.jpg,${faker.random.number({ min: 1950, max: 2018 })},${i}\n`);

        var songNumber = faker.random.number({ min: 2, max: 10 });
        for (let k = 1; k < songNumber; k++) {
          songStream.write(`${i * 100 + j * 10 + k},${faker.random.words()},${faker.random.number({ min: 50000, max: 100000000 })},${faker.random.number({ min: 30, max: 250 })},${faker.random.number({ min: 1, max: 9 })},${faker.random.boolean()},${j}\n`);
        }
      }
    }
    artistStream.end();
    albumStream.end();
    songStream.end();
    console.log(`${fileID + 1} out of ${numFiles} COMPLETE!`);
  }
};

generateData(100000, 200000);

// let artist = {
//   artistID: i,
//   artistName: faker.name.findName()
// };
// artistStream.write(Object.values(artist).join(',') + '\n');

// let album = {
//   albumID: i * 10 + j,
//   albumName: faker.random.words(),
//   albumImage: coolImages.one(400, 400),
//   publishedYear: faker.random.number({ min: 1950, max: 2018 }),
//   artist_ID: i
// };
// albumStream.write(Object.values(album).join(',') + '\n');

// let song = {
//   songID: i * 100 + j * 10 + k,
//   songName: faker.random.words(),
//   streams: faker.random.number({ min: 50000, max: 100000000 }),
//   length: faker.random.number({ min: 30, max: 250 }),
//   popularity: faker.random.number({ min: 1, max: 9 }),
//   addedToLibrary: faker.random.boolean(),
//   album_ID: j
// };
// songStream.write(Object.values(song).join(',') + '\n');
