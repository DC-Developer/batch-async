/**
*@param {Object} obj - Object sent from user, containing the sql and values if exists
*@param {Function} [callback] - Fn to handle errors
**/
module.exports = function checkColsValsForInsert(obj, callback) {
  let splitSql = obj.sqlStatement.split('') ? obj.sqlStatement.split('') : '',
        paranthesisCount = 0,
        valueQuestionMarks = 0,
        columnsArray = [],
        columnCount,
        splitCols;

    splitSql.forEach(i => {
      if(i === '(' || i === ')') {
        paranthesisCount++;
      }
      if(paranthesisCount === 1 && paranthesisCount !== 2 && i !== '(' && i !== ' ') {
        columnsArray.push(i);
      }
      if(paranthesisCount === 3 && paranthesisCount !== 4 && i === '?') {
        valueQuestionMarks++;
      }
    });

    splitCols = columnsArray.join('').split(',');
    columnCount = splitCols.filter(col => col !== '');
    console.log(splitCols);
    console.log('col count: ',columnCount);

    if(columnCount.length !== valueQuestionMarks) {
      console.log('false');
      callback(new Error("\n Columns and values aren't matching\n column count: "+columnCount.length+"\n"+" value count: "+ valueQuestionMarks));
      return false;
    }
    console.log('true');
    return true;
};
