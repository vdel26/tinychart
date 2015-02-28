/** @jsx React.DOM */
var React = require('react');
var Chart = require('chart.js/Chart');
var ChartConfig = require('./ChartGlobalConfig');
var Utils = require('../Utils');


var LineChart = React.createClass({

  propTypes: {
    jsonData: React.PropTypes.object.isRequired,
  },

  initializeChart: function (props) {
    var el = this.getDOMNode();
    var ctx = el.getContext('2d');
    Chart.defaults.global = ChartConfig;
    var data = Utils.assignColors(props.jsonData, Utils.colorschemes);
    el.width = 600;
    el.height = 480;
    this.chart = new Chart(ctx).Line(data, {});
  },

  componentDidMount: function () {
    this.initializeChart(this.props);
  },

  componentWillReceiveProps: function (props) {
    var chart = this.chart;
    chart.destroy();
    this.initializeChart(props);
  },

  componentWillUnmount: function () {
    var chart = this.chart;
    chart.destroy();
  },

  render: function () {
    var style = {
      marginTop: window.devicePixelRatio > 1 ? 100 : 50
    };
    return (
      <canvas className='Chart LineChart' width='600px' height='480px' style={style} />
    );
  }

});

module.exports = LineChart;
