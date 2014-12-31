/** @jsx React.DOM */
var React = require('react');
var LineChart = require('./LineChart');

var MainContainer = React.createClass({
  render: function () {
    return (
      <div className="MainContainer">
        <LineChart jsonData={this.props.jsonData} />
        <p>{this.props.jsonData}</p>
      </div>
    );
  }
});

module.exports = MainContainer;