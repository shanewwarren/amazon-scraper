var cheerio = require('cheerio'),
    store = require('./store'),
    ent = require('ent');

var JCrew = function() {};
module.exports.JCrew = JCrew;

JCrew.prototype = new store.Store();


JCrew.prototype.getValueFromElement = function(element){
  if(element.length === 0)
    return null;

  return ent.decode(element.html());
};


JCrew.prototype.parseName = function($){
     var element = $("#description0 header h1");
     return this.getValueFromElement(element);
};

JCrew.prototype.parseDescription = function($){
      var element = $("#prodDtlBody");
      return this.getValueFromElement(element);
};


JCrew.prototype.parsePrice = function($){
      var element = $("#productDetailsContainer0 .full-price span");
      return this.getValueFromElement(element);
};
