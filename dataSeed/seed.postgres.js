const pool = require('../database/postgres/connection.postgres.js');
const Promise = require('bluebird');
const fs = require('fs');

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

var readdirAsync = Promise.promisify(fs.readdir);

//REMINDER: TEMPORARILY BLOCKED
readdirAsync(__dirname + '/../dataGeneration/postgres/data2/artists')
  .then(files => {
    files.forEach(file => {
      if (file.includes('data')) {
        var path = `/Users/davidhong/Desktop/HackReactor/SDC/davy-album-player/dataGeneration/postgres/data2/artists/${file}`;
        CopyQuery(`COPY "ARTISTS" FROM '${path}' DELIMITER ',' CSV HEADER;
        `);
      }
    });
  })
  .catch(err => {
    console.log(error);
  });

readdirAsync(__dirname + '/../dataGeneration/postgres/data2/albums')
  .then(files => {
    files.forEach(file => {
      if (file.includes('data')) {
        var path = `/Users/davidhong/Desktop/HackReactor/SDC/davy-album-player/dataGeneration/postgres/data2/albums/${file}`;
        console.log(path);
        CopyQuery(`COPY "ALBUMS" FROM '${path}' DELIMITER ',' CSV HEADER;
      `);
      }
    });
  })
  .catch(err => {
    console.log(err);
  });

readdirAsync(__dirname + '/../dataGeneration/postgres/data2/songs')
  .then(files => {
    files.forEach(file => {
      if (file.includes('data')) {
        var path = `/Users/davidhong/Desktop/HackReactor/SDC/davy-album-player/dataGeneration/postgres/data2/songs/${file}`;
        console.log(path);
        CopyQuery(`COPY "SONGS" FROM '${path}' DELIMITER ',' CSV HEADER;`);
      }
    });
  })
  .catch(err => {
    console.log(error);
  });
