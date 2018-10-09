var ODatabase = require('orientjs').ODatabase;
var db = new ODatabase(require('../../config/orientdb.config').STANDALONE);

module.exports = db;
