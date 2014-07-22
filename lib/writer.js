var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');
var config = require('./config');

var ensurePath = function(directory, callback) {
  fs.exists(directory, function(exists) {
    return exists ? callback() : mkdirp(directory, callback);
  });
};

var getLogFileName = function() {
  var now = new Date;
  var date = [now.getUTCFullYear(), now.getUTCMonth() + 1, now.getUTCDate()];

  var fileName = date.map(function(part) {
    return part < 10 ? '0' + part : part;
  }).join('-') + '.log';

  return path.join(config.directory, fileName);
};

var write = function(log, callback) {
  ensurePath(config.directory, function() {
    try {
      fs.appendFile(getLogFileName(), JSON.stringify(log) + '\n', callback);
    } catch (err) {
      return callback && callback(err);
    }
  });
};

module.exports = {
  write: write
};
