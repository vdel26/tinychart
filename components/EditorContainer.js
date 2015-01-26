/** @jsx React.DOM */
var React = require('react');
var Editor = require('./Editor');
var ExcelEditor = require('./ExcelEditor');
var sampleJson = require('../sampleData.json');

var EditorContainer = React.createClass({

  propTypes: {
    store: React.PropTypes.object.isRequired,
    newData: React.PropTypes.func.isRequired
  },

  getInitialState: function () {
    return { initialData: this.props.store.getData() }
  },

  resetEditorData: function () {
    this.setState({ initialData: sampleJson });
  },

  componentDidMount: function () {
    this.props.store.subscribe('reset', this.resetEditorData);
  },

  shouldComponentUpdate: function (nextProps, nextState) {
    if (nextState.initialData !== this.state.initialData) return true;
    return false;
  },

  render: function () {
    return (
      <div className="EditorContainer">
        {/*<Editor newData={this.props.newData} initialData={this.state.initialData} />*/}
        <ExcelEditor newData={this.props.newData} initialData={this.state.initialData} />
      </div>
    );
  }

});

module.exports = EditorContainer;
