var config = require('../config'),
    rabbit = require('rabbit.js'),
    async = require('async'),
    Crawler = require("simplecrawler").Crawler,
    queues = require('./threads/queues'),
    stores = require('./threads/stores');

(function(){

  var crawler = null;
  var context = null;

  var storeQueue = null;
  var urlQueue = null;

  var start = function(){
    async.waterfall(
    [ initializeRabbitMQ, initializeStoreQueue ],
    processStoreQueue);
  };

  var initializeRabbitMQ = function(callback){
    context = rabbit.createContext(config.rabbit.url);
    context.on('ready', function(){ callback(null); });
  };

  var initializeStoreQueue = function(callback){
    // now open up a worker socket to conenct to the queue
    storeQueue = new queues.StoreQueue();
    storeQueue.on('ready', callback);
    storeQueue.initialize(context, "WORKER");
  };

  var processStoreQueue = function(err, result){
    var item = storeQueue.readItem();
    if(!item){
      // no items on the queue quit.
      console.log("No items to process.");
      onCrawlFinished();
      return;
    }

    console.log("Processing store: " + item.store);

    async.waterfall([
        function(callback){
          initializeUrlQueue(item.store, callback);
        },
        function(callback){
          crawlStore(item.store, callback);
      }],
      function(err, result){
          storeQueue.acknowledgeItem();
          onCrawlFinished(err, result);
      });
  };

  var initializeUrlQueue = function(storeName, callback){
    urlQueue = new queues.UrlQueue();
    urlQueue.on('ready', callback);
    urlQueue.initialize(storeName, context, "PUSH");
  };

  var onCrawlFinished = function(err, result){
    console.log("Finished");
    storeQueue.close(function(){
      context.close();
    });
  };

  start();

  var crawlStore = function(storeName, callback){

    var store = stores.getStoreFromName(storeName);

    crawler = new Crawler();
    crawler.host = store.host;
    crawler.interval = config.crawler.interval;
    crawler.userAgent = config.crawler.userAgent;
    crawler.addFetchCondition(store.fetchConditions);

    crawler.on("crawlstart", function(){
      urlQueue.writeStart();
    });
    crawler.on("queueadd", function(queueItem){
      console.log("Added: " + queueItem.url);
      urlQueue.writeUrl(queueItem.url);
    });

    crawler.on("complete", function(){
      urlQueue.writeStop();
      callback();
    });

    crawler.start();
  };

})();

// Queue just one URL, with default callback
// c.queue("https://www.jcrew.com/mens-clothing.jsp");

// Iterate through all stores

// For a store

  // Get a list of all the items that we currently have recorded for a store.
  // Crawl all relevant pages of the store
  //   Parse the product html page to for the desired data. (product).

  //   If the product already exists
        // Check if anything has changed...
           // if so remove it from the currently recorded array and place into the updated array.
        // Nothing has changed
           // store in unchanged array
  //   Product doesn't exist, add to the new product array.


  //  After finish crawling all pages.
      // update all updated products
      // add all newly found products
      // delete all missing products (don't actually change delete, change status to deleted)

//!!!!
// Should each product contain a relationship to a history table?
// So when a product is updated a new entry

 // Send an email or make a report on sweep of the store.
