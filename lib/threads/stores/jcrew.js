var cheerio = require('cheerio'),
    store = require('./store');

var JCrew = function() {};
module.exports.JCrew = JCrew;

JCrew.prototype = new store.Store();

JCrew.prototype.parseName = function($){
     var nameElement = $("#description0 header h1");
     if(nameElement.length === 0)
       return null;

     return $(nameElement).html();
};

JCrew.prototype.parseDescription = function($){
      var descriptionElement = $(".product-detail-container .description div");
      if(descriptionElement.length === 0)
        return null;

      return $(descriptionElement).html();
};


JCrew.prototype.parsePrice = function($){
      var priceElement = $(".product-detail-container .price div");
      if(priceElement.length === 0)
        return null;

      return $(priceElement).html();
};
