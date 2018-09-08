/**
*@param {String} sql - Passed in sql statement
**/
module.exports = function checkSqlType(sql) {
  let sqlType,
      sqlTypes = ['insert', 'update', 'select', 'delete'];

  sqlTypes.forEach(type => {
    if(sql.toLowerCase().indexOf(type) > -1) {
       sqlType = type;
    };
  });
  return sqlType;
};
