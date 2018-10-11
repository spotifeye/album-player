var artistDefaultFields = ['artistID', 'artistName'],
  albumDefaultFields = ['albumID', 'albumName', 'albumImage', 'publishedYear', 'artist_id'],
  songDefaultFields = ['songID', 'songName', 'streams', 'length', 'popularity', 'addedToLibrary', 'album_id'];

const pick = (obj, keys) => {
  var result = {};
  for (let key of keys) {
    result[key] = obj[key];
  }
  return result;
};

const nestObj = (arr, artistFields = artistDefaultFields, albumFields = albumDefaultFields, songFields = songDefaultFields) => {
  var artistNested = pick(arr[0], artistFields);
  var cachedAlbumIDs = [];
  arr.forEach(entry => {
    artistNested.albums = artistNested.albums || [];
    if (!cachedAlbumIDs.includes(entry.albumID)) {
      cachedAlbumIDs.push(entry.albumID);
      artistNested.albums.push(pick(entry, albumFields));
    }
    for (let albums of artistNested.albums) {
      albums.songs = albums.songs || [];
      if (albums.albumID === entry.album_id) {
        albums.songs.push(pick(entry, songFields));
      }
    }
  });
  return artistNested;
};

module.exports = nestObj;

//**************************
//  SAMPLE DATA FOR TEST
//**************************

var sampleRows = [
  {
    artistID: 10000001,
    artistName: 'Trisha Hartmann III',
    albumID: 100000011,
    albumName: 'CFP Franc synthesize online',
    albumImage: 'https://s3-us-west-1.amazonaws.com/sdc-spotifeye/photos/8.jpg',
    publishedYear: 1992,
    artist_id: 10000001,
    songID: '2000000211',
    songName: 'Chicken Quality',
    streams: 80089084,
    length: 238,
    popularity: 7,
    addedToLibrary: true,
    album_id: 100000011
  },
  {
    artistID: 10000001,
    artistName: 'Trisha Hartmann III',
    albumID: 100000012,
    albumName: 'programming',
    albumImage: 'https://s3-us-west-1.amazonaws.com/sdc-spotifeye/photos/9.jpg',
    publishedYear: 1977,
    artist_id: 10000001,
    songID: '2000000221',
    songName: 'China',
    streams: 58771692,
    length: 207,
    popularity: 8,
    addedToLibrary: true,
    album_id: 100000012
  },
  {
    artistID: 10000001,
    artistName: 'Trisha Hartmann III',
    albumID: 100000013,
    albumName: 'Security',
    albumImage: 'https://s3-us-west-1.amazonaws.com/sdc-spotifeye/photos/10.jpg',
    publishedYear: 1998,
    artist_id: 10000001,
    songID: '2000000231',
    songName: 'Auto Loan Account violet Awesome',
    streams: 82185598,
    length: 200,
    popularity: 9,
    addedToLibrary: false,
    album_id: 100000013
  },
  {
    artistID: 10000001,
    artistName: 'Trisha Hartmann III',
    albumID: 100000013,
    albumName: 'Security',
    albumImage: 'https://s3-us-west-1.amazonaws.com/sdc-spotifeye/photos/10.jpg',
    publishedYear: 1998,
    artist_id: 10000001,
    songID: '2000000232',
    songName: 'payment Tasty Customer',
    streams: 42357196,
    length: 250,
    popularity: 2,
    addedToLibrary: true,
    album_id: 100000013
  },
  {
    artistID: 10000001,
    artistName: 'Trisha Hartmann III',
    albumID: 100000014,
    albumName: 'Lek South Africa',
    albumImage: 'https://s3-us-west-1.amazonaws.com/sdc-spotifeye/photos/11.jpg',
    publishedYear: 1976,
    artist_id: 10000001,
    songID: '2000000241',
    songName: 'USB',
    streams: 61110016,
    length: 244,
    popularity: 10,
    addedToLibrary: false,
    album_id: 100000014
  }
];
