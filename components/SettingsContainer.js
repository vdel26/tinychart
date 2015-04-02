/** @jsx React.DOM */
var React = require('react/addons');
var ChartSelector = require('./ChartSelector');

var SettingsContainer = React.createClass({

  propTypes: {
    isOpen: React.PropTypes.bool.isRequired,
    isSharing: React.PropTypes.bool.isRequired,
    types: React.PropTypes.array.isRequired,
    switchChartType: React.PropTypes.func.isRequired,
    resetData: React.PropTypes.func.isRequired,
    shareUrl: React.PropTypes.func.isRequired,
    url: React.PropTypes.string.isRequired
  },

  componentDidUpdate: function () {
    setTimeout(function () {
      // wait for canvas rendering before getting the image url
      var canvas = document.querySelector('canvas');
      var url = canvas.toDataURL();
      this.refs.download.getDOMNode().href = url;
    }.bind(this), 1000);
  },

  shareUrl: function () {
    this.props.shareUrl();
    var shareButton = this.refs.share.getDOMNode();
    shareButton.classList.add('is-sharing');
    setTimeout(function () {
      shareButton.classList.remove('is-sharing');
    }, 2000);
  },

  render: function () {
    var cx = React.addons.classSet;
    var SettingsContainerClasses = cx({
      'SettingsContainer': true,
      'is-open': this.props.isOpen,
      'is-sharing': this.props.isSharing
    });
    var SettingsInputClasses = cx({
      'SettingsContainer-input': true,
      'is-sharing': this.props.isSharing
    });

    return (
      <div className={SettingsContainerClasses}>
        <div className="SettingsContainer-content">
          <ChartSelector switchChartType={this.props.switchChartType} types={this.props.types} />
          <button className="SettingsContainer-button SettingsContainer-button--default" onClick={this.props.resetData}>Reset Data</button>
          <button id="share"
                  ref="share"
                  className="SettingsContainer-button SettingsContainer-button--default SettingsContainer-share"
                  onClick={this.shareUrl}
                  data-text="Copy this link">
            <span>Share link</span>
          </button>
          <input ref="shareLink" className={SettingsInputClasses} value={this.props.url}/>
          <a className="SettingsContainer-button SettingsContainer-button--blue" download="chartpad.png" ref="download">Download Chart</a>
        </div>
      </div>
    );
  }

});

module.exports = SettingsContainer;