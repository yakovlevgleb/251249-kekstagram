'use strict';

window.preview = (function () {
  return {
    fillGallery: function (overlay, index, array) {
      overlay.querySelector('.gallery-overlay-image').setAttribute('src', array[index].url);
      overlay.querySelector('.likes-count').textContent = array[index].likes;
      overlay.querySelector('.comments-count').textContent = array[index].comments.length;
    },

    showGallery: function (overlay) {
      overlay.classList.remove('hidden');
    }
  };
})();
