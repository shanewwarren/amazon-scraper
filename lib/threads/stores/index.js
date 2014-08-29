module.exports.getStoreFromName = function (storeName) {
  name = storeName.toLowerCase();
  if(name == 'jcrew'){
    return new JCrew();
  }

  return null;
}
module.exports.JCrew = require('./jcrew.js').JCrew;
