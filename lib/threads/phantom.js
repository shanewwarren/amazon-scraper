var nodePhantomSimple = require('node-phantom-simple'),
    async = require('async'),
    util = require('util'),
    winston = require('winston');
    EventEmitter = require('events').EventEmitter;

var PhantomWrapper = (function(){
  var _webPage = null;
  var _phantomProcess = null;
  var _this = null;

  var _events = {
    error: 'error',
    ready: 'ready',
    exit: 'exit',
    data: 'data'
  };

  var _errorMessages = {
    notInitialized: 'Phantom is not initialized.',
    alreadyInitialized: 'Phantom is already initialized.',
    getHtmlError: 'An error occurred while attempting to get the html.'
  };

  var phantomWrapper = function() {
     _this = this;
  };

  // have the wrapper function inherit from the EventEmitter
  // so we can broadcast events.
  util.inherits(phantomWrapper, EventEmitter);


  var onPhantomInitialized = function(err, page){
    if(err)
      return _this.emit(_events.error, err);

     _webPage = page;
     _this.emit(_events.ready);
  };

  var isPhantomInitialized = function(){
    return (_phantomProcess || _webPage);
  };

  phantomWrapper.prototype.startPhantom = function(){
    if(isPhantomInitialized()){
      return _this.emit(_events.error,
        new Error(_errorMessages.alreadyInitialized)
      );
    }

    async.waterfall([ nodePhantomSimple.create,
        function(phantom, callback){
            _phantomProcess = phantom;
            _phantomProcess.createPage(callback);
        }],
        onPhantomInitialized);
  };


  phantomWrapper.prototype.getHtml = function(url, callback){
    if(!isPhantomInitialized())
      return _this.emit(_events.error, new Error(_errorMessages.notInitialized));

    async.waterfall([
      function(callback){
         _webPage.open(url, callback);
      },
      function(status, callback){
         _webPage.get('content', callback);
      }
    ],
    function (err, html) {
      if(err)
        return _this.emit(_events.error, err);
      return _this.emit(_events.data, html);
    });
  };


  phantomWrapper.prototype.stopPhantom = function(){
    if(isPhantomInitialized())
    {
      return _phantomProcess.exit(function(){
        _phantomProcess = null;
        _webPage =  null;
        return _this.emit(_events.exit);
      });
    }

    return _this.emit(_events.error, new Error(_errorMessages.notInitialized));
  };

  return phantomWrapper;

})();

module.exports.PhantomWrapper = PhantomWrapper;
