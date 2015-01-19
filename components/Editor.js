/** @jsx React.DOM */
var React = require('react');

var _ = require('lodash');
var ace = require('brace');

require('brace/theme/tomorrow_night');
require('brace/mode/json');

var Editor = React.createClass({

  propTypes: {
    newData: React.PropTypes.func.isRequired,
    initialData: React.PropTypes.object.isRequired
  },

  getInitialState: function () {
    return {
      editor: {}
    };
  },

  componentDidMount: function () {
    var editor = ace.edit('editor');
    this.state.editor = editor;
    editor.getSession().setMode('ace/mode/json');
    editor.setTheme('ace/theme/tomorrow_night');

    // paste code in editor as JSON
    editor.setValue(JSON.stringify(this.props.initialData, null, '\t'), -1);

    this.initEvents(editor);
  },

  componentWillReceiveProps: function (nextProps) {
    this.state.editor.setValue(JSON.stringify(nextProps.initialData, null, '\t'), -1);
  },

  initEvents: function (editor) {
    var onNewDataDebounced = _.debounce(this.onNewData, 300);
    editor.getSession().on('change', function (evt) {
      // skip callback if event was triggered using editor.setValue()
      if (editor.curOp && editor.curOp.command.name){
        onNewDataDebounced(editor.getValue());
      }
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