/**
*@param {String} sql - Passed in sql statement
**/
module.exports = function checkForQuestionMarks(sql) {
    let splitSql = sql.split('') ? sql.split('') : '';
    let questionMarks = 0;

    splitSql.forEach(i => {
      if (i === '?') questionMarks++;
    })
    return questionMarks;
};
