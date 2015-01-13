/** @jsx React.DOM */
var React = require('react');
var Editor = require('./Editor');

var EditorContainer = React.createClass({

  propTypes: {
    newData: React.PropTypes.func.isRequired,
  },

  resetEditorData: function () {
    this.refs.editor.resetData();
  },

  render: function () {
    return (
      <div className="EditorContainer">
        <Editor newData={this.props.newData} ref="editor" />
      </div>
    );
  }

});

module.exports = EditorContainer;