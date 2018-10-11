const { Client } = require('pg');

const client = new Client(require('../../config/postgres.config'));

client.connect().then(() => {
  client
    .query('SELECT * FROM "ARTISTS", "ALBUMS", "SONGS" WHERE artist_id = 10000001 AND artist_id = "artistID" AND album_id="albumID";')
    .then(res => {
      console.log(res);
    })
    .then(err => {
      console.log(err);
    })
    .finally(client.end);
});
