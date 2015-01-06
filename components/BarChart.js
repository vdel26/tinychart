/** @jsx React.DOM */
var React = require('react');
var Chart = require('chart.js/Chart');
var ChartConfig = require('./ChartGlobalConfig');


var BarChart = React.createClass({

  propTypes: {
    jsonData: React.PropTypes.object.isRequired,
  },

  getInitialState: function () {
    return {
      chart: {}
    };
  },

  initializeChart: function (props) {
    var el = this.getDOMNode();
    var ctx = el.getContext('2d');
    Chart.defaults.global = ChartConfig;
    this.state.chart = new Chart(ctx).Bar(props.jsonData, {});
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
      <canvas className='Chart BarChart' width='600px' height='480px'></canvas>
    );
  }

});

module.exports = BarChart;