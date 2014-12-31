/** @jsx React.DOM */
var React = require('react');
var Editor = require('./Editor');

var EditorContainer = React.createClass({
  render: function () {
    return (
      <div className="EditorContainer">
        <h1>Editor</h1>
        <Editor newData={this.props.newData} />
      </div>
    );
  }
});

module.exports = EditorContainer;