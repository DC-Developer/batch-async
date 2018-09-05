let _ba = require('./lib/batch-async.js');
let records = require('./lib/records.js'),
    peopleRecords = require('./lib/people.js');

//add the ability to let users input the properties they want parsed
//from the json object, add normalization to the data, then insert it
_ba({
  transactions: [
    {
      batchQuery: true,
      statementType: 'INSERT',
      table: 'pet',
      columns: ['name', 'owner', 'species', 'sex'],
      values: records
    },
    {
      batchQuery: true,
      statementType: 'INSERT',
      table: 'people',
      columns: ['name', 'age', 'occupation', 'sex'],
      values: peopleRecords
    }
  ]
}, function(err, response) {
  if(err) {
    console.log(err);
  }
  console.log(response);
})
