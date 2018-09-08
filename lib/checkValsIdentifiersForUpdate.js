/**
*@param {Object} obj - Object sent from user, containing the sql and values if exists
*@param {Function} [callback] - Fn to handle errors
**/
module.exports = function checkValsIdentifiersForUpdate(obj, callback) {
  let splitSql = obj.sqlStatement.split('') ? obj.sqlStatement.split('') : '',
        valueQuestionMarks = 0,
        splitCols,
        colIdentifiers = 0,
        total = 0,
        temp = '',
        values;

    splitSql.forEach(i => {
      temp += i;

      if(temp.toLowerCase().indexOf('where') === -1 && i === '?') {
        valueQuestionMarks++;
      }
      if(temp.toLowerCase().indexOf('where') > -1 && i === '?') {
        colIdentifiers++;
      }
    });

    total = valueQuestionMarks + colIdentifiers

    if(total !== obj.values[0].length) {
      callback(new Error("Escaped character values don't match values being sent through \n escaped characters: " + total +"\n passed in values: " + obj.values[0].length))
      return false;
    }
    return true;
};
