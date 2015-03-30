/** @jsx React.DOM */
var React = require('react/addons');
var EditorContainer = require('./components/EditorContainer');
var MainContainer = require('./components/MainContainer');
var SettingsContainer = require('./components/SettingsContainer');
var DataStore = require('./DataStore');
var Utils = require('./Utils');
var CHART_TYPES = ['line', 'bar'];

var icons = require('!!raw!./icons/svg-icons-all.svg');

var App = React.createClass({

  getInitialState: function () {
    return {
      settingsIsOpen: false,
      currentChartType: 'line'
    };
  },

  newData: function (data) {
    this.props.store.update(data);
  },

  resetData: function () {
    this.props.store.resetData();
    Utils.setUrl('');
  },

  shareUrl: function () {
    Utils.setUrl(this.props.store.getData());
  },

  openSettings: function () {
    this.setState({ settingsIsOpen: true });
  },

  switchChartType: function (toType) {
    this.setState({ currentChartType: toType });
  },

  closeSettings: function (evt) {
    if (this.state.settingsIsOpen) this.setState({ settingsIsOpen: false });
  },

  render: function () {
    var cx = React.addons.classSet;
    var AppClasses = cx({
      'App': true,
      'is-dimmed': this.state.settingsIsOpen
    });

    return (
      <div className="OuterContainer">
        <span dangerouslySetInnerHTML={{__html: icons}}/>
        <div className={AppClasses} onClick={this.closeSettings}>
          <EditorContainer store={this.props.store} newData={this.newData} />
          <MainContainer store={this.props.store} openSettings={this.openSettings} currentChartType={this.state.currentChartType} />
        </div>
        <SettingsContainer isOpen={this.state.settingsIsOpen}
                           types={CHART_TYPES}
                           switchChartType={this.switchChartType}
                           resetData={this.resetData}
                           shareUrl={this.shareUrl} />
      </div>
    );
  }

});

var store = new DataStore('chartpad');

React.render(<App store={store} />, document.body);
