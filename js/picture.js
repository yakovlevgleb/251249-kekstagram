'use strict';

window.picture = (function () {

  var pictureTemplate = document.querySelector('#picture-template').content;
  var getRandomElement = function (array) {
    return array[Math.floor(Math.random() * array.length)];
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
      document.querySelector('.pictures').innerHTML = '';
      for (var i = 0; i < picture.length; i++) {
        fragment.appendChild(createPictureNode(picture[i], i));
      }
      document.querySelector('.pictures').appendChild(fragment);
      document.querySelector('.filters').classList.remove('hidden');
    }
  };
})();
