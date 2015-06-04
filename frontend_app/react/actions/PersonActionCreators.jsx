var Marty = require('marty');
var PersonConstants = require('constants/PersonConstants');

var PersonActionCreators = Marty.createActionCreators({
  create: function(person) {
    this.dispatch(PersonConstants.CREATE_PERSON, person);
  },

  receive: function(people) {
    this.dispatch(PersonConstants.RECEIVE_PEOPLE, people);
  },

  update: function(id, person) {
    this.dispatch(PersonConstants.UPDATE_PERSON, id, person);
  },

  destroy: function(id) {
    this.dispatch(PersonConstants.DESTROY_PERSON, id);
  }
});

module.exports = PersonActionCreators;
