var cheerio = require('cheerio'),
    store = require('./store'),
    ent = require('ent'),
    Product = require('../product');

var JCrew = function() {
  this.storeName = "jcrew";
  this.host = "www.jcrew.com";
  this.url = "http://" + this.host;
};

module.exports.JCrew = JCrew;

JCrew.prototype.getValueFromElement = function(element){
  if(element.length === 0)
    return null;

  return ent.decode(element.html());
};

JCrew.prototype.parseProducts = function($){
  var products = [];
  var count = $("article.product-container").length;

  for(var index = 0; index < count; index++){
    products.push(this.parseProduct($, index));
  }

  console.log(products);
  return products;
};

JCrew.prototype.parseProduct = function($, productIndex){
  var product = new Product();
  product.name = this.parseName($, productIndex);
  product.description = this.parseDescription($, productIndex);
  product.price = this.parsePrice($, productIndex);
  return product;
};

JCrew.prototype.parseName = function($, productIndex){
     var element = $("#description" + productIndex + " header h1");

     // different structure if it is a page with multiple items
     if(element.length === 0)
       element = $("div#productDetailsContainer" + productIndex + " section#description header h1" );
     return this.getValueFromElement(element);
};

JCrew.prototype.parseDescription = function($, productIndex){
      var element = $("article#product" + productIndex + " #prodDtlBody");
      return this.getValueFromElement(element);
};


JCrew.prototype.parsePrice = function($, productIndex){
      var element = $("#productDetailsContainer" + productIndex + " .full-price span");
      return this.getValueFromElement(element);
};

JCrew.prototype.fetchConditions = function(parsedUrl){
  var path = parsedUrl.path;
  var success = false;

  if(parsedUrl.uriPath.match(/\.js$/i)) return false; // if a javascript file..
  else if(parsedUrl.uriPath.match(/\.css$/i)) return false;
  else if(parsedUrl.uriPath.match(/\.png$/i)) return false;
  else if(parsedUrl.uriPath.match(/\.jpg$/i)) return false;
  else if(parsedUrl.uriPath.match(/\.gif$/i)) return false;
  else if(parsedUrl.uriPath.match(/\.eot$/i)) return false;
  else if(parsedUrl.uriPath.match(/\.woff$/i)) return false;
  else if(parsedUrl.uriPath.match(/\.ttf$/i)) return false;
  else if(parsedUrl.uriPath.match(/\.svg$/i)) return false;
  else if(path.match(/\/[a-z]{2}\//)) return false;
  else if(path.match(/\/account\//i)) return false;
  else if(path.match(/\/checkout2\//i)) return false;
  else if(path.match(/\/signin\//i)) return false;
  else if(path.match(/\/intl\//i)) return false;
  else if(path.match(/\/wishlist.*/i)) return false;
  else if(path.match(/\/help\//i)) return false;
  else if(path.match(/\/checkout\//i)) return false;
  else if(path.match(/\/footie\//i)) return false;
  else if(path.match(/\/footer\//i)) return false;
  else if(path.match(/\/media\//i)) return false;
  else if(path.match(/\/browse2\//i)) return false;
  else if(path.match(/\/flatpages\//i)) return false;
  else if(path.match(/\/search2?\//i)) return false;
  else if(path.match(/\/wedding\//i)) return false;
  else if(path.match(/\/aboutus\//i)) return false;
  else if(path.match(/\/sizecharts\//i)) return false;
  else if(path.match(/\/AST\/filterAsst\//i)) return false;
  else if(path.match(/.*[W|w]omen.*/)) // path contain women, ignore these
    return false;
  else if(path.match(/.*[B|b]aby.*/)) // path contain baby, ignore these
    return false;
  else if(path.match(/.*[G|g]irl.*/)) // path contain girl, ignore these
    return false;
  else if(path.match(/.*[B|b]oy.*/)) // path contain boy, ignore these
      return false;
  else if(path.match(/.*men.*/)) // path contain men?
    return true;
  else
    return true;
};
