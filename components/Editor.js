/** @jsx React.DOM */
var React = require('react');

var _ = require('lodash');
var ace = require('brace');
var sampleJson = require('../dataStore').sampleJson;

require('brace/theme/tomorrow_night');
require('brace/mode/json');

var Editor = React.createClass({

  componentDidMount: function () {
    var editor = ace.edit('editor');
    editor.getSession().setMode('ace/mode/json');
    editor.setTheme('ace/theme/tomorrow_night');
    editor.setValue(JSON.stringify(sampleJson, null, '\t'));

    this.initEvents(editor);
  },

  initEvents: function (editor) {
    var onNewDataDebounced = _.debounce(this.onNewData, 500);
    editor.getSession().on('change', function (evt) {
      onNewDataDebounced(editor.getValue());
    });
  },

  onNewData: function (data) {
    this.props.newData(data);
  },

  render: function () {
    var divStyle = {
      width: '100%',
      height: '100%'
    };
    return (
      <div id='editor' style={divStyle}></div>
    );
  }
});

module.exports = Editor;