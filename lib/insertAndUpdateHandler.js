let async = require('async');
/**
*@param {String} statement - User's sql statement
*@param {Array||Object} values - Collection of data values
*@param {Object} connection - User's MySql connection object
**/
module.exports = function insertOrUpdate(statement, values, connection) {
  return new Promise((resolve, reject) => {

    let iteratee = (value, itrCallback) => {
      connection.query(
          statement,
          value,
          function(err, results, fields) {
            if (err) console.log(err);
            
            console.log(results);
            itrCallback();
          })
    }
    
    async.each(values, iteratee, function(err) {
      if  (err) reject(err);

      resolve(values);
    })
  })
}
