var cheerio = require('cheerio'),
    ent = require('ent');

var Store = function () {
  this.productNamePattern = null;
};

module.exports.Store = Store;

Store.prototype.parse = function(html){

  var errors = [];

  if(typeof parseName != 'function')
    errors.push("No method for parsing the name.");

  if(typeof parseDescription != 'function')
    errors.push("No method for parsing the description.");

  if(typeof parsePrice != 'function')
    errors.push("No method for parsing the price.");

  // one of the parsing methods is missing
  // no point in even trying to parse the html.
  if(errors.length > 0)
    return;

  var $ = cheerio.load(html);
  this.name = parseName($);
  if(!this.name)
      errors.push("Failed to parse product name.");

  this.description = parseDescription($);
  if(!this.description)
    errors.push("Failed to parse description.");

  this.price = parsePrice($);
  if(!this.price)
    errors.push("Failed to parse price.");

  return success;

};


Store.prototype.getValueFromElement = function(element){
  if(element.length === 0)
    return null;

  return ent.decode($(element).html());
};
