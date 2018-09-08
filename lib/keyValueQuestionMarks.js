/**
*@param {Array} cols - Array of MySQL column values
**/
module.exports = function printKeyValueQuestions(cols) {
  return cols.map(col => col = `${col} = ?`);
};
