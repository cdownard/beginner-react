var React = require('react');

var PersonRow = React.createClass({
  getDefaultProps: function() {
    return {
      person: {}
    };
  },

  getInitialState: function() {
    return {};
  },

  render: function() {
    var person = this.props.person;
    return (
      <tr>
        <td>{person.first_name}</td>
        <td>{person.last_name}</td>
        <td>{person.email}</td>
      </tr>

    );
  },

});

module.exports = PersonRow;
