let checkSqlType = require('./checkSqlType.js');
let implementation = require('./implementation.js');
let errorHandler = require('./errorHandler.js');

/**
*I should also account for SET in insert
*@param {Object} inputs - Object containing user defined inputs
*@param {Object} connection - MySql object with User passed in connection
*@param {Function} [callback] - A callback to handle errors and responses
**/
function _ba(inputs, connection, callback) {
  let statement = inputs.sqlStatement || '';
  let sqlType = checkSqlType(statement);

  errorHandler(sqlType, inputs, function(err) {
    if (err) throw err;
    return;
  });

  if (inputs.values) {
    return new Promise((resolve, reject) => {
      Promise.all([implementation(sqlType, statement, inputs.values, connection)])
        .then(function(response) {
          resolve(response);
        })
        .catch(function(err) {
          reject(err);
        })
    })
  } else {
    return callback(new Error("inputs.values is invalid"));
  }
}

module.exports = function processTransactions(input, connection, callback) {
  input.transactions.forEach(itr => _ba(itr, connection, callback));
}
