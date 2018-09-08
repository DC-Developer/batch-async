/**
*@param {Array} cols - Array of MySQL column values
**/
module.exports = function printValueQuestionMarks(cols) {
  return cols.map(col => col = '?');
}
