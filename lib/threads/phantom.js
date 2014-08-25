var phantomSimple = require('node-phantom-simple');

var PhantomWrapper = new function() {
  // todo: instance options
}

PhantomWrapper.prototype.startPhantom = function(){
  this.phantom = null;
  this.page = null;

  phantomSimple.create(function(err,ph) {
    this.phantom = ph;
    return this.phantom.createPage(function(err,page) {
        this.page = page;
    };
  });
}

PhantomWrapper.prototype.getHtml = function(url, success){
  if(!this.page)
    throw new Error("Phanomt page not initialized");

  this.page.open(url, function(err,status) {
    if(err) return success(err);

    this.page.get('content', function (err,html) {
      if(err) return success(err);
      return success(null, html);
    });
  });
}

PhantomWrapper.prototype.stopPhantom = function(){
  if(this.phantom)
    this.phantom.exit();
}




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
