'use strict';

(function () {

  var uploadEffectPin = document.querySelector('.upload-effect-level-pin');
  var uploadtEffectVal = document.querySelector('.upload-effect-level-val');
  var uploadEffectControl = document.querySelector('.upload-effect-controls');

  window.initializeFilters = function (moveSliderCallback, setPhotoFilterCallback) {

    uploadEffectControl.addEventListener('click', function (evt) {
      setPhotoFilterCallback(evt.target);
    });

    var returnScaleValue = function (value) {
      return value + 'px';
    };

    uploadEffectPin.addEventListener('mousedown', function (evt) {
      evt.preventDefault();
      var startCoords = evt.clientX;
      var startPinOffset = uploadEffectPin.offsetLeft;
      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();
        var shift = startCoords - moveEvt.clientX;

        var min = 0;
        var max = 455;
        var newPinOffset = startPinOffset - shift;
        if (newPinOffset < min) {
          newPinOffset = min;
        } else if (newPinOffset > max) {
          newPinOffset = max;
        }

        uploadEffectPin.style.left = returnScaleValue(newPinOffset);
        uploadtEffectVal.style.width = returnScaleValue(newPinOffset);

        moveSliderCallback(newPinOffset, max);
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
  };
})();
