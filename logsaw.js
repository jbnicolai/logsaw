var logger = require('./lib/logger');
var config = require('./lib/config');

var isBool = function(value) {
  return typeof value === 'boolean';
};

var configure = function(options) {
  if (options) {
    if (isBool(options.debug)) {
      config.debug = options.debug;
    }

    if (isBool(options.console)) {
      config.console = options.console;
    }

    if (isBool(options.verbose)) {
      config.verbose = options.verbose;
    }

    if (isBool(options.generators)) {
      config.generators = options.generators;
    }

    if (options.directory) {
      config.directory = options.directory;
    }
  }
};

module.exports = {
  info: logger.info,
  warn: logger.warn,
  error: logger.error,
  debug: logger.debug,
  configure: configure
};