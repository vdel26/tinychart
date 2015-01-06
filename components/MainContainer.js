/** @jsx React.DOM */
var React = require('react');
var LineChart = require('./LineChart');
var BarChart = require('./BarChart');
var ChartSelector = require('./ChartSelector');
var CHART_TYPES = ['line', 'bar'];


var MainContainer = React.createClass({

  propTypes: {
    jsonData: React.PropTypes.object.isRequired,
  },

  getInitialState: function () {
    return {
      currentChartType: 'line'
    };
  },

  switchChartType: function (toType) {
    this.setState({ currentChartType: toType });
  },

  render: function () {
    var currentChart;
    if (this.state.currentChartType === 'line')
      currentChart = <LineChart jsonData={this.props.jsonData} />;
    else if (this.state.currentChartType === 'bar')
      currentChart = <BarChart jsonData={this.props.jsonData} />;

    return (
      <div className="MainContainer">
        <header className="MainContainer-header">
          <ChartSelector switchChartType={this.switchChartType} types={CHART_TYPES}/>
          <div className="SettingsButton u-icon" data-icon="&#106;" />
        </header>
        {currentChart}
      </div>
    );
  }

});

module.exports = MainContainer;