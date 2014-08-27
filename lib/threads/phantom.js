var nps = require('node-phantom-simple'),
    async = require('async');

var PhantomWrapper = (function(){
  var page = null;
  var phantom = null;

  var phantomWrapper = function() { };

  phantomWrapper.prototype.startPhantom = function(callback){

    async.waterfall([
        function(callback){
            nps.create(callback);
        },
        function(ph, callback){
            phantom = ph;
            phantom.createPage(callback);
        },
    ],
    function (err, pg) {
       page = pg;
       callback();
    });

  };

  phantomWrapper.prototype.getHtml = function(url, callback){

    if(!page)
      throw new Error("Phantom page not initialized..");
    try {
      getHtmlInner(this, url, callback);
    } catch (err) {
      console.log("An error occurred while trying to fetch the html. " + err);
      console.log("Will try to recreate the PhantomJS process");
      recreatePhantomAndRetry(this, url, callback);
    }
  };

  getHtmlInner = function(phantom, url, success){
    async.waterfall([
      function(callback){
         console.log("opening: " + url);
         page.open(url, callback);
      },
      function(status, callback){
         page.get('content', callback);
      }
    ],
    function (err, html) {
      process.nextTick(function(){
        success(null, html);
      });
    });
  };

  recreatePhantomAndRetry = function(phantom, url, callback) {
     setTimeout(function(){
       phantom.stopPhantom(function(){
         phantom.startPhantom(function(){
           getHtmlInner(phantom, url, callback);
         });
       });
     }, 5000);
  };

  phantomWrapper.prototype.stopPhantom = function(callback){

    if(phantom)
    {
      phantom.exit(callback);
      phantom = null;
      page =  null;
    }else{
      phantom = null;
      page =  null;
      callback();
    }

  };

  return phantomWrapper;
})();

module.exports.PhantomWrapper = PhantomWrapper;
