'use strict';

window.gallery = (function () {
  var ESC_KEYCODE = 27;
  var galleryOverlay = document.querySelector(window.preview.selectors.galleryOverlay);

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

  return {
    openPicPopup: function (array) {
      document.querySelector('.pictures').addEventListener('click', function (evt) {
        evt.preventDefault();
        var target = evt.target;
        if (target.tagName === 'IMG') {
          var ind = target.getAttribute('data-index');
          window.preview.fillGallery(galleryOverlay, ind, array);
          window.preview.showGallery(galleryOverlay);
        }
        document.querySelector(window.preview.selectors.upload).classList.add('hidden');
      });
    },
    recomendedSort: function (array) {
    },
    popularLikesSort: function (array, value) {
      array.sort(function (a, b) {
        if (a[value] < b[value]) {
          return 1;
        }
        if (a[value] > b[value]) {
          return -1;
        }
        return 0;
      });
    },
    popularCommentsSort: function (array, value) {
      array.sort(function (a, b) {
        if (a.comments.length < b.comments.length) {
          return 1;
        }
        if (a.comments.length > b.comments.length) {
          return -1;
        }
        return 0;
      });
    }
  };
})();
