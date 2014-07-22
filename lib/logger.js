var util = require('util');
var config = require('./config');
var writer = require('./writer');
var printer = require('./printer');

var createLog = function(type, args) {
  var entry = {
    type: args.type || type,
    message: args.message,
    time: new Date().toISOString()
  };

  if (args.data) {
    entry.data = util.inspect(args.data, null);
  }

  if (args.context) {
    entry.context = args.context;
  }

  return entry;
};

var write = function(type, args, callback) {
  var log = createLog(type, args);

  if (config.console) {
    printer.print(log, config.verbose);
  }

  if (config.generators) {
    return function(callback) {
      writer.write(log, callback);
    };
  } else {
    writer.write(log, callback);
  }
};

module.exports = {
  log:   write.bind(null, 'log'),
  info:  write.bind(null, 'info'),
  warn:  write.bind(null, 'warn'),
  error: write.bind(null, 'error')
};
