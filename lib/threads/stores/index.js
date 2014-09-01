var JCrew = require('./jcrew.js').JCrew;
module.exports.JCrew = JCrew;


module.exports.getStores = function(){
  var stores = [];

  stores.push(JCrew);

  return stores;
};

module.exports.getStoreFromName = function (storeName) {
  var name = storeName.toLowerCase();
  if(name == 'jcrew'){
    return new JCrew();
  }
  return null;
};
