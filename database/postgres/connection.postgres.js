const { Pool, Client } = require('pg');

const pool = new Pool(require('../../config/postgres.config'));

module.exports = pool;
