var Marty = require('marty');

var PersonConstants = Marty.createConstants([
  'CREATE_PERSON',
  'RECEIVE_PEOPLE',
  'UPDATE_PERSON',
  'DESTROY_PERSON'
]);

module.exports = PersonConstants;
