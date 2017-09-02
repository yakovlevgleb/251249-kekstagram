'use strict';

(function () {
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

  window.renderPicture(window.preview.pictureDescription);
  document.querySelector(window.preview.selectors.upload).classList.add('hidden');

  window.renderGallery = function (overlay) {
    document.querySelector('.pictures').addEventListener('click', function (evt) {
      evt.preventDefault();
      var target = evt.target;
      var ind = target.getAttribute('data-index');
      window.preview.fillGallery(galleryOverlay, ind);
      window.preview.showGallery(galleryOverlay);
      return;
    });
  };

  window.renderGallery(galleryOverlay);
})();
