/**
*@param {String} sql - Passed in sql statement
*@return {String} sql - Matched sql statement type
**/
module.exports = function checkSqlType(sql) {
  let sqlTypes = ['insert', 'update', 'select', 'delete'];
  let sqlType;

  sqlTypes.forEach(type => {
    if (sql.toLowerCase().indexOf(type) > -1)
        sqlType = type;
  })
  return sqlType;
}
