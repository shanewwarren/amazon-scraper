var util = require('util'),
    EventEmitter = require('events').EventEmitter;

var StoreQueueItem = function(store) {
  this.store = store;
  this.timestamp = new Date();
};

var StoreQueue = (function(){

  var queueName = "store_queue";
  var queue = function() {

  };

  util.inherits(queue, EventEmitter);

  queue.prototype.initialize = function(context, type){
      if(type === "WORKER")
        socket = context.socket(type, {prefetch: 1});
      else
        socket = context.socket(type);

      var self = this;
      socket.connect(queueName, function(){
        self.emit('ready');
      });

  };

  queue.prototype.close = function(callback){
    if(socket){
      socket.on('close', callback);
      socket.close();
      return;
    }else{
      if(callback)
        callback();
    }
  };

  queue.prototype.readItem = function(str){
    var message = socket.read();
    return JSON.parse(message);
  };

  queue.prototype.acknowledgeItem = function(){
    socket.ack();
  };

  queue.prototype.writeItem = function(store){
    var item = new StoreQueueItem(store);
    socket.write(JSON.stringify(item), 'utf8');
  };

  return queue;

})();


module.exports = StoreQueue;
