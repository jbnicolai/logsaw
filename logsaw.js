var logger = require('./lib/logger');
var config = require('./lib/config');

var configure = function(options) {
  if (options) {
    config.console = !!options.console;
    config.verbose = !!options.verbose;
    config.generators = !!options.generators;

    if (options.directory) {
      config.directory = options.directory;
    }
  }
};

module.exports = {
  log: logger.log,
  info: logger.info,
  warn: logger.warn,
  error: logger.error,
  configure: configure
};
