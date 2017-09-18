'use strict';

window.scale = (function () {
  var STEP_PERCENT = 25;
  var uploadEffect = document.querySelector('.upload-effect');
  var decreaseButton = uploadEffect.querySelector('.upload-resize-controls-button-dec');
  var increaseButton = uploadEffect.querySelector('.upload-resize-controls-button-inc');

  return {
    initializeScale: function (reductionCallback, increaseCallback) {
      decreaseButton.addEventListener('click', function () {
        reductionCallback(STEP_PERCENT);
      });

      increaseButton.addEventListener('click', function () {
        increaseCallback(STEP_PERCENT);
      });
    }
  };
})();
