var chalk = require('chalk');

var colours = {
  info: 'green',
  warn: 'yellow',
  error: 'red',
  debug: 'blue'
};

var formatTime = function(time) {
  return [time.getHours(), time.getMinutes(), time.getSeconds()].map(function(part) {
    return part < 10 ? '0' + part : part;
  }).join(':');
};

var print = function(log, verbose) {
  var colour = colours[log.type] || 'blue';

  var prefix = formatTime(new Date(log.time)) + ' ' + log.type;
  console.log(chalk[colour](prefix) + ' ' + log.message);

  if (log.data && verbose) {
    console.log(log.data);
  }
};

module.exports = {
  print: print
};