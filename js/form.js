'use strict';

(function () {
  var MIN_PERCENT = 25;
  var MAX_PERCENT = 100;
  var MAX_HASHTAG_LENGHT = 20;
  var MAX_HASHTAGS = 5;
  var MIN_SCROLL_VALUE = 0;
  var MAX_SCROLL_VALUE = 455;

  var uploadForm = document.querySelector('.upload-form');
  var uploadOverlay = document.querySelector('.upload-overlay');
  var levelContainer = document.querySelector('.upload-effect-level');
  var imagePreview = uploadForm.querySelector('.upload-form-preview');
  var uploadFormHashtags = document.querySelector('.upload-form-hashtags');
  var effectImagePreview = document.querySelector('.effect-image-preview');
  var uploadEffectPin = document.querySelector('.upload-effect-level-pin');
  var uploadtEffectVal = document.querySelector('.upload-effect-level-val');
  var ResizeControls = uploadForm.querySelector('.upload-resize-controls-value');
  var input = uploadForm.querySelectorAll('input[type=radio]');

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
    var persentValue = ResizeControls.value;
    var intValue = parseInt(persentValue, 10);
    intValue -= STEPPERSENT;
    intValue = validePersentValue(intValue);
    ResizeControls.value = intValue + '%';
    changeScale(intValue);
  };

  var increaseImgSize = function (STEPPERSENT) {
    var persentValue = ResizeControls.value;
    var intValue = parseInt(persentValue, 10);
    intValue += STEPPERSENT;
    intValue = validePersentValue(intValue);
    ResizeControls.value = intValue + '%';
    changeScale(intValue);
  };

  window.scaleInit.initializeScale(reductionImgSize, increaseImgSize);

  var validePersentValue = function (intValue) {
    if (intValue <= MIN_PERCENT) {
      intValue = MIN_PERCENT;
    } else if (intValue > MAX_PERCENT) {
      intValue = MAX_PERCENT;
    }
    return intValue;
  };

  var changeScale = function (value) {
    value = value / 100;
    effectImagePreview.style.transform = 'scale(' + value + ')';
  };

  ResizeControls.addEventListener('change', function () {
    var persentValue = ResizeControls.value;
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

  var resetForm = function () {
    window.classes = effectImagePreview.className.split(' ');
    effectImagePreview.classList.remove(window.classes[1]);
    effectImagePreview.classList.add('effect-none');

    for (var i = 0; i < input.length; i++) {
      if (input[i].checked) {
        input[i].removeAttribute('checked');
      }
    }
    input[0].setAttribute('checked', 'true');

    imagePreview.style.transform = 'scale(1)';
    effectImagePreview.style.filter = 'none';
    ResizeControls.setAttribute('value', '100%');
    levelContainer.classList.add('hidden');
    uploadForm.reset();
  };

  uploadForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(uploadForm), function () {
      uploadOverlay.classList.add('hidden');
      resetForm();
    }, window.picture.errorHandler);
  });
}());
