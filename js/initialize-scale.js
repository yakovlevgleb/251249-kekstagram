'use strict';

(function () {
  var uploadEffect = document.querySelector('.upload-effect');
  var decreaseButton = uploadEffect.querySelector('.upload-resize-controls-button-dec');
  var increaseButton = uploadEffect.querySelector('.upload-resize-controls-button-inc');
  var STEPPERSENT = 25;

  window.initializeScale = function (reductionCallback, increaseCallback) {
    decreaseButton.addEventListener('click', function () {
      reductionCallback(STEPPERSENT);
    });

    increaseButton.addEventListener('click', function () {
      increaseCallback(STEPPERSENT);
    });
  };
})();
