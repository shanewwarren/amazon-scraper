var config = require('../config'),
    rabbit = require('rabbit.js'),
    async = require('async'),
    queues = require('./threads/queues'),
    PhantomWrapper = require('./threads/phantom').PhantomWrapper,
    cheerio = require('cheerio'),
    stores = require('./threads/stores');

(function(){

  var _context = null;
  var _storeUrlQueue = null;
  var _currentStore = null;
  var _stores = null;
  var _storeIndex = 0;
  var _phantom = null;
  var _waitInterval = 1000;


  var start = function(){
    // get a list of all the stores...
    _stores = stores.getStores();
    _storeIndex = 0;

    _phantom = new PhantomWrapper();
    _phantom.on('ready', initializeRabbitMQ);
    _phantom.on('error', onPhantomError);
    _phantom.on('exit', onPhantomExit);
    _phantom.on('data', onPhantomData);
    _phantom.startPhantom();
  };

  var onPhantomError = function(err){
    if(err)
      console.log(err);

    if(_phantom)
      _phantom.stopPhantom();
  };

  var onPhantomExit = function(){
    _phantom = null;

    if(_storeUrlQueue) {
      _storeUrlQueue.close(function(){
        _storeUrlQueue = null;
      });
    }
  };

  var onPhantomData = function(html){
    var products = _currentStore.parseProducts(cheerio.load(html));

    // removes the item from the queue
    _storeUrlQueue.acknowledgeItem();
    console.log('PRODUCT(S)', products);
    console.log('waiting...');
    setTimeout(processUrlQueue, _waitInterval);
  };

  var initializeRabbitMQ = function(){
    _context = rabbit.createContext(config.rabbit.url);
    _context.on('ready', processStoreQueue);
  };

  var processStoreQueue = function(){
    if(_storeIndex >= _stores.length)
      return;

    // get the next store to process
    _currentStore = new _stores[_storeIndex]();
    _storeUrlQueue = new queues.UrlQueue();
    _storeUrlQueue.on('ready', processUrlQueue);
    _storeUrlQueue.initialize(_currentStore.storeName, _context, "WORKER");
  };

  var processUrlQueue = function(){
    var item = _storeUrlQueue.readItem();
    if(!item) {
      console.log("No items to process.");
      _storeIndex++;
      return processStoreQueue();
    }

    console.log('processing item ' + item.payload);
    _phantom.getHtml(item.payload);
  };

  start();

})();
