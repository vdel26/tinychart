/** @jsx React.DOM */
var React = require('react');
var EditorContainer = require('./components/EditorContainer');
var MainContainer = require('./components/MainContainer');
var DataStore = require('./DataStore');


var App = React.createClass({

  newData: function (data) {
    this.props.store.update(data);
  },

  render: function () {
    return (
      <div className="App">
        <EditorContainer newData={this.newData} />
        <MainContainer jsonData={this.props.store.data} />
      </div>
    );
  }

});

var store = new DataStore('chartpad');

function render () {
  React.render(<App store={store} />, document.body);
}

store.subscribe(render);
render();