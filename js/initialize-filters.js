'use strict';

(function () {

  var uploadEffectPin = document.querySelector('.upload-effect-level-pin');
  var uploadtEffectVal = document.querySelector('.upload-effect-level-val');
  var uploadEffectControl = document.querySelector('.upload-effect-controls');

  var returnScaleValue = function (value) {
    return value + 'px';
  };

  window.initializeFilters = function (moveSliderCallback, setPhotoFilterCallback, MINSCROLLVALUE, MAXSCROLLVALUE) {

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
        if (newPinOffset < MINSCROLLVALUE) {
          newPinOffset = MINSCROLLVALUE;
        } else if (newPinOffset > MAXSCROLLVALUE) {
          newPinOffset = MAXSCROLLVALUE;
        }

        uploadEffectPin.style.left = returnScaleValue(newPinOffset);
        uploadtEffectVal.style.width = returnScaleValue(newPinOffset);

        moveSliderCallback(newPinOffset, MAXSCROLLVALUE);
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
