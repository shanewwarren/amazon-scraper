var cheerio = require('cheerio'),
    ent = require('ent');

var Store = function () {
  this.productNamePattern = null;
};

module.exports.Store = Store;

Store.prototype.parse = function(html){

  var errors = [];

  if(typeof parseName != 'function')
    throw new Error("No method for parsing the name.");

  if(typeof parseDescription != 'function')
    throw new Error("No method for parsing the description.");

  if(typeof parsePrice != 'function')
    throw new Error("No method for parsing the price.");


  var $ = cheerio.load(html);
  this.name = parseName($);
  if(!this.name)
      throw new Error("Failed to parse product name.");

  this.description = parseDescription($);
  if(!this.description)
    throw new Error("Failed to parse description.");

  this.price = parsePrice($);
  if(!this.price)
    throw new Error("Failed to parse price.");

  return success;

};
