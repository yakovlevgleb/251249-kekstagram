'use strict';

window.data = (function () {
  var pictures = [];

  return {
    successHandler: function (data) {
      pictures = data;
      window.gallery.popularLikesSort(pictures, 'comments.lenght');
      window.picture.renderPicture(pictures);
      window.gallery.openPicPopup(pictures);
    }
  };
})();
