'use strict';

window.picture = (function () {

  var pictureTemplate = document.querySelector('#picture-template').content;

  var createPictureNode = function (picture, i) {
    var pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('img').setAttribute('src', picture.url);
    pictureElement.querySelector('span.picture-likes').textContent = picture.likes;
    pictureElement.querySelector('span.picture-comments').textContent = picture.comments;
    pictureElement.querySelector('img').setAttribute('data-index', i);
    return pictureElement;
  };

  return {
    renderPicture: function (array) {
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < array.length; i++) {
        fragment.appendChild(createPictureNode(array[i], i));
      }
      document.querySelector('.pictures').appendChild(fragment);
    }
  };
})();
