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

var elementName;

document.querySelector('.upload-effect').addEventListener('click', function (evt) {
  document.querySelector('.effect-image-preview').classList.remove('effect-' + elementName);
  var target = evt.target;
  var ind = target.parentNode.getAttribute('for');

  elementName = ind.split('-')[2];
  document.querySelector('.effect-image-preview').classList.add('effect-' + elementName);
  evt.preventDefault();
});

document.querySelector('.upload-resize-controls-button-dec').addEventListener('click', function () {
  var persentValue = document.querySelector('.upload-resize-controls-value').value;
  var chebupeli = parseInt(persentValue, 10);
  chebupeli = chebupeli - 25;
  console.log(chebupeli);
  document.querySelector('.upload-resize-controls-value').value = chebupeli + '%';

});
