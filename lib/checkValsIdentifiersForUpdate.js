/**
*@param {Object} obj - Object sent from user, containing the sql and values if exists
*@param {Function} [callback] - Fn to handle errors
*@returns {Boolean} [false|true] - Returns false if errors exist, true if not
**/
module.exports = function checkValsIdentifiersForUpdate(obj, callback) {
  let splitSql = obj.sqlStatement.split('') ? obj.sqlStatement.split('') : '',
  let valueQuestionMarks = 0;
  let splitCols;
  let colIdentifiers = 0;
  let total = 0;
  let temp = '';
  let values;

  //need to check the values if it is in object or array format, and handle it
  //based on the data type

    splitSql.forEach(i => {
      temp += i;

      if (temp.toLowerCase().indexOf('where') === -1 && i === '?') 
          valueQuestionMarks++;
      
      if (temp.toLowerCase().indexOf('where') > -1 && i === '?') 
          colIdentifiers++;
 
    })

    total = valueQuestionMarks + colIdentifiers;

    if (total !== obj.values[0].length) {
        callback(new Error("Escaped character values don't match values being sent through \n escaped characters: " + total +"\n passed in values: " + obj.values[0].length))
        return false;
    }
    return true;
};
