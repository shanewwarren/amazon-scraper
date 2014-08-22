var fs = require('fs'),
    BufferList = require('bl');

module.exports.loadFixture = function(fixture, callback){
  var bl = new BufferList();
  fs.readFile( __dirname + '/fixtures/' + fixture, {encoding: 'utf8'}, function (err, data) {
    if (err) {
      callback(err, null);
    }
    callback(null, data);
  });
}
