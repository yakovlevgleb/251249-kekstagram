'use strict';

window.data = (function () {
  var pictures = [];

  return {
    successHandler: function (data) {
      pictures = data;
      window.picture.renderPicture(pictures);
      window.gallery.changeSorting(pictures);
      window.gallery.openPicPopup(pictures);
    }
  };
})();
