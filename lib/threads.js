var crawler = require("simplecrawler"),
    cheerio = require("cheerio");

var mainCrawler = Crawler.crawl("https://www.jcrew.com/mens_category/shoes/PRD~A1214/A1214.jsp");
mainCrawler.interval = 1000;


mainCrawler.addFetchCondition(function(parsedURL){
  return !parsedURL.path.match(/.*womens.*/);
});

mainCrawler.addFetchCondition(function(parsedURL){
  return parsedURL.path.match(/.*mens.*/);
});

mainCrawler.on("fetchcomplete",function(queueItem, responseBuffer, response){
    $ = cheerio.load(responseBuffer.toString());
    var productDetails = $(".product-detail-container");
    if(productDetails.length === 0)
      return;

    var productName = $(productDetails).find("section.description header h1").val();
    console.log(productName);
});

mainCrawler.on("queueadd", function(queueItem){
        // console.log(queueItem);
});

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
