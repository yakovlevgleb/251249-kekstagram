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


putObjectToArray();
