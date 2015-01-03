/** @jsx React.DOM */
var React = require('react');

var _ = require('lodash');
var ace = require('brace');
var sampleJson = require('../sampleData.json');

require('brace/theme/tomorrow_night');
require('brace/mode/json');

var Editor = React.createClass({

  propTypes: {
    newData: React.PropTypes.func.isRequired,
  },

  componentDidMount: function () {
    var editor = ace.edit('editor');
    editor.getSession().setMode('ace/mode/json');
    editor.setTheme('ace/theme/tomorrow_night');

    // paste code in editor as JSON
    editor.setValue(JSON.stringify(sampleJson, null, '\t'));

    this.initEvents(editor);
  },

  initEvents: function (editor) {
    var onNewDataDebounced = _.debounce(this.onNewData, 300);
    editor.getSession().on('change', function (evt) {
      onNewDataDebounced(editor.getValue());
    });
  },

  onNewData: function (data) {
    // get code as string save it as JS object
    this.props.newData(JSON.parse(data));
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