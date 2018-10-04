let checkColsValsForInsert = require('./checkColsValsForInsert.js');
let checkValsIdentifiersForUpdate = require('./checkValsIdentifiersForUpdate.js');
/**
*@param {String} sqlType - Passed in sql statement type
*@param {Array|Object} inputs - Collection of data values
*@param {Function} [callback] - callback to handle error objects
**/
module.exports = function errorHandler(sqlType, inputs, callback) {
  switch(sqlType) {
    case 'insert':
      checkColsValsForInsert(inputs, callback);
      break;
    case 'update':
      checkValsIdentifiersForUpdate(inputs, callback);
      break;
    case 'select':
    //will add next update
      break;
    case 'delete':
    //will add next update
      break;
    default:
      break;
  }
};
