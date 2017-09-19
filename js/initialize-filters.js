'use strict';

(function () {

  var uploadEffectPin = document.querySelector('.upload-effect-level-pin');
  var uploadtEffectVal = document.querySelector('.upload-effect-level-val');
  var uploadEffectControl = document.querySelector('.upload-effect-controls');

  var returnScaleValue = function (value) {
    return value + 'px';
  };

  window.initializeFilters = function (moveSliderCallback, setPhotoFilterCallback, minScrollValue, maxScrollValue) {

    uploadEffectControl.addEventListener('click', function (evt) {
      setPhotoFilterCallback(evt.target);
    });

    uploadEffectPin.addEventListener('mousedown', function (evt) {
      evt.preventDefault();
      var startCoords = evt.clientX;
      var startPinOffset = uploadEffectPin.offsetLeft;

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();
        var shift = startCoords - moveEvt.clientX;

        var newPinOffset = startPinOffset - shift;
        newPinOffset = newPinOffset < 0 ? 0 : newPinOffset;
        newPinOffset = newPinOffset > maxScrollValue ? maxScrollValue : newPinOffset;

        uploadEffectPin.style.left = returnScaleValue(newPinOffset);
        uploadtEffectVal.style.width = returnScaleValue(newPinOffset);

        moveSliderCallback(newPinOffset, maxScrollValue);
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
