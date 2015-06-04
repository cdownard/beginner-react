var Marty = require('marty');
var PersonConstants = require('constants/PersonConstants');

var PersonStore = Marty.createStore({
  handlers: {
    create: PersonConstants.CREATE_PERSON,
    receive: PersonConstants.RECEIVE_PEOPLE,
    update: PersonConstants.UPDATE_PERSON,
    destroy: PersonConstants.DESTROY_PERSON
  },

  getInitialState: function() {
    return {};
  },

  create: function(person) {
    this.state[person.id] = person;

    this.hasChanged();
  },

  receive: function(people) {
    var store = this;

    people.map(function(person) {
      store.state[person.id] = person;
    });

    this.hasChanged();
  },

  update: function(id, person) {
    this.state[id] = person;

    this.hasChanged();
  },

  destroy: function(id) {
    delete this.state[id];

    this.hasChanged();
  },

  getAll: function() {
    var store = this;

    return Object.keys(this.state).map(function(key) {
      return store.state[key];
    });
  },

  getById: function(id) {
    return this.state[id] || {};
  },
});

module.exports = PersonStore;
