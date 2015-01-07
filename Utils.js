'use strict';

module.exports = {
  // Svg
  // usage: <span dangerouslySetInnerHTML={{__html: Utils.svgHelper('#settings-icon')}}></span>
  //
  svgHelper: function (id) {
    return "<svg class='u-svgIcon' xmlns='http://www.w3.org/2000/svg' ><use xlink:href='" + id + "'></use></svg>";
  }
};