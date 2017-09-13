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

  var pictureArrCopy = [];
  var filters = {
    'filter-popular': {
      setFilter: function (array) {
        pictureArrCopy = array.slice();
        pictureArrCopy.sort(function (a, b) {
          if (a.likes < b.likes) {
            return 1;
          }
          if (a.likes > b.likes) {
            return -1;
          }
          return 0;
        });
        return pictureArrCopy;
      }
    },
    'filter-discussed': {
      setFilter: function (array) {
        pictureArrCopy = array.slice();
        pictureArrCopy.sort(function (a, b) {
          if (a.comments.length < b.comments.length) {
            return 1;
          }
          if (a.comments.length > b.comments.length) {
            return -1;
          }
          return 0;
        });
        return pictureArrCopy;
      }
    },
    'filter-random': {
      setFilter: function (array) {
        pictureArrCopy = array.slice();
        var index = pictureArrCopy.length - 1;
        var randomElem;
        var value;
        while (index > 1) {
          randomElem = Math.floor(Math.random() * (index + 1));
          value = pictureArrCopy[index];
          pictureArrCopy[index] = pictureArrCopy[randomElem];
          pictureArrCopy[randomElem] = value;
          index--;
        }
        return pictureArrCopy;
      }
    }
  };


  var filtersItem = document.querySelector('.filters');
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
    changeSorting: function (pictures) {
      filtersItem.addEventListener('click', function (evt) {
        if (evt.target.getAttribute('class') === 'filters-item') {
          var forElement = evt.target.getAttribute('for');
          if (forElement === 'filter-recommend') {
            window.picture.renderPicture(pictures);
          } else {
            var value = filters[forElement].setFilter(pictures);
            window.picture.renderPicture(value);
            window.gallery.openPicPopup(value);
          }
        }

      });
    }
  };
})();
