var PluginError = require('gulp-util').PluginError;
var through = require('through2');
var iced = require('iced-coffee-script');
var PLUGIN_NAME = 'gulp-iced-coffee-script';

module.exports = function () {
  return through.obj(function (file, encoding, cb) {
    if (file.isNull()) {
      return cb(null, file);
    }

    if (file.isStream()) {
      this.emit('error', new PluginError(PLUGIN_NAME, 'Streams not supported!'));
    } else if (file.isBuffer()) {
      var content = file.contents.toString('utf8');
      var compiled = iced.compile(content);
      var buffer = new Buffer(compiled, 'utf-8');
      file.contents = buffer;
      return cb(null, file);
    }
  });
};