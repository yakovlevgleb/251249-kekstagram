'use strict';

var MINLIKES = 15;
var MAXLIKES = 200;
var PHOTOCOUNT = 25;
var ESC_KEYCODE = 27;
var COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var selectors = {
  gallery: '.gallery-overlay-image',
  galleryOverlay: '.gallery-overlay',
  likes: '.likes-count',
  comments: '.comments-count',
  upload: '.upload-overlay'
};

var pictureTemplate = document.querySelector('#picture-template').content;

document.addEventListener('keydown', function (event) {
  if (event.keyCode === ESC_KEYCODE && document.activeElement !== document.querySelector('.upload-form-description')) {
    var galleryElement = document.querySelector('.gallery-overlay');
    document.querySelector('.upload-overlay').classList.add('hidden');
    galleryElement.classList.add('hidden');
  }
});

document.querySelector('.gallery-overlay-close').addEventListener('click', function () {
  var galleryElement = document.querySelector('.gallery-overlay');
  galleryElement.classList.add('hidden');
});

document.querySelector('#upload-file').addEventListener('change', function () {
  document.querySelector('.upload-overlay').classList.remove('hidden');
  document.querySelector('#upload-file').classList.add('hidden');
});

document.querySelector('.upload-form-cancel').addEventListener('click', function () {
  document.querySelector('.upload-overlay').classList.add('hidden');
  document.querySelector('#upload-file').classList.remove('hidden');
});

var getRandomFromInterval = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomElement = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

var fillArray = function () {
  var pictureDescription = [];
  for (var i = 1; i <= PHOTOCOUNT + 1; i++) {
    pictureDescription.push(
      {
        'url': 'photos/' + i + '.jpg',
        'likes': getRandomFromInterval(MINLIKES, MAXLIKES),
        'comments': [getRandomElement(COMMENTS)],
      }
    );
  }
  return pictureDescription;
};

var pictureDescription = fillArray();

var createPictureNode = function (picture, i) {
  var pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('img').setAttribute('src', picture.url);
  pictureElement.querySelector('span.picture-likes').textContent = picture.likes;
  pictureElement.querySelector('span.picture-comments').textContent = picture.comments;
  pictureElement.querySelector('img').setAttribute('data-index', i);
  return pictureElement;
};

var renderPicture = function (array) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < pictureDescription.length; i++) {
    fragment.appendChild(createPictureNode(array[i], i));

  }
  document.querySelector('.pictures').appendChild(fragment);
};

var galleryOverlay = document.querySelector(selectors.galleryOverlay);

var fillGallery = function (overlay, fotoNumber) {
  overlay.querySelector(selectors.gallery).setAttribute('src', pictureDescription[fotoNumber].url);
  overlay.querySelector(selectors.likes).textContent = pictureDescription[fotoNumber].likes;
  overlay.querySelector(selectors.comments).textContent = pictureDescription[fotoNumber].comments.length;
};

var showGallery = function functionName(overlay) {
  overlay.classList.remove('hidden');
};

var renderGallery = function (overlay) {
  document.querySelector('.pictures').addEventListener('click', function (evt) {
    evt.preventDefault();
    var target = evt.target;
    var ind = target.getAttribute('data-index');
    fillGallery(galleryOverlay, ind);
    showGallery(galleryOverlay);
    return;
  });
};

renderPicture(pictureDescription);
document.querySelector(selectors.upload).classList.add('hidden');
renderGallery(galleryOverlay);

var uploadForm = document.querySelector('.upload-form');
var uploadEffect = document.querySelector('.upload-effect');
var uploadOverlay = document.querySelector('.upload-overlay');
var uploadFormHashtags = document.querySelector('.upload-form-hashtags');
var effectImagePreview = document.querySelector('.effect-image-preview');

var uploadResizeControlsValue = document.querySelector('.upload-resize-controls-value');
var uploadResizeControlsButtonDec = document.querySelector('.upload-resize-controls-button-dec');
var uploadResizeControlsButtonInc = document.querySelector('.upload-resize-controls-button-inc');


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

var MINPERSENT = 25;
var MAXPERSENR = 100;
var STEPPERSENT = 25;
var MAXHASHTAGLENGHT = 20;
var MAXHASHTAGS = 5;

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

function hashtagsValid(evt, noSharp, isRepeated, isLong, tooMuch) {
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

  hashtagsValid(evt, noSharp, isRepeated, isLong, tooMuch);
}

uploadForm.addEventListener('submit', function (evt) {
  document.querySelector('#upload-effect-none').setAttribute('checked');
  uploadFormHashtags.value = '';
  document.querySelector('.upload-form-description').value = '';
});
