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

  window.backend.load(window.data.successHandler);

  return {
    renderPicture: function (picture) {
      var fragment = document.createDocumentFragment();
      document.querySelector('.pictures').innerHTML = ''
      for (var i = 0; i < picture.length; i++) {
        fragment.appendChild(createPictureNode(picture[i], i));
      }
      document.querySelector('.pictures').appendChild(fragment);
      document.querySelector('.filters').classList.remove('hidden');
    },

    errorHandler: function (errorMessage) {
      var node = document.createElement('div').className('error');
      node.style.left = 0;
      node.style.right = 0;
      node.style.zIndex = '100';
      node.style.fontSize = '25px';
      node.style.margin = '0 auto';
      node.style.textAlign = 'center';
      node.style.position = 'absolute';
      node.style.backgroundColor = 'red';
      node.style.color = 'yellow';

      node.textContent = errorMessage;
      document.body.insertAdjacentElement('afterbegin', node);
    }};
})();
