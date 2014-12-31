/** @jsx React.DOM */
var React = require('react');
var Test = require('./test');

var MainContainer = React.createClass({
  render: function () {
    return (
      <div className="MainContainer">
        <Test />
        <p>{this.props.jsonData}</p>
      </div>
    );
  }
});

module.exports = MainContainer;