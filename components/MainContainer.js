/** @jsx React.DOM */
var React = require('react');
var LineChart = require('./LineChart');

var MainContainer = React.createClass({

  propTypes: {
    jsonData: React.PropTypes.object.isRequired,
  },

  render: function () {
    return (
      <div className="MainContainer">
        <LineChart jsonData={this.props.jsonData} />
      </div>
    );
  }

});

module.exports = MainContainer;