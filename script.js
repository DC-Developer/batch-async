//NOTE: this file is purely for testing the codebase.
let _ba = require('./lib/batch-async.js');
let connection = require('./connection.js');
let records = require('./mock-data/pets.js'),
    peopleRecords = require('./mock-data/people.js'),
    updatePeople = require('./mock-data/updateTest.js'),
    customUpdate = require('./mock-data/customUpdate.js');

_ba({
  transactions: [
    {
      values: records,
      sqlStatement:`
        INSERT INTO
        pet
        (name, owner, species, sex)
        VALUES
        (?, ?, ?, ?)
      `
    },
    {
      values: peopleRecords,
      sqlStatement: `
        INSERT INTO
        people
        (name, age, occupation, sex)
        VALUES
        (?, ?, ?, ?)
      `
    },
    {
      values: customUpdate,
      sqlStatement: `
        UPDATE people
        SET
        name = ?, occupation = ?
        WHERE
        name = ?
        AND
        occupation = ?
        `
    }
  ]
},
  connection,
  function(err, response) {
  if(err) {
    console.log(err);
  }
  console.log(response);
});
