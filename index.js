/** @jsx React.DOM */
var React = require('react');
var EditorContainer = require('./components/EditorContainer');
var MainContainer = require('./components/MainContainer');
var sampleJson = require('./dataStore').sampleJson;

var App = React.createClass({

  getInitialState: function () {
    return {
      jsonData: sampleJson
    };
  },

  newData: function (data) {
    console.log('new data');
    this.setState({ jsonData: data });
  },

  render: function () {
    console.log(this.state.jsonData);
    return (
      <div className="App">
        <EditorContainer newData={this.newData} />
        <MainContainer jsonData={this.state.jsonData} />
      </div>
    );
  }

});

React.render(<App />, document.body);