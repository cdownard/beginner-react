var React = require('react');
var PersonState = require('mixins/PersonState');
var PersonRow = require('components/PersonRow');

var PersonView = React.createClass({
  mixins: [PersonState],

  getInitialProps: {
    selectedPerson: null
  },

  render: function() {
    return (
      <div className="container">
        <div className="row">

          <div className="col-md-12">
            <table className="table table-striped">
              <thead>
                <tr>
                  <td>First</td>
                  <td>Last</td>
                  <td>Email</td>
                </tr>
              </thead>
              <tbody>
                {this.renderPersonRows()}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    );
  },

  renderPersonRows: function() {
    return this.state.people.map(function(person) {
      return <PersonRow person={person} />
    });
  },

  deletePerson: function() {
      // call the api and delete
  }
});

module.exports = PersonView;
