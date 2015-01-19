/** @jsx React.DOM */
var React = require('react');
var Editor = require('./Editor');
var sampleJson = require('../sampleData.json');

var EditorContainer = React.createClass({

  propTypes: {
    store: React.PropTypes.object.isRequired,
    newData: React.PropTypes.func.isRequired,
    initialData: React.PropTypes.object.isRequired
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

  render: function () {
    return (
      <div className="EditorContainer">
        <Editor newData={this.props.newData} initialData={this.state.initialData} />
      </div>
    );
  }

});

module.exports = EditorContainer;