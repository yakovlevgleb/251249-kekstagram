'use strict';

(function () {

  window.preview = {
    selectors: {
      gallery: '.gallery-overlay-image',
      galleryOverlay: '.gallery-overlay',
      likes: '.likes-count',
      comments: '.comments-count',
      upload: '.upload-overlay'
    },

    pictureDescription: window.fillArray(),

    fillGallery: function (overlay, fotoNumber) {
      overlay.querySelector(window.preview.selectors.gallery).setAttribute('src', window.preview.pictureDescription[fotoNumber].url);
      overlay.querySelector(window.preview.selectors.likes).textContent = window.preview.pictureDescription[fotoNumber].likes;
      overlay.querySelector(window.preview.selectors.comments).textContent = window.preview.pictureDescription[fotoNumber].comments.length;
    },

    showGallery: function functionName(overlay) {
      overlay.classList.remove('hidden');
    }
  };
})();
