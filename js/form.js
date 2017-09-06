'use strict';

(function () {
  var MINPERSENT = 25;
  var MAXPERSENR = 100;
  var STEPPERSENT = 25;
  var MAXHASHTAGLENGHT = 20;
  var MAXHASHTAGS = 5;

  var uploadForm = document.querySelector('.upload-form');
  var uploadEffect = document.querySelector('.upload-effect');
  var uploadOverlay = document.querySelector('.upload-overlay');
  var uploadFormHashtags = document.querySelector('.upload-form-hashtags');
  var effectImagePreview = document.querySelector('.effect-image-preview');

  var uploadResizeControlsValue = document.querySelector('.upload-resize-controls-value');
  var uploadResizeControlsButtonDec = document.querySelector('.upload-resize-controls-button-dec');
  var uploadResizeControlsButtonInc = document.querySelector('.upload-resize-controls-button-inc');

  var filters = {
    'effect-marvin': {
      filter: 'invert(20%)',
      setFilter: function (val) {
        return 'invert(' + val * 100 + '%)';
      }
    },
    'effect-chrome': {
      filter: 'grayscale(0.2)',
      setFilter: function (val) {
        return 'grayscale(' + val + ')';
      }
    },
    'effect-sepia': {
      filter: 'sepia(0.2)',
      setFilter: function (val) {
        return 'sepia(' + val + ')';
      }
    },
    'effect-phobos': {
      filter: 'blur(0.6px)',
      setFilter: function (val) {
        return 'blur(' + val * 3 + 'px)';
      }
    },
    'effect-heat': {
      filter: 'brightness(0.6)',
      setFilter: function (val) {
        return 'brightness(' + val * 3 + ')';
      }
    }
  };

  document.querySelector('#upload-file').addEventListener('change', function () {
    document.querySelector('.upload-overlay').classList.remove('hidden');
    document.querySelector('#upload-file').classList.add('hidden');
  });

  document.querySelector('.upload-form-cancel').addEventListener('click', function () {
    document.querySelector('.upload-overlay').classList.add('hidden');
    document.querySelector('#upload-file').classList.remove('hidden');
  });

  var uploadImageScale = uploadForm.querySelector('.effect-image-preview');
  var elementStyle;

  uploadEffect.addEventListener('click', function (evt) {
    var target = evt.target;
    elementStyle = target.parentNode.getAttribute('for').replace('upload-', '');
    var defaultValue = 91;
    uploadEffectPin.style.left = defaultValue + 'px';
    uploadtEffectVal.style.width = defaultValue + 'px';
    uploadImageScale.style.filter = filters[elementStyle].filter;
    if (elementStyle !== 'effect-none') {
      document.querySelector('.upload-effect-level').classList.remove('hidden');
    } else {
      document.querySelector('.upload-effect-level').classList.add('hidden');
    }
    addFilterClass(elementStyle);
  });

  var addFilterClass = function (element) {
    var imagePreviewUploadOverlay = uploadOverlay.querySelector('.effect-image-preview');
    imagePreviewUploadOverlay.classList = '';
    imagePreviewUploadOverlay.classList.add('effect-image-preview');
    imagePreviewUploadOverlay.classList.add(element);
  };

  uploadResizeControlsButtonDec.addEventListener('click', function () {
    var persentValue = uploadResizeControlsValue.value;
    var intValue = parseInt(persentValue, 10);
    intValue -= STEPPERSENT;
    intValue = validePersentValue(intValue);
    uploadResizeControlsValue.value = intValue + '%';
    changeScale(intValue);
  });

  uploadResizeControlsButtonInc.addEventListener('click', function () {
    var persentValue = uploadResizeControlsValue.value;
    var intValue = parseInt(persentValue, 10);
    intValue += STEPPERSENT;
    intValue = validePersentValue(intValue);
    uploadResizeControlsValue.value = intValue + '%';
    changeScale(intValue);
  });

  var validePersentValue = function (intValue) {
    if (intValue <= MINPERSENT) {
      intValue = MINPERSENT;
    } else if (intValue > MAXPERSENR) {
      intValue = MAXPERSENR;
    }
    return intValue;
  };

  var changeScale = function (value) {
    value = value / 100;
    effectImagePreview.style.transform = 'scale(' + value + ')';
  };

  uploadResizeControlsValue.addEventListener('change', function () {
    var persentValue = uploadResizeControlsValue.value;
    var index = parseInt(persentValue, 10) / 100;
    effectImagePreview.style.transform = 'scale(' + index + ')';
  });

  uploadFormHashtags.addEventListener('change', function (evt) {
    onHashtagsInput(evt);
  });

  function processingValidity(evt, noSharp, isRepeated, isLong, tooMuch) {
    var target = evt.target;

    if (isRepeated) {
      target.setCustomValidity('Хэштэги не должны повторяться');
    } else if (noSharp) {
      target.setCustomValidity('Хэштэги должны начинаться с \'#\' разделяя их \' \'');
    } else if (isLong) {
      target.setCustomValidity('Хэштэг не может состоять из более' + MAXHASHTAGLENGHT + ' символов');
    } else if (tooMuch) {
      target.setCustomValidity('Количество хэштэгов не должно превышать ' + MAXHASHTAGS);
    } else {
      target.setCustomValidity('');
    }
  }

  function onHashtagsInput(evt) {
    var target = evt.target;
    var valueArray = target.value.split(' ');

    var noSharp = false;
    var isRepeated = false;
    var isLong = false;
    var tooMuch = false;

    var testArr = [];
    tooMuch = valueArray.length > 5;

    for (var i = 0; i < valueArray.length; i++) {
      isLong = valueArray[i].length > 20;
      noSharp = valueArray[i].charAt(0) !== '#';

      if (testArr.indexOf(valueArray[i]) === -1) {
        testArr.push(valueArray[i]);
      } else {
        isRepeated = true;
      }
    }

    processingValidity(evt, noSharp, isRepeated, isLong, tooMuch);
  }

  uploadForm.addEventListener('submit', function (evt) {
    document.querySelector('#upload-effect-none').setAttribute('checked');
    uploadFormHashtags.value = '';
    document.querySelector('.upload-form-description').value = '';
  });

  var uploadEffectPin = document.querySelector('.upload-effect-level-pin');
  var uploadtEffectVal = document.querySelector('.upload-effect-level-val');

  var returnScaleValue = function (value) {
    return value + 'px';
  };

  uploadEffectPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoords = evt.clientX;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shift = startCoords - moveEvt.clientX;

      var min = 0;
      var max = 455;
      var pinOffset = uploadEffectPin.offsetLeft - shift;
      if (pinOffset < min) {
        pinOffset = min;
      } else if (pinOffset > max) {
        pinOffset = max;
      }

      document.querySelector('.effect-image-preview').style.filter = filters[elementStyle].setFilter(pinOffset / max);
      uploadEffectPin.style.left = returnScaleValue(pinOffset);
      uploadtEffectVal.style.width = returnScaleValue(pinOffset);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
}());
