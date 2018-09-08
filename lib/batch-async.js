let checkColsValsForInsert = require('./checkColsValsForInsert.js'),
    checkSqlType = require('./checkSqlType.js'),
    implementation = require('./implementation.js'),
    errorHandler = require('./errorHandler.js');

/**
*@param {Object} inputs - Object containing user defined inputs
*@param {Object} connection - MySql object with User passed in connection
*@param {Function} [callback] - A callback to handle errors and responses
**/
function _ba(inputs, connection, callback) {
  let STATEMENT = inputs.sqlStatement || '';
  //this will determine the control flow of the program
  let sqlType = checkSqlType(STATEMENT);

  errorHandler(sqlType, inputs, function(err) {
    if(err) throw err;
    return;
  });

  if(inputs.values) {
    return new Promise((resolve, reject) => {
      Promise.all([implementation(sqlType, STATEMENT, inputs.values, connection)])
        .then(function(response) {
          resolve(response);
        })
        .catch(function(err) {
          reject(err);
        });
    });
  } else {
    callback(new Error("inputs.values is invalid"));
  }
};

module.exports = function processTransactions(input, connection, callback) {
  input.transactions.forEach(itr => _ba(itr, connection, callback));
}
