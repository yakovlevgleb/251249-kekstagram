'use strict';

var MINLIKES = 15;
var MAXLIKES = 200;
var PHOTOCOUNT = 25;
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
        'comments': getRandomElement(COMMENTS)
      }
    );
  }
  return pictureDescription;
};

var pictureDescription = fillArray();

var createPictureNode = function (picture) {
  var pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('img').setAttribute('src', picture.url);
  pictureElement.querySelector('span.picture-likes').textContent = picture.likes;
  pictureElement.querySelector('span.picture-comments').textContent = picture.comments;
  return pictureElement;
};

var renderPicture = function (array) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < pictureDescription.length; i++) {
    fragment.appendChild(createPictureNode(array[i]));
  }
  document.querySelector('.pictures').appendChild(fragment);
};

var galleryOverlay = document.querySelector(selectors.galleryOverlay);

var fillGallery = function (overlay) {
  var randomvalue = getRandomFromInterval(0, PHOTOCOUNT);
  overlay.querySelector(selectors.gallery).setAttribute('src', pictureDescription[randomvalue].url);
  overlay.querySelector(selectors.likes).textContent = pictureDescription[randomvalue].likes;
  overlay.querySelector(selectors.comments).textContent = pictureDescription[randomvalue].comments;

};

var showGallery = function functionName(overlay) {
  overlay.classList.remove('hidden');
};

var renderGallery = function (overlay) {
  fillGallery(overlay);
  showGallery(overlay);
};

renderPicture(pictureDescription);
document.querySelector(selectors.upload).classList.add('hidden');
renderGallery(galleryOverlay);
