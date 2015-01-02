/** @jsx React.DOM */
var React = require('react');
var Editor = require('./Editor');

var EditorContainer = React.createClass({

  propTypes: {
    newData: React.PropTypes.func.isRequired,
  },

  render: function () {
    return (
      <div className="EditorContainer">
        <Editor newData={this.props.newData} />
      </div>
    );
  }

});

module.exports = EditorContainer;