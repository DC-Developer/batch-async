let async = require('async');
/**
*@param {String} statement - User's sql statement
*@param {Array||Object} values - Collection of data values
*@param {Object} pool - User's MySql connection object
**/
module.exports = function insertOrUpdate(statement, values, pool) {
  return new Promise((resolve, reject) => {

    let iteratee = (value, itrCallback) => {
      pool.query(
        statement,
        value,
        function(err, results, fields) {
          if(err) {
            console.log(err);
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
