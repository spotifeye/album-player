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

//*********************/
// DEFINE TARGET HERE
var TARGET = 'REMOTE';
//*********************/

if (TARGET === 'LOCAL') {
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
} else {
  var tables = ['ARTISTS', 'ALBUMS', 'SONGS'];
  var folders = ['artists', 'albums', 'songs'];
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 3; j++) {
      var REMOTE_PATH = `https://s3-us-west-1.amazonaws.com/sdc-spotifeye/data/${folders[j]}/data${i}.csv`;
      CopyQuery(`COPY "${tables[j]}" FROM '${REMOTE_PATH}' DELIMITER ',' CSV HEADER;`);
    }
  }
}
