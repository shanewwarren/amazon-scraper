var PhantomWrapper = require('./threads/phantom').PhantomWrapper,
    JCrew = require('./threads/stores/jcrew').JCrew,
    async = require('async');


(function(){
  var phantom = null;
  var context = null;
  var workerSocket = null;
  var store = new JCrew();


  async.waterfall([
      initializePhantom,
      initializeRabbitMQ,
      initializeRabbitMQWorkerSocket
  ],
  function (err, pg) {
     page = pg;
     callback();
  });


initializeRabbitMQ = function(callback){
  context = rabbit.createContext();
  context.on('ready', callback);
};

initializeRabbitMQWorkerSocket = function(callback){
  // now open up a worker socket to conenct to the queue
  workerSocket = context.socket('WORKER');
  workerSocket.connect(store.storeName, workerSocketConnect);
};

initializePhantom = function(callback){
  phantom = new PhantomWrapper();
  phantom.startPhantom(callback);
};



  if(phantom){
    phantom.stopPhantom();
    phantom = null;
  }

  phantom.getHtml(queueItem.url, function(err, html){
    var newProducts = currentStore.parseProducts(cheerio.load(html));
    if(newProducts == []) {
      console.log("No products found on " + queueItem.url);
      return;
    }

    for(var index = 0; index < newProducts.length; index++)
      console.log(newProducts[index]);
    products.push.apply(products, newProducts);
  });
})();
