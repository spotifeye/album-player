const pool = require('../../../database/postgres/connection.postgres.js');
const Promise = require('bluebird');

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
