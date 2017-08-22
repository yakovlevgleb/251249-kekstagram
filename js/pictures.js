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

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var createPictureObjects = function (i) {
  return {
    'url': 'photos/' + i + '.jpg',
    'likes': getRandomInt(MINLIKES, MAXLIKES),
    'comments': COMMENTS[Math.floor(Math.random() * COMMENTS.length)]
  };
};

var picDescArr = [];
var putObjectToArray = function () {
  for (var i = 1; i <= PHOTOCOUNT + 1; i++) {
    picDescArr.push(createPictureObjects(i));
  }
};

var createDomElement = function (picture) {
  var pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('img').setAttribute('src', picture.url);
  pictureElement.querySelector('span.picture-likes').textContent = picture.likes;
  pictureElement.querySelector('span.picture-comments').textContent = picture.comments;
  return pictureElement;
};

var renderDomElements = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < picDescArr.length; i++) {
    fragment.appendChild(createDomElement(picDescArr[i]));
  }
  document.querySelector('.pictures').appendChild(fragment);
};

var fillAndShowGalleryOverlay = function () {
  var galleryOverlay = document.querySelector(selectors.galleryOverlay);
  var k = getRandomInt(0, PHOTOCOUNT);
  galleryOverlay.querySelector(selectors.gallery).setAttribute('src', picDescArr[k].url);
  galleryOverlay.querySelector(selectors.likes).textContent = picDescArr[k].likes;
  galleryOverlay.querySelector(selectors.comments).textContent = picDescArr[k].comments;
  galleryOverlay.classList.remove('hidden');
};

putObjectToArray();
renderDomElements();
document.querySelector(selectors.upload).classList.add('hidden');
fillAndShowGalleryOverlay();
