var config = require('../config'),
    rabbit = require('rabbit.js'),
    async = require('async'),
    queues = require('./threads/queues'),
    stores = require('./threads/stores'),
    program = require('commander');

program
  .version(config.version)
  .option('-u, --url [website url]', 'Initiates an intent to start crawling the specified url.')
  .option('-i, --id [unique user id]', 'Unique guid used to report feedback to throughout crawl process.')
  .parse(process.argv);


(function(storeName){

  var crawler = null;
  var context = null;
  var storeQueue = null;

  var start = function(){
    async.waterfall(
    [ initializeRabbitMQ, initializeStoreQueue ],
    addIntentToStoreQueue);
  };

  var initializeRabbitMQ = function(callback){
    context = rabbit.createContext(config.rabbit.url);
    context.on('ready', function(){ callback(null); });
  };

  var initializeStoreQueue = function(callback){
    // now open up a worker socket to conenct to the queue
    storeQueue = new queues.StoreQueue();
    storeQueue.on('ready', callback);
    storeQueue.initialize(context, "PUSH");
  };

  var addIntentToStoreQueue = function(err, result){
    storeQueue.writeItem(storeName);
    console.log('Intent added to crawl the %s website.', storeName);
    storeQueue.close(function(){
      context.close();
    });
  };

  start();
})(program.store);
