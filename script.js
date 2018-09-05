//NOTE: this file is purely for testing the codebase.
let _ba = require('./lib/batch-async.js');
let records = require('./lib/records.js'),
    peopleRecords = require('./lib/people.js'),
    updatePeople= require('./lib/updateTest.js');

//add the ability to let users input the properties they want parsed
//from the json object, add normalization to the data, then insert it
_ba({
  transactions: [
    {
      statementType: 'INSERT',
      table: 'pet',
      columns: ['name', 'owner', 'species', 'sex'],
      values: records
    },
    {
      statementType: 'INSERT',
      table: 'people',
      columns: ['name', 'age', 'occupation', 'sex'],
      values: peopleRecords
    },
    {
      statementType: 'UPDATE',
      table: 'people',
      columns: ['name', 'age', 'occupation', 'sex'],
      values: updatePeople,
      columnIdentifier: 'name'
    }
  ]
}, function(err, response) {
  if(err) {
    console.log(err);
  }
  console.log(response);
})
