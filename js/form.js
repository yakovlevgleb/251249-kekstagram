'use strict';

(function () {
  var MIN_PERSENT = 25;
  var MAX_PERSENT = 100;
  var MAX_HASHTAG_LENGHT = 20;
  var MAX_HASHTAGS = 5;
  var MIN_SCROLL_VALUE = 0;
  var MAX_SCROLL_VALUE = 455;

  var uploadForm = document.querySelector('.upload-form');
  var uploadOverlay = document.querySelector('.upload-overlay');
  var uploadFormHashtags = document.querySelector('.upload-form-hashtags');
  var effectImagePreview = document.querySelector('.effect-image-preview');
  var uploadEffectPin = document.querySelector('.upload-effect-level-pin');
  var uploadtEffectVal = document.querySelector('.upload-effect-level-val');

  var uploadResizeControlsValue = document.querySelector('.upload-resize-controls-value');

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

  var elementStyle;

  var setPhotoFilter = function (target) {
    if (target.getAttribute('class') === 'upload-effect-preview') {
      elementStyle = target.parentNode.getAttribute('for').replace('upload-', '');
    }
    var defaultValue = 91;
    uploadEffectPin.style.left = defaultValue + 'px';
    uploadtEffectVal.style.width = defaultValue + 'px';
    effectImagePreview.style.filter = filters[elementStyle].filter;
    if (elementStyle !== 'effect-none') {
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
    effectImagePreview.style.filter = filters[elementStyle].setFilter(newPinOffset / max);
  };

  window.filtersInit.initializeFilters(setFilterOnPhoto, setPhotoFilter, MIN_SCROLL_VALUE, MAX_SCROLL_VALUE);

  var reductionImgSize = function (STEPPERSENT) {
    var persentValue = uploadResizeControlsValue.value;
    var intValue = parseInt(persentValue, 10);
    intValue -= STEPPERSENT;
    intValue = validePersentValue(intValue);
    uploadResizeControlsValue.value = intValue + '%';
    changeScale(intValue);
  };

  var increaseImgSize = function (STEPPERSENT) {
    var persentValue = uploadResizeControlsValue.value;
    var intValue = parseInt(persentValue, 10);
    intValue += STEPPERSENT;
    intValue = validePersentValue(intValue);
    uploadResizeControlsValue.value = intValue + '%';
    changeScale(intValue);
  };

  window.scaleInit.initializeScale(reductionImgSize, increaseImgSize);

  var validePersentValue = function (intValue) {
    if (intValue <= MIN_PERSENT) {
      intValue = MIN_PERSENT;
    } else if (intValue > MAX_PERSENT) {
      intValue = MAX_PERSENT;
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
      target.setCustomValidity('Хэштэг не может состоять из более' + MAX_HASHTAG_LENGHT + ' символов');
    } else if (tooMuch) {
      target.setCustomValidity('Количество хэштэгов не должно превышать ' + MAX_HASHTAGS);
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
}());
