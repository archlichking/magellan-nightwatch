var Test = require("../lib/base-test-class");
var url = "http://www.walmart.com/search/?query=sam%20walton%20made%20in%20america";
module.exports = new Test({

  "Search for Sam Walton Book": function (client) {
    client
      .resizeWindow(1280, 1024)
      .url(url)
  },

  "Check product description": function (client) {
    client
      .assert.elContainsText("[data-item-id='403453'] .tile-heading", "My Story")
      .assert.elContainsText("[data-item-id='403453'] .media-details", "Paperback")
      .pause(5000)
      .getLog('browser', function(logEntriesArray) {
        console.log('Log length: ' + logEntriesArray.length);
        logEntriesArray.forEach(function(log) {
          console.log('[' + log.level + '] ' + log.timestamp + ' : ' + log.message);
      });
    });

  }


});
