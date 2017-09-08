'use strict';
window.data = (function () {
  var pictureDescription = [];

  var pereopr = function (pictures) {
    pictureDescription = pictures;
  };

  window.backend.load(pereopr);

  return {
    fillArray: pictureDescription
  };
})();
