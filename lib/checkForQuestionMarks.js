/**
*@param {String} sql - Passed in sql statement
**/
module.exports = function checkForQuestionMarks(sql) {
    let splitSql = sql.split('') ? sql.split('') : '',
        questionMarks = 0;

    splitSql.forEach(i => {
      if(i === '?') {
         questionMarks++;
      }
    })
    return questionMarks;
};
