/** @jsx React.DOM */
var React = require('react');
var LineChart = require('./LineChart');
var BarChart = require('./BarChart');
var ChartSelector = require('./ChartSelector');
var Utils = require('../Utils');
var CHART_TYPES = ['line', 'bar'];


var MainContainer = React.createClass({

  propTypes: {
    jsonData: React.PropTypes.object.isRequired,
    currentChartType: React.PropTypes.string.isRequired
  },

  openSettings: function () {
    this.props.openSettings();
  },

  render: function () {
    var currentChart;
    if (this.props.currentChartType === 'line')
      currentChart = <LineChart jsonData={this.props.jsonData} />;
    else if (this.props.currentChartType === 'bar')
      currentChart = <BarChart jsonData={this.props.jsonData} />;

    return (
      <div className="MainContainer">
        <header className="MainContainer-header">
          <div className="SettingsButton"
               onClick={this.openSettings}
               dangerouslySetInnerHTML={{__html: Utils.svgHelper('#settings-icon')}}/>
        </header>
        {currentChart}
        <footer className="MainContainer-footer">
        </footer>
      </div>
    );
  }

});

module.exports = MainContainer;