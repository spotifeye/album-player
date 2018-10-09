const { Pool, Client } = require('pg');

const pool = new Pool(require('../../config/postgres.config'));

pool.connect();

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

module.exports = pool;
