var Marty = require('marty');
var PersonStore = require('stores/PersonStore');

var PersonState = Marty.createStateMixin({
  listenTo: [PersonStore],

  getState: function() {
    return {
      people: PersonStore.getAll(),
    }
  }
});

module.exports = PersonState;
