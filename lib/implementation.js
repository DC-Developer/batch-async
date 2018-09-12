let insertOrUpdate = require('./insertAndUpdateHandler.js');
let select = require('./selectHandler.js');
/**
*@param {String} sqlType - Passed in sql statement type
*@param {String} statement - Passed in sql statement
*@param {Array|Object} values - Collection of data values
*@param {Object} connection - User's MySql connection object
**/
module.exports = function implementation(sqlType, statement, values, connection) {
  switch(sqlType) {
    case 'insert':
    case 'update':
      insertOrUpdate(statement, values, connection);
      break;
    case 'select':
      select(statement, values, connection);
      break;
    case 'delete':
      //will add next update
      break;
    default:
      break;
  }
};
