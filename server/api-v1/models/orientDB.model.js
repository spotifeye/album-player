const db = require('../../../database/orientdb/connection.orientdb.js');

var makeGraphQuery = function(queryString) {
  return db.open().then(() => {
    return db.query(queryString);
  });
};

var makeAsyncQueries = async function() {
  var songs = await makeGraphQuery(`SELECT expand(in()) FROM Album where artist_id = 10000000;`);
  var artist = await makeGraphQuery(`SELECT FROM Artist where id = 10000000;`);
  var albums = await makeGraphQuery(`SELECT FROM Album where artist_id = 10000000;`);
  console.timeEnd('orientdb timer');
};
console.time('orientdb timer');

makeAsyncQueries(); // average time: 70ms
