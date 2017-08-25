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

var getRandomElement = function (massive) {
  return massive[Math.floor(Math.random() * massive.length)];
};

var pictureDescription = [];
var pictures = function (comments, photocoun, minlikes, maxlikes) {
  for (var i = 1; i <= photocoun + 1; i++) {
    pictureDescription.push(
      {
        'url': 'photos/' + i + '.jpg',
        'likes': getRandomFromInterval(minlikes, maxlikes),
        'comments': getRandomElement(comments)
      }
    );
  }
  return pictureDescription;
};

var createPictureNode = function (picture) {
  var pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('img').setAttribute('src', picture.url);
  pictureElement.querySelector('span.picture-likes').textContent = picture.likes;
  pictureElement.querySelector('span.picture-comments').textContent = picture.comments;
  return pictureElement;
};

var renderPicture = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < pictureDescription.length; i++) {
    fragment.appendChild(createPictureNode(pictureDescription[i]));
  }
  document.querySelector('.pictures').appendChild(fragment);
};

var fillGalleryOverlay = function () {
  var galleryOverlay = document.querySelector(selectors.galleryOverlay);
  var randomvalue = getRandomFromInterval(0, PHOTOCOUNT);
  galleryOverlay.querySelector(selectors.gallery).setAttribute('src', pictureDescription[randomvalue].url);
  galleryOverlay.querySelector(selectors.likes).textContent = pictureDescription[randomvalue].likes;
  galleryOverlay.querySelector(selectors.comments).textContent = pictureDescription[randomvalue].comments;
  galleryOverlay.classList.remove('hidden');
};

pictures(COMMENTS, PHOTOCOUNT, MINLIKES, MAXLIKES);
renderPicture();
document.querySelector(selectors.upload).classList.add('hidden');
fillGalleryOverlay();
