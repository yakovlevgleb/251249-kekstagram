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


  document.querySelector('#upload-file').addEventListener('change', function () {
    document.querySelector('.upload-overlay').classList.remove('hidden');
    document.querySelector('#upload-file').classList.add('hidden');
  });

  document.querySelector('.upload-form-cancel').addEventListener('click', function () {
    document.querySelector('.upload-overlay').classList.add('hidden');
    document.querySelector('#upload-file').classList.remove('hidden');
  });

  uploadEffect.addEventListener('click', function (evt) {
    var target = evt.target;
    var elementStyle = target.parentNode.getAttribute('for').replace('upload-', '');
    addFilterClass(elementStyle);
  });

  var addFilterClass = function (elementStyle) {
    var imagePreviewUploadOverlay = uploadOverlay.querySelector('.effect-image-preview');
    imagePreviewUploadOverlay.classList = '';
    imagePreviewUploadOverlay.classList.add('effect-image-preview');
    imagePreviewUploadOverlay.classList.add(elementStyle);
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

}());
