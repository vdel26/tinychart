/** @jsx React.DOM */
var React = require('react');
var LineChart = require('./LineChart');
var BarChart = require('./BarChart');
var ChartSelector = require('./ChartSelector');
var Utils = require('../Utils');
var CHART_TYPES = ['line', 'bar'];


var MainContainer = React.createClass({

  propTypes: {
    store: React.PropTypes.object.isRequired,
    currentChartType: React.PropTypes.string.isRequired,
    openSettings: React.PropTypes.func.isRequired
  },

  getInitialState: function () {
    return { data: this.props.store.getData() };
  },

  openSettings: function () {
    this.props.openSettings();
  },

  getStateFromStore: function () {
    this.setState({ data: this.props.store.getData()});
  },

  shouldComponentUpdate: function (nextProps, nextState) {
    if (nextState.data !== this.state.data) return true;
    if (nextProps.currentChartType !== this.props.currentChartType) return true;
    return false;
  },

  componentDidMount: function () {
    this.props.store.subscribe('change', this.getStateFromStore);
  },

  render: function () {
    var currentChart;
    if (this.props.currentChartType === 'line')
      currentChart = <LineChart jsonData={this.state.data} />;
    else if (this.props.currentChartType === 'bar')
      currentChart = <BarChart jsonData={this.state.data} />;

    var cx = React.addons.classSet;
    var FlashMessageClasses = cx({
      'FlashMessage': true,
      'is-visible': true,
    });

    return (
      <div className="MainContainer">
        <header className="MainContainer-header">
          <span className={FlashMessageClasses}>Welcome to Tinychart!</span>
          <div className="SettingsButton"
               onClick={this.openSettings}
               dangerouslySetInnerHTML={{__html: Utils.svgHelper('#settings-icon')}}/>
        </header>
        {currentChart}
        <footer className="MainContainer-footer">
          <span className="MainContainer-brand">Tinychart</span>
          <a className="MainContainer-contact" href="http://twitter.com/lechienvic">@lechienvic</a>
        </footer>
      </div>
    );
  }

});

module.exports = MainContainer;