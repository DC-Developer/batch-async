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
*@param {Object} inputs - Custom object from user
**/
function replaceQuestionMarks(inputs) {
  let replacement = inputs.customStatement.split(''),
      columnCount = 0,
      tempString;

  for(let i=0, l = replacement.length; i<l; i++) {
    tempString += replacement[i];
    if(tempString.indexOf('WHERE') > -1 && replacement[i] === '?') {
      replacement[i] = inputs.columns[columnCount++]
    }
  }

  return replacement.join('');
}

/**
*@param {Object} inputs - Object containing user defined inputs
*@param {Function} [callback] - A callback to give user custom control
**/
function _ba(inputs, callback) {
  //dynamically create the property + statement string based on user input
  if(!inputs.columns) {
    inputs.columns = ['']
  }

  let customStatement;

  if(inputs.customStatement) {
    customStatement = replaceQuestionMarks(inputs);
  }

  let STATEMENT = {
    insert: `
      INSERT INTO ${inputs.table} (${inputs.columns.join(',')})
      VALUES (${printValueQuestionMarks(inputs.columns)})`,
    update: `
      UPDATE ${inputs.table}
      set ${printKeyValueQuestions(inputs.columns).join(',')}
      WHERE ${inputs.columnIdentifier} = ?`,
    custom: customStatement || inputs.customStatement || ''
  };

  let statementTypes = ['insert', 'update', 'custom'];

  let manageRecords = (values) => {
    return new Promise((resolve, reject) => {

      let iteratee = (value, itrCallback) => {
        let query = pool.query(
          STATEMENT[inputs.statementType.toLowerCase()],
          value,
          function(err, results, fields) {
            if(err) {
              console.log(err);
            }
            console.log(results);
            itrCallback();
        });
        console.log(query.sql);
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
    return callback(new Error("inputs.statementType is not a string"));
  };

  if(inputs.values.length > 1) {
    return new Promise((resolve, reject) => {
      Promise.all([manageRecords(inputs.values)])
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
