const pool = require('../database/postgres/connection.postgres.js');
const Promise = require('bluebird');
const fs = require('fs');

// pool.on('error', (err, client) => {
//   console.error('Unexpected error on idle client', err);
//   process.exit(-1);
// });

const CopyQuery = function(postgresQuery, callback) {
  return new Promise((resolve, reject) => {
    pool.connect((err, client, done) => {
      if (err) throw err;
      client.query(postgresQuery, (err, res) => {
        done();
        if (err) {
          reject(err);
        } else {
          console.log('####QUERY SUCCESS####');
          resolve();
        }
      });
    });
  });
};

var readdir;
var readdirAsync = Promise.promisify(fs.readdir);

//REMINDER: TEMPORARILY BLOCKED
readdirAsync(__dirname + '/../dataGeneration/postgres/data/artistsAsync')
  .then(files => {
    files.forEach(file => {
      if (file.includes('data')) {
        var path = `/Users/davidhong/Desktop/HackReactor/SDC/davy-album-player/dataGeneration/postgres/data/artistsAsync/${file}`;
        CopyQuery(`COPY "ARTISTS" FROM '${path}' DELIMITER ',' CSV HEADER;
        `);
      }
    });
  })
  .catch(err => {
    console.log(error);
  });

readdirAsync(__dirname + '/../dataGeneration/postgres/data/albumsAsync')
  .then(files => {
    files.forEach(file => {
      if (file.includes('data')) {
        var path = `/Users/davidhong/Desktop/HackReactor/SDC/davy-album-player/dataGeneration/postgres/data/albumsAsync/${file}`;
        CopyQuery(`COPY "ALBUMS" FROM '${path}' DELIMITER ',' CSV HEADER;
      `);
      }
    });
  })
  .catch(err => {
    console.log(err);
  });

readdirAsync(__dirname + '/../dataGeneration/postgres/data/songsAsync')
  .then(files => {
    files.forEach(file => {
      if (file.includes('data')) {
        var path = `/Users/davidhong/Desktop/HackReactor/SDC/davy-album-player/dataGeneration/postgres/data/songsAsync/${file}`;
        console.log(path);
        CopyQuery(`COPY "SONGS" (id, name, streams, length, popularity, addedtolibrary, album_id) FROM '${path}' DELIMITER ',' CSV HEADER;`);
      }
    });
  })
  .catch(err => {
    console.log(error);
  });

var query = 'SELECT * FROM "ALBUMS","SONGS" WHERE "ALBUMS".artist_id = 10010000 AND "ALBUMS".id = "SONGS".album_id;'; // .900ms

var query = 'SELECT * FROM "SONGS" WHERE "SONGS".album_id IN (SELECT id FROM "ALBUMS" WHERE artist_id = 10010000);'; // 650ms
