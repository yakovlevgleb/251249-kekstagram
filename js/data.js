'use strict';
window.data = (function () {
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

  var getRandomFromInterval = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var getRandomElement = function (array) {
    return array[Math.floor(Math.random() * array.length)];
  };

  return {
    fillArray: function () {
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
    }
  };
})();
