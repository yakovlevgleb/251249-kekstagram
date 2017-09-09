'use strict';

window.preview = (function () {

  return {
    selectors: {
      gallery: '.gallery-overlay-image',
      galleryOverlay: '.gallery-overlay',
      likes: '.likes-count',
      comments: '.comments-count',
      upload: '.upload-overlay'
    },

    fillGallery: function (overlay, index, array) {
      overlay.querySelector(window.preview.selectors.gallery).setAttribute('src', array[index].url);
      overlay.querySelector(window.preview.selectors.likes).textContent = array[index].likes;
      overlay.querySelector(window.preview.selectors.comments).textContent = array[index].comments.length;
    },

    showGallery: function functionName(overlay) {
      overlay.classList.remove('hidden');
    }
  };
})();
