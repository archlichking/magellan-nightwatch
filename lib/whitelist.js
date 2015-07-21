var _ = require("lodash"),
 path = require("path"),
 fs = require("fs"),
 jsonfile = require("jsonfile"),
 yargs = require("yargs"),
 settings = require("./settings");

var getCommands = function (dirPath) {
  var result = [];

  if (Array.isArray(dirPath)) {
    result = _.chain(dirPath.map(function(folder) {
      return getCommands(folder);
    })).flatten().compact().value();
  } else {
    var absPath = path.join(process.cwd(), dirPath);

    result = fs.readdirSync(absPath).map(function(file) {
      if (path.extname(file) === '.js') {
        return path.basename(file, '.js');
      }
    });
  }

  return result;
};

var customCommandList = getCommands(settings.nightwatchConfig.custom_commands_path),
  customAssertionList = getCommands(settings.nightwatchConfig.custom_assertions_path),

  nightwatchCommandWhitelist = [
  "clearValue",
  "pause",
  "setCookie",
  "waitForElementNotPresent",
  "url",
  "saveScreenshot"
],

  nightwatchAssertWhitelist = [
  "attributeEquals",
  "cssClassPresent",
  "cssProperty",
  "elementNotPresent",
  "elementPresent",
  "urlContains",
  "visible"
];

module.exports = {
  commands: [].concat(customCommandList, nightwatchCommandWhitelist),
  assertions: [].concat(customAssertionList, nightwatchAssertWhitelist)
};