/** @jsx React.DOM */
var React = require('react');
var Chart = require('chart.js/Chart');
var sampleJson = require('../dataStore').sampleJson;

var LineChart = React.createClass({

  propTypes: {
    jsonData: React.PropTypes.object.isRequired,
  },

  getDefaultProps: function () {
    return {
      jsonData: sampleJson
    };
  },

  getInitialState: function () {
    return {
      chart: {}
    };
  },

  initializeChart: function (props) {
    var el = this.getDOMNode();
    var ctx = el.getContext('2d');
    this.state.chart = new Chart(ctx).Line(props.jsonData, {});
  },

  componentDidMount: function () {
    this.initializeChart(this.props);
  },

  componentWillReceiveProps: function (props) {
    var chart = this.state.chart;
    chart.destroy();
    this.initializeChart(props);
  },

  componentWillUnmount: function () {
    var chart = this.state.chart;
    chart.destroy();
  },

  render: function () {
    return (
      <canvas className='LineChart' width='600px' height='480px'></canvas>
    );
  }

});

module.exports = LineChart;