'use strict';

(function () {
  var MIN_PERCENT = 25;
  var MAX_PERCENT = 100;
  var MAX_HASHTAG_LENGHT = 20;
  var MAX_HASHTAGS = 5;
  var MIN_SCROLL_VALUE = 0;
  var MAX_SCROLL_VALUE = 455;
  var DEFAULT_EFFECT_VALUE = 91;
  var EFFECT_NONE = 'effect-none';

  var uploadForm = document.querySelector('.upload-form');
  var uploadOverlay = document.querySelector('.upload-overlay');
  var levelContainer = document.querySelector('.upload-effect-level');
  var imagePreview = document.querySelector('.upload-form-preview');
  var uploadFormHashtags = document.querySelector('.upload-form-hashtags');
  var effectImagePreview = document.querySelector('.effect-image-preview');
  var uploadEffectPin = document.querySelector('.upload-effect-level-pin');
  var uploadtEffectVal = document.querySelector('.upload-effect-level-val');
  var resizeControls = document.querySelector('.upload-resize-controls-value');
  var input = document.querySelectorAll('input[type=radio]');
  var elementStyle;
  var validationMessage = null;

  var filters = {
    'effect-marvin': {
      value: 'invert(20%)',
      setup: function (val) {
        return 'invert(' + val * 100 + '%)';
      }
    },
    'effect-chrome': {
      value: 'grayscale(0.2)',
      setup: function (val) {
        return 'grayscale(' + val + ')';
      }
    },
    'effect-sepia': {
      value: 'sepia(0.2)',
      setup: function (val) {
        return 'sepia(' + val + ')';
      }
    },
    'effect-phobos': {
      value: 'blur(0.6px)',
      setup: function (val) {
        return 'blur(' + val * 3 + 'px)';
      }
    },
    'effect-heat': {
      value: 'brightness(0.6)',
      setup: function (val) {
        return 'brightness(' + val * 3 + ')';
      }
    },
    'effect-none': {
      filter: '',
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

  var setPhotoFilter = function (target) {
    if (target.getAttribute('class') === 'upload-effect-preview') {
      elementStyle = target.parentNode.getAttribute('for').replace('upload-', '');
    }
    uploadEffectPin.style.left = DEFAULT_EFFECT_VALUE + 'px';
    uploadtEffectVal.style.width = DEFAULT_EFFECT_VALUE + 'px';
    effectImagePreview.style.filter = filters[elementStyle].value;
    if (elementStyle !== EFFECT_NONE) {
      document.querySelector('.upload-effect-level').classList.remove('hidden');
    } else {
      document.querySelector('.upload-effect-level').classList.add('hidden');
    }
    addFilterClass(elementStyle);
  };

  var addFilterClass = function (element) {
    var imagePreviewUploadOverlay = uploadOverlay.querySelector('.effect-image-preview');
    imagePreviewUploadOverlay.classList = '';
    imagePreviewUploadOverlay.classList.add('effect-image-preview');
    imagePreviewUploadOverlay.classList.add(element);
  };

  var setFilterOnPhoto = function (newPinOffset, max) {
    effectImagePreview.style.filter = filters[elementStyle].setup(newPinOffset / max);
  };

  window.initializeFilters(setFilterOnPhoto, setPhotoFilter, MIN_SCROLL_VALUE, MAX_SCROLL_VALUE);

  var reduceImgSize = function (step) {
    var persentValue = resizeControls.value;
    var intValue = parseInt(persentValue, 10);
    intValue -= step;
    intValue = checkersentValue(intValue);
    resizeControls.value = intValue + '%';
    changeScale(intValue);
  };

  var growImgSize = function (step) {
    var persentValue = resizeControls.value;
    var intValue = parseInt(persentValue, 10);
    intValue += step;
    intValue = checkersentValue(intValue);
    resizeControls.value = intValue + '%';
    changeScale(intValue);
  };

  window.initializeScale(reduceImgSize, growImgSize);

  var checkersentValue = function (intValue) {
    if (intValue <= MIN_PERCENT) {
      intValue = MIN_PERCENT;
    } else if (intValue > MAX_PERCENT) {
      intValue = MAX_PERCENT;
    }
    return intValue;
  };

  var changeScale = function (value) {
    value = value / MAX_PERCENT;
    effectImagePreview.style.transform = 'scale(' + value + ')';
  };

  resizeControls.addEventListener('change', function () {
    var persentValue = resizeControls.value;
    var index = parseInt(persentValue, 10) / MAX_PERCENT;
    effectImagePreview.style.transform = 'scale(' + index + ')';
  });

  uploadFormHashtags.addEventListener('change', function (evt) {
    onHashtagsInput(evt);
  });

  function checkHashtagValidity(evt, noSharp, isRepeated, isLong, tooMuch) {
    if (isRepeated) {
      validationMessage = 'Хэштэги не должны повторяться';
    } else if (noSharp) {
      validationMessage = 'Хэштэги должны начинаться с \'#\' разделяя их \' \'';
    } else if (isLong) {
      validationMessage = 'Хэштэг не может состоять из более' + MAX_HASHTAG_LENGHT + ' символов';
    } else if (tooMuch) {
      validationMessage = 'Количество хэштэгов не должно превышать ' + MAX_HASHTAGS;
    } else {
      validationMessage = '';
    }
    uploadFormHashtags.setCustomValidity(validationMessage);
  }

  function onHashtagsInput(evt) {
    var target = evt.target;
    var valueArray = target.value.split(' ');

    var noSharp = false;
    var isRepeated = false;
    var isLong = false;
    var tooMuch = false;

    var testArr = [];
    tooMuch = valueArray.length > MAX_HASHTAGS;

    for (var i = 0; i < valueArray.length; i++) {
      isLong = valueArray[i].length > MAX_HASHTAG_LENGHT;
      noSharp = valueArray[i].charAt(0) !== '#';

      if (testArr.indexOf(valueArray[i]) === -1) {
        testArr.push(valueArray[i]);
      } else {
        isRepeated = true;
        return;
      }
    }

    checkHashtagValidity(evt, noSharp, isRepeated, isLong, tooMuch);
  }

  var resetForm = function () {
    var classes = effectImagePreview.className.split(' ');
    effectImagePreview.classList.remove(classes[1]);
    effectImagePreview.classList.add('effect-none');

    if (elementStyle !== 'effect-none') {
      document.querySelector('.upload-effect-level').classList.remove('elementStyle');
    } else {
      document.querySelector('.upload-effect-level').classList.add('effect-none');
    }

    input[0].setAttribute('checked', 'true');

    imagePreview.style.transform = 'scale(1)';
    effectImagePreview.style.filter = 'none';
    resizeControls.setAttribute('value', '100%');
    levelContainer.classList.add('hidden');
    uploadForm.reset();
  };

  uploadForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(uploadForm), function () {
      uploadOverlay.classList.add('hidden');
      resetForm();
    });
  });
}());
