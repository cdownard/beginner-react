var Marty = require('marty');
var PersonActionCreators = require('actions/PersonActionCreators');

var sourceError = function(error) {
  console.log(error);
};

var PersonHttpAPI = Marty.createStateSource({
  type: 'http',
  rootUrl: 'http://localhost:3000/api/people/',

  getAll: function() {
    this.get(
      this.rootUrl
    ).then(function(response) {
      PersonActionCreators.receive(response.body);
    }, function(errorResponse) {
      sourceError(errorResponse);
    });
  },

  getById: function(id, callback) {
    var url = this.rootUrl + id;
    this.get(
      url
    ).then(function(response) {

    }, function(errorResponse) {

    });
  },

  create: function(person) {
  },

  update: function(id, person) {
    var url = this.rootUrl + id;
  },

  destroy: function(id) {
    var url = this.rootUrl + id;
  }
});

module.exports = PersonHttpAPI;
