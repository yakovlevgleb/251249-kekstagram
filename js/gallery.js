'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var galleryOverlay = document.querySelector('.gallery-overlay');
  var pictures = [];
  var filters = {
    'filter-popular': {
      setup: function (array) {
        pictures = array.slice();
        pictures.sort(function (a, b) {
          return b.likes - a.likes;
        });
        return pictures;
      }
    },
    'filter-discussed': {
      setup: function (array) {
        pictures = array.slice();
        pictures.sort(function (a, b) {
          return b.comments.length - a.comments.length;
        });
        return pictures;
      }
    },
    'filter-random': {
      setup: function (array) {
        pictures = array.slice();
        pictures.sort(function () {
          return Math.random() - 0.5;
        });
        return pictures;
      }
    }
  };

  document.addEventListener('keydown', function (event) {
    if (event.keyCode === ESC_KEYCODE && document.activeElement !== document.querySelector('.upload-form-description')) {
      var galleryElement = document.querySelector('.gallery-overlay');
      document.querySelector('.upload-overlay').classList.add('hidden');
      galleryElement.classList.add('hidden');
    }
  });

  document.querySelector('.gallery-overlay-close').addEventListener('click', function () {
    var galleryElement = document.querySelector('.gallery-overlay');
    galleryElement.classList.add('hidden');
  });


  window.openPicPopup = function (array) {
    document.querySelector('.pictures').addEventListener('click', function (evt) {
      evt.preventDefault();
      var target = evt.target;
      if (target.tagName === 'IMG') {
        window.preview.fillGallery(galleryOverlay, target.getAttribute('data-index'), array);
        window.preview.showGallery(galleryOverlay);
      }
      document.querySelector('.upload-overlay').classList.add('hidden');
    }
  );
    document.querySelector('.pictures').addEventListener('keydown', function (evt) {
      if (evt.keyCode === ENTER_KEYCODE) {
        evt.preventDefault();
        var target = evt.target;
        if (target.tagName === 'IMG') {
          window.preview.fillGallery(galleryOverlay, target.getAttribute('data-index'), array);
          window.preview.showGallery(galleryOverlay);
        }
        document.querySelector('.upload-overlay').classList.add('hidden');
      }
    });
  };

  window.onSuccess = function (data) {
    pictures = data;
    window.renderPicture(pictures);
    window.changeSorting(pictures, filters);
    window.openPicPopup(pictures);
  };
})();
