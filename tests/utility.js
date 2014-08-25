var fs = require('fs'),
    phantom = require('node-phantom-simple');

module.exports.loadFixture = function(fixture, callback){
  fs.readFile( __dirname + '/fixtures/' + fixture, {encoding: 'utf8'}, function (err, data) {
    if (err) {
      callback(err, null);
    }
    callback(null, data);
  });
};


module.exports.createFixtureFromUrl = function(url, dest){
  phantom.create(function(err,ph) {
    return ph.createPage(function(err,page) {
      return page.open(url, function(err,status) {
        console.log(status);
        page.get('content', function (err,html) {
          // write the file to the specified location

          var fileName = __dirname + "/fixtures/" + dest + ".html";
          fs.writeFile(fileName, html, function (err) {
            if (err) throw err;

            console.log("file written");
          });
        });
      });
    });
  });
};
