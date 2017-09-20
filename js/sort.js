'use strict';

(function () {
  var FILTERS_ITEM = 'filters-item';
  var filtersItem = document.querySelector('.filters');

  window.changeSorting = function (array, filters) {
    filtersItem.addEventListener('click', function (evt) {
      if (evt.target.getAttribute('class') === FILTERS_ITEM) {
        var forElement = evt.target.getAttribute('for');
        if (forElement === 'filter-recommend') {
          window.debounce(function () {
            window.renderPicture(array);
          });
          window.openPicPopup(array);
        } else {
          var value = filters[forElement].setup(array);
          window.debounce(function () {
            window.renderPicture(value);
          });
          window.openPicPopup(value);
        }
      }
    });
  };
})();
