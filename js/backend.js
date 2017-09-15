'use strict';

window.backend = (function () {
  var SERVER_URL = 'https://1510.dump.academy/kekstagram';
  var XHR_TIMEOUT = 3000;
  var setup = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError('Неизвестный статус: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = XHR_TIMEOUT;
    return xhr;
  };

  return {
    errorHandler: function (errorMessage) {
      var node = document.createElement('div');
      node.style.left = 0;
      node.style.right = 0;
      node.style.zIndex = '100';
      node.style.fontSize = '25px';
      node.style.margin = '0 auto';
      node.style.textAlign = 'center';
      node.style.position = 'absolute';
      node.style.backgroundColor = 'red';
      node.style.color = 'yellow';

      node.textContent = errorMessage;
      document.body.insertAdjacentElement('afterbegin', node);
    },
    load: function (onLoad, onError) {
      var xhr = setup(onLoad, onError);

      xhr.open('GET', SERVER_URL + '/data');
      xhr.send();
    },
    save: function (data, onLoad, onError) {
      var xhr = setup(onLoad, onError);

      xhr.open('POST', SERVER_URL);
      xhr.send(data);
    }
  };
})();
