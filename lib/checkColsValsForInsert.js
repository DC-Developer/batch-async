/**
*@param {Object} obj - Object sent from user, containing the sql and values if exists
*@param {Function} [callback] - Fn to handle errors
**/
module.exports = function checkColsValsForInsert(obj, callback) {
  let splitSql = obj.sqlStatement.split('') ? obj.sqlStatement.split('') : '';
  let paranthesisCount = 0;
  let valueQuestionMarks = 0;
  let columnsArray = [];
  let columnCount;
  let splitCols;

    splitSql.forEach(i => {
      
      if (i === '(' || i === ')')
          paranthesisCount++;

      if (paranthesisCount === 1 && paranthesisCount !== 2 && i !== '(' && i !== ' ')
          columnsArray.push(i);

      if (paranthesisCount === 3 && paranthesisCount !== 4 && i === '?')
          valueQuestionMarks++;
      
    })
  
    splitCols = columnsArray.join('').split(',');
    columnCount = splitCols.filter(col => col !== '');

    if (columnCount.length !== valueQuestionMarks) {
        callback(new Error("\n Columns and values aren't matching\n column count: "+columnCount.length+"\n"+" value count: "+ valueQuestionMarks));
        return false;
    }
    return true;
}
