/** @jsx React.DOM */
var React = require('react/addons');
var ChartSelector = require('./ChartSelector');

var SettingsContainer = React.createClass({

  propTypes: {
    isOpen: React.PropTypes.bool.isRequired,
    types: React.PropTypes.array.isRequired,
    switchChartType: React.PropTypes.func.isRequired,
    resetData: React.PropTypes.func.isRequired
  },

  render: function () {
    var cx = React.addons.classSet;
    var SettingsContainerClasses = cx({
      'SettingsContainer': true,
      'is-open': this.props.isOpen,
    });

    return (
      <div className={SettingsContainerClasses}>
        <div className="SettingsContainer-content">
          <ChartSelector switchChartType={this.props.switchChartType} types={this.props.types} />
          <button className="SettingsContainer-button SettingsContainer-button--default" onClick={this.props.resetData}>Reset Data</button>
          <button className="SettingsContainer-button SettingsContainer-button--blue">Download Chart</button>
        </div>
      </div>
    );
  }

});

module.exports = SettingsContainer;