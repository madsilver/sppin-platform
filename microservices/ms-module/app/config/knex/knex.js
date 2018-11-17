const appRoot = require('app-root-path');
const config = require(appRoot + '/knexfile.js');
module.exports = require('knex')(config);