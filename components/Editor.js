/** @jsx React.DOM */
var React = require('react');
var _ = require('lodash');

var ace = require('brace');
require('brace/theme/tomorrow_night');
require('brace/mode/json');

var Editor = React.createClass({

  componentDidMount: function () {
    var editor = ace.edit('editor');
    editor.getSession().setMode('ace/mode/json');
    editor.setTheme('ace/theme/tomorrow_night');

    var sampleJson = { "name": "numbers", "data": [1, 2, 3, 4, 5] };
    editor.setValue(JSON.stringify(sampleJson, null, '\t'));

    this.initEvents(editor);
  },

  initEvents: function (editor) {
    var onNewDataDebounced = _.debounce(this.onNewData, 500);
    editor.getSession().on('change', function (evt) {
      var data = editor.getValue();
      onNewDataDebounced(data);
    }.bind(this));
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