require('dotenv').config();
let mysql = require('mysql'),
    async = require('async');

let pool  = mysql.createPool({
  connectionLimit : 10,
  host              : process.env.MYSQL_HOST,
  user              : process.env.MYSQL_USER,
  password          : process.env.MYSQL_PASSWORD,
  database          : process.env.MYSQL_DATABASE,
  multipleStatements: 'true'
});
/**
*@param {Array} cols - Array of MySQL column values
**/
function printValueQuestionMarks(cols) {
  return cols.map(col => col = '?');
}
/**
*@param {Array} cols - Array of MySQL column values
**/
function printKeyValueQuestions(cols) {
  return cols.map(col => col = `${col} = ?`);
}

/**
*@param {Object} inputs - Object containing user defined inputs
*@param {Function} [callback] - A callback to give user custom control
**/
function _ba(inputs, callback) {
  const STATEMENT = {
    insert: `
      INSERT INTO ${inputs.table} (${inputs.columns.join(',')})
      VALUES (${printValueQuestionMarks(inputs.columns)})`,
    update: `
      UPDATE ${inputs.table}
      set ${printKeyValueQuestions(inputs.columns)}
      WHERE ${inputs.columnIdentifier} = ?`
  };

  let statementTypes = ['insert', 'update'];

  let manageRecords = (values) => {
    return new Promise((resolve, reject) => {

      let iteratee = (value, itrCallback) => {
        pool.query(
          STATEMENT[inputs.statementType.toLowerCase()],
          value,
          function(err, results, fields) {
            if(err) {
              reject(err);
            }
            console.log(results);
            itrCallback();
        });
      };

      async.each(values, iteratee, function(err) {
        if(err) {
          reject(err);
        }
        resolve(values);
      });
    });
  };
  if( statementTypes.indexOf(inputs.statementType.toLowerCase()) === -1 ) {
    return callback(new Error("statementType needs to be 'insert' or 'update'"));
  }
  if(typeof inputs.statementType !== 'string') {
    callback(new Error("inputs.statementType is not a string"));
  };

  if(inputs.batchQuery) {
    return new Promise((resolve, reject) => {
      Promise.all([manageRecords(inputs.values)])//make this dynamic, by potentially handling more than a single multiple asynchronous transaction
        .then(function(response) {
          resolve(response);
        })
        .catch(function(err) {
          reject(err);
        });
    });
  };

  pool.query(
    STATEMENT[inputs.statementType.toLowerCase()],
    inputs.values,
    function(err, results, fields) {
      if(err) {
          callback(err);
      }
      callback(null, results);
  });

};

module.exports = function processTransactions(input, callback) {
  input.transactions.forEach(itr => _ba(itr, callback));
}
