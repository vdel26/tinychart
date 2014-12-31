/** @jsx React.DOM */
var React = require('react');
var EditorContainer = require('./components/EditorContainer');
var MainContainer = require('./components/MainContainer');

var App = React.createClass({
  getInitialState: function () {
    return {
      jsonData: ''
    };
  },

  newData: function (data) {
    console.log('new data');
    this.setState({ jsonData: data });
  },

  render: function () {
    return (
      <div className="App">
        <EditorContainer newData={this.newData} />
        <MainContainer jsonData={this.state.jsonData} />
      </div>
    );
  }
});

React.renderComponent(<App />, document.body);