/** @jsx React.DOM */
var React = require('react/addons');
var EditorContainer = require('./components/EditorContainer');
var MainContainer = require('./components/MainContainer');
var SettingsContainer = require('./components/SettingsContainer');
var DataStore = require('./DataStore');
var CHART_TYPES = ['line', 'bar'];

var icons = require('!!raw!./fonts/svg-icons-all.svg');

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
    this.refs.EditorContainer.resetEditorData();
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
        <div className={AppClasses} onClick={this.closeSettings} ref="app">
          <EditorContainer newData={this.newData} ref="EditorContainer" />
          <MainContainer jsonData={this.props.store.data} openSettings={this.openSettings} currentChartType={this.state.currentChartType} />
        </div>
        <SettingsContainer isOpen={this.state.settingsIsOpen}
                           types={CHART_TYPES}
                           switchChartType={this.switchChartType}
                           resetData={this.resetData} />
      </div>
    );
  }

});

var store = new DataStore('chartpad');

function render () {
  React.render(<App store={store} />, document.body);
}

store.subscribe(render);
render();