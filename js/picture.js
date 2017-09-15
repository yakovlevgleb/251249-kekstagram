'use strict';

window.picture = (function () {

  var pictureTemplate = document.querySelector('#picture-template').content;
  var picturesBlock = document.querySelector('.pictures');

  var getRandomElement = function (array) {
    return array[Math.floor(Math.random() * array.length)];
  };

  var clearPictures = function () {
    while (picturesBlock.firstChild) {
      picturesBlock.removeChild(picturesBlock.firstChild);
    }
  };

  var createPictureNode = function (picture, i) {
    var pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('img').setAttribute('src', picture.url);
    pictureElement.querySelector('span.picture-likes').textContent = picture.likes;
    pictureElement.querySelector('span.picture-comments').textContent = getRandomElement(picture.comments);
    pictureElement.querySelector('img').setAttribute('data-index', i);
    return pictureElement;
  };

  window.backend.load(window.data.successHandler, window.backend.errorHandler);

  return {
    renderPicture: function (picture) {
      var fragment = document.createDocumentFragment();
      clearPictures();
      for (var i = 0; i < picture.length; i++) {
        fragment.appendChild(createPictureNode(picture[i], i));
      }
      picturesBlock.appendChild(fragment);
      document.querySelector('.filters').classList.remove('hidden');
    }
  };
})();
