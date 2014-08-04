var path = require('path');

module.exports = {
  debug: false,
  verbose: false,
  generators: false,
  console: process.env.NODE_ENV !== 'production',
  directory: path.join(process.cwd(), 'logs')
};