var cheerio = require("cheerio"),
    config = require('../config'),
    rabbit = require('rabbit.js'),
    Crawler = require("simplecrawler").Crawler,
    JCrew = require('./threads/stores').JCrew;

(function(){

  var crawler = null;
  var store = new JCrew();
  var context = rabbit.createContext();
  var publishSocket = null;

  context.on('ready', rabbitReady);

  var rabbitReady = function(){
    publishSocket = context.socket('PUSH');
      publishSocket.connect(store.storeName, publishSocketConnect);
    });
  };

  var publishSocketConnect = function(){
    
  };

  var processStore = function(store){
      crawler = new Crawler();
      crawler.host = store.host;
      crawler.interval = config.crawler.interval;
      crawler.userAgent = config.crawler.userAgent;
      crawler.addFetchCondition(store.fetchConditions);

      attachEventHandlers(crawler);

      crawler.start();
      console.log("crawler initialized...");
    });
  };

  var attachEventHandlers = function(crawler){
    crawler.on("queueadd", queueAdd);
    crawler.on("fetchcomplete", fetchComplete);
    crawler.on("complete", complete);
    crawler.on("crawlstart", crawlStart);
    crawler.on("fetcherror", fetchError);
    crawler.on("queueerror", queueError);
  };


  var crawlStart = function(){
    console.log("crawler started...");
  };

  var queueError = function(errorData, URLData){
    console.log("queue error!");
  };

  var fetchError = function(queueItem, response){
    console.log("crawler failed to fetch!");
  };

  var queueAdd = function(queueItem){
    console.log(queueItem.url);
  };

  var fetchComplete = function(queueItem, responseBuffer, response){

  };

  var complete = function(){
    if(crawler){
      crawler.off
      crawler.stop();
      crawler = null;
    }
  };

  currentStore = new stores.JCrew();
  processStore(currentStore);

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
