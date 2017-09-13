'use strict';

window.debounce = (function () {
  var DEBOUNCE_INTERVAL = 300; // ms

  var lastTimeout;
  return {
    debounce: function (fun) {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(fun, DEBOUNCE_INTERVAL);
    }};
})();
