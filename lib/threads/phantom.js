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

    async.waterfall([
      function(callback){
         page.open(url, callback);
      },
      function(status, callback){
         page.get('content', callback);
      }
    ],
    function (err, html) {
      callback(null, html);
    });

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
