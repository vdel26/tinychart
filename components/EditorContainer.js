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
    return { 
      initialData: this.props.store.getData(),
      currentEditorMode: 'table'
    }
  },

  resetEditorData: function () {
    this.setState({ initialData: sampleJson });
  },

  componentDidMount: function () {
    this.props.store.subscribe('reset', this.resetEditorData);
  },

  shouldComponentUpdate: function (nextProps, nextState) {
    if (nextState.initialData !== this.state.initialData) return true;
    if (nextState.currentEditorMode !== this.state.currentEditorMode) return true;
    return false;
  },

  switchEditorMode: function (nextMode) {
    this.setState({ 
      currentEditorMode: nextMode,
      initialData: this.props.store.getData()
    });
  },

  render: function () {
    var editor;
    if (this.state.currentEditorMode === 'table') {
      editor = <ExcelEditor newData={this.props.newData} initialData={this.state.initialData} />;
    }
    else if (this.state.currentEditorMode === 'json') {
      editor = <Editor newData={this.props.newData} initialData={this.state.initialData} />;
    }

    return (
      <div className="EditorContainer">
        <nav className="EditorNav">
          <ul className="EditorNav-list">
            <li className={"EditorNav-elem " + (this.state.currentEditorMode === 'table' ? 'is-selected' : '')} 
                onClick={this.switchEditorMode.bind(null, 'table')}>TABLE</li>
            <li className={"EditorNav-elem " + (this.state.currentEditorMode === 'json' ? 'is-selected' : '')} 
                onClick={this.switchEditorMode.bind(null, 'json')}>JSON</li>
          </ul>
        </nav>
        { editor }
      </div>
    );
  }

});

module.exports = EditorContainer;
