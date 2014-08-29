var rabbit = require('rabbit.js'),
    StoreUrlQueue = require('./lib/threads/queues/store-url-queue');


var context = rabbit.createContext('amqp://localhost');
var writeQueue = null;
context.on('error', function(e){console.log(e);});
context.on('ready',function(){
  try{

  writeQueue = new StoreUrlQueue();

  writeQueue.on('ready', function(){
    console.log("here");
    try{
    writeQueue.writeStart();
    writeQueue.writeUrl("http://www.google.com");
    writeQueue.writeStop();

  }catch(ex){
    console.log(ex);
  }
  });

  writeQueue.initialize(context, 'store_url_queue', 'PUSH');

}catch(e){
  console.log(e);
}

});
